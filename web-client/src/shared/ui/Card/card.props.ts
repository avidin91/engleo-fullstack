import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface CardProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title?: string;
	children: ReactNode;
}
