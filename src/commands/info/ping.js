module.exports = {
    DESCRIPTION: "Testear Ping del bot",
    PERMISSIONS: [],
    async execute(client, message, args, prefix) {
        client.io.emit('test', {msg: "ok!"})
        message.reply(`\`${client.ws.ping}ms\``)
    }
}