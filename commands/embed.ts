/*import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"

export default{
    category: 'testing',
    description: 'send an embed',
    slash: true,
    testOnly: true,
    

    callback: async ({message, text}) =>{
        
        let nftData: Item

        nftData = await sendApiRequest().then(data => {
            nftData = data
            //console.log(data)
            return data
        })

        const embed = new MessageEmbed()
            .setTitle(`${nftData.meta?.name}`)
            .setDescription(`${nftData.collection}`)
            .setImage(`${nftData.meta?.content[2].url}`)
        return embed
    },
}as ICommand*/