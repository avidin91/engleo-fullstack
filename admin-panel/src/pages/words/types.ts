export interface IFieldType {
	word: string;
	translation: string;
	example: string;
	exampleTranslation: string;
	image: string;
}

export interface IUpdateFieldType {
	newWord: string;
	newTranslation: string;
	newExample: string;
	newExampleTranslation: string;
}

export interface IRecordType {
	id: number;
	key: number;
	word: string;
	translation: string;
	example: string;
	exampleTranslation: string;
	image: string;
}
