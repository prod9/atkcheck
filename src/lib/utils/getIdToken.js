const getIdToken = async (code) => {
	const body = { code: code };
	const data = await fetch('/api/token', {
		method: 'POST',
		body: JSON.stringify(body)
	})
		.then((res) => res.json())
		.then((resJson) => {
			return resJson;
		})
		.catch((err) => {
			throw Error('getIdToken Error', err);
		});
	return data;
};

export default getIdToken;
