import React from 'react';
import { Button, ConfigProvider, Flex, Image, Layout, Typography } from 'antd';
import './styles.css';
import Icon from '@ant-design/icons';
import TelegramLogoSvg from '@shared/svg/TelegramLogoSvg';
import { Link } from 'react-router-dom';

const { Footer } = Layout;
const { Text } = Typography;

const TelegramLogoSvgIcon = (props: any) => <Icon component={TelegramLogoSvg} {...props} />;

const FooterComponent = () => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Layout: {
						footerBg: '#292929',
						footerPadding: '24px 100px',
					},
				},
				token: {
					colorText: 'white',
				},
			}}
		>
			<Footer>
				<Flex vertical align="start" gap={8}>
					<Flex gap={32}>
						<Link to={'contact-us'}>
							<Button type="link" className="footer-component-button">
								Свяжитесь с нами
							</Button>
						</Link>
						<Button
							type="link"
							className="footer-component-button"
							href="https://t.me/+9FFmEEcgg6oyN2Qy"
							target="_blank"
							icon={<TelegramLogoSvgIcon />}
						>
							Telegram
						</Button>
					</Flex>
					<Text className="footer-component-text">
						Сайт, посвященный изучению Английского языка.
					</Text>
				</Flex>
			</Footer>
		</ConfigProvider>
	);
};

export default FooterComponent;
