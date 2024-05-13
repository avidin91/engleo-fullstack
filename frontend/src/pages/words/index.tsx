import React, { useState } from 'react';
import { Card, Flex } from 'antd';
import { minHeight } from '@shared/constants/constants';
import { Helmet } from 'react-helmet';
import WordsForWorkCompilation from '@entities/words-for-work-compilation';
import WordsInWork from '@entities/words-in-work';
import { useParams } from 'react-router-dom';
import { wordCompilations } from '../../mocks/wordCompilations';
import { itWordsCompilation } from '../../mocks/itWordsCompilation';

const Words = () => {
	const [started, setStarted] = useState<boolean>(false);
	const handleSetStarted = () => {
		setStarted(true);
	};

	const { compilationTitle } = useParams<{ compilationTitle: string }>();
	const wordCompilation = wordCompilations.find(
		(wordCompilation) => wordCompilation.slug === compilationTitle,
	);

	const getWordsByGroup = (id: number) => {
		id = 1;
		return itWordsCompilation.filter((word) => word.wordCompilationsIds.includes(id));
	};
	const compilation = getWordsByGroup(wordCompilation!.id);

	return (
		<>
			<Helmet>
				<title>{wordCompilation?.title}</title>
			</Helmet>
			<Flex vertical align="center" justify="center" style={{ minHeight, padding: 32 }}>
				<Card
					style={{
						width: 1200,
						minHeight: 600,
					}}
					title={compilation[0].compilationName}
				>
					{!started && (
						<WordsForWorkCompilation
							compilation={compilation}
							handleSetStarted={handleSetStarted}
						/>
					)}
					{started && <WordsInWork compilation={compilation} />}
				</Card>
			</Flex>
		</>
	);
};

export default Words;
