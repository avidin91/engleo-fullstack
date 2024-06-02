import React from 'react';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { minHeight } from '@shared/constants/constants';
import SiderMenu from '@widgets/sider-menu';
import { Outlet } from 'react-router-dom';
import HeaderComponent from '@widgets/header-component';

const { Content } = Layout;

const Main = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	return (
		<>
			<Layout>
				{/*<Header style={{ display: 'flex', alignItems: 'center' }}>Header</Header>*/}
				<HeaderComponent />
				<Layout style={{ minHeight }}>
					<SiderMenu />
					<Layout style={{ padding: '0 24px 24px' }}>
						{/*FIXME поменять хлебные крошки*/}
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb>

						<Content
							style={{
								padding: 24,
								margin: 0,
								minHeight: 280,
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							<Outlet />
						</Content>
					</Layout>
				</Layout>
			</Layout>
		</>
	);
};

export default Main;
