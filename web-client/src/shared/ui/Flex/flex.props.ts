import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface FlexProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	vertical?: boolean;
	wrap?: 'wrap' | 'wrap-reverse';
	gap?: 8 | 16 | 24 | 32;
	justify?: 'start' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
	align?: 'stretch' | 'center' | 'start' | 'end';
	children: ReactNode;
}
