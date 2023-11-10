import { command } from './command'

export default new class commandIsAlive implements command {
    commandInfo = {
        name: "isalive",
        description: "Basic command to check if the bot is alive."
    }
    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            // Evitar processamento desnecessário em caso da chamada não ser um comando
            if (!interaction.isChatInputCommand())
                return

            if (interaction.commandName.toLowerCase() === 'isalive') {
                await interaction.reply('Hello world!')
            }
        })
    }
}