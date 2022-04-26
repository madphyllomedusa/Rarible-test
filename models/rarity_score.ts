import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"
import { getItemByIdRequestLinkSetup, getItemsByCollectionRequest } from '../models/addtional_modules'; 
import { Properties, MetaAttributes } from "./models";

/*export function rarityCounter(nftData: Item){
    
    return new Promise<Properties>(async (resolve, reject)=>{
        
        let apiLink: string
        let itemsCollection: Items = {
            total: 0,
            continuation: "",
            items: [] 
        }
        const calculatedRarity: Properties = {
            attributesArray: [],
            collectionTotal: 0
        }
        let request_passed: boolean = true
        let amountItemsInCollection: number = 0
        let attributeCounter: number = 0
        for (let i = 0; i < nftData.meta?.attributes.length!; ++i){
            let nftMeta: MetaAttributes = {
                key: "",
                value: "",
                rarityScore: 0,
                rarityPerc: 0
            }
            nftMeta.key = nftData.meta?.attributes[i].key
            nftMeta.value = nftData.meta?.attributes[i].value
            calculatedRarity.attributesArray.push(nftMeta)
            for(let j = 0; j < calculatedRarity.attributesArray.length; ++j){
                console.log(`INSTIDE FOR --KEY: ${calculatedRarity.attributesArray[j].key} VALUE: ${calculatedRarity.attributesArray[j].value} SCORE: ${calculatedRarity.attributesArray[j].rarityScore}`)
            }
            console.log("-------")
        }
        console.log(`COLLECTION ITEMS TOTAL: ${calculatedRarity.collectionTotal}`)
        for(let i = 0; i < calculatedRarity.attributesArray.length; ++i){
            console.log(`KEY: ${calculatedRarity.attributesArray[i].key} VALUE: ${calculatedRarity.attributesArray[i].value} SCORE: ${calculatedRarity.attributesArray[i].rarityScore}`)
        }
        apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
        console.log(`ITEMS BY COLLECTION REQUEST LINK ${apiLink}`)
        do{
            console.log("INSIDE CHECK")
            await sendApiRequest(apiLink).then(data => {
                request_passed = true
                itemsCollection = data
                amountItemsInCollection += itemsCollection.total
                for(let i = 0; i < nftData.meta?.attributes.length!; ++i){
                    attributeCounter = 0
                    for(let j = 0; j < itemsCollection.items.length; ++j){
                        if(itemsCollection.items[j].meta?.attributes !== undefined || itemsCollection.items[j].meta?.attributes.length !== 0){
                            for(let k = 0; k < itemsCollection.items[j].meta?.attributes.length!; ++k){
                                if(nftData.meta?.attributes[i].key == itemsCollection.items[j].meta?.attributes[k].key && 
                                    nftData.meta?.attributes[i].value == itemsCollection.items[j].meta?.attributes[k].value){
                                        ++attributeCounter
                                }
                            }
                        }   
                    }
                    calculatedRarity.attributesArray[i].rarityScore += attributeCounter
                }
                
            }).catch(error => {
                console.log(`GET ITEMS BY COLLECTION REQUEST FAILED with`)
                console.log(`API LINK: ${apiLink}`)
                console.log(error)
                reject(error)
                request_passed = false
            })
            apiLink = getItemsByCollectionRequest(nftData.collection!, 1000, itemsCollection.continuation)
            console.log(`collection total ${amountItemsInCollection}, continuation key ${itemsCollection.continuation}, request_passed ${request_passed}`)
        }while(itemsCollection.total >= 1000 && itemsCollection.continuation !== undefined && request_passed)
        calculatedRarity.collectionTotal = amountItemsInCollection
        console.log(`COLLECTION ITEMS TOTAL: ${calculatedRarity.collectionTotal}`)
        for(let i = 0; i < calculatedRarity.attributesArray.length; ++i){
            console.log(`KEY: ${calculatedRarity.attributesArray[i].key} VALUE: ${calculatedRarity.attributesArray[i].value} SCORE: ${calculatedRarity.attributesArray[i].rarityScore}`)
        }
        if(request_passed){
        await resolve(calculatedRarity)
        }
    })
}*/

export function rarityCounter(nftData: Item){

    return new Promise<Properties>(async (resolve, reject)=>{
        let apiLink: string
        let itemsCollection: Items = {
            total: 0,
            continuation: "",
            items: [] 
        }
        const calculatedRarity: Properties = {
            attributesArray: [],
            collectionTotal: 0
        }
        let request_passed: boolean = true
        let amountItemsInCollection: number = 0
        let attributeCounter: number = 0

        apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
        console.log(`ITEMS BY COLLECTION REQUEST LINK ${apiLink}`)
        do{

            console.log("INSIDE CHECK")
            await sendApiRequest(apiLink).then(data => {
                request_passed = true
                itemsCollection = data
                amountItemsInCollection += itemsCollection.total

            }).catch(error => {
                console.log(`GET ITEMS BY COLLECTION REQUEST FAILED with`)
                console.log(`API LINK: ${apiLink}`)
                console.log(error)
                reject(error)
                request_passed = false
            })
        }while(itemsCollection.total >= 1000 && itemsCollection.continuation !== undefined && request_passed)

    })
}