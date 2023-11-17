import { REST, Routes } from 'discord.js'
import commandIsAlive from '../service/commandService/commandIsAlive'
import commandSetToken from '../service/commandService/commandSetToken'
import commandRegister from '../service/commandService/commandRegister'

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

        commandSetToken.invokeCommand(app)
        commands.push(commandSetToken.commandInfo)

        commandRegister.invokeCommand(app)
        commands.push(commandRegister.commandInfo)

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