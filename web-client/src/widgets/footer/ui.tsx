import { Button } from '@/src/shared/ui';
import TelegramLogoSvg from '@/src/shared/svg/TelegramLogoSvg';
import styles from './styles.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footerComponent}>
			<div className={styles.footerComponentInnerWrapper}>
				<div className={styles.footerComponentContactBlock}>
					<Button appearance="ghost" size="s" className={styles.footerComponentButton}>
						Свяжитесь с нами
					</Button>
					<Button appearance="ghost" size="s" className={styles.footerComponentButton}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<TelegramLogoSvg />
						</div>
						<a href="https://t.me/+9FFmEEcgg6oyN2Qy" target="_blank">
							Telegram
						</a>
					</Button>
				</div>
				<p className={styles.footerComponentText}>
					Сайт, посвященный изучению Английского языка.
				</p>
			</div>
		</footer>
	);
};
