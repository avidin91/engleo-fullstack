import { useAppSelector } from '@shared/store/hooks';

export const useIsAuth = (): boolean => {
	return useAppSelector((state) => state.authStore.isAuth);
};
