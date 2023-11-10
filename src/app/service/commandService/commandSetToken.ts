import { command } from './command'

export default new class commandSetToken{
    commandInfo = {
        name: "set_token",
        description: "Comando para adicionar o seu Token do Redmine, necessário para apontamento de horas.",
        options: [{
            name: "token",
            description: "Token do Redmine",
            type: 3,
            required: true
        }]
    }
    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            // Evitar processamento desnecessário em caso da chamada não ser um comando
            if (!interaction.isChatInputCommand())
                return

            if (interaction.commandName.toLowerCase() === this.commandInfo.name.toLocaleLowerCase()) {
                if(interaction.options != undefined){
                    if(interaction.options._hoistedOptions != undefined){
                        const token = interaction.options._hoistedOptions.find((option: any) => option.name === 'token')
                        if(token != undefined){
                            console.log(token.value)
                            await interaction.reply('Token obtido!')
                        }
                    }
                }
            }
        })
    }
}