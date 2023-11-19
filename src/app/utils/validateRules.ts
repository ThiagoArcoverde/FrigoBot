import UserDB from "../database/userDB";
import user from "../model/user";

export default class validateRules {
    
    static async ValidateCommandAndUser(interaction: any, commandInfoName: string): Promise<boolean> {
        
        
    }

    static validateDiscordUser(discordUser: user) {
        if (discordUser.redmineKey != undefined)
            return true
        return false
    }
}