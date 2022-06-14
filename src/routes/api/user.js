export async function post({ request }) {
	let body,
		status = 200,
		message = '';
	const data = await request.json();
	const { id_token } = data;
	const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`;

	try {
		const res = await fetch(url, {
			method: 'GET'
		})
			.then((res) => res.json())
			.then((data) => {
				return data;
			})
			.catch((error) => {
				return error;
			});

		if (res) {
			if (res.error) {
				body = res;
			}
			if (res.name) {
				body = {
					id: res.sub,
					name: res.name,
					email: res.email,
					picture: res.picture,
					exp: res.exp
				};
			}
		}
	} catch (err) {
		status = 400;
		message = err.message;
		body = message;
	}

	return { status, body };
}
