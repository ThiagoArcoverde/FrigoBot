import UserDB from '../../database/userDB'
import { command } from './command'

export default new class commandSetRedmineKey implements command {
    commandInfo = {
        name: "set_chave_redmine",
        description: "Comando para adicionar a sua chave da API do Redmine, necessário para operações.",
        options: [
            {
                name: "chave_redmine",
                description: "chave da API do Redmine",
                type: 3,
                required: true
            }
        ]
    }

    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            // Evitar processamento desnecessário em caso da chamada não ser um comando
            if (!interaction.isChatInputCommand())
                return

            if (interaction.commandName.toLowerCase() === this.commandInfo.name.toLocaleLowerCase()){

                if (interaction.options != undefined
                    && interaction.options._hoistedOptions != undefined) {
                    console.log(1)
                    const chave = interaction.options._hoistedOptions.find((option: any) => option.name === 'chave_redmine')
                    if (chave != undefined) {
                        console.log(2)
                        const userID = interaction.user.id
                        let registeredUser = UserDB.loadUser(userID)
                        if (registeredUser != undefined) {
                            registeredUser.redmineKey = chave.value
                            UserDB.updateUser(userID, registeredUser)
                            await interaction.reply('Chave atualizada!')
                            return
                        }
                        await interaction.reply('Usuário não está registrado.')
                        return
                    }
                }
                await interaction.reply('Chave não encontrada.')
                return
            }
        })
    }
}