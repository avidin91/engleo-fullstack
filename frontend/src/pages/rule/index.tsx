import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, Flex } from 'antd';
import { minHeight } from '@shared/constants/constants';
import WordsForWorkCompilation from '@entities/words-for-work-compilation';
import WordsInWork from '@entities/words-in-work';

const Rule = () => {
	return (
		<>
			<Helmet>
				123
				{/*<title>{wordCompilation?.title}</title>*/}
			</Helmet>
			<Flex vertical align="center" justify="center" style={{ minHeight, padding: 32 }}>
				123
				{/*<Card*/}
				{/*    style={{*/}
				{/*        width: 1200,*/}
				{/*        minHeight: 600,*/}
				{/*    }}*/}
				{/*    title={compilation[0].compilationName}*/}
				{/*>*/}
				{/*    {!started && (*/}
				{/*        <WordsForWorkCompilation*/}
				{/*            compilation={compilation}*/}
				{/*            handleSetStarted={handleSetStarted}*/}
				{/*        />*/}
				{/*    )}*/}
				{/*    {started && <WordsInWork compilation={compilation} />}*/}
				{/*</Card>*/}
			</Flex>
		</>
	);
};

export default Rule;
