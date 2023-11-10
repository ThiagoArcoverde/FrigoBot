import { Client, GatewayIntentBits } from 'discord.js'
import commandController from './controller/commandController'
require('dotenv').config()

class App{
    private client: any

    constructor(){
        this.client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
        this.client.login(process.env.TOKEN)

        new commandController().defineCommands(this)

        this.client.on('ready', () => {
            console.log("The bot is running.")
        })
    }
}

new App()