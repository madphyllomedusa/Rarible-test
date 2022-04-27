import WOKCommands, { ICommand } from 'wokcommands'
import { DataResolver, MessageAttachment, MessageEmbed } from "discord.js";
import {sendApiRequest} from "../models/api"
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
            nftData = await sendApiRequest(link3[0]).then(data => {
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

        const canvas = createCanvas(1000,500)
        const context = canvas.getContext('2d')
        context.fillStyle = '#ff00ff'
        context.fillRect(0,0,1000,500)
        context.drawImage(background, 0,0,1000,500)
        //const buffer = canvas.toBuffer('image/png')
        context.drawImage(nftImage,150,400,2,2)
        context.fillStyle = "black"  
        context.lineWidth = 2.0
        context.beginPath()
        context.moveTo(30, 10)
        context.lineTo(30, 460)
        context.lineTo(970, 460)
        context.stroke()
        for(let i = 0; i < 5; i++) { 
            context.fillText((5 - i) * 20 /*Переменная цены*/ + "", 4, i * 80 + 60) 
            context.beginPath() 
            context.moveTo(25, i * 80 + 60) 
            context.lineTo(30, i * 80 + 60)
            context.stroke()
        }
        for(var i=0; i<8; i++) { 
            context.fillText((i+1) * 20 /*Переменная скора*/+ "", 90+ i*100, 475)
        }
        context.moveTo(30,460)
        for(let i = 0; i<2/*переменная*/;i++){
            context.lineTo(100/*Переменная скора*/,120 /* переменная цены*/)
            context.stroke()
            //context.lineTo(70,140)   
        }

        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync('./commands/rarible.png',buffer)
        resolve(true)
    })
}