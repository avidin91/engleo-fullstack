import React, { FC, useState } from 'react';
import { Button, Flex, Image, message, Progress, theme, Typography } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';
import useVoice from '../../shared/hooks/useVoice';
import { TWord } from '@shared/types';

const { Text } = Typography;

type TWordsInWorkContent = {
	word: TWord;
};

const WordsInWorkContent: FC<TWordsInWorkContent> = ({ word }) => {
	const speakText = useVoice();
	const { token } = theme.useToken();

	return (
		<Flex
			vertical
			align="center"
			style={{
				border: '2px solid #f1f1f1',
				borderRadius: token.borderRadiusLG,
				height: 600,
				padding: 10,
			}}
			gap={20}
		>
			<Flex vertical align="center">
				<Text strong style={{ fontSize: 30 }}>
					{word.word}
				</Text>
				<Text type="secondary" style={{ fontSize: 20 }}>
					{word.translation}
				</Text>
			</Flex>

			<Flex
				vertical
				align="center"
				style={{
					backgroundColor: '#f1f1f1',
					padding: '5px 10px',
					borderRadius: 10,
					width: 300,
				}}
			>
				<Text style={{ fontSize: 20 }}>{word.example}</Text>
				<Text>{word.exampleTranslation}</Text>
			</Flex>

			<PlayCircleTwoTone
				twoToneColor="#52c41a"
				style={{ fontSize: 40 }}
				onClick={() => speakText(word.word)}
			/>

			<Image src={word.image} width={240} preview={false} style={{ borderRadius: 15 }} />
		</Flex>
	);
};

type TWordsInWork = {
	compilation: TWord[];
};

const WordsInWork = ({ compilation }: TWordsInWork) => {
	const { token } = theme.useToken();
	const [current, setCurrent] = useState(0);
	const [progress, setProgress] = useState<number>(0);

	const contentStyle: React.CSSProperties = {
		backgroundColor: token.colorFillAlter,
		borderRadius: token.borderRadiusLG,
		marginTop: 16,
		width: 848,
	};

	const steps = compilation.map((word) => ({ content: <WordsInWorkContent word={word} /> }));

	const next = () => {
		setCurrent((prevCurrent) => {
			const nextCurrent = prevCurrent + 1;
			setProgress(Math.ceil((nextCurrent / compilation.length) * 100));
			return nextCurrent;
		});
	};

	const prev = () => {
		setCurrent((prevCurrent) => {
			const nextCurrent = prevCurrent - 1;
			setProgress(Math.ceil((nextCurrent / compilation.length) * 100));
			return nextCurrent;
		});
	};

	const finaly = () => {
		setProgress(100);
		message.success('Пройдено!');
	};

	return (
		<Flex align="center" justify="center">
			<Flex vertical>
				<Progress percent={progress} />
				<div style={contentStyle}>{steps[current].content}</div>
				<div style={{ marginTop: 24 }}>
					{current < steps.length - 1 && (
						<Button type="primary" onClick={() => next()}>
							Следующее
						</Button>
					)}
					{current === steps.length - 1 && (
						<Button type="primary" onClick={finaly}>
							Закончить
						</Button>
					)}
					{current > 0 && (
						<Button style={{ margin: '0 8px' }} onClick={() => prev()}>
							Предыдущее
						</Button>
					)}
				</div>
			</Flex>
		</Flex>
	);
};

export default WordsInWork;
