import logo from '@/public/logo.svg';
import Image from 'next/image';
import { Button } from '@/src/shared/ui';
import styles from './styles.module.css';

export const Header = () => {
	return (
		<header className={styles.headerComponent}>
			<div>
				<Image src={logo} alt="logo" width={50} height={50} />

				<p className={styles.headerComponentText}>
					Помогаем выучить наизусть слова английского языка
				</p>
			</div>
			<div>
				<Button appearance="ghost" size="s">
					Подборки слов
				</Button>
				<Button appearance="ghost" size="s">
					О нас
				</Button>
				<Button appearance="yellow" size="s">
					Войти
				</Button>
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
			</div>
		</header>
	);
};

// const menuItems = [
// 	{
// 		key: '0',
// 		label: 'Профиль',
// 	},
// 	{
// 		key: '1',
// 		label: 'Настройки',
// 	},
// 	{
// 		key: '2',
// 		type: 'divider',
// 	},
// 	{
// 		key: '3',
// 		label: 'Выход',
// 		// onClick: handleLogout,
// 	},
// ];
