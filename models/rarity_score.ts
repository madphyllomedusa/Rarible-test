import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"
import { getItemsByCollectionRequest } from '../models/addtional_modules'; 
import { Properties, MetaAttributes } from "./models";


export function rarityCounter(nftData: Item){
    return new Promise<Properties>(async (resolve, reject)=>{
        let calculatedRarity: Properties | undefined = {
            attributesArray: [],
            collectionTotal: 0
        }
        let nftMeta: MetaAttributes | undefined = {
            key: "",
            value: "",
            rarityPerc: 0,
            rarityScore: 0
        }
        let itemsCollection: Items
        let apiLink: string
        let attributeCounter: number = 0
        let amountItemsInCollection: number = 0;
        for (let i = 0; i < nftData.meta?.attributes.length!; ++i){
            calculatedRarity.attributesArray.push(nftMeta!)
        }
        console.log(`CALCULATED RARITY ${calculatedRarity.attributesArray.length}`)
        apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
        do {
            console.log(`item by collection ${apiLink}`)
            itemsCollection = await sendApiRequest(apiLink).then(data =>{
                return data
            }).catch(error => {
                console.log(error)
                reject(error)
            })

            amountItemsInCollection += itemsCollection!.total
            console.log(`nftData.meta?.attributes.length   ${nftData.meta?.attributes.length}`)

           for(let i = 0; i < nftData.meta?.attributes.length!; ++i){
               attributeCounter = 0
               console.log(`${i} ATRUBUTE -- ${nftData.meta?.attributes[i].key}:  ${nftData.meta?.attributes[i].value}`)

               for(let j = 0; j < itemsCollection.items.length; ++j){
                   //console.log(`ITEMS COLLECTION LENGTH -- ${itemsCollection.items.length}`)
                   //console.log(`ITERATION ${j}`)

                   for(let k = 0; k < itemsCollection.items[j].meta?.attributes.length!; ++k){

                       if(nftData.meta?.attributes[i].key == itemsCollection.items[j].meta?.attributes[k].key && 
                            nftData.meta?.attributes[i].value == itemsCollection.items[j].meta?.attributes[k].value){
                                ++attributeCounter
                                //console.log(`ATTRIBUTE COUNTER ${attributeCounter}`)

                        }
                   }
                }
                console.log(`attributeCounter ${attributeCounter}`)
                console.log(nftData.meta?.attributes[i].key)
                nftMeta.key = nftData.meta?.attributes[i].key
                nftMeta.value = nftData.meta?.attributes[i].value
                nftMeta.rarityScore = attributeCounter
                //console.log(`COUNTER ${i}`)
                calculatedRarity.attributesArray[i].key = nftMeta.key
                calculatedRarity.attributesArray[i].value = nftMeta.value
                calculatedRarity.attributesArray[i].rarityScore = nftMeta.rarityScore
           }
           apiLink = getItemsByCollectionRequest(nftData.collection!, 1000, itemsCollection.continuation)
           //console.log("ARRAY PUSHED")
           //calculatedRarity.attributesArray.push(nftMeta!)
        }while (itemsCollection.total >= 1000)
        calculatedRarity!.collectionTotal = amountItemsInCollection
        console.log(`ATTRIBUTES ARRAY LENGTH ${calculatedRarity.attributesArray.length}`)
        console.log(`COLLECTION TOTAL  ${calculatedRarity.collectionTotal}`)
        //console.log(`RESULT    ${calculatedRarity}`)
        console.log("RESULT")
        for(let i = 0; i < calculatedRarity.attributesArray.length; ++i){
            console.log(`ARRAY KEY ${i} -- ${calculatedRarity.attributesArray[i].key}`)
            console.log(`ARRAY VALUE ${i} -- ${calculatedRarity.attributesArray[i].value}`)
            console.log(`ARRAY SCORE ${i} -- ${calculatedRarity.attributesArray[i].rarityScore}`)
        }
        resolve(calculatedRarity!)
    })
}