import React, { FC, useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Upload } from 'antd';
import { slugifyString } from '@shared/utils/slugifyString';
import { useAppDispatch } from '@shared/store/hooks';
import { EditOutlined } from '@ant-design/icons';
import { IRecordType, IUpdateFieldType } from './types';
import { useForm } from 'antd/es/form/Form';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { updateWord } from '@shared/store/slices/words.slice';

interface IUpdateModal {
	record: IRecordType;
}

const UpdateModal: FC<IUpdateModal> = ({ record }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const [formFields, setFormFields] = useState<IUpdateFieldType>({
		newWord: record.word,
		newTranslation: record.translation,
		newExample: record.example,
		newExampleTranslation: record.exampleTranslation,
	});

	const handleCancel = () => {
		setOpen(false);
	};

	const [form] = useForm();
	const handleOk = () => {
		form.submit();
	};

	const onFinish: FormProps<IUpdateFieldType>['onFinish'] = (values) => {
		const data = {
			id: record.id,
			word: values.newWord,
			translation: values.newTranslation,
			example: values.newExample,
			exampleTranslation: values.newExampleTranslation,
			image: form.getFieldValue('image') || record.image,
		};
		dispatch(updateWord(data));
		setOpen(false);
	};

	const onFinishFailed: FormProps<IUpdateFieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleUpdate = (record: IRecordType) => {
		setOpen(true);
	};

	return (
		<>
			<Button
				type="link"
				onClick={() => handleUpdate(record)}
				style={{ border: '1px solid' }}
			>
				<EditOutlined style={{ color: '#1677ff', fontSize: 20 }} />
			</Button>

			<Modal title="Title" open={open} onOk={handleOk} onCancel={handleCancel}>
				<Form
					name="updateWord"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					form={form}
				>
					<Form.Item<IUpdateFieldType>
						label="Слово"
						name="newWord"
						rules={[{ required: true, message: 'Пожалуйста введите слово' }]}
						initialValue={formFields.newWord}
					>
						<Input />
					</Form.Item>

					<Form.Item<IUpdateFieldType>
						label="Перевод"
						name="newTranslation"
						rules={[{ required: true, message: 'Пожалуйста введите перевод слова' }]}
						initialValue={formFields.newTranslation}
					>
						<Input />
					</Form.Item>

					<Form.Item<IUpdateFieldType>
						label="Пример"
						name="newExample"
						rules={[{ required: true, message: 'Пожалуйста введите пример со словом' }]}
						initialValue={formFields.newExample}
					>
						<Input />
					</Form.Item>

					<Form.Item<IUpdateFieldType>
						label="Перевод примера"
						name="newExampleTranslation"
						rules={[{ required: true, message: 'Пожалуйста введите перевод примера' }]}
						initialValue={formFields.newExample}
					>
						<Input />
					</Form.Item>

					<Form.Item name="newImage" label="Изображение" required valuePropName="file">
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
				</Form>
			</Modal>
		</>
	);
};

export default UpdateModal;
