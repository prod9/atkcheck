import { variables } from '$lib/shared/variables';
import dayjs from 'dayjs';

export async function post({ request }) {
	let body,
		status = 200,
		message = '';
	const data = await request.json();
	const { email } = data;
	const today = dayjs().format('DD/MM/YYYY');

	const googleSheetId = variables.googleSheetId;
	const base = `https://docs.google.com/spreadsheets/d/${googleSheetId}/gviz/tq?`;
	const sheetName = 'responses';
	const query = encodeURIComponent(`Select A,B WHERE B="${email}"`);
	const url = `${base}&sheet=${sheetName}&tq=${query}`;

	const googleData = [];
	const colz = [];

	try {
		const res = await fetch(url)
			.then((res) => {
				return res.text();
			})
			.catch((err) => {
				return err;
			});

		const jsData = JSON.parse(res.substring(47).slice(0, -2));
		jsData.table.cols.forEach((heading) => {
			if (heading.label) {
				colz.push(heading.label);
			}
		});
		jsData.table.rows.forEach((main) => {
			const row = {};
			colz.forEach((ele, index) => {
				row[ele] =
					main.c[index] != null ? (main.c[index].f ? main.c[index].f : main.c[index].v) : '';
			});
			googleData.push(row);
		});

		const todayHistory = googleData.filter((obj) => obj.Timestamp.includes(today));

		body = todayHistory;
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
