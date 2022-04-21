import WOKCommands, { ICommand } from 'wokcommands'
import { MessageEmbed, MessageAttachment } from "discord.js";
import {getItemByIdRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import { getItemByIdRequestLinkSetup } from '../models/addtional_modules'; 
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
        const embed = new MessageEmbed()

        if(interaction){
            link3[0] = getItemByIdRequestLinkSetup(link3[0])
            nftData = await getItemByIdRequest(link3[0]).then(data => {
                nftData = data
                //console.log(data)
                return data
            })
            embed
            .setTitle(`${nftData.meta?.name}`)
            .setDescription(`${nftData.collection}`)
            .setImage(`${nftData.meta?.content[0].url}`)

            return embed    
            
        }
    }
    
}as ICommand