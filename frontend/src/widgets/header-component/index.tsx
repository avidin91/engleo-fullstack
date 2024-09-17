import React from 'react';
import { Avatar, Button, ConfigProvider, Dropdown, Flex, Layout, Typography } from 'antd';
import logo from '@shared/img/logo.svg';
import { Link } from 'react-router-dom';
import './styles.css';
import { rulesCompilations, wordsCompilations } from '@shared/constants/urls';
import SignInModal from '@features/sign-in-modal';
import { useIsAuth } from '@shared/hooks/useIsAuth';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@shared/store/hooks';
// import { logout } from '@shared/store/user/userSlice';
import { removeTokenFromLocalStorage } from '@shared/utils/localstorage.helper';

const { Text } = Typography;
const { Header } = Layout;

const HeaderComponent = () => {
	const isAuth = useIsAuth();
	const dispatch = useAppDispatch();

	const handleLogout = () => {
		// dispatch(logout());
		removeTokenFromLocalStorage();
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
						headerBg: '#bfccf1',
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

					<Text className="header-component-text">
						Помогаем выучить наизусть слова и правила английского языка
					</Text>
				</Flex>

				<Flex align="center" gap={8}>
					{/*TODO удалить reloadDocument*/}
					<Link to={wordsCompilations} reloadDocument>
						<Button type="text">Подборки слов</Button>
					</Link>
					{/*TODO удалить reloadDocument*/}
					<Link to={rulesCompilations} reloadDocument>
						<Button type="text">Подборки правил</Button>
					</Link>

					<Link to={'/about'}>
						<Button type="text">О нас</Button>
					</Link>
					{/*{isAuth ? (*/}
					{/*	<Dropdown menu={{ items: menuItems }} trigger={['click']}>*/}
					{/*		<Button>*/}
					{/*			Меню*/}
					{/*			<UserOutlined />*/}
					{/*		</Button>*/}
					{/*	</Dropdown>*/}
					{/*) : (*/}
					{/*	<SignInModal text="Войти" button="small" formPrefix="header" />*/}
					{/*)}*/}
				</Flex>
			</Header>
		</ConfigProvider>
	);
};

export default HeaderComponent;
