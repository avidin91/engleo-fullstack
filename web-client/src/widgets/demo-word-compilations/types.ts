export interface IGroupOfWordCompilations {
	id: number;
	title: string;
	slug: string;
}

export interface IWordCompilation {
	id: number;
	title: string;
	titleInEnglish: string;
	description: string;
	image: string;
	slug: string;
}

export interface IDemoWordCompilationsResponse {
	id: number;
	compilation: IWordCompilation;
	group: IGroupOfWordCompilations;
}

export interface IWord {
	id: number;
	word: string;
	translation: string;
	example: string;
	exampleTranslation: string;
	image: string;
}
