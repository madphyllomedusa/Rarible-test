import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"
import { getItemByIdRequestLinkSetup, getItemsByCollectionRequest } from '../models/addtional_modules'; 
import { Properties, MetaAttributes, CollectionAttibutes, AttributeKeys, AttributeValues } from "./models";

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

    return new Promise<CollectionAttibutes>(async (resolve, reject)=>{
        let apiLink: string
        let itemsCollection: Items = {
            total: 0,
            continuation: "",
            items: [] 
        }
       // const calculatedRarity: Properties = {
       //     attributesArray: [],
        //    collectionTotal: 0
        //}
        let COLLECTION: Array<Item> = []
        let request_passed: boolean = true
        let key_found: boolean = false
        let attribute_found: boolean = false
        let amountItemsInCollection: number = 0
        let attributeCounter: number = 0
        let collectionVariants: CollectionAttibutes = {
            attributes: [],
            collectionId: nftData.collection?.toString()!,
            collectionTotal: 0
        }
        apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
        console.log(`ITEMS BY COLLECTION REQUEST LINK ${apiLink}`)
        do{

            console.log("INSIDE CHECK")
            await sendApiRequest(apiLink).then(data => {
                request_passed = true
                itemsCollection = data
                amountItemsInCollection += itemsCollection.total
                for(let i = 0; i < itemsCollection.items.length; ++i){
                    let newItem: Item = itemsCollection.items[i]
                    COLLECTION.push(newItem)
                    for(let j = 0; j < itemsCollection.items[i].meta?.attributes.length!; ++j){
                        let k = 0
                        key_found = false
                        while(k < collectionVariants.attributes.length && key_found == false){
                            if(collectionVariants.attributes[k].key == itemsCollection.items[i].meta?.attributes[j].key){
                                key_found = true
                                let l = 0
                                attribute_found = false
                                while(l < collectionVariants.attributes[k].values.length && attribute_found == false){
                                    if(collectionVariants.attributes[k].values[l].value == itemsCollection.items[i].meta?.attributes[j].value){
                                        attribute_found = true
                                    }
                                    l++
                                }
                                if(attribute_found == false){
                                    let newValue: AttributeValues = {
                                        value: itemsCollection.items[i].meta?.attributes[j].value,
                                        amount: 0,
                                    }
                                    collectionVariants.attributes[k].values.push(newValue)
                                }
                            }
                            k++
                        }
                        if(key_found == false){
                            let newValue: AttributeValues = {
                                value: itemsCollection.items[i].meta?.attributes[j].value,
                                amount: 0,
                            }
                            let valueArray: Array<AttributeValues> = []
                            valueArray.push(newValue)
                            let newKey: AttributeKeys = {
                                key: itemsCollection.items[i].meta?.attributes[j].key,
                                values: valueArray,
                            }
                            collectionVariants.attributes.push(newKey)
                        }
                    }
                }

            }).catch(error => {
                console.log(`GET ITEMS BY COLLECTION REQUEST FAILED with`)
                console.log(`API LINK: ${apiLink}`)
                console.log(error)
                reject(error)
                request_passed = false
            })
            console.log(`ITEMs SAVED ${COLLECTION.length}`)
            apiLink = getItemsByCollectionRequest(nftData.collection!, 1000, itemsCollection.continuation)
            console.log(`collection total ${amountItemsInCollection}, continuation key ${itemsCollection.continuation}, request_passed ${request_passed}`)
        }while(itemsCollection.total >= 1000 && itemsCollection.continuation !== undefined && request_passed)
        console.log(`ITEMs SAVED TOTAL ${COLLECTION.length}`)
        for(let i = 0; i < collectionVariants.attributes.length; ++i){
            let noneValue: AttributeValues = {
                value: "<none>",
                amount: 0,
            }
            collectionVariants.attributes[i].values.push(noneValue)
        }
        console.log(`COLLECTION ATTRIBUTES: `)
        for(let i = 0; i < collectionVariants.attributes.length; ++i){
            console.log(`   KEY: ${collectionVariants.attributes[i].key}`)
            console.log(`   AMOUNT OF TYPES: ${collectionVariants.attributes[i].values.length}`)
            for(let j = 0; j < collectionVariants.attributes[i].values.length; ++j){
                console.log(`       VALUE: ${collectionVariants.attributes[i].values[j].value}`)
            }
        }
        /*for(let i = 0; i < COLLECTION.length; ++i){
            for(let j = 0; j < COLLECTION[i].meta?.attributes.length!; ++j){
                for(let k = 0; k < collectionVariants.attributes.length; ++k){
                    if(collectionVariants.attributes[k].key == COLLECTION[i].meta?.attributes[j].key){
                        for(let l = 0; l < collectionVariants.attributes[k].values.length; ++l){
                            let types_amount: number = collectionVariants.attributes[k].values.length
                            if(collectionVariants.attributes[k].values[l].value == COLLECTION[i].meta?.attributes[j].value){
                                collectionVariants.attributes[k].values[l].amount++
                            }
                            else {
                                collectionVariants.attributes[k].values[types_amount].amount++
                            }
                        }
                    }
                }
            }
        }*/
        for(let i = 0; i < COLLECTION.length; ++i){
            for(let j = 0; j < COLLECTION[i].meta?.attributes.length!; ++j){
                let k = 0
                key_found = false
                while(k < collectionVariants.attributes.length && key_found == false){
                    if(collectionVariants.attributes[k].key == COLLECTION[i].meta?.attributes[j].key){
                        key_found = true
                        attribute_found = false
                        let l = 0
                        let types_amount: number = collectionVariants.attributes[k].values.length
                        while(l < collectionVariants.attributes[k].values.length && attribute_found == false){
                            if(collectionVariants.attributes[k].values[l].value == COLLECTION[i].meta?.attributes[j].value){
                                attribute_found = true
                                collectionVariants.attributes[k].values[l].amount++
                            }
                            l++
                        }
                        if(attribute_found == false){
                            collectionVariants.attributes[k].values[types_amount].amount++
                        }
                    }
                    k++
                }
            }
        }
        collectionVariants.collectionTotal = COLLECTION.length
        console.log(`COLLECTION ATTRIBUTES: `)
        for(let i = 0; i < collectionVariants.attributes.length; ++i){
            console.log(`   KEY: ${collectionVariants.attributes[i].key}`)
            console.log(`   AMOUNT OF TYPES: ${collectionVariants.attributes[i].values.length}`)
            for(let j = 0; j < collectionVariants.attributes[i].values.length; ++j){
                console.log(`       VALUE: ${collectionVariants.attributes[i].values[j].value}`)
                console.log(`       AMOUNT: ${collectionVariants.attributes[i].values[j].amount}`)
            }
        }
        console.log(`RARITY SCORE RESOLVED`)
        resolve(collectionVariants)

    })
}