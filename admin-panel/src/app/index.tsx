import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import Main from '../pages/main';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import './styles.css';
import { useAppDispatch } from '@shared/store/hooks';
import { getTokenFromLocalStorage } from '@shared/utils/localstorage.helper';
import { AuthService } from '@shared/services/auth.service';
import { login, logout } from '@shared/store/slices/auth.slice';

const App = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const checkAuth = async () => {
		const token = getTokenFromLocalStorage();
		try {
			if (token) {
				const data = await AuthService.getProfile();
				if (data) {
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
		checkAuth();
	}, []);

	return (
		<>
			<ScrollRestoration />
			<ConfigProvider>
				<Main />
			</ConfigProvider>
		</>
	);
};

export default App;
