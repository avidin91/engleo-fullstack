import React from 'react';
import { Flex, Typography } from 'antd';
import { WordCompilationsTable } from '@widgets/word-compilations-table';
import { CreateWordCompilation } from '@widgets/create-word-compilation';

const { Title } = Typography;

const WordCompilations = () => {
	return (
		<Flex vertical gap={32}>
			<Title style={{ alignSelf: 'center', marginTop: 0 }}>Подборки слов</Title>
			<CreateWordCompilation />
			<WordCompilationsTable />
		</Flex>
	);
};

export default WordCompilations;
