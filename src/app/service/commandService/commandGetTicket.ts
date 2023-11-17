import UserDB from '../../database/userDB'
import user from '../../model/user'
import { command } from './command'
import redmineClient from '../../utils/redmineClient'
import { EmbedBuilder } from 'discord.js'
import httpStatusUtil from '../../utils/httpStatus'

export default new class commandGetTicket implements command {
    commandInfo = {
        name: "ticket",
        description: "Comando para obter os dados de um ticket.",
        options: [
            {
                name: "ticket_id",
                description: "Número da issue que você deseja obter os dados.",
                type: 3,
                required: true
            }
        ]
    }

    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            try {
                // Evitar processamento desnecessário em caso da chamada não ser um comando
                if (!interaction.isChatInputCommand())
                    return

                if (interaction.commandName.toLowerCase() === this.commandInfo.name.toLocaleLowerCase()) {
                    const userID = interaction.user.id
                    const discordUser = UserDB.loadUser(userID)
                    if (discordUser != undefined) {
                        if (this.validateDiscordUser(discordUser)) {
                            if (interaction.options != undefined
                                && interaction.options._hoistedOptions != undefined) {
                                let issueID = interaction.options._hoistedOptions.find((option: any) => option.name === 'ticket_id').value
                                if (issueID != undefined && issueID.startsWith('#')) {
                                    issueID = issueID.slice(1)
                                }
                                if (issueID != undefined && !isNaN(issueID)) {
                                    const value = await redmineClient.getIssue(issueID, discordUser.redmineKey)
                                    console.log(value)
                                    if (value != undefined) {
                                        if(value.status != undefined){
                                            await interaction.reply(httpStatusUtil.getStatusDescription(value.status))
                                            return
                                        }
                                        let interactionResponse = new EmbedBuilder()
                                            .setColor('#87CEEB')
                                            .setTitle(`Ticket: ${value.issue.tracker?.name} - #${issueID}`)
                                            .setDescription(`${value.issue.subject} \n ${value.issue.description}`)
                                            .addFields(
                                                { name: 'Autor: ', value: `${value.issue.author.name}`, inline: true },
                                                { name: 'Atribuido para: ', value: `${value.issue.assigned_to.name}`, inline: true },
                                                { name: 'Status: ', value: `${value.issue.status.name}`, inline: true },
                                                { name: 'Tempo gasto: ', value: `${value.issue.spent_hours} horas`, inline: true },
                                                { name: 'Prioridade: ', value: `${value.issue.priority.name}`, inline: true },
                                                { name: 'Projeto: ', value: `${value.issue.project.name}`, inline: true }
                                            )
                                        await interaction.reply("Ticket encontrado:")
                                        await interaction.channel.send({ embeds: [interactionResponse] });
                                        return
                                    }
                                    await interaction.reply("Ticket não encontrado.")
                                    return
                                }
                                await interaction.reply('ID informado em formato incorreto.')
                                return
                            }
                            await interaction.reply('ID não informado e/ou encontrado.')
                            return
                        }
                    }
                    await interaction.reply('Não foi possível encontrar usuário registrado com essa conta.')
                    return
                }
            }catch(error){
                await interaction.reply("Um erro aconteceu, tente novamente.")
                return
            }
        })
    }

    validateDiscordUser(discordUser: user) {
        if (discordUser.redmineKey != undefined)
            return true
        return false
    }

}