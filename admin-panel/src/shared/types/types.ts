export interface IUserData {
	email: string;
	password: string;
}

export interface IResponseUserData {
	email: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	__v?: number;
	_id?: string;
	message: string;
}
