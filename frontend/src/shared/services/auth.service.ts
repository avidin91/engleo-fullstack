import { instance } from '@shared/api/axios-api';
import { IUser, IUserData } from '@shared/types';

export const AuthService = {
	async registration(userData: IUserData): Promise<{ message: string }> {
		const { data } = await instance.post<IUserData, { data: { message: string } }>(
			'user',
			userData,
		);
		return data;
	},
	async login(userData: IUserData): Promise<IUser> {
		const { data } = await instance.post<IUser>('auth/login', userData);
		return data;
	},
	async getProfile(): Promise<IUser | undefined> {
		const { data } = await instance.get<IUser>('auth/profile');
		if (data) return data;
	},
};
