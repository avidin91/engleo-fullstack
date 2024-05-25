import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './app';
import NotFound from '@pages/not-found';
import WordGroups from '@pages/word-groups';
import User from '@pages/user';
import WordCompilations from '@pages/word-compilations';
import Words from '@pages/words';
import RulesGroups from '@pages/rules-groups';
import Rules from '@pages/rules';
import SignIn from '@pages/sign-in';
import { ErrorBoundary } from '@shared/routing';

const router = createBrowserRouter([
	{
		path: '/auth',
		element: <SignIn />,
		errorElement: <ErrorBoundary />,
	},
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: 'word-groups',
				element: <WordGroups />,
			},
			{
				path: 'users',
				element: <User />,
			},
			{
				path: 'word-compilations',
				element: <WordCompilations />,
			},
			{
				path: 'words',
				element: <Words />,
			},
			{
				path: 'rules-groups',
				element: <RulesGroups />,
			},
			{
				path: 'rules',
				element: <Rules />,
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
		<RouterProvider router={router} />
	</React.StrictMode>,
);
