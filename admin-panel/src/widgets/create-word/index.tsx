import React from 'react';
import { Button, Form, FormProps, Input, Upload } from 'antd';
import { IFieldType } from '@pages/words/types';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { createWord } from '@shared/store/slices/words.slice';
import { useAppDispatch } from '@shared/store/hooks';
import { useForm } from 'antd/es/form/Form';

export const CreateWordWidget = () => {
	const dispatch = useAppDispatch();
	const [form] = useForm();

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

	return (
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
					Создать новое слово
				</Button>
			</Form.Item>
		</Form>
	);
};
