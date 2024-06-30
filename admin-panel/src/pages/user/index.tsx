import React, { useEffect } from 'react';
import { Table, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';
import { fetchUsers } from '@shared/store/slices/users.slice';

const { Title } = Typography;

const User = () => {
	const usersStore = useAppSelector((state) => state.usersStore);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchUsers());
	}, []);

	// console.log('usersStore = ', usersStore);

	const columns = [
		{
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
	];

	const dataSource = usersStore.users.map((user) => ({
		...user,
		key: user.id,
	}));

	return (
		<>
			<Title style={{ marginTop: 0, textAlign: 'center' }}>Пользователи</Title>
			<Table dataSource={dataSource} columns={columns} />
		</>
	);
};

export default User;
