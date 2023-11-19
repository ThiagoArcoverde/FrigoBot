import { REST, Routes } from 'discord.js'
import commandIsAlive from '../service/commandService/commandIsAlive'
import commandSetRedmineKey from '../service/commandService/commandSetRedmineKey'
import commandRegister from '../service/commandService/commandRegister'
import commandGetTicket from '../service/commandService/commandGetTicket'
import commandSetTimeTicket from '../service/commandService/commandSetTimeTicket'

export default class AppCommandsController {
    private TOKEN: string
    private APP_ID: string

    public constructor() {
        if (process.env.TOKEN)
            this.TOKEN = process.env.TOKEN
        else
            throw new Error("TOKEN enviroment variable is not set.")
        if (process.env.APP_ID)
            this.APP_ID = process.env.APP_ID
        else
            throw new Error("APP_ID enviroment variable is not set.")
    }

    public async defineCommands(app: any) {
        const commands: any = []

        commandIsAlive.invokeCommand(app)
        commands.push(commandIsAlive.commandInfo)

        commandSetRedmineKey.invokeCommand(app)
        commands.push(commandSetRedmineKey.commandInfo)

        commandRegister.invokeCommand(app)
        commands.push(commandRegister.commandInfo)

        commandGetTicket.invokeCommand(app)
        commands.push(commandGetTicket.commandInfo)

        commandSetTimeTicket.invokeCommand(app)
        commands.push(commandSetTimeTicket.commandInfo)

        this.loadCommands(commands)
    }

    private async loadCommands(commands: any) {
        const rest = new REST({ version: '10' }).setToken(this.TOKEN);

        try {
            console.log('Started refreshing application (/) commands.');

            await rest.put(Routes.applicationCommands(this.APP_ID), { body: commands });

            console.log('Successfully reloaded application (/) commands.');
        } catch (error: any) {
            console.error(error)
        }
    }
}