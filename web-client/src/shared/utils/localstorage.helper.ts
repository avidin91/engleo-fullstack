export const getTokenFromLocalStorage = (): string => {
	const data = localStorage.getItem('token');
	return data ? JSON.parse(data) : '';
};

export const setTokenToLocalStorage = (token: string): void => {
	localStorage.setItem('token', JSON.stringify(token));
};

export const removeTokenFromLocalStorage = () => {
	localStorage.removeItem('token');
};
