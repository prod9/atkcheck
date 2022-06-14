import { variables } from '../shared/variables';

const sendDiscordMessage = (user, imgUrl) => {
	const request = new XMLHttpRequest();
	request.open('POST', variables.discordWebhookUrl);

	request.setRequestHeader('Content-type', 'application/json');

	const params = {
		username: 'P9-Doctor',
		embeds: [
			{
				title: `${user} Send ATK`,
				color: 65535,
				image: {
					url: imgUrl
				}
			}
		]
	};

	request.send(JSON.stringify(params));
};
export default sendDiscordMessage;
