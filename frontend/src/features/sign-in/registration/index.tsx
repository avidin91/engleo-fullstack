import React, { FC, useState } from 'react';
import { Avatar, Button, Checkbox, Flex, Form, Input, Modal, Typography } from 'antd';
import vkLogo from '@shared/img/vk-logo.png';
import yaLogo from '@shared/img/ya-logo.png';
import Link from 'antd/es/typography/Link';

const { Title, Text } = Typography;

type FieldType = {
	email: string;
	password: string;
	confirmPassword: string;
};

type TRegistration = {
	swapRegisterToSignIn: () => void;
};

const Registration: FC<TRegistration> = ({ swapRegisterToSignIn }) => {
	const [isModalOpen, setIsModalOpen] = useState(true);

	const handleOk = () => {
		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
			<Flex vertical align="center">
				<Title level={3}>Регистрация</Title>
				<Form name="registration" layout="vertical" size="large">
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
										console.log('value = ', value);
										return Promise.resolve();
									}
									return Promise.reject(new Error('Пароли не совпадают!'));
								},
							}),
						]}
					>
						<Input.Password placeholder="Подтвердите пароль" />
					</Form.Item>
				</Form>
				<Flex vertical gap={16} style={{ width: '100%' }} align="center">
					<Button type="primary" size="large" style={{ width: '300px' }}>
						Создать профиль
					</Button>

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
		</Modal>
	);
};

export default Registration;
