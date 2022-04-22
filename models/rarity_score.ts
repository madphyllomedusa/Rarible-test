import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"
import { getItemsByCollectionRequest } from '../models/addtional_modules'; 
import { Properties, MetaAttributes } from "./models";


export function rarityCounter(nftData: Item){
    return new Promise(async (resolve, reject)=>{
        let calculatedRarity: Properties | undefined = undefined
        let nftMeta: MetaAttributes | undefined = undefined
        let itemsCollection: Items
        let apiLink: string
        let attributeCounter: number = 0
        let amountItemsInCollection: number = 0;
        
        do {
            apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
            console.log(`item by collection ${apiLink}`)
            itemsCollection = await sendApiRequest(apiLink).then(data =>{
                return data
            }).catch(error => {
                console.log(error)
                reject(error)
            })

            amountItemsInCollection += itemsCollection.total

           for(let i = 0; i < nftData.meta?.attributes.length!; i++){
               attributeCounter = 0
               for(let j = 0; j < itemsCollection.items.length; j++){
                   for(let k = 0; k < itemsCollection.items[j].meta?.attributes.length!; k++){
                       if(nftData.meta?.attributes[i].key == itemsCollection.items[j].meta?.attributes[k].key && 
                            nftData.meta?.attributes[i].value == itemsCollection.items[j].meta?.attributes[k].value){
                                attributeCounter++
                        }
                   }
               }
                nftMeta!.key = nftData.meta?.attributes[i].key
                nftMeta!.value = nftData.meta?.attributes[i].value
                nftMeta!.rarityScore = attributeCounter
                calculatedRarity!.attributesArray.push(nftMeta!)
           }
           
        }while (itemsCollection.total >= 1000)
        calculatedRarity!.collectionTotal = amountItemsInCollection
        resolve(calculatedRarity)
    })
}