import React, { useEffect } from 'react';
import { Button, Flex, Form, FormProps, Input, Table, Upload } from 'antd';
import { slugifyString } from '@shared/utils/slugifyString';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { IRecordType } from '@pages/word-groups/types';
import UpdateModal from '@pages/word-groups/updateModal';
import { DeleteOutlined } from '@ant-design/icons';
import { fetchWordCompilations } from '@shared/store/slices/word-compilations.slice';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { instance } from '@shared/api/axios-api';

interface IFieldType {
	title: string;
	titleInEnglish: string;
	description: string;
	image: File;
}

const WordCompilations = () => {
	const wordCompilationsStore = useAppSelector((state) => state.wordCompilationsStore);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchWordCompilations());
	}, []);

	const onFinish: FormProps<IFieldType>['onFinish'] = (values) => {
		console.log('values = ', values);

		// const title = values.title;
		// const slug = slugifyString(title);
		// dispatch(createGroup({ title, slug }));
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
		// {
		// 	title: 'Редактировать',
		// 	key: 'edit',
		// 	render: (record: IRecordType) => <UpdateModal record={record} />,
		// },
		{
			title: 'Удалить',
			key: 'delete',
			render: (record: IRecordType) => (
				<Button
					type="link"
					danger
					// onClick={() => handleDelete(record.id)}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = wordCompilationsStore.compilations.map((group) => ({
		...group,
		key: group.id,
	}));

	const normFile = (e: any) => {
		console.log('тут');
		console.log('Upload event:', e);
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const test = async (request: any) => {
		try {
			const formData = new FormData();
			formData.append('file', request.file);

			console.log('request = ', request);
			console.log('formData = ', formData);

			const response = await instance.post('files/upload/word-compilation', request.file);
			// console.log('File upload response:', response);
		} catch (error) {
			console.error('Error uploading file:', error);
		}
		// console.log('req = ', request);
		// const response = await instance.post('files/upload', request.file);
		// console.log('res = ', response);
	};

	return (
		<Flex vertical gap={32}>
			<Form
				name="group"
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

				{/*<Form.Item<IFieldType>*/}
				{/*	label="Картинка"*/}
				{/*	name="image"*/}
				{/*	rules={[*/}
				{/*		{ required: true, message: 'Пожалуйста введите название подборки слов' },*/}
				{/*	]}*/}
				{/*>*/}
				{/*	<Input />*/}
				{/*</Form.Item>*/}

				<Form.Item<IFieldType>
					name="image"
					label="Изображение"
					required
					valuePropName="file"
					getValueFromEvent={normFile}
				>
					<ImgCrop>
						<Upload
							maxCount={1}
							name="files"
							action="http://localhost:3009/api/files/upload/word-compilation"
							headers={{
								Authorization: 'Bearer ' + getTokenFromLocalStorage(),
							}}
							listType="picture-card"
							// beforeUpload={(rr) => console.log(rr)}
							onChange={(info) => {
								if (info.file.status === 'done') {
									console.log('info = ', info.file.response);
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
