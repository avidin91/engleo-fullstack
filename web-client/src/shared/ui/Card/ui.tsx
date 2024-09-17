import { ReactElement } from 'react';
import { CardProps } from './card.props';
import styles from './card.module.css';
import cn from 'classnames';
import { Text, Flex } from '@/src/shared/ui';

export const Card = ({ title, children, className, ...props }: CardProps): ReactElement => {
	return (
		<div className={cn(styles.card, className)} {...props}>
			{title && (
				<Flex align="center" className={styles.cardTitle}>
					<Text strong>{title}</Text>
				</Flex>
			)}
			<div className={styles.cardBody}>{children}</div>
		</div>
	);
};
