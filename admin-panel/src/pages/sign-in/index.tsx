import React, { useState } from 'react';
import { Button, Flex, Form, FormProps, Input } from 'antd';

type FieldType = {
	email: string;
	password: string;
};

const SignIn = () => {
	const [isAuthorized, setIsAuthorized] = useState(false);

	const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
		console.log('Success:', values);
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
