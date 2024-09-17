// import { getTokenFromLocalStorage } from '@/src/shared/utils/localstorage.helper';

// export const instance = axios.create({
// 	baseURL: process.env.NEXT_PUBLIC_DOMAIN,
// });

// export const instanceWithHeaders = axios.create({
// 	baseURL: process.env.NEXT_PUBLIC_DOMAIN,
// 	headers: {
// 		Authorization: 'Bearer ' + getTokenFromLocalStorage(),
// 	},
// });

export const API = {
	groups: {
		get: `${process.env.NEXT_PUBLIC_DOMAIN}/groups`,
	},
	groupsCompilationsAssociations: {
		get: `${process.env.NEXT_PUBLIC_DOMAIN}/compilations/groups`,
	},
	compilations: {
		get: `${process.env.NEXT_PUBLIC_DOMAIN}/compilations`,
	},
	compilationsDemo: {
		get: `${process.env.NEXT_PUBLIC_DOMAIN}/compilations/demo/`,
	},
	wordsCompilation: {
		get: `${process.env.NEXT_PUBLIC_DOMAIN}/words/compilations`,
	},
};
