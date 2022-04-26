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
import {Collection} from "@rarible/api-client/build/models/Collection"
import { getItemByIdRequestLinkSetup, getCollectionByIdRequestLinkSetup } from '../models/addtional_modules'; 
import { Properties } from '../models/models'

/*const embeds: MessageEmbed[] = []
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
}*/

const pages = {} as { [key: string]:number}
let embeds:MessageEmbed[]
//embeds[0].setTitle('hello niggers')


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
        embeds = []
        
        const getRow = (id:string) =>{
            const row = new MessageActionRow()
        
            row.addComponents(
                new MessageButton()
                    .setCustomId(`${interaction.id}Prev`)
                    .setStyle('SECONDARY')
                    .setEmoji('⬅️')
                    .setDisabled(pages[id] === 0)
            )
            row.addComponents(
                new MessageButton()
                    .setCustomId(`${interaction.id}Next`)
                    .setStyle('SECONDARY')
                    .setEmoji('➡️')
                    .setDisabled(pages[id] === embeds.length -1)
            )
                return row
        }

        for (let a = 0; a < 2; ++a){
            embeds.push(new MessageEmbed().setFooter(`Page ${a+1}`))
        }
        const id = user.id
        pages[id] = pages[id] || 0
        const link3 = args
        let nftData: Item
        let collectionData: Collection
        const ethEmoji = "<:ethemoji:967093487357009960>"

        link3[0] = getItemByIdRequestLinkSetup(link3[0])
        console.log(`item request ${link3[0]}`)
        nftData = await sendApiRequest(link3[0]).then(data => {
            nftData = data
            //console.log(data)
            return data
        })
        link3[0] = getCollectionByIdRequestLinkSetup(nftData.collection?.toString()!)
        console.log(`collection request ${link3[0]}`)
       collectionData = await sendApiRequest(link3[0]).then(data =>{
            return data
        })
       
        
        let tempAtributes = nftData.meta?.attributes.length
        let ethAuthor : string = nftData.creators[0].account
        let ethOwner : string  = nftData.owners![0]
        
        embeds[0].setTitle(`${nftData.meta?.name}`)
        embeds[0].setURL(`${collectionData.meta?.externalLink}`)
        embeds[0].setThumbnail(`${collectionData.meta?.content[0].url}`)
        embeds[0].addField('Collection: ' , `${collectionData.name}`)
        embeds[0].addField('Blockchain: ' ,`${nftData.blockchain}`)
        if(nftData.owners?.length == 0 || nftData.owners == undefined){
            embeds[0].addField('Owner','No owner')
        }else{
            let splitOwner = ethOwner.split(':')
            ethOwner = splitOwner[1]
            embeds[0].addField('Owner:', `${ethOwner}`)
        }
        if(nftData.creators?.length == 0 || nftData.creators == undefined){
            embeds[0].addField('Author: ','Dont have author')
        }else{
            let splitAuthor = ethAuthor.split(':')
            ethAuthor = splitAuthor[1]
            embeds[0].addField('Author: ', `${ethAuthor}`)
        }
//
        embeds[0].setImage(`${nftData.meta?.content[0].url}`)
        embeds[0].setColor('#ffcc00')
        embeds[1].setColor('#ffcc00')
        embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}${ethEmoji}`)
        embeds[1].setTitle(`Rarity score: 45642`)

        if(nftData.meta?.attributes.length == 0 || nftData.meta?.attributes.length == undefined){
            embeds[1].setColor('YELLOW')
            embeds[1].setTitle(`Rarity score: 1`)
            embeds[1].setDescription('We cant calculate Rarity score coz this NFT dont have attributes')
        }else{
            embeds[1].setColor('YELLOW')
            embeds[1].setTitle(`Rarity score: 4528.96`)
            embeds[1].setImage(`${nftData.meta?.content[0].url}`)
            for(let i = 0; i < tempAtributes!;++i){
                if(tempAtributes !== 0){
                    embeds[1].addFields(
                        {name: `${nftData.meta.attributes[i].key}`, value: `${nftData.meta.attributes[i].value}`, inline: true},
                        {name:`Score: `, value:`Score Value`, inline: true},
                        { name: '\u200B', value: '\u200B' },
                        )
                }
            }
            /*embeds[1].addFields(
                {name: `${nftData.meta.attributes[0].key}`, value: `${nftData.meta.attributes[0].value}`, inline: true},    //1
                {name: '1', value: '48.8% rarity',inline: true},
                {name: '\u200B', value: '\u200B' },
                {name: `${nftData.meta.attributes[1].key}`, value: `${nftData.meta.attributes[1].value}`, inline: true},    //2
                {name: '2.49', value: '4.7% rarity', inline: true},
                {name: '\u200B', value: '\u200B' }, 
                {name: `${nftData.meta.attributes[2].key}`, value: `${nftData.meta.attributes[2].value}`, inline: true},     //3
                {name: '26.42', value: '1.1% rarity', inline: true},
                {name: '\u200B', value: '\u200B' },
                {name: `${nftData.meta.attributes[3].key}`, value: `${nftData.meta.attributes[3].value}`, inline: true},    //4 
                {name: '635.73', value: '1.4% rarity', inline: true},
                {name: '\u200B', value: '\u200B' },
                {name: `${nftData.meta.attributes[4].key}`, value: `${nftData.meta.attributes[4].value}`, inline: true},    //5
                {name: '17.17', value: '0.7% rarity', inline: true},
                {name: '\u200B', value: '\u200B' },
                {name: `${nftData.meta.attributes[5].key}`, value: `${nftData.meta.attributes[5].value}`, inline: true},    //6
                {name: '3846.15', value: '0% rarity', inline: true},
            )*/
        }
        
        
        
        const embed = embeds[pages[id]]
        let reply: any
        let collector
        
        const filter = (i: Interaction) => {
            return i.user.id === user.id}
        const time = 1000 * 60 * 2
        console.log(`user id ${user.id}`)
        console.log(`interection id ${interaction.id}`)
        if(message) {
            reply = await message.reply({
                  embeds: [embed],
                  components: [getRow(id)],
              })
          } else {
            reply = await interaction.reply({
              embeds: [embed],
              components: [getRow(id)],
              fetchReply: true
          })
        }
            collector = reply.createMessageComponentCollector({filter,time})

            collector.on('collect', async(ButtonInteraction: any) =>{
            
            if(!ButtonInteraction){
                return
            }
            ButtonInteraction.deferUpdate()
            console.log(`button custom id ${ButtonInteraction.customId}`)

            if(
                ButtonInteraction.customId !== `${interaction.id}Prev` &&
                ButtonInteraction.customId !== `${interaction.id}Next`
            ){
                return
            }
            if(ButtonInteraction.customId === `${interaction.id}Prev`&& pages[id]>0){
                --pages[id]
            }else if(
                ButtonInteraction.customId === `${interaction.id}Next` &&
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