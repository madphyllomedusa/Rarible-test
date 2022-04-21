import {
    User,
    ButtonInteraction,
    Interaction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed
} from 'discord.js'
import {ICommand} from 'wokcommands'
import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import { getItemByIdRequestLinkSetup } from '../models/addtional_modules'; 

const embeds: MessageEmbed[] = []
const pages = {} as { [key: string]:number}

for (let a = 0; a < 2; ++a){
    embeds.push(new MessageEmbed().setDescription(`Page ${a+1}`))
}
//embeds[0].setTitle('hello niggers')
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
    options: [{
        name: 'link3',
        description: ' link from rarible 2',
        required: true,
        type: 'STRING',
    },
    ],
    
    callback: async({user,message,interaction,channel,args}) => {
        const id = user.id
        pages[id] = pages[id] || 0
        const link3 = args
        let nftData: Item
        const ethEmoji = "<:ethemoji:966806113641168977>"

        link3[0] = getItemByIdRequestLinkSetup(link3[0])
            nftData = await sendApiRequest(link3[0]).then(data => {
                nftData = data
                //console.log(data)
                return data
            })
         
            ///
        //embeds[0].setTitle('hello kurwa')
        embeds[0].setTitle(`${nftData.meta?.name}`)
        embeds[0].setDescription(`${nftData.collection}`)
        embeds[0].setImage(`${nftData.meta?.content[0].url}`)
        embeds[0].setColor('DARK_GOLD')
        //console.log(`${nftData.owners}`)
        /*if(nftData.owners == null){
            embeds[0].addField('Owner:', `${nftData.owners}`)
        }*/
        embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}`)
        embeds[1].setTitle('hello zxc')
        
        
        const embed = embeds[pages[id]]
        let reply: Message | undefined
        let collector
        
        const filter = (i: Interaction) => i.user.id === user.id
        const time = 1000 * 60 * 2

        if(message){
            reply = await message.reply({
                embeds: [embed],
                components: [getRow(id)],
            })
            
            collector = reply.createMessageComponentCollector({filter,time})
        }else{
        await interaction.reply({
            embeds: [embed],
            components: [getRow(id)]
        })

            collector = channel.createMessageComponentCollector({filter,time})
        }
            collector.on('collect', async(ButtonInteraction) =>{
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
            }else if(
                ButtonInteraction.customId === 'Next' &&
                pages[id]<embeds.length -1
            ){
                ++pages[id]
                
            }

            if(reply){
                reply.edit({
                    embeds: [embeds[pages[id]],
                ],
                    components: [getRow(id)],
                    
                })
            }else{
                await interaction.editReply({
                    embeds: [embeds[pages[id]],
                ],
                    components: [getRow(id)],
                    
                })
            }
        })
    },
}as ICommand