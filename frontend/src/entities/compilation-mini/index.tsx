import React, { FC } from 'react';
import { Avatar, Button, Card, Flex, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CompilationsTags } from '@shared/constants/compilations-tags';

const { Text } = Typography;

type TEntity = {
	title: string;
	slug: string;
	description: string;

	id?: number;
	titleInEnglish?: string;
	image?: string;
	group: number[];
};

type TCompilationMini = {
	groupSlug: string;
	parentLink: string;
	entity: TEntity;
	small?: boolean;
	tag?: boolean;
};

const CompilationMini: FC<TCompilationMini> = ({ small, entity, groupSlug, parentLink, tag }) => {
	const linkToGroup = `/${parentLink}/${groupSlug}`;
	const linkToEntity = `/${parentLink}/${groupSlug}/${entity.slug}`;

	// console.log('linkToEntity = ', linkToEntity);

	return (
		<>
			<Flex vertical gap={16} align="center">
				<Card
					size="small"
					style={{
						height: 190,
						border: small ? '1px solid' : '',
						width: small ? 520 : 800,
					}}
					title={entity.title}
				>
					<Flex gap={entity.image ? 8 : 16} style={{ height: 130 }} flex="1 1 auto">
						<Flex vertical gap="8px" justify="space-between" flex="1 1 auto">
							<Flex vertical gap="8px">
								{entity.titleInEnglish && <Text>{entity.titleInEnglish}</Text>}
								<Text>{entity.description}</Text>
							</Flex>
							{tag && (
								<div>
									{entity.group.map((group: any, i: any) => (
										<Tag color="green" key={i}>
											{CompilationsTags[group]}
										</Tag>
									))}
								</div>
							)}
						</Flex>
						<Flex gap={8} align="center">
							{entity.image && <Avatar shape="square" size={94} src={entity.image} />}
							<Link to={linkToEntity} replace={true}>
								<Button type="primary">Приступить</Button>
							</Link>
						</Flex>
					</Flex>
				</Card>
				{small && entity.slug && (
					<Link to={linkToGroup}>
						<Button style={{ backgroundColor: '#ffd100' }} type="text">
							Показать все
						</Button>
					</Link>
				)}
			</Flex>
		</>
	);
};

export default CompilationMini;
