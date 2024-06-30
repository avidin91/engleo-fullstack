import React, { FC, useState } from 'react';
import { Button, Form, FormProps, Input, Modal, Upload } from 'antd';
import { slugifyString } from '@shared/utils/slugifyString';
import { useAppDispatch } from '@shared/store/hooks';
import { EditOutlined } from '@ant-design/icons';
import { IRecordType, IUpdateFieldType } from './types';
import { useForm } from 'antd/es/form/Form';
import ImgCrop from 'antd-img-crop';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { updateCompilation } from '@shared/store/slices/word-compilations.slice';

interface IUpdateModal {
	record: IRecordType;
}

const UpdateModal: FC<IUpdateModal> = ({ record }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const [formFields, setFormFields] = useState<IUpdateFieldType>({
		newDescription: record.description,
		newTitle: record.title,
		newTitleInEnglish: record.titleInEnglish,
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
			title: values.newTitle,
			titleInEnglish: values.newTitleInEnglish,
			description: values.newDescription,
			image: form.getFieldValue('image') || record.image,
			slug: slugifyString(values.newTitle),
		};
		dispatch(updateCompilation(data));
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
					name="updateGroup"
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
						label="Заголовок"
						name="newTitle"
						rules={[
							{ required: true, message: 'Пожалуйста введите название группы слов' },
						]}
						initialValue={formFields.newTitle}
					>
						<Input />
					</Form.Item>

					<Form.Item<IUpdateFieldType>
						label="Заголовок на английском"
						name="newTitleInEnglish"
						rules={[
							{ required: true, message: 'Пожалуйста введите название группы слов' },
						]}
						initialValue={formFields.newTitleInEnglish}
					>
						<Input />
					</Form.Item>

					<Form.Item<IUpdateFieldType>
						label="Описание"
						name="newDescription"
						rules={[
							{ required: true, message: 'Пожалуйста введите название группы слов' },
						]}
						initialValue={formFields.newDescription}
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
										form.setFieldValue('image', info.file.response[0].url);
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
