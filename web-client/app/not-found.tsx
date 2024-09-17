import { Flex } from '@/src/shared/ui';
import Image from 'next/image';
import notFound from '@/public/404-not-found.jpeg';
import { minHeight } from '@/src/shared/constants/constants';

export default function NotFound() {
	return (
		<Flex justify="center" className="not-found" style={{ minHeight }}>
			<Image src={notFound} alt={'404 not found'} width={1235} height={753} />
		</Flex>
	);
}
