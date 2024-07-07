import React from 'react';
import { Button, Form, FormProps, Input, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { slugifyString } from '@shared/utils/slugifyString';
import { createWordCompilation } from '@shared/store/slices/word-compilations.slice';
import { useForm } from 'antd/es/form/Form';
import { useAppDispatch } from '@shared/store/hooks';

interface IFieldType {
	title: string;
	titleInEnglish: string;
	description: string;
}

export const CreateWordCompilation = () => {
	const [form] = useForm();
	const dispatch = useAppDispatch();

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

	return (
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
								form.setFieldValue('image', info.file.response[0].url);
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
	);
};
