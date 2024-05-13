import React, { FC, Fragment } from 'react';
import { Card, Typography } from 'antd';
import CompilationMini from '@entities/compilation-mini';
import { wordsCompilations } from '@shared/constants/urls';
import { wordCompilations } from '../../mocks/wordCompilations';
import { newRules } from '../../mocks/newRules';

const { Title } = Typography;

type TGroups = {
	title: string;
	slug: string;
	group: number;
};

type TCompilationsMiniWidget = {
	groups: TGroups[];
	parentLink: any;
	title: string;
};

const CompilationsMiniWidget: FC<TCompilationsMiniWidget> = ({ groups, parentLink, title }) => {
	const entity = parentLink === wordsCompilations ? wordCompilations : newRules;

	return (
		<Card style={{ width: 584 }} title={title}>
			{groups.slice(1, 5).map(({ title, group, slug }) => {
				const newEntity = entity.filter((c) => c.group.includes(group));
				return (
					<Fragment key={slug}>
						<Title level={3} style={{ textAlign: 'center' }}>
							{title}
						</Title>
						<CompilationMini
							tag={parentLink === wordsCompilations}
							small
							groupSlug={slug}
							entity={newEntity[0]}
							parentLink={parentLink}
						/>
					</Fragment>
				);
			})}
		</Card>
	);
};

export default CompilationsMiniWidget;
