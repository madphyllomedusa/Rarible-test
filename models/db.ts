import { User } from "discord.js";
import mongoose from "mongoose";
//import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import { getItemByIdRequestLinkSetup, getCollectionByIdRequestLinkSetup } from '../models/addtional_modules'; 
import { rarityCounter } from '../models/rarity_score'
import { Properties } from '../models/models'
//import { collectionData } from "../commands/scannft";


/*export function collectionNames(collectionName: string){
    
    const schema = new mongoose.Schema({
        userId:{
            type: String,
            required:true
        },
        
        nftAtributes:{
            type: String,
            default: null
        },
    
        userFlowWallet:{
            type: String,
            default: null
        },
        userTezosWallet:{
            type: String,
            default: null
        },
        userMaticWallet:{
            type: String,
            default: null
        }
    })
    return mongoose.model('testing', schema, `${collectionName}`)
}*/

export const schema = new mongoose.Schema({
    rareScore:{
        type: Number,
        default: 0
    },
    rankCollection:{
        type: Number,
        default: 0 
    }
})

//export default mongoose.model('testing', schema, `${collectionData.meta?.name}`)