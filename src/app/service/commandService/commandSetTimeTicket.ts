import UserDB from "../../database/userDB"
import redmineClient from "../../utils/redmineClient"
import validateRules from "../../utils/validateRules"
import { command } from "./command"

export default new class commandSetTimeTicket implements command {
    commandInfo = {
        name: "ticket_time",
        description: "Comando para setar horario de trabalho do ticket.",
        options: [{
            name: "ticket_id",
            description: "Ticket informado para apontas as horas.",
            type: 3,
            required: true
        },
        {
            name: "work_time",
            description: "Horas trabalhadas na tarefa. Informe em formato de horas (00:00).",
            type: 3,
            required: true
        }]
    }

    invokeCommand(app: any): void {
        app.client.on('interactionCreate', async (interaction: any) => {
            try{
                //Validação unica de usuário e do comanndo pelo tipo de comando
                if (interaction.isButton())
                {
                    const escolha = interaction.customId;
                    console.log(interaction.options)
                    await interaction.reply(`Você escolheu a opção: ${escolha}`);
                }

                if ( await validateRules.ValidateCommandAndUser(interaction, this.commandInfo.name))
                {
                    const userID = interaction.user.id
                    const discordUser = UserDB.loadUser(userID)
                    if (discordUser != undefined) {
                        let issueID = interaction.options._hoistedOptions.find((option: any) => option.name === 'ticket_id').value
                        if (issueID != undefined && issueID.startsWith('#')) {
                            issueID = issueID.slice(1)
                        }
                        if (issueID != undefined && !isNaN(issueID)) {
                            let timeWorked = interaction.options._hoistedOptions.find((option: any) => option.name === 'work_time').value
                            if (timeWorked != undefined){
                                let sendTime = await validateRules.formatTime(timeWorked)
                                const opcoes = [
                                    {
                                        label: 'Desenvolvimento',
                                        value: '1',
                                    },
                                    {
                                        label: 'Apoio',
                                        value: '2',
                                    },
                                    {
                                        label: 'Correção',
                                        value: '3',
                                    },
                                    {
                                        label: 'Suporte',
                                        value: '4',
                                    },
                                    {
                                        label: 'Reunião',
                                        value: '5',
                                    }
                                    ];
                                    // Criar botões
                                    const botoes = opcoes.map((opcao) => {
                                    return {
                                        type: 2, // Tipo 2 representa um botão
                                        style: 1, // Estilo 1 é o estilo primário (azul)
                                        label: opcao.label,
                                        custom_id: opcao.value,
                                    };
                                    });
                                    // Criar a mensagem com os botões
                                    await interaction.reply({
                                    content: 'Escolha uma opção:',
                                    components: [
                                        {
                                        type: 1, // Tipo 1 representa uma ação de ação de linha
                                        components: botoes,
                                        },
                                    ],
                                    });
                                // const value = await redmineClient.setTimeWorked(sendTime, issueID, tipeActivity, discordUser.redmineKey)
                            }
                        }
                    }
                }
            
                return
            }catch(error){
                await interaction.reply("Um erro aconteceu, tente novamente." + error)
                return
            }
        })
    }
}