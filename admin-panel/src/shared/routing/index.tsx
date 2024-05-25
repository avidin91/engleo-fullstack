import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorBoundary = () => {
	const error = useRouteError();
	return isRouteErrorResponse(error) ? (
		<h2>
			{error.status} {error.statusText}
		</h2>
	) : (
		<h2>{(error as Error)?.message}</h2>
	);
};
