const path = require('node:path');

const { Events } = require('discord.js');

const modulePath = path.join(__dirname, '/../modules');
const YoutubeToPipedConverter = require(modulePath + "/YoutubeToPipedConverter");

module.exports = {
	name: Events.MessageCreate,
	once: false,
	execute(message) {
		if (!message.author.bot) {
			let ytpConverter = new YoutubeToPipedConverter();

			ytpConverter.handle(message);
		}
	},
};
