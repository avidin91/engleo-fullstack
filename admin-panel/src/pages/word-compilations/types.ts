export interface IRecordType {
	id: number;
	key: number;
	slug: string;
	title: string;
	titleInEnglish: string;
	description: string;
	image: string;
	groups: [number[]] | [];
}

export interface IUpdateFieldType {
	newTitle: string;
	newTitleInEnglish: string;
	newDescription: string;
}
