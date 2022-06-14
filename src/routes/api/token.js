import { variables } from '$lib/shared/variables';

export async function post({ request }) {
	let body,
		status = 200,
		message = '';
	const url = 'https://oauth2.googleapis.com/token';
	const data = await request.json();
	const { code } = data;

	const values = {
		code,
		client_id: variables.googleClientId,
		client_secret: variables.googleClientSecret,
		redirect_uri: variables.googleOauthRedirectURL,
		grant_type: 'authorization_code'
	};

	const params = new URLSearchParams(values);

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: params.toString()
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((error) => {
				return error;
			});

		if (res.error) {
			status = 400;
			body = res;
		}

		if (res.id_token) {
			body = res;
		}
	} catch (err) {
		status = 400;
		message = err.message;
		body = message;
	}

	return {
		status,
		body
	};
}
