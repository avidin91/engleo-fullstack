import React, { useEffect } from 'react';
import { Button, Flex, Form, FormProps, Input, Modal, Table } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { createGroup, deleteGroup, fetchGroups } from '@shared/store/slices/groups.slice';
import { slugifyString } from '@shared/utils/slugifyString';
import { DeleteOutlined } from '@ant-design/icons';
import UpdateModal from '@pages/word-groups/updateModal';
import { IFieldType, IRecordType } from '@pages/word-groups/types';

const WordGroups = () => {
	const groupsStore = useAppSelector((state) => state.groupsStore);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchGroups());
	}, []);

	const handleDelete = (id: number) => {
		dispatch(deleteGroup(id));
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
			title: 'Ссылка',
			dataIndex: 'slug',
			key: 'slug',
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
					onClick={() => handleDelete(record.id)}
					style={{ border: '1px solid' }}
				>
					<DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
				</Button>
			),
		},
	];

	const dataSource = groupsStore.groups.map((group) => ({
		...group,
		key: group.id,
	}));

	const onFinish: FormProps<IFieldType>['onFinish'] = (values) => {
		const title = values.title;
		const slug = slugifyString(title);
		dispatch(createGroup({ title, slug }));
	};

	const onFinishFailed: FormProps<IFieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
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
					rules={[{ required: true, message: 'Пожалуйста введите название группы слов' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Создать новую группу
					</Button>
				</Form.Item>
			</Form>
			<Table dataSource={dataSource} columns={columns} />
		</Flex>
	);
};

export default WordGroups;
