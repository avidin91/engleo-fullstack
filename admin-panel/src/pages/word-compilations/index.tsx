import React, { useEffect, useState } from 'react';
import {
	Button,
	Flex,
	Form,
	FormProps,
	Image,
	Input,
	Select,
	Table,
	Typography,
	Upload,
} from 'antd';
import { slugifyString } from '@shared/utils/slugifyString';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { IRecordType } from './types';
import UpdateModal from './updateModal';
import { DeleteOutlined } from '@ant-design/icons';
import {
	createWordCompilation,
	deleteCompilation,
	fetchWordCompilations,
	fetchGroupsCompilationsAssociations,
	fetchWordGroups,
	createGroupCompilationAssociation,
	deleteGroupCompilationAssociation,
} from '@shared/store/slices/word-compilations.slice';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { useForm } from 'antd/es/form/Form';
import { debounce } from 'lodash';

const { Title } = Typography;

interface IFieldType {
	title: string;
	titleInEnglish: string;
	description: string;
}

const WordCompilations = () => {
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const dispatch = useAppDispatch();
	const [form] = useForm();
	const [isDataLoaded, setIsDataLoaded] = useState(false); // FIXME убрать локальное состояние, если возвожно

	useEffect(() => {
		Promise.all([
			dispatch(fetchWordCompilations()),
			dispatch(fetchWordGroups()),
			dispatch(fetchGroupsCompilationsAssociations()),
		]).then(() => {
			setIsDataLoaded(true);
		});
	}, []);

	const onFinish: FormProps<IFieldType>['onFinish'] = (values) => {
		form.getFieldValue('image');
		const data = {
			...values,
			image: form.getFieldValue('image'),
			slug: slugifyString(values.title),
		};

		dispatch(createWordCompilation(data));
	};

	const onFinishFailed: FormProps<IFieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Заголовок',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Заголовок на английском',
			dataIndex: 'titleInEnglish',
			key: 'titleInEnglish',
		},
		{
			title: 'Описание',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Ссылка',
			dataIndex: 'slug',
			key: 'slug',
		},
		{
			title: 'Картинка',
			dataIndex: 'image',
			key: 'image',
		},
		{
			title: 'Миниатюра',
			key: 'mini-image',
			render: ({ image }: { image: string }) => (
				<Image
					src={`http://localhost:3009/static/${image}`}
					width={60}
					style={{ border: '1px solid', borderRadius: 6 }}
				/>
			),
		},
		{
			title: 'Группы подборок',
			key: 'edit',
			render: (record: IRecordType) => {
				if (!isDataLoaded) return null;

				const handleSelect = (groupTitle: string) => {
					const selectedGroup = options.find((option) => option.value === groupTitle);
					const groupId = selectedGroup!.id;

					const debouncedDispatch = () => {
						dispatch(
							createGroupCompilationAssociation({
								compilationId: record.id,
								groupId,
							}),
						);
					};
					debounce(debouncedDispatch, 300)();
				};

				const handleDeselect = (group: any) => {
					const association = wordCompilationsStore.groupsCompilationsAssociations.find(
						(item) => item.groupTitle === group,
					);
					const associationId = association!.relationsId;
					dispatch(deleteGroupCompilationAssociation(associationId));
				};

				const filteredAssociations =
					wordCompilationsStore.groupsCompilationsAssociations.filter(
						(item) => item.compilationId === record.id,
					);

				const defaultValue = filteredAssociations.map((item) => item.groupTitle);

				return (
					<Select
						style={{ width: 200 }}
						mode="multiple"
						options={options}
						defaultValue={defaultValue}
						onSelect={handleSelect}
						onDeselect={handleDeselect}
					/>
				);
			},
		},
		{
			title: 'Редактировать',
			key: 'edit',
			render: (record: IRecordType) => <UpdateModal record={record} />,
		},
		{
			title: 'Удалить',
			key: 'delete',
			render: (record: IRecordType) => (
				<Button
					type="link"
					danger
					onClick={() => dispatch(deleteCompilation(record.id))}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = wordCompilationsStore.compilations.map((compilation) => ({
		...compilation,
		key: compilation.id,
	}));

	const options = wordCompilationsStore.groups.map((group) => ({
		value: group.title,
		label: group.title,
		id: group.id,
	}));

	return (
		<Flex vertical gap={32}>
			<Title style={{ alignSelf: 'center', marginTop: 0 }}>Подборки слов</Title>
			<Form
				name="compilation"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<IFieldType>
					label="Заголовок"
					name="title"
					rules={[{ required: true, message: 'Пожалуйста введите название подборки' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldType>
					label="Заголовок на английском"
					name="titleInEnglish"
					rules={[
						{
							required: true,
							message: 'Пожалуйста введите название подборки на английском',
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldType>
					label="Описание"
					name="description"
					rules={[{ required: true, message: 'Пожалуйста введите описание подборки' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="image" label="Изображение" required valuePropName="file">
					<ImgCrop>
						<Upload
							maxCount={1}
							name="files"
							action="http://localhost:3009/api/files/upload/word-compilation"
							headers={{
								Authorization: 'Bearer ' + getTokenFromLocalStorage(),
							}}
							listType="picture-card"
							onChange={(info) => {
								if (info.file.status === 'done') {
									form.setFieldValue('image', info.file.response[1].url);
								}
							}}
						>
							Нажмите для загрузки
						</Upload>
					</ImgCrop>
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Создать новую подборку
					</Button>
				</Form.Item>
			</Form>
			<Table dataSource={dataSource} columns={columns} />
		</Flex>
	);
};

export default WordCompilations;
