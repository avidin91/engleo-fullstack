import { IWord, IWordCompilation } from '@/src/widgets/demo-word-compilations/types';
import { API } from '@/src/shared/api/api';
import { Metadata } from 'next';
import { Button, Card, Flex, Text } from '@/src/shared/ui';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface WordsCompilationResponse {
	compilation: IWordCompilation;
	words: IWord[];
}

interface WordCompilationsProps {
	params: { alias: string };
}

const getWordsByCompilationSlug = async (
	slug: string,
): Promise<WordsCompilationResponse | null> => {
	const res = await fetch(`${API.wordsCompilation.get}/${slug}`, {
		cache: 'no-cache',
	});

	if (!res.ok) {
		return null;
	}

	return res.json();
};

export async function generateMetadata({ params }: WordCompilationsProps): Promise<Metadata> {
	const alias = params.alias;
	const data = await getWordsByCompilationSlug(alias);

	return {
		title: data && `Подборка слов «${data.compilation.title}»`,
	};
}

export default async function WordCompilations({ params }: WordCompilationsProps) {
	const { alias } = params;
	const data = await getWordsByCompilationSlug(alias);
	if (!data) {
		notFound();
	}

	const { compilation, words } = data;

	return (
		<Flex vertical style={{ padding: 32 }}>
			<h1 style={{ textAlign: 'center' }}>Подборка слов: {compilation.title}</h1>
			<Card
				style={{
					width: 1178,
					minHeight: 600,
				}}
				title={compilation.title}
			>
				<Flex vertical gap={32} align="center">
					<Flex wrap="wrap" gap={32}>
						{words.map((word) => {
							return (
								<Flex
									style={{
										width: 200,
										height: 200,
										border: '1px solid #f0f0f0',
										borderRadius: 15,
										padding: 16,
										boxShadow: '0 5px 12px rgba(0, 0, 0, 0.07)',
									}}
									key={word.id}
									vertical
									align="center"
								>
									<Image
										src={`${process.env.NEXT_PUBLIC_STATIC}/${word.image}`}
										width={64}
										height={64}
										alt={word.translation}
										style={{ borderRadius: 8 }}
									/>
									<Flex vertical align="center">
										<Text strong style={{ fontSize: 20 }}>
											{word.word}
										</Text>
										<Text style={{ fontSize: 16, margin: 0 }}>
											{word.translation}
										</Text>
									</Flex>
								</Flex>
							);
						})}
					</Flex>
					<Button appearance="primary" size="l" style={{ width: 'fit-content' }}>
						Приступить
					</Button>
				</Flex>
			</Card>
		</Flex>
	);
}
