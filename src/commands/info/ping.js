module.exports = {
    DESCRIPTION: "Testear Ping del bot",
    PERMISSIONS: [],
    async execute(client, message, args, prefix) {
        message.reply(`\`${client.ws.ping}ms\``)
    }
}