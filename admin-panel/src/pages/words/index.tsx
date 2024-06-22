import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, FormProps, Image, Input, Select, Table, Upload } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import {
	createWord,
	createWordCompilationAssociation,
	deleteWord,
	deleteWordCompilationAssociation,
	fetchWords,
	fetchWordsCompilationsAssociations,
} from '@shared/store/slices/words.slice';
import { IFieldType, IRecordType } from '@pages/words/types';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { useForm } from 'antd/es/form/Form';
import UpdateModal from '@pages/words/updateModal';
import { debounce } from 'lodash';
import { fetchWordCompilations } from '@shared/store/slices/word-compilations.slice';

const Words = () => {
	const wordsStore = useAppSelector((state) => state.wordsStore);
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const dispatch = useAppDispatch();
	const [form] = useForm();
	const [isDataLoaded, setIsDataLoaded] = useState(false); // FIXME убрать локальное состояние, если возвожно

	useEffect(() => {
		Promise.all([
			dispatch(fetchWords()),
			dispatch(fetchWordsCompilationsAssociations()),
			dispatch(fetchWordCompilations()),
		]).then(() => {
			setIsDataLoaded(true);
		});
	}, []);

	const onFinish: FormProps<IFieldType>['onFinish'] = (values) => {
		form.getFieldValue('image');
		const data = {
			...values,
			image: form.getFieldValue('image'),
		};
		dispatch(createWord(data));
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
			title: 'Слово',
			dataIndex: 'word',
			key: 'word',
		},
		{
			title: 'Перевод',
			dataIndex: 'translation',
			key: 'translation',
		},
		{
			title: 'Пример',
			dataIndex: 'example',
			key: 'example',
		},
		{
			title: 'Перевод примера',
			dataIndex: 'exampleTranslation',
			key: 'exampleTranslation',
		},
		{
			title: 'Картинка',
			dataIndex: 'image',
			key: 'image',
		},
		{
			title: 'Миниатюра',
			key: 'mini-image',
			render: ({ image }: { image: string }) => {
				return (
					<Image
						src={`http://localhost:3009/static/${image}`}
						width={60}
						style={{ border: '1px solid', borderRadius: 6 }}
					/>
				);
			},
		},
		{
			title: 'Подборки слов',
			key: 'edit',
			render: (record: IRecordType) => {
				if (!isDataLoaded) return null;

				const handleSelect = (compilationTitle: string) => {
					const selectedCompilation = options.find(
						(option) => option.value === compilationTitle,
					);
					const compilationId = selectedCompilation!.id;

					const debouncedDispatch = () => {
						dispatch(
							createWordCompilationAssociation({
								wordId: record.id,
								compilationId,
							}),
						);
					};
					debounce(debouncedDispatch, 300)();
				};

				const handleDeselect = (compilation: any) => {
					const association = wordsStore.wordCompilationAssociations.find(
						(item) => item.compilationTitle === compilation,
					);

					const associationId = association!.relationsId;
					dispatch(deleteWordCompilationAssociation(associationId));
				};

				const filteredAssociations = wordsStore.wordCompilationAssociations.filter(
					(item) => item.wordId === record.id,
				);

				const defaultValue = filteredAssociations.map((item) => item.compilationTitle);

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
					onClick={() => dispatch(deleteWord(record.id))}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = wordsStore.words.map((word) => ({
		...word,
		key: word.id,
	}));

	const options = wordCompilationsStore.compilations.map((compilation) => ({
		value: compilation.title,
		label: compilation.title,
		id: compilation.id,
	}));

	return (
		<Flex vertical gap={32}>
			<Form
				name="word"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<IFieldType>
					label="Слово"
					name="word"
					rules={[{ required: true, message: 'Пожалуйста введите название группы слов' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldType>
					label="Перевод"
					name="translation"
					rules={[{ required: true, message: 'Пожалуйста введите название группы слов' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldType>
					label="Пример"
					name="example"
					rules={[{ required: true, message: 'Пожалуйста введите название группы слов' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<IFieldType>
					label="Перевод примера"
					name="exampleTranslation"
					rules={[{ required: true, message: 'Пожалуйста введите название группы слов' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item name="image" label="Изображение" required valuePropName="file">
					<ImgCrop>
						<Upload
							maxCount={1}
							name="files"
							action="http://localhost:3009/api/files/upload/word"
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
						Создать новое слово
					</Button>
				</Form.Item>
			</Form>
			<Table dataSource={dataSource} columns={columns} />
		</Flex>
	);
};

export default Words;
