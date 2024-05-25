import React, { FC } from 'react';
import { Avatar, Button, Checkbox, Flex, Form, Input, message, Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import vkLogo from '@shared/img/vk-logo.png';
import yaLogo from '@shared/img/ya-logo.png';
import { AuthService } from '@shared/services/auth.service';
import { setTokenToLocalStorage } from '@shared/utils/localstorage.helper';
import { useAppDispatch } from '@shared/store/hooks';
import { login } from '@shared/store/user/userSlice';

const { Title, Text } = Typography;

type FieldType = {
	email: string;
	password: string;
	remember?: boolean;
};

type TSignIn = {
	swapSignInToRegister: () => void;
	formPrefix: string;
};

const SignIn: FC<TSignIn> = ({ swapSignInToRegister, formPrefix }) => {
	const dispatch = useAppDispatch();

	const onFormFinish = async ({ email, password, remember }: FieldType) => {
		try {
			const data = await AuthService.login({ email, password });
			setTokenToLocalStorage(data.token);
			dispatch(login(data));
		} catch (e) {
			message.error('Ошибка авторизации');
		}
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
		<Flex vertical align="center">
			<Title level={3}>Вход в профиль</Title>
			<Form
				name={`authorization-${formPrefix}`}
				layout="vertical"
				size="large"
				onFinish={onFormFinish}
			>
				<EmailFormItem />
				<PasswordFormItem />
				<Form.Item<FieldType> name="remember" valuePropName="checked">
					<Checkbox>Не запоминать вход</Checkbox>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						size="large"
						style={{ width: '300px' }}
						htmlType="submit"
					>
						Войти
					</Button>
				</Form.Item>
			</Form>
			<Flex vertical gap={16} style={{ width: '100%' }} align="center">
				<Link>Не помню пароль</Link>
				<Button size="large" style={{ width: '300px' }} onClick={swapSignInToRegister}>
					Зарегистрироваться
				</Button>
				<Text type="secondary">Войти с помощью</Text>
				<Flex gap={16}>
					<Avatar src={vkLogo} size="large" />
					<Avatar src={yaLogo} size="large" />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default SignIn;
