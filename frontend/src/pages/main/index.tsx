import React, { useState } from 'react';
import { Layout } from 'antd';
import './style.css';
import HeaderComponent from '@widgets/header-component';
import { Outlet } from 'react-router-dom';
import { minHeight } from '@shared/constants/constants';
import FooterComponent from '@widgets/footer-component';
import { Component } from '@pages/not-found/test';

const { Content } = Layout;

const Main = () => {
	const [value, setValue] = useState(1);

	return (
		<>
			<Layout>
				<HeaderComponent />
				<Layout>
					<Component />
					<button onClick={() => {
						setValue(prevState => prevState += 1)
					}}>value</button>
					<Content style={{ minHeight }}>
						<Outlet />
					</Content>
				</Layout>
				<FooterComponent />
			</Layout>
		</>
	);
};

export default Main;
