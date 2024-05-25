import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import Main from '../pages/main';
import './styles.css';
import { ScrollRestoration } from 'react-router-dom';
import { useAppDispatch } from '@shared/store/hooks';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { AuthService } from '@shared/services/auth.service';
import { login, logout } from '@shared/store/user/userSlice';

const App = () => {
	const dispatch = useAppDispatch();
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
		console.log('token = ', token);
		try {
			if (token) {
				const data = await AuthService.getProfile();
				console.log('data = ', data);
				if (data) {
					dispatch(login(data));
				} else {
					dispatch(logout());
				}
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		checkAuth();
	}, []);

	return (
		<>
			<ScrollRestoration />
			<ConfigProvider
				theme={{
					components: {
						Layout: {
							siderBg: '#222222',
							triggerBg: '#444444',
						},
						Menu: {
							darkItemBg: '#222222',
							itemSelectedBg: '#0074bf',
						},
					},
					token: {
						colorPrimary: '#00B96B',
					},
				}}
			>
				<Main />
			</ConfigProvider>
		</>
	);
};

export default App;
