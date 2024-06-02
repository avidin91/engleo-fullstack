import slugify from 'slugify';

export const slugifyString = (text: string) => {
	return slugify(text);
};
