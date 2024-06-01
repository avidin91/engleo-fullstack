import React from 'react';
import { Button, Flex, Form, FormProps, Input, message } from 'antd';
import { useAppDispatch } from '@shared/store/hooks';
import { AuthService } from '@shared/services/auth.service';
import { setTokenToLocalStorage } from '@shared/utils/localstorage.helper';
import { login } from '@shared/store/slices/auth.slice';
import { useNavigate } from 'react-router-dom';

type FieldType = {
	email: string;
	password: string;
};

const SignIn = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onFinish: FormProps<FieldType>['onFinish'] = async ({ email, password }) => {
		try {
			const data = await AuthService.login({ email, password });
			setTokenToLocalStorage(data.token);
			dispatch(login(data));
			navigate('/');
		} catch (e) {
			message.error('Ошибка авторизации');
		}
	};

	const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Flex style={{ minHeight: '100vh' }} justify="center" align="center">
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ width: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item<FieldType>
					label="Email"
					name="email"
					rules={[{ required: true, message: 'Введите почту', type: 'email' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<FieldType>
					label="Пароль"
					name="password"
					rules={[{ required: true, message: 'Введите пароль' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Войти
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	);
};

export default SignIn;
