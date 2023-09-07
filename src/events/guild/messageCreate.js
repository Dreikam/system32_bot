module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;

    if(!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const cmd = args?.shift()?.toLowerCase();

    const command = client.commands.get(cmd);

    if(command) {
        if(command.PERMISSIONS.length > 0) {
           if(!message.guild.members.me.permissions.has(command.PERMISSIONS)) return message.reply({content: `❌ **Necesito los siguientes permisos para ejecutar este comando:**\n${command.PERMISSIONS.map(permission => `\`${permission}\``).join(", ")}`, ephemeral: true});

           if(!message.member.permissions.has(command.PERMISSIONS)) return message.reply({content: `❌ **Necesitas los siguientes permisos para ejecutar este comando:**\n${command.PERMISSIONS.map(permission => `\`${permission}\``).join(", ")}`, ephemeral: true});
        }

        try {
            command.execute(client, message, args, process.env.PREFIX)
        } catch(e) {
            console.log(e);
            message.reply({content: "Ha ocurrido un error al ejecutar el comando", ephemeral: true});
            return;
        }
    }
}