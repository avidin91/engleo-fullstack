import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import NotFound from '@pages/not-found';
import Info from '@pages/info';
import About from '@pages/about';
import ContactUs from '@pages/contact-us';
import { about, contactUs, rulesCompilations, wordsCompilations } from '@shared/constants/urls';
import Words from '@pages/words';
import Rule from '@pages/rule';
import CompilationsPage from '@pages/compilations-page';
import { Provider } from 'react-redux';
import { store } from '@shared/store';
import { ErrorBoundary } from '@shared/routing';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: '/',
				element: <Info />,
			},
			{
				path: `/:compilations/:groupTitle?`,
				element: <CompilationsPage />,
			},
			{
				path: `${wordsCompilations}/:groupTitle/:compilationTitle/`,
				element: <Words />,
			},
			{
				path: `${rulesCompilations}/:groupTitle/:compilationTitle/`,
				element: <Rule />,
			},
			{
				path: about,
				element: <About />,
			},
			{
				path: contactUs,
				element: <ContactUs />,
			},
			{
				path: '*',
				element: <NotFound />,
			},
		],
	},
	{
		path: '*',
		element: <NotFound />,
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
