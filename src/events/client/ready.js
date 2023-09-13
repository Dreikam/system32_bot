module.exports = client => {
    console.log(`Sesion iniciada como ${client.user.tag}`.green);
    // client.pusherTrigger.trigger("my-channel", "my-event", {
    //     message: "hello world"
    //   });

    // var channel = client.pusherListen.subscribe('my-channel');
    // channel.bind('my-event', function(data) {
    //   console.log(data);
    // });

    if(client?.application?.commands) {
        client.application.commands.set(client.slashArray);
        console.log(`(/) ${client.slashCommands.size} comandos publicados`.bgGreen);
    }
}