const getDataFromSheet = async (email) => {
	const body = { email: email };
	const data = await fetch('/api/history', {
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

export default getDataFromSheet;
