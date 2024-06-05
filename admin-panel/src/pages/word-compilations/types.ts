export interface IRecordType {
	id: number;
	key: number;
	slug: string;
	title: string;
	titleInEnglish: string;
	description: string;
	image: string;
}

export interface IUpdateFieldType {
	newTitle: string;
	newTitleInEnglish: string;
	newDescription: string;
}
