import React, { useEffect } from 'react';
import { Button, Flex, Form, FormProps, Image, Input, Table, Upload } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { createWord, deleteWord, fetchWords } from '@shared/store/slices/words.slice';
import { IFieldType, IRecordType } from '@pages/words/types';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { useForm } from 'antd/es/form/Form';
import UpdateModal from '@pages/words/updateModal';

const Words = () => {
	const wordsStore = useAppSelector((state) => state.wordsStore);
	const dispatch = useAppDispatch();
	const [form] = useForm();

	useEffect(() => {
		dispatch(fetchWords());
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
