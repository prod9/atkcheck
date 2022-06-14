const getGoogleUser = async (token) => {
	const body = { id_token: token };
	const data = await fetch('/api/user', {
		method: 'POST',
		body: JSON.stringify(body)
	})
		.then((res) => res.json())
		.then((resJson) => {
			return resJson;
		})
		.catch((err) => {
			return err;
		});
	return data;
};

export default getGoogleUser;
