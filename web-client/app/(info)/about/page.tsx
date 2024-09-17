import { Metadata } from 'next';
import aboutBackground from '@/public/about-background.jpeg';
import meAbout from '@/public/me-about.png';
import { Text, Flex, Card } from '@/src/shared/ui';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'About',
};

const About = () => {
	return (
		<Flex
			vertical
			align="center"
			style={{
				backgroundImage: `url(${aboutBackground})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				paddingBottom: 20,
			}}
		>
			<h1>О нас</h1>
			<Card style={{ width: 1000 }}>
				<Flex vertical gap={16}>
					<Text>Меня зовут Видин Александр. </Text>
					<Text>
						Данный сайт я разработал вместе со своей девушкой для того, чтобы мы могли
						выучить английский. Я хотел найти эффективный способ учить наизусть, ведь
						материала становилось всё больше, и я просто путался, что сегодня повторять,
						а что завтра. Старый материал порой уходил из памяти.
					</Text>
					<Text>
						И так я понял, что надо всё как-то систематизировать, в результате чего
						разработал систему контроля, помогающего изучению материала, которая, по
						моему мнению, оказалась достаточно эффективной.
					</Text>
					<Image src={meAbout} width={400} height={400} alt="me" />
					<Text>
						Когда мы отправили сайт друзьям, они тоже заметили, что учить стало легче, и
						меньше сил уходит на отслеживание того, что и когда надо учить. Так мы
						поняли, что хотим поделиться этим и с вами.
					</Text>
				</Flex>
			</Card>
		</Flex>
	);
};

export default About;
