import { variables } from '../shared/variables';

const getGoogleOAuthUserURL = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

	const options = {
		redirect_uri: variables.googleOauthRedirectURL,
		client_id: variables.googleClientId,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		].join(' ')
	};

	const params = new URLSearchParams(options);

	return `${rootUrl}?${params.toString()}`;
};

export default getGoogleOAuthUserURL;
