import { Text, Card, Flex, Button } from '@/src/shared/ui';
import Image from 'next/image';
import { API } from '@/src/shared/api/api';
import { IDemoWordCompilationsResponse } from '@/src/widgets/demo-word-compilations/types';

const getDemoWordCompilations = async (): Promise<IDemoWordCompilationsResponse[]> => {
	const res = await fetch(API.compilationsDemo.get, {
		cache: 'no-cache',
	});
	return res.json();
};

export default async function DemoWordCompilations() {
	const demoWordCompilations = await getDemoWordCompilations();

	return demoWordCompilations.map(({ id, compilation, group }) => {
		return (
			<Flex vertical key={id}>
				<h3 style={{ textAlign: 'center' }}>{group.title}</h3>
				<Flex vertical gap={16} align="center">
					<Card
						title={compilation.title}
						style={{
							width: 1000,
							margin: '0 auto',
							border: '1px solid black',
						}}
					>
						<Flex justify="space-between" gap={16} style={{ height: 150 }}>
							<div style={{ width: 600 }}>
								<h5>{compilation.titleInEnglish}</h5>
								<Text>{compilation.description}</Text>
							</div>
							<Flex gap={16} align="center">
								<Image
									src={`${process.env.NEXT_PUBLIC_STATIC}/${compilation.image}`}
									width={150}
									height={150}
									alt={compilation.title}
								></Image>
								{/*<Button style={{ backgroundColor: '#ffd100' }}>Приступить</Button>*/}
								<Button appearance="primary">Приступить</Button>
								{/*{compilation.slug} {compilation.id}*/}
							</Flex>
						</Flex>
					</Card>
					<Button appearance="yellow">Показать все</Button>
				</Flex>
			</Flex>
		);
	});
}
