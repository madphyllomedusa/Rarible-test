import WOKCommands, { ICommand } from 'wokcommands'
import { DataResolver, MessageAttachment, MessageEmbed } from "discord.js";
import {getItemByIdRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import { getItemByIdRequestLinkSetup } from '../models/addtional_modules'; 
import { createCanvas, loadImage } from 'canvas';
import path from 'path'
import fs from 'fs'

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
        let nftUrl:string 
        //let attachment = new MessageAttachment(' ')

        if(interaction){
            link3[0] = getItemByIdRequestLinkSetup(link3[0])
            nftData = await getItemByIdRequest(link3[0]).then(data => {
                nftData = data
                //console.log(data)
                return data
            })
        
        drawNFT(nftData).then(async ()=>{
            const attachment = new MessageAttachment('./commands/rarible.png')
            await embed.setImage('attachment://rarible.png')
            await interaction.reply({
                embeds: [embed],
                files: [attachment]
            })
            
        })
        
        /*interaction.reply({
            embeds: [embed],
            files: [attachment]
        })*/
        //nftUrl = nftData.meta?.content[1].url
        /*let background = await loadImage(
            path.join(__dirname, '../test.png')
        )
        let nftImage = await loadImage(`${nftData.meta?.content[1].url}`)
        
        const canvas = createCanvas(1600,900)
        const context = canvas.getContext('2d')
        context.fillStyle = '#000'
        context.fillRect(0,0,1600,900)
        context.drawImage(background, 0,0,1600,900)
        //const buffer = canvas.toBuffer('image/png')
        //embed.setImage(canvas)
        context.drawImage(nftImage,0,0) */
        //const attachment = new MessageAttachment(canvas.toBuffer(), 'rarible.png')
        
        //fs.writeFileSync('./commands/rarible.png',buffer)
        //embed.setImage('attachment://rarible.png')
        /*await interaction.reply({
            embeds: [embed],
            files: [attachment]
        })*/
        //return canvas
        //return 'pong'
        }
    }
    
}as ICommand

function drawNFT(nftData: Item){
    return new Promise(async(resolve, reject)=>{
        let background = await loadImage(
            path.join(__dirname, '../test.png')
        )
        let nftImage = await loadImage(`${nftData.meta?.content[0].url}`)
        
        /*let nftImage = await loadImage(
            path.join(__dirname, '../babies.png')
        )*/

        const canvas = createCanvas(1600,900)
        const context = canvas.getContext('2d')
        context.fillStyle = '#000'
        context.fillRect(0,0,1600,900)
        context.drawImage(background, 0,0,1600,900)
        //const buffer = canvas.toBuffer('image/png')
        context.drawImage(nftImage,150,400,450,450) 
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./commands/rarible.png',buffer)
        resolve(true)
    })
}