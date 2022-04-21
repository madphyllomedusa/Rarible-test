import {
    ButtonInteraction,
    Interaction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js'
import {ICommand} from 'wokcommands'

const embeds: MessageEmbed[] = []
const pages = {} as { [key: string]:number}

for (let a = 0; a < 2; ++a){
    embeds.push(new MessageEmbed().setDescription(`Page ${a+1}`))
}

const getRow = (id:string) =>{
    const row = new MessageActionRow()

    row.addComponents(
        new MessageButton()
            .setCustomId('Prev')
            .setStyle('SECONDARY')
            .setEmoji('⬅️')
            .setDisabled(pages[id] === 0)
    )
    row.addComponents(
        new MessageButton()
            .setCustomId('Next')
            .setStyle('SECONDARY')
            .setEmoji('➡️')
            .setDisabled(pages[id] === embeds.length -1)
    )
        return row
}

export default{
    category: 'testing link',
    description: 'reply link',

    slash: true,
    testOnly: true,
    /*options: [{
        name: 'link3',
        description: ' link from rarible 2',
        required: true,
        type: 'STRING',
    },
    ],*/
    callback: async({user,message,interaction,channel}) => {
        const id = user.id
        pages[id] = pages[id] || 0

        const embed = embeds[pages[id]]
        let reply: Message | undefined
        let collector

        const filter = (i: Interaction) => i.user.id === user.id
        const time = 1000 * 60 *5

        if(message){
            reply = await message.reply({
                embeds: [embed],
                components: [getRow(id)],
            })
            
            collector = reply.createMessageComponentCollector({filter,time})
        }else{
        interaction.reply({
            //ephemeral: true,
            embeds: [embed],
            components: [getRow(id)]
        })

            collector = channel.createMessageComponentCollector({filter,time})
        }
            collector.on('collect', (ButtonInteraction) =>{
            if(!ButtonInteraction){
                return
            }
            ButtonInteraction.deferUpdate()

            if(
                ButtonInteraction.customId !== 'Prev' &&
                ButtonInteraction.customId !== 'Next'
            ){
                return
            }
            if(ButtonInteraction.customId === 'Prev'&& pages[id]>0){
                --pages[id]
                //embed.setDescription('hello niggers')
            }else if(
                ButtonInteraction.customId === 'Next' &&
                pages[id]<embeds.length -1
            ){
                ++pages[id]
                
            }

            if(reply){
                reply.edit({
                    embeds: [embeds[pages[id]],
                    //embed.setDescription('hello zxc boys')
                ],
                    components: [getRow(id)],
                    
                })
            }else{
                interaction.editReply({
                    embeds: [embeds[pages[id]],
                    //embed.setDescription('hello giggers')
                ],
                    components: [getRow(id)],
                    
                })
            }
        })
    },
}as ICommand