import React from 'react';
import { Flex, Typography } from 'antd';
import { CreateWordWidget } from '@widgets/create-word';
import { WordsTableWidget } from '@widgets/words-table';

const { Title } = Typography;

const Words = () => {
	return (
		<Flex vertical gap={32}>
			<Title style={{ alignSelf: 'center', marginTop: 0 }}>Слова</Title>
			<CreateWordWidget />
			<WordsTableWidget />
		</Flex>
	);
};

export default Words;
