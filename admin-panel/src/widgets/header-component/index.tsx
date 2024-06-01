import React from 'react';
import { Avatar, Button, ConfigProvider, Dropdown, Flex, Layout } from 'antd';
import logo from '@shared/img/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@shared/store/hooks';
import { removeTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { logout } from '@shared/store/slices/auth.slice';

const { Header } = Layout;

const HeaderComponent = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(logout());
		removeTokenFromLocalStorage();
		navigate('/auth');
	};

	const menuItems = [
		{
			key: '0',
			label: 'Профиль',
		},
		{
			key: '1',
			label: 'Настройки',
		},
		{
			key: '2',
			type: 'divider',
		},
		{
			key: '3',
			label: 'Выход',
			onClick: handleLogout,
		},
	];

	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						// headerBg: '#bfccf1',
					},
				},
			}}
		>
			<Header className="header-component">
				<Flex gap={16} align="center">
					<Link to={'/'} className="header-component-link">
						<Avatar
							src={logo}
							alt="logo"
							size="large"
							shape="square"
							className="header-component-avatar"
						></Avatar>
					</Link>
				</Flex>

				<Flex align="center" gap={8}>
					<Dropdown menu={{ items: menuItems }} trigger={['click']}>
						<Button>
							Меню
							<UserOutlined />
						</Button>
					</Dropdown>
				</Flex>
			</Header>
		</ConfigProvider>
	);
};

export default HeaderComponent;
