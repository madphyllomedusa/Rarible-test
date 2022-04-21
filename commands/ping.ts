import WOKCommands, { ICommand } from 'wokcommands'
import { MessageEmbed, MessageAttachment } from "discord.js";
import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import { getItemByIdRequestLinkSetup, getCollectionByIdRequestLinkSetup } from '../models/addtional_modules'; 
import { createCanvas,loadImage,registerFont } from 'canvas';


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



    callback: async ({interaction,args,message,text}) =>{

        const link3 = args
        let nftData: Item
        let collectionData: Collection
        const embed = new MessageEmbed()

        if(interaction){
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
            console.log(collectionData.name)

            embed
            .setTitle(`${nftData.meta?.name}`)
            .setDescription(`${collectionData.name}`)
            .setImage(`${nftData.meta?.content[0].url}`)

            return embed    
            
        }
    }
    
}as ICommand