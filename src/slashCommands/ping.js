const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription('Sirve para ver el ping del bot'),
    async execute(client, interaction, prefix) {
        return interaction.reply({content: `\`${client.ws.ping}ms\``, ephemeral:true});
    }
}