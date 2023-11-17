import { command } from './command'
import user from '../../model/user'
import userDB from '../../database/userDB'

export default new class commandRegister implements command {
    commandInfo = {
        name: "register",
        description: "Comando para registrar o seu usuário no bot.",
        options: [
            {
                name: "redmine_key",
                description: "Chave da API do Redmine",
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

            if (interaction.commandName.toLowerCase() === this.commandInfo.name.toLocaleLowerCase()) {
                if (interaction.options != undefined) {
                    if (interaction.options._hoistedOptions != undefined) {
                        const redmineKey = interaction.options._hoistedOptions.find((option: any) => option.name === 'redmine_key')
                        if (redmineKey != undefined) {
                            const userID = interaction.user.id
                            const registeredUser = userDB.loadUser(userID)
                            if (registeredUser == undefined) {
                                const newUser = new user(redmineKey.value, userID)
                                userDB.saveUser(userID, newUser)
                                await interaction.reply("Usuário cadastrado com sucesso.")
                                return
                            }
                            await interaction.reply("Usuário já está cadastrado.")
                            return
                        }
                        await interaction.reply("Chave não informada.")
                        return
                    }
                }
            }
        })
    }

}