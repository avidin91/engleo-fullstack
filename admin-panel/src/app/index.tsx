import React, { useEffect, useState } from 'react';
import { ConfigProvider } from 'antd';
import Main from '../pages/main';
import { ScrollRestoration, useNavigate } from 'react-router-dom';
import './styles.css';

const App = () => {
	// const [isAuthorized, setIsAuthorized] = useState(false);
	// const navigate = useNavigate();
	//
	// useEffect(() => {
	// 	if (!isAuthorized) {
	// 		navigate('/	sign-in');
	// 	}
	// }, [isAuthorized]);
	//
	// if (!isAuthorized) return null;

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
