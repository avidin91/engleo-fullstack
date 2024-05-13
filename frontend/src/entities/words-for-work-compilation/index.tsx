import React, { FC } from 'react';
import { Button, Flex, Image, Typography } from 'antd';
import { TWord } from '@shared/types';

const { Text } = Typography;

type TWordsInWork = {
	compilation: TWord[];
	handleSetStarted: () => void;
};

const WordsForWorkCompilation: FC<TWordsInWork> = ({ compilation, handleSetStarted }) => {
	return (
		<Flex align="center" vertical gap={32}>
			<Flex style={{ width: '848px' }} wrap="wrap" gap={16} justify="start">
				{compilation.map((word) => (
					<Flex
						style={{
							width: 200,
							height: 200,
							border: '1px solid #f0f0f0',
							borderRadius: 15,
							padding: 16,
							boxShadow: '0 5px 12px rgba(0, 0, 0, 0.07)',
						}}
						vertical
						align="center"
						gap={16}
					>
						<Image
							src={word.image}
							width={64}
							preview={false}
							style={{ borderRadius: 8 }}
						/>
						<Flex vertical align="center">
							<Text strong style={{ fontSize: 20 }}>
								{word.word}
							</Text>
							<Text type="secondary" style={{ fontSize: 16 }}>
								{word.translation}
							</Text>
						</Flex>
					</Flex>
				))}
			</Flex>
			<Button type="primary" size="large" onClick={handleSetStarted}>
				Приступить
			</Button>
		</Flex>
	);
};

export default WordsForWorkCompilation;
