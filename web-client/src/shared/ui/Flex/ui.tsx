import { ReactElement } from 'react';
import { FlexProps } from './flex.props';
import styles from './flex.module.css';
import cn from 'classnames';

export const Flex = ({
	children,
	vertical = false,
	wrap,
	gap,
	justify,
	align,
	className,
	...props
}: FlexProps): ReactElement => {
	return (
		<div
			className={cn(styles.flex, className, {
				[styles.vertical]: vertical === true,
				[styles.wrap]: wrap === 'wrap',
				[styles.wrapReverse]: wrap === 'wrap-reverse',
				[styles.gap8]: gap === 8,
				[styles.gap16]: gap === 16,
				[styles.gap24]: gap === 24,
				[styles.gap32]: gap === 32,
				[styles.justifyStart]: justify === 'start',
				[styles.justifyCenter]: justify === 'center',
				[styles.justifySpaceAround]: justify === 'space-around',
				[styles.justifySpaceBetween]: justify === 'space-between',
				[styles.justifySpaceEvenly]: justify === 'space-evenly',
				[styles.alignStretch]: align === 'stretch',
				[styles.alignCenter]: align === 'center',
				[styles.alignStart]: align === 'start',
				[styles.alignEnd]: align === 'end',
			})}
			{...props}
		>
			{children}
		</div>
	);
};
