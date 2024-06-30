import React, { useEffect } from 'react';
import { ConfigProvider, Layout, theme, Image, Flex } from 'antd';
import { Outlet, ScrollRestoration, useLocation, useNavigate } from 'react-router-dom';
import './styles.css';
import { useAppDispatch } from '@shared/store/hooks';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { AuthService } from '@shared/services/auth.service';
import { login, logout } from '@shared/store/slices/auth.slice';
import HeaderComponent from '@widgets/header-component';
import { minHeight } from '@shared/constants/constants';
import SiderMenu from '@widgets/sider-menu';
import { Content } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import logo from '@shared/img/logo.svg';

const App = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();

		try {
			if (token) {
				const data = await AuthService.getProfile();

				if (data && data.role === 'ADMIN') {
					dispatch(login(data));
				} else {
					dispatch(logout());
					navigate('/auth');
				}
			} else {
				dispatch(logout());
				navigate('/auth');
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		void checkAuth();
	}, []);

	return (
		<>
			<ScrollRestoration />
			<ConfigProvider>
				<Layout>
					<HeaderComponent />
					<Layout style={{ minHeight }}>
						<SiderMenu />
						<Layout style={{ padding: 24 }}>
							<Content
								style={{
									padding: 24,
									margin: 0,
									minHeight: 280,
									background: colorBgContainer,
									borderRadius: borderRadiusLG,
								}}
							>
								{pathname === '/' && (
									<>
										<Title style={{ textAlign: 'center' }}>
											Главная страница
										</Title>
										<Flex vertical align="center">
											<Text>Выберите пункт меню</Text>
											<Image src={logo} preview={false} />
										</Flex>
									</>
								)}
								<Outlet />
							</Content>
						</Layout>
					</Layout>
				</Layout>
			</ConfigProvider>
		</>
	);
};

export default App;
