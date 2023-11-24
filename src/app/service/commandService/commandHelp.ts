import { EmbedBuilder } from "discord.js";
import { command } from "./command";

export default class commandHelp implements command {

    private commands: []

    constructor(commands: []) {
        this.commands = commands
    }

    commandInfo = {
        name: "help",
        description: "comando para mostrar os comandos disponíveis"
    }

    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            if (interaction.commandName.toLowerCase() === this.commandInfo.name.toLocaleLowerCase()) {
                let fields = this.commands.map((command: any) => ({
                    name: command.name,
                    value: command.description
                }))

                let interactionResponse = new EmbedBuilder()
                    .setColor('#87CEEB')
                interactionResponse.addFields(fields)
                await interaction.reply("Comandos disponíveis: ")
                await interaction.channel.send({ embeds: [interactionResponse] })
            }
        })

    }

}