//rarible link example 
//https://rarible.com/token/0xed5af388653567af2f388e6224dc7c4b3241c544:4694?tab=details
//https://rarible.com/token/flow/A.01ab36aaf654a13e.RaribleNFT:192190?tab=details
//https://rarible.com/token/tezos/KT1PtNemJpLtKNCNBC5r15aRDvTonSMGcz1x:21?tab=owners
//https://rarible.com/token/polygon/0x588e505d214d1e24c0b0deaa53a963700a3dcffc:81828986316751803125285982581567898552560266892957231837264565462423134273549?tab=owners
//let url = 'https://rarible.com/token/0xed5af388653567af2f388e6224dc7c4b3241c544:4694?tab=details'
//let url = 'https://rarible.com/token/tezos/KT1PtNemJpLtKNCNBC5r15aRDvTonSMGcz1x:21?tab=owners'
import { Properties, CollectionAttibutes, MetaAttributes, ScorePrice} from "./models"
import {Item} from "@rarible/api-client/build/models/Item"
import { DataResolver, MessageAttachment, MessageEmbed } from "discord.js";
import { createCanvas, loadImage } from 'canvas';
import path from 'path'
import fs from 'fs'
export function getItemByIdRequestLinkSetup(url: string){
    let blockchain: string =''
    let contractAdress: string =''
    let tokenId: string =''
    let splitUrl = url.split('/')
    //console.log(splitUrl[4])
    if(splitUrl[4] == 'flow'){
        blockchain = 'FLOW'
    }
    else if(splitUrl[4] == 'tezos'){
        blockchain = 'TEZOS'
    }
    else if (splitUrl[4] == 'polygon'){
        blockchain = 'POLYGON'
    }
    else {
        blockchain = 'ETHEREUM'
    }
    if(blockchain == 'ETHEREUM'){
        splitUrl = splitUrl[4].split(':')
        //console.log(splitUrl)
        contractAdress = splitUrl[0]
        splitUrl = splitUrl[1].split('?')
        tokenId = splitUrl[0]
    }
    else {
        splitUrl = splitUrl[5].split(':')
        //console.log(splitUrl)
        contractAdress = splitUrl[0]
        splitUrl = splitUrl[1].split('?')
        tokenId = splitUrl[0]
    }
    return `https://api.rarible.org/v0.1/items/${blockchain}:${contractAdress}:${tokenId}`
}

export function getCollectionByIdRequestLinkSetup(contractAdress: string){
    return `https://api.rarible.org/v0.1/collections/${contractAdress}`
}
//const resultlink = apiRequestLinkSetup(url)
//console.log(resultlink)

export function getItemsByCollectionRequest(collection: string, size: number, continuation?: string){
    //let collectionArray = collection.split(':')
    //collection = `${collectionArray[0]}?${collectionArray[1]}`
    console.log(collection)
    if(continuation == undefined){
        return `https://api.rarible.org/v0.1/items/byCollection?collection=${collection}&size=${size}`
    }else {
        return `https://api.rarible.org/v0.1/items/byCollection?collection=${collection}&continuation=${continuation}&size=${size}`
    }
    
}

export function attributesToProperties(collectionVariants: CollectionAttibutes, nftData: Item){
    let countedProperties: Properties = {
        attributesArray: [],
        collectionTotal: collectionVariants.collectionTotal
    }
    let key_found: boolean = false
    let attribute_found: boolean = false

    for(let i = 0; i < nftData.meta?.attributes.length!; ++i){
        key_found = false
        let j = 0
        while(j < collectionVariants.attributes.length && key_found == false){
            if(collectionVariants.attributes[j].key == nftData.meta?.attributes[i].key){
                key_found = true
                attribute_found = false
                let k = 0
                while(k < collectionVariants.attributes[j].values.length && attribute_found == false){
                    if(collectionVariants.attributes[j].values[k].value == nftData.meta?.attributes[i].value){
                        attribute_found = true
                        let nftMeta: MetaAttributes = {
                            key: collectionVariants.attributes[j].key,
                            value: collectionVariants.attributes[j].values[k].value,
                            amount: collectionVariants.attributes[j].values[k].amount,
                        }
                        countedProperties.attributesArray.push(nftMeta)
                    }
                    k++
                }
                if(attribute_found == false){
                    let nftMeta: MetaAttributes = {
                        key: collectionVariants.attributes[j].key,
                        value: collectionVariants.attributes[j].values[collectionVariants.attributes[j].values.length].value,
                        amount: collectionVariants.attributes[j].values[collectionVariants.attributes[j].values.length].amount,
                    }

                }
            }
            j++
        }
    }

    return countedProperties
}

function pointsSort(Points: Array<ScorePrice>){
    let sorted: boolean = false
    while(sorted == false){
        sorted = true
        for(let i = 0; i < Points.length-1; i++){
            if(Points[i].score > Points[i+1].score){
               let temp: ScorePrice = Points[i]
               Points[i] = Points[i+1]
               Points[i+1] = temp
               sorted = false
            }
        }
    }

   
    for (let i = 0; i < Points.length; ++i){
        console.log(`POINT #${i}: ${Points[i].score} / ${Points[i].price}`)
    }
    return Points
}


export async function graphDrow(Points: Array<ScorePrice>){
    Points = pointsSort(Points)
    let hScore: number = Points[Points.length-1].score
    let lScore: number = Points[0].score
    let bar: number = (hScore - lScore) / 7

    
    let background = await loadImage(
        path.join(__dirname, '../test.png')
    )
    //let nftImage = await loadImage(`${nftData.meta?.content[0].url}`)

    const canvas = createCanvas(1920, 1080)
    const context = canvas.getContext('2d')
    context.fillStyle = '#333333'
    context.fillRect(0,0,500,500)
    context.drawImage(background, 0,0,5000,500)
    //const buffer = canvas.toBuffer('image/png')
    //context.drawImage(nftImage,150,400,2,2)
    context.fillStyle = "black"  
    context.lineWidth = 2.0
    context.beginPath()
    context.moveTo(50, 20)
    context.lineTo(50, 460)
    context.lineTo(460, 460)
    context.stroke()
    context.font = '20px sans-serif'
    for(let i = 0; i < 5; i++) { 
        context.fillText((5 - i) * 20 /*Переменная цены*/ + "", 4, i * 80 + 60) 
        
        
    }
    context.font = '20px sans-serif'
    for(var i=0; i < 7; i++) { 
        context.fillText((i+1) * Math.trunc(bar) + "", 90+ i*100, 480)
    }
    context.moveTo(50,460)
    for(let i = 0; i<2/*переменная*/;i++){
        context.strokeStyle = '#ffcc00'
        context.lineTo(100/*Переменная скора - 50 */,120 /* переменная цены -460*/)
        context.stroke()
        //context.lineTo(70,140)   
    }

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./commands/rarible.png',buffer)
}