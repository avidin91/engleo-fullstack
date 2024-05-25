import { IUserData } from '@shared/types/types';
import { instance } from '@shared/api/axios-api';

export const AuthService = {
	async registration(userData: IUserData): Promise<{ message: string }> {
		const { data } = await instance.post<IUserData, { data: { message: string } }>(
			'user',
			userData,
		);
		return data;
	},
	async login() {},
	async getMe() {},
};
