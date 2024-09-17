import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import { ReactElement } from 'react';

export const Button = ({
	appearance,
	size = 'm',
	children,
	className,
	...props
}: ButtonProps): ReactElement => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost',
				[styles.yellow]: appearance == 'yellow',
				[styles.sizeS]: size == 's',
				[styles.sizeM]: size == 'm',
				[styles.sizeL]: size == 'l',
			})}
			{...props}
		>
			{children}
		</button>
	);
};
