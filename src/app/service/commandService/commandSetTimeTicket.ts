import UserDB from "../../database/userDB"
import validateRules from "../../utils/validateRules"
import { command } from "./command"

export default new class commandSetTimeTicket implements command {
    commandInfo = {
        name: "ticket_time",
        description: "Comando para setar horario de trabalho do ticket.",
        options: [{
            name: "ticket_init",
            description: "Iniciar contagem horas ticket.",
            type: 3,
            required: true
        }]
    }

    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            try{
                // Validação unica de usuário e do comanndo pelo tipo de comando
                if ( await !validateRules.ValidateCommandAndUser(interaction, this.commandInfo.name))
                {
                    console.log("passou")
                }
            await interaction.reply('Não foi possível encontrar usuário registrado com essa conta.')
            return false

            }catch(error){
                await interaction.reply("Um erro aconteceu, tente novamente.")
                return
            }
        })
    }
}