import React, { FC } from 'react';
import { Avatar, Button, Flex, Form, Input, message, Typography } from 'antd';
import vkLogo from '@shared/img/vk-logo.png';
import yaLogo from '@shared/img/ya-logo.png';
import Link from 'antd/es/typography/Link';
import { AuthService } from '@shared/services/auth.service';

const { Title, Text } = Typography;

type FieldType = {
	email: string;
	password: string;
	confirmPassword: string;
};

type TRegistration = {
	swapRegisterToSignIn: () => void;
	formPrefix: string;
};

const Registration: FC<TRegistration> = ({ swapRegisterToSignIn, formPrefix }) => {
	const onFormFinish = async ({ email, password }: FieldType) => {
		try {
			const data = await AuthService.registration({ email, password });
			if (data && data.message === 'ok') {
				message.success(data.message);
				swapRegisterToSignIn();
			}
		} catch (e) {
			message.error('Ошибка при регистрации');
		}
	};

	return (
		<Flex vertical align="center">
			<Title level={3}>Регистрация</Title>
			<Form
				name={`registration-${formPrefix}`}
				layout="vertical"
				size="large"
				onFinish={onFormFinish}
			>
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

				<Form.Item<FieldType>
					name="confirmPassword"
					dependencies={['password']}
					rules={[
						{
							required: true,
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue('password') === value) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Пароли не совпадают!'));
							},
						}),
					]}
				>
					<Input.Password placeholder="Подтвердите пароль" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						size="large"
						style={{ width: '300px' }}
						htmlType="submit"
					>
						Далее
					</Button>
				</Form.Item>
			</Form>
			<Flex vertical gap={16} style={{ width: '100%' }} align="center">
				<Text type="secondary">Зарегистрироваться с помощью</Text>
				<Flex gap={16}>
					<Avatar src={vkLogo} size="large" />
					<Avatar src={yaLogo} size="large" />
				</Flex>
				<Text>
					Уже есть аккаунт? <Link onClick={swapRegisterToSignIn}>Войдите</Link>
				</Text>
			</Flex>
		</Flex>
	);
};

export default Registration;
