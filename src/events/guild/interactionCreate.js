module.exports = async (client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const command = client.slashCommands.get(interaction?.commandName);

    if(command) {
        if(command.BOT_PERMISSIONS) {
           if(!interaction.guild.members.me.permissions.has(command.BOT_PERMISSIONS)) return interaction.reply({content: `❌ **Necesito los siguientes permisos para ejecutar este comando:**\n${command.BOT_PERMISSIONS.map(permission => `\`${permission}\``).join(", ")}`, ephemeral: true});

           if(!interaction.member.permissions.has(command.PERMISSIONS)) return interaction.reply({content: `❌ **Necesitas los siguientes permisos para ejecutar este comando:**\n${command.PERMISSIONS.map(permission => `\`${permission}\``).join(", ")}`, ephemeral: true});
        }

        try {
            command.execute(client, interaction, '/')
        } catch(e) {
            console.log(e);
            interaction.reply({content: "Ha ocurrido un error al ejecutar el comando", ephemeral: true});
            return;
        }
    }
}