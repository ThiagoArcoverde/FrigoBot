import UserDB from "../database/userDB";
import user from "../model/user";

export default class validateRules {
    
    //#region Validação padrão 
    static async ValidateCommandAndUser(interaction: any, commandInfoName: string): Promise<boolean> {
        if (!interaction.isChatInputCommand())
                return false

        if (interaction.commandName.toLowerCase() === commandInfoName.toLocaleLowerCase()) {
            const userID = interaction.user.id
            const discordUser = UserDB.loadUser(userID)
            if (discordUser != undefined) {
                if (this.validateDiscordUser(discordUser)) {
                    if (interaction.options != undefined
                        && interaction.options._hoistedOptions != undefined) {
                        return true
                    }
                    await interaction.reply('ID não informado e/ou encontrado.')
                    return false
                }
                await interaction.reply('Não foi possível encontrar Key do redmine para o usuário com essa conta.')
                return false
            }
            await interaction.reply('Não foi possível encontrar usuário registrado com essa conta.')
            return false
        }
        return false
    }

    static validateDiscordUser(discordUser: user) {
        return discordUser.redmineKey != undefined
    }

    static async formatTime(time:string): Promise<string>{
        const [hour, min] = time.split(':');
        let timeFormat = hour + "," + Math.round(parseInt(min) / 60)

        return timeFormat
    }
    //#endregion
}