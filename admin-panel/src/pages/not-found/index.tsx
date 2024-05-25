import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';

const { Title } = Typography;

const NotFound = () => {
	return (
		<Flex style={{ height: '100vh' }} align="center" vertical>
			<Title>Страница не найдена</Title>
			<Link to="/">
				<Button type="primary">Вернуться на главную</Button>
			</Link>
		</Flex>
	);
};

export default NotFound;
