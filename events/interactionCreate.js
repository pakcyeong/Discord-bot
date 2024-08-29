const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if(!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: '명령어 실행에서 문제가 발생했습니다. 잠시 후에 다시 사용해주세요', ephemeral: true });
			} else {
				await interaction.reply({ content: '명령어 실행에서 문제가 발생했습니다. 잠시 후에 다시 사용해주세요', ephemeral: true });
			}
		}
	},
};