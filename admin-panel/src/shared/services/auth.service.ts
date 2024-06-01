import { instance } from '@shared/api/axios-api';

export interface IUser {
	id: number;
	email: string;
	token: string;
}

export interface IUserData {
	email: string;
	password: string;
}

export const AuthService = {
	async login(userData: IUserData): Promise<IUser> {
		const { data } = await instance.post<IUser>('auth/login', userData);
		return data;
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile');
		if (data) return data;
	},
};
