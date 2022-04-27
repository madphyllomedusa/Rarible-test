import {
    User,
    ButtonInteraction,
    Interaction,
    Message,
    MessageActionRow,
    MessageButton,
    MessageEmbed, 
    MessageAttachment
} from 'discord.js'
import {ICommand} from 'wokcommands'
import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import { getItemByIdRequestLinkSetup, getCollectionByIdRequestLinkSetup, attributesToProperties } from '../models/addtional_modules'; 
import { rarityCounter } from '../models/rarity_score'
import { Properties, CollectionAttibutes } from '../models/models'

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
        let reply: any
        //interaction.deferReply()
        reply = await interaction.reply({
            content: "Diving deep into blockchain..."
        })
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

        for (let a = 0; a < 1; ++a){
            embeds.push(new MessageEmbed().setFooter(`Page ${a+1}`))
        }
        const id = user.id
        pages[id] = pages[id] || 0
        const sourceLink = args
        let nftData: Item
        let collectionData: Collection
        let RarityScore: number = 0
        let itemAPILink: string
        let collectionAPILink: string
        let countedProperties: Properties
        let collectionVariants: CollectionAttibutes

        const ETH_Emoji: string = "<:ethemoji:967093487357009960>"
        const wETH_Emoji: string = "<:weth:967455329338155119>"
        const FLOW_Emoji: string = "<:flow:967454651320528968>"
        const XTZ_Emoji: string = "<:tezos:967452701581508608>"
        const MATIC_Emoji: string = "<:matic:967451814536556555>"
        
        const ETH_Collection: string = "ETHEREUM:0x60f80121c31a0d46b5279700f9df786054aa5ee5" 
        const FLOW_Collection: string = "FLOW:A.01ab36aaf654a13e.RaribleNFT"
        const TEZOS_Collection: string = "TEZOS:KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS"
        const POLYGON_Collection: string = "POLYGON:0x35f8aee672cdE8e5FD09C93D2BfE4FF5a9cF0756" 

        const embed_Error_Link = new MessageEmbed().setImage('https://cdn.discordapp.com/attachments/967536440743448627/967536530681909288/wrongLinkRemoved.png')
        const embed_Score_Counting = new MessageEmbed().setImage('https://cdn.discordapp.com/attachments/967536440743448627/968863419182755870/002-630x354.jpg')

        let ethOwner: string
        let ethAuthor: string
        let Attachment: string = "IMAGE"
        let attachment: MessageAttachment
        let itemRequest_passed: boolean = true

        

        itemAPILink = getItemByIdRequestLinkSetup(sourceLink[0])
        console.log(`item request ${itemAPILink}`)
        await sendApiRequest(itemAPILink).then(async (data) => {
            //данные из токена
        
            nftData = data
            console.log(`RESIVED DATA ${nftData}`)
            ethAuthor = nftData.creators[0].account
            ethOwner  = nftData.owners![0]
            if(nftData.meta?.content.length !== 0 || nftData.meta?.content !== undefined){
                let onlyImage: boolean = true
                let pos: number = 0
                for(let i = 0; i < nftData.meta?.content.length!; ++i){
                    if(nftData.meta?.content[i]['@type'] !== "IMAGE"){
                        onlyImage = false
                        pos = i
                    }
                }
                if(onlyImage){
                    embeds[0].setImage(`${nftData.meta?.content[0].url}`)
                    console.log(`IMAGE LINK: ${nftData.meta?.content[0].url}`)
                    console.log(`IMAGE HEIGHT ${embeds[0].image?.height}`)
                }else{
                    if(nftData.meta?.content[pos].url !== undefined){
                        Attachment = nftData.meta?.content[pos].url
                        attachment = new MessageAttachment('../animation.mp4')
                        //embeds[0].video!.url = Attachment
                        //embeds[0].setImage(Attachment)
                        
                        console.log(`ATTACHMENT LINK: ${Attachment}`)
                    }
                } 
            }else {
                //ВСТАВИТЬ НАШУ КАРТИНКУ 
            }
            if(nftData.meta?.name !== undefined){
                embeds[0].setTitle(`${nftData.meta?.name}`)
            }else {
                embeds[0].setTitle("No name")
            }
            if(nftData.collection !== undefined){
                collectionAPILink = getCollectionByIdRequestLinkSetup(nftData.collection?.toString()!)
                console.log(`COLLECTION API LINK: ${collectionAPILink}`)
                await sendApiRequest(collectionAPILink).then(data => {
                    collectionData = data
                    if(collectionData.meta?.externalLink !== undefined){
                        embeds[0].setURL(`${collectionData.meta?.externalLink}`)
                    }
                    if(collectionData.meta?.content[0].url !== undefined){
                        embeds[0].setThumbnail(`${collectionData.meta?.content[0].url}`)
                    }else {
                        //ВСТАВИТЬ СВОЮ КАРТИНКУ КОЛЛЕКЦИИ
                    }
                    embeds[0].addField('Collection: ' , `${collectionData.name}`)
                    if(collectionData.id !== ETH_Collection && collectionData.id !== FLOW_Collection && collectionData.id !== TEZOS_Collection && collectionData.id !== POLYGON_Collection){
                        embeds.push(new MessageEmbed().setFooter(`Page ${embeds.length+1}`))
                        console.log(`EMBEDS SIZE: ${embeds.length}`)
                        embeds[embeds.length-1] = embed_Score_Counting
                        rarityCounter(nftData).then(data => {
                            collectionVariants = data
                            countedProperties = attributesToProperties(collectionVariants, nftData)
                            let rarityScore: number = 0
                            let rarityPerc: number = 0

                            for(let i = 0; i < countedProperties.attributesArray.length; ++i){
                                let temp = countedProperties.attributesArray[i].amount
                                console.log(`rarity score ${temp}`)
                                rarityScore = countedProperties.collectionTotal / temp!
                                console.log(rarityScore)
                                RarityScore += rarityScore
                                console.log(`summary rarity score ${RarityScore}`)
                            }
                            embeds[1].setColor('#ffcc00')
                            if(nftData.meta?.attributes.length == 0 || nftData.meta?.attributes.length == undefined){
                                embeds[1].setColor('#ffcc00')
                                embeds[1].setTitle(`Rarity score: 1`)
                                embeds[1].setDescription('We cant calculate Rarity score coz this NFT dont have attributes')
                            }else{
                                embeds[1].setColor('#ffcc00')
                                embeds[1].setTitle(`Rarity score: ${RarityScore.toFixed(2)}`)
                                embeds[1].setImage(`${nftData.meta?.content[0].url}`)

                                for(let i = 0; i < countedProperties.attributesArray.length!;++i){
                                    if(nftData.meta?.attributes.length !== 0){
                                        if(countedProperties.attributesArray[i].amount == 1){
                                            embeds[1].addFields(
                                                {name: `${countedProperties.attributesArray[i].key}`, value: `${countedProperties.attributesArray[i].value}`, inline: true},
                                                {name:`Score: ${(countedProperties.collectionTotal / countedProperties.attributesArray[i].amount!).toFixed(2)}`, 
                                                 value:`1 of 1`, inline: true },
                                                { name: '\u200B', value: '\u200B' },
                                                )
                                        }else {
                                        embeds[1].addFields(
                                            {name: `${countedProperties.attributesArray[i].key}`, value: `${countedProperties.attributesArray[i].value}`, inline: true},
                                            {name:`Score: ${(countedProperties.collectionTotal / countedProperties.attributesArray[i].amount!).toFixed(2)}`, 
                                             value:`${((countedProperties.attributesArray[i].amount! / countedProperties.collectionTotal) * 100).toFixed(2)}% rarity`, inline: true },
                                            { name: '\u200B', value: '\u200B' },
                                            )}
                                    }
                                }
                            }
                            reply.edit({
                                embeds: [embeds[pages[id]],
                            ],
                            components: [getRow(id)],
                            })
                            
                        }).catch(error => {

                        })
                    }
                }).catch(error => {

                })
            }
            embeds[0].addField('Blockchain: ' ,`${nftData.blockchain}`)
            embeds[0].setDescription(' ')
            if(nftData.owners?.length == 0 || nftData.owners == undefined){
                embeds[0].addField('Owner','No owner')
            }else{
                let splitOwner = ethOwner.split(':')
                ethOwner = splitOwner[1]
                embeds[0].addField('Owner:', `${ethOwner}`)
            }
            if(nftData.creators?.length == 0 || nftData.creators == undefined){
                embeds[0].addField('Creator: ','No data about creator')
            }else{
                let splitAuthor = ethAuthor.split(':')
                ethAuthor = splitAuthor[1]
                embeds[0].addField('Creator: ', `${ethAuthor}`)
            }
            if(nftData.bestSellOrder?.makePrice !== undefined){
                if(nftData.blockchain == "ETHEREUM"){
                    embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}${ETH_Emoji}`)
                } else if(nftData.blockchain == "FLOW"){
                    embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}${FLOW_Emoji}`)
                }else if(nftData.blockchain == "TEZOS"){
                    embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}${XTZ_Emoji}`)
                }
                else if(nftData.blockchain == "POLYGON"){
                    embeds[0].addField('Price: ' , `${nftData.bestSellOrder?.makePrice}${MATIC_Emoji}`)
                }
            }else{
                embeds[0].addField('Not for sale','\u200B')
            }
            embeds[0].setColor('#ffcc00')
            
            //embeds[1].setColor('#ffcc00')
            
            //embeds[1].setTitle(`Rarity score: 45642`)

            console.log(`REQUEST_RESULT: ${itemRequest_passed}`)
            const embed = embeds[pages[id]]
                
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
                        console.log("FIRST REPLY")
                        reply = await interaction.editReply({
                            content: " ",
                            embeds: [embeds[pages[id]],],
                            components: [getRow(id)],
                        })
                        if(Attachment !== "IMAGE"){
                            channel.send({
                                content: Attachment
                            })
                        }
                        
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
                        console.log("REPLY ROOT")
                        if(Attachment !== "IMAGE"){
                            reply.edit({
                                embeds: [embeds[pages[id]],
                                
                            ],
                               
                                components: [getRow(id)],
                                //content: Attachment
                                //files: attachment
                                
                            })
                           // channel.send({
                             //   content: Attachment
                            //})
                            
                        }else {
                            reply.edit({
                                embeds: [embeds[pages[id]],
                            ],
                            components: [getRow(id)],
                            })
                        }
                    }else{
                        if(Attachment !== "IMAGE"){
                            console.log("NO IMAGE")
                            await interaction.editReply({
                                
                                embeds: [embeds[pages[id]]
                                
                            ],
                                components: [getRow(id)],
                                
                            })
                        }else {
                            console.log("THIS ROOT")
                            await interaction.editReply({
                                embeds: [embeds[pages[id]],
                                ],
                                components: [getRow(id)],
                            
                            })
                        }
                    }
                })
            
            //
            

        }).catch(async (error) => {
            itemRequest_passed = false
            console.log(error)
            if(reply){
            reply.edit({
                content: " ",
                embeds: [embed_Error_Link]
            })}else {
                await interaction.editReply({
                    content: " ",
                    embeds: [embed_Error_Link]
                })  
            }
        })


    },
}as ICommand
