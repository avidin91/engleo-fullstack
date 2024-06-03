import React, { FC, useState } from 'react';
import { Button, Form, FormProps, Input, Modal } from 'antd';
import { slugifyString } from '@shared/utils/slugifyString';
import { useAppDispatch } from '@shared/store/hooks';
import { EditOutlined } from '@ant-design/icons';
import { IRecordType, IUpdateFieldType } from '@pages/word-groups/types';
import { useForm } from 'antd/es/form/Form';
import { updateGroup } from '@shared/store/slices/word-groups.slice';

interface IUpdateModal {
	record: IRecordType;
}

const UpdateModal: FC<IUpdateModal> = ({ record }) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);
	const [formTitle, setFormTitle] = useState(record.title);

	const handleCancel = () => {
		setOpen(false);
	};

	const [form] = useForm();
	const handleOk = () => {
		form.submit();
	};

	const onFinish: FormProps<IUpdateFieldType>['onFinish'] = (values) => {
		const title = values.newTitle;
		const slug = slugifyString(title);
		dispatch(updateGroup({ id: record.id, title, slug }));
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
						initialValue={formTitle}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default UpdateModal;
