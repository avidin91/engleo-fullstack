import React, { FC, useState } from 'react';
import { Avatar, Button, Checkbox, Flex, Form, Input, Modal, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import vkLogo from '@shared/img/vk-logo.png';
import yaLogo from '@shared/img/ya-logo.png';
import axios from 'axios';
import Registration from '@features/sign-in/registration';

const { Title, Text } = Typography;

type FieldType = {
	email: string;
	password: string;
	confirmPassword?: string;
	remember?: string;
};

type TSignIn = {
	text: string;
	button: 'small' | 'large';
};

const SignIn: FC<TSignIn> = ({ text, button }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [isModalOpen, setIsModalOpen] = useState(true);
	const [isRegister, setIsRegister] = useState(false);

	const swapRegisterToSignIn = () => {
		setIsRegister(false);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
		setIsRegister(false);
	};

	const onRegister = async (i: any) => {
		setIsRegister(true);
		console.log('i = ', i);
		// const { data } = await axios.post(
		// 	'http://localhost:3009/api/user',
		// 	{
		// 		email: 'Fred@Flintstone.ru',
		// 		password: 'Flintstone123',
		// 	},
		// 	{
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 	},
		// );
		// console.log('data = ', data);
	};

	const EmailFormItem = () => {
		return (
			<Form.Item<FieldType>
				name={'email'}
				rules={[
					{
						type: 'email',
						required: true,
						message: 'Некорректный email',
					},
				]}
			>
				<Input placeholder={'Email'} />
			</Form.Item>
		);
	};

	const PasswordFormItem = () => {
		return (
			<Form.Item<FieldType>
				name="password"
				rules={[
					{
						required: true,
						message: 'Минимальная длина 8 символов',
						min: 8,
					},
				]}
			>
				<Input.Password placeholder="Пароль" />
			</Form.Item>
		);
	};

	return (
		<>
			{button === 'small' && (
				<Button
					type="primary"
					onClick={showModal}
					style={{ backgroundColor: '#fdc90d', color: 'black' }}
				>
					Войти
				</Button>
			)}
			{button === 'large' && (
				<Button
					size="large"
					style={{ width: 500, height: 50 }}
					type="primary"
					onClick={showModal}
				>
					{text}
				</Button>
			)}

			{isRegister ? (
				<Registration swapRegisterToSignIn={swapRegisterToSignIn} />
			) : (
				<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
					<Flex vertical align="center">
						<Title level={3}>Вход в профиль</Title>
						<Form name="authorization" layout="vertical" size="large">
							<EmailFormItem />
							<PasswordFormItem />
							<Form.Item<FieldType> name="remember" valuePropName="checked">
								<Checkbox>Запомнить вход</Checkbox>
							</Form.Item>
						</Form>
						<Flex vertical gap={16} style={{ width: '100%' }} align="center">
							<Button type="primary" size="large" style={{ width: '300px' }}>
								Войти
							</Button>
							<Link>Не помню пароль</Link>
							<Button size="large" style={{ width: '300px' }} onClick={onRegister}>
								Зарегистрироваться
							</Button>
							<Text type="secondary">Войти с помощью</Text>
							<Flex gap={16}>
								<Avatar src={vkLogo} size="large" />
								<Avatar src={yaLogo} size="large" />
							</Flex>
						</Flex>
					</Flex>
				</Modal>
			)}
		</>
	);
};

export default SignIn;
