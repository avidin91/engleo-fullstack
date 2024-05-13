import React from 'react';
import { Avatar, Card, Typography } from 'antd';

const { Text } = Typography;

const WordDemo = ({ word }: any) => {
	return (
		<>
			<Card hoverable size="small">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Text>{word.word}</Text>
						<Text>{word.translate}</Text>
					</div>
					<Avatar shape="square" size={64} src={word.img}></Avatar>
				</div>
			</Card>
		</>
	);
};

export default WordDemo;
