import { useAppSelector } from '@shared/store/hooks';

export const useIsAuth = (): boolean => {
	return false
	// return useAppSelector((state) => state.userStore.isAuth);
};
