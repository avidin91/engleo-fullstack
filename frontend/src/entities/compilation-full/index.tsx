import React, { FC } from 'react';
import { Flex, Typography } from 'antd';
import CompilationMini from '@entities/compilation-mini';
import { wordsCompilations } from '@shared/constants/urls';

const { Title } = Typography;

type TCompilation = {
	id: number;
	title: string;
	description: string;
	group: number[];
	slug: string;
	titleInEnglish?: string;
	image?: string;
};

type TCompilationFull = {
	title: string;
	groupSlug: string;
	compilation: TCompilation[];
	h1?: boolean;
};

const CompilationFull: FC<TCompilationFull> = ({ title, groupSlug, compilation, h1 }) => {
	return (
		<>
			<Title level={h1 ? 1 : 3} style={{ textAlign: 'center', color: h1 ? '' : '#595959' }}>
				{title}
			</Title>
			<Flex vertical gap={32}>
				{compilation.map((compil) => {
					return (
						<>
							<CompilationMini
								groupSlug={groupSlug}
								parentLink={wordsCompilations}
								entity={compil}
								tag
							/>
						</>
					);
				})}
			</Flex>
		</>
	);
};

export default CompilationFull;
