import React from 'react';
import { Menu, MenuProps, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { ApartmentOutlined, BarsOutlined, BlockOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const menu = [
	{
		id: 1,
		title: 'Пользователи',
		icon: UserOutlined,
		slug: 'users',
	},
	{
		id: 2,
		title: 'Группы слов',
		icon: BlockOutlined,
		slug: 'word-groups',
	},
	{
		id: 3,
		title: 'Подборки слов',
		icon: ApartmentOutlined,
		slug: 'word-compilations',
	},
	{
		id: 4,
		title: 'Слова',
		icon: BarsOutlined,
		slug: 'words',
	},
	// {
	// 	id: 5,
	// 	title: 'Группы правил',
	// 	icon: BuildOutlined,
	// 	slug: 'rules-groups',
	// },
	// {
	// 	id: 6,
	// 	title: 'Правила',
	// 	icon: CreditCardOutlined,
	// 	slug: 'rules',
	// },
];

const menuItems: MenuProps['items'] = menu.map(({ title, icon, id }) => {
	return {
		key: String(id),
		icon: React.createElement(icon),
		label: title,
	};
});

const SiderMenu = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const currentMenuItem = menu.find((item) => `/${item.slug}` === pathname);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const onMenuSelect = ({ key }: { key: string }) => {
		const menuItem = menu.find((menuItem) => menuItem.id === Number(key));
		const slug = menuItem ? menuItem.slug : '/';

		navigate(slug);
	};

	return (
		<Sider width={200} style={{ background: colorBgContainer }}>
			<Menu
				mode="inline"
				defaultSelectedKeys={[`${currentMenuItem?.id}`]}
				defaultOpenKeys={[`${currentMenuItem?.id}`]}
				style={{ height: '100%', borderRight: 0 }}
				items={menuItems}
				onSelect={onMenuSelect}
			/>
		</Sider>
	);
};

export default SiderMenu;
