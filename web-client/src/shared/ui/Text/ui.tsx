import { ReactElement } from 'react';
import { TextProps } from './text.props';
import styles from './text.module.css';
import cn from 'classnames';

export const Text = ({
	size = 'm',
	strong = false,
	extraStrong = false,
	children,
	className,
	...props
}: TextProps): ReactElement => {
	return (
		<p
			className={cn(styles.text, className, {
				[styles.s]: size === 's',
				[styles.m]: size === 'm',
				[styles.l]: size === 'l',
				[styles.strong]: strong === true,
				[styles.extraStrong]: extraStrong === true,
			})}
			{...props}
		>
			{children}
		</p>
	);
};
