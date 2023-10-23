module.exports = client => {
    console.log(`Sesion iniciada como ${client.user.tag}`.green);
    client.io.emit('connected:client', {user: client.user.tag})

    if(client?.application?.commands) {
        client.application.commands.set(client.slashArray);
        console.log(`(/) ${client.slashCommands.size} comandos publicados`.bgGreen);
    }
}