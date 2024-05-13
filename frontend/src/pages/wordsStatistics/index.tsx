import React from 'react';
import { Flex, Row, Typography } from 'antd';
import Column from '@entities/column';
import { Helmet } from 'react-helmet';

const { Title } = Typography;

const stage = [
	'Взяты в работу',
	'Первое повторение',
	'Второе повторение',
	'Третье повторение',
	'Четвертое повторение',
	'Выучено',
];

const WordStatistics = () => {
	return (
		<>
			<Helmet>
				<title>Статистика по словам</title>
			</Helmet>
			<Flex vertical gap={16}>
				<div style={{ backgroundColor: 'white' }} className="title">
					<Title>Статистика по словам</Title>
				</div>

				<div style={{ padding: '0 16px' }}>
					<Row gutter={16}>
						{stage.map((text, index) => (
							<Column text={text} stage={index} />
						))}
					</Row>
				</div>
			</Flex>
		</>
	);
};

export default WordStatistics;
