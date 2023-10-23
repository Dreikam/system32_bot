const {Client, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus, Collection} = require('discord.js');
const BotUtils = require('./Utils');
const {io} = require('socket.io-client');

module.exports = class extends Client{
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.GuildMessageReactions, 
            GatewayIntentBits.GuildPresences, 
            GatewayIntentBits.GuildMembers, 
            GatewayIntentBits.MessageContent, 
            GatewayIntentBits.GuildVoiceStates,
            GatewayIntentBits.GuildEmojisAndStickers
        ],
        Partials: [
            Partials.Channel, 
            Partials.Message, 
            Partials.User, 
            Partials.Reaction, 
            Partials.GuildMember
        ],
        allowedMentions: {
            parse: ["roles", "users"],
            repliedUser: true
        },
        presence: {
            activities: [{name: process.env.STATUS, type:ActivityType[process.env.STATUS_TYPE]}],
            status: PresenceUpdateStatus.Online
        }
    }) {
        super({
            ...options
        });

        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];

        this.utils = new BotUtils(this);
        this.io = io("http://localhost:3000")
        this.start();
    }

    async start(){
        await this.loadHandlers();
        await this.loadEvents();
        await this.loadCommands();
        await this.loadSlashCommands();

        this.login(process.env.BOT_TOKEN);
    }

    async loadCommands(){
        console.log(`(${process.env.PREFIX}) Cargando comandos`.yellow);
        await this.commands.clear();

        const Route_Archives = await this.utils.loadFiles("/src/commands");

        if(Route_Archives.length) {
            Route_Archives.forEach((route_archive) => {
                try {
                    const command = require(route_archive);
                    const command_name = route_archive.split("\\").pop().split("/").pop().split(".")[0];
                    command.name = command_name;

                    if(command_name) this.commands.set(command_name, command);
                } catch (e) {
                    console.log(`ERROR AL CARGAR ARCHIVOS EN LA RUTA ${route_archive}`.bgRed);
                    console.log(e);
                }
            }) 
        }

        console.log(`(${process.env.PREFIX}) ${this.commands.size} comandos cargados`.green);
    }

    async loadSlashCommands(){
        console.log(`(/) Cargando comandos`.yellow);
        await this.slashCommands.clear();
        this.slashArray = [];

        const Route_Archives = await this.utils.loadFiles("/src/slashCommands");

        if(Route_Archives.length) {
            Route_Archives.forEach((route_archive) => {
                try {
                    const command = require(route_archive);
                    const command_name = route_archive.split("\\").pop().split("/").pop().split(".")[0];
                    command.CMD.name = command_name;

                    if(command_name) this.slashCommands.set(command_name, command);
                    this.slashArray.push(command.CMD.toJSON());
                } catch (e) {
                    console.log(`ERROR AL CARGAR ARCHIVOS EN LA RUTA ${route_archive}`.bgRed);
                    console.log(e);
                }
            }) 
        }

        console.log(`(/) ${this.slashCommands.size} comandos cargados`.green);

        if(this?.application?.commands) {
            this.application.commands.set(this.slashArray);
            console.log(`(/) ${this.slashCommands.size} comandos publicados`.bgGreen);
        }
    }

    async loadHandlers(){
        console.log(`(-) Cargando handlers`.yellow);

        const Route_Archives = await this.utils.loadFiles("/src/handlers");

        if(Route_Archives.length) {
            Route_Archives.forEach((route_archive) => {
                try {
                    require(route_archive)(this);
                } catch (e) {
                    console.log(`ERROR AL CARGAR ARCHIVOS EN LA RUTA ${route_archive}`.bgRed);
                    console.log(e);
                }
            }) 
        }

        console.log(`(-) ${Route_Archives.length} handlers cargados`.green);
    }

    async loadEvents(){
        console.log(`(+) Cargando eventos`.yellow);
        const Route_Archives = await this.utils.loadFiles("/src/events");
        this.removeAllListeners();

        if(Route_Archives.length) {
            Route_Archives.forEach((route_archive) => {
                try {
                    const event = require(route_archive);
                    const event_name = route_archive.split("\\").pop().split("/").pop().split(".")[0];
                    this.on(event_name, event.bind(null, this))
                } catch (e) {
                    console.log(`ERROR AL CARGAR ARCHIVOS EN LA RUTA ${route_archive}`.bgRed);
                    console.log(e);
                }
            }) 
        }

        console.log(`(+) ${Route_Archives.length} eventos cargados`.green);
    }
}