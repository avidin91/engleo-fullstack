import React from 'react';
import { Button, Card, Flex, Form, FormProps, Input, Typography } from 'antd';
import { minHeight } from '@shared/constants/constants';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

type FieldType = {
	username: string;
	email: string;
	message: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
	console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
	console.log('Failed:', errorInfo);
};

const ContactUs = () => {
	return (
		<Flex
			vertical
			style={{
				width: 1200,
				margin: '0 auto',
				padding: '16px 0',
				minHeight,
			}}
		>
			<Card style={{ minHeight: `calc(${minHeight} - 32px)` }}>
				<Title>Контакты</Title>
				<Flex vertical gap={16}>
					<Text>
						Если у вас есть пожелания к проекту, вы нашли ошибку, или хотите просто
						связаться, заполните форму:
					</Text>
					<Form
						layout="vertical"
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						style={{ maxWidth: 600 }}
						wrapperCol={{ span: 16 }}
					>
						<Form.Item<FieldType>
							label="Ваше имя:"
							name="username"
							rules={[{ required: true, message: 'Пожалуйста введите ваше имя!' }]}
						>
							<Input />
						</Form.Item>
						<Form.Item<FieldType>
							label="Ваш E-Mail:"
							name="email"
							rules={[
								{
									required: true,
									message: 'Пожалуйста введите ваш email!',
									type: 'email',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item<FieldType>
							label="Ваше сообщение:"
							name="message"
							rules={[{ required: true, message: 'Пожалуйста введите сообщение!' }]}
						>
							<TextArea autoSize={{ minRows: 5 }} />
						</Form.Item>
						<Button htmlType="submit" type="primary" size="large">
							Отправить
						</Button>
					</Form>
				</Flex>
			</Card>
		</Flex>
	);
};

export default ContactUs;
