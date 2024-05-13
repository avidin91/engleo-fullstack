import React from 'react';
import { Card, Flex, Typography, Image } from 'antd';
import jungle from '@shared/img/about-background.jpeg';
import meAbout from '@shared/img/me-about.png';

const { Title, Text } = Typography;

const About = () => {
	return (
		<Flex
			vertical
			align="center"
			style={{
				backgroundImage: `url(${jungle})`,
				backgroundSize: 'cover',
				height: '100vh',
				backgroundPosition: 'center',
			}}
		>
			<Title>О нас</Title>
			<Card style={{ width: 1000 }}>
				<Flex vertical gap={32}>
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

					<Image src={meAbout} preview={false} width={400} />
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
