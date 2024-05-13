import React from 'react';
import { Card, Col } from 'antd';
import { words } from '../../mocks/word';
import WordDemo from '../wordDemo';

interface IText {
	text: string;
	stage: number;
}
const Index = ({ text, stage }: IText) => {
	return (
		<Col span={4}>
			<Card title={text} style={{ minHeight: '100%' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						rowGap: '5px',
					}}
				>
					{words.map((word, i) => {
						return word.status === stage && <WordDemo key={word.id} word={word} />;
					})}
				</div>
			</Card>
		</Col>
	);
};

export default Index;
