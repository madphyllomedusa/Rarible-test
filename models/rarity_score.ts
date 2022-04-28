import {sendApiRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import {Collection} from "@rarible/api-client/build/models/Collection"
import {Items} from "@rarible/api-client/build/models/Items"
import { getItemByIdRequestLinkSetup, getItemsByCollectionRequest, graphDrow } from '../models/addtional_modules'; 
import { CollectionAttibutes, AttributeKeys, AttributeValues, ScorePrice } from "./models";

export function rarityCounter(nftData: Item){

    return new Promise<CollectionAttibutes>(async (resolve, reject)=>{
        let apiLink: string
        let itemsCollection: Items = {
            total: 0,
            continuation: "",
            items: [] 
        }
       
        let COLLECTION: Array<Item> = []
        let graphPoints: Array<ScorePrice> = []
        let request_passed: boolean = true
        let key_found: boolean = false
        let attribute_found: boolean = false
        let amountItemsInCollection: number = 0
        let attributeCounter: number = 0
        let collectionVariants: CollectionAttibutes = {
            attributes: [],
            collectionId: nftData.collection?.toString()!,
            collectionTotal: 0,
            Acoff: 0,
            Bcoff: 0,
        }
        apiLink = getItemsByCollectionRequest(nftData.collection!, 1000)
        console.log(`ITEMS BY COLLECTION REQUEST LINK ${apiLink}`)
        do{

            console.log("INSIDE CHECK")
            await sendApiRequest(apiLink).then(data => {
                console.log("INSIDE API CHECK")
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
        
        for(let i = 0; i < COLLECTION.length; ++i){
            for(let j = 0; j < collectionVariants.attributes.length; ++j){
                key_found = false
                let k = 0
                while(k < COLLECTION[i].meta?.attributes.length! && key_found == false){
                    if(COLLECTION[i].meta?.attributes[k].key == collectionVariants.attributes[j].key){
                        //console.log(" KEY FOUND")
                        key_found = true
                        attribute_found = false
                        let l = 0
                        while(l < collectionVariants.attributes[j].values.length && attribute_found == false){
                            if(collectionVariants.attributes[j].values[l].value == COLLECTION[i].meta?.attributes[k].value){
                                attribute_found = true
                                collectionVariants.attributes[j].values[l].amount++
                            }
                            l++
                        }

                    }
                    k++
                }
                if(key_found == false){
                    //console.log(`NONE TRAIT`)
                    let types_amount = collectionVariants.attributes[j].values.length
                    collectionVariants.attributes[j].values[types_amount-1].amount++
                }
            }
        }

         console.log(`COLLECTION ATTRIBUTES: `)
        for(let i = 0; i < collectionVariants.attributes.length; ++i){
            console.log(`   KEY: ${collectionVariants.attributes[i].key}`)
            console.log(`   AMOUNT OF TYPES: ${collectionVariants.attributes[i].values.length}`)
            for(let j = 0; j < collectionVariants.attributes[i].values.length; ++j){
                console.log(`       VALUE: ${collectionVariants.attributes[i].values[j].value}`)
                console.log(`       AMOUNT: ${collectionVariants.attributes[i].values[j].amount}`)
            }
        }
        
        collectionVariants.collectionTotal = COLLECTION.length
        for (let i = 0; i < COLLECTION.length; ++i){
            if(COLLECTION[i].bestSellOrder?.makePrice !== undefined){
                let RarityScore: number = 0
                for(let j = 0; j < collectionVariants.attributes.length; ++j){
                    key_found = false
                    let k = 0
                    while(k < COLLECTION[i].meta?.attributes.length! && key_found == false){
                        //console.log(`${COLLECTION[i].meta?.attributes[k].key} == ${collectionVariants.attributes[j].key}`)
                        if(COLLECTION[i].meta?.attributes[k].key == collectionVariants.attributes[j].key){
                            //console.log(" KEY FOUND")
                            key_found = true
                            attribute_found = false
                            let l = 0
                            while(l < collectionVariants.attributes[j].values.length && attribute_found == false){
                                if(collectionVariants.attributes[j].values[l].value == COLLECTION[i].meta?.attributes[k].value){
                                    attribute_found = true
                                    RarityScore += (collectionVariants.collectionTotal / collectionVariants.attributes[j].values[l].amount)
                                }
                                l++
                            }

                        }
                        k++
                    }
                    if(key_found == false){
                        //console.log(`NONE TRAIT`)
                        let types_amount = collectionVariants.attributes[j].values.length
                        RarityScore += (collectionVariants.collectionTotal / collectionVariants.attributes[j].values[types_amount-1].amount)
                    }
                }
                let newEl: ScorePrice = {
                    score: RarityScore,
                    price: COLLECTION[i].bestSellOrder?.makePrice?.toString(),
                }
                //console.log(`ERERE RER ${newEl.price}   ${newEl.score}`)
                graphPoints.push(newEl)
            }
        }
        /*console.log(`COLLECTION ATTRIBUTES: `)
        for(let i = 0; i < collectionVariants.attributes.length; ++i){
            console.log(`   KEY: ${collectionVariants.attributes[i].key}`)
            console.log(`   AMOUNT OF TYPES: ${collectionVariants.attributes[i].values.length}`)
            for(let j = 0; j < collectionVariants.attributes[i].values.length; ++j){
                console.log(`       VALUE: ${collectionVariants.attributes[i].values[j].value}`)
                console.log(`       AMOUNT: ${collectionVariants.attributes[i].values[j].amount}`)
            }
        }*/
        let lineCoffs = {
            Acoff: 0,
            Bcoff: 0
        }
        console.log(`POINTS AMOUNT: ${graphPoints.length}`)
        lineCoffs = await graphDrow(graphPoints)
        collectionVariants.Acoff = lineCoffs.Acoff
        collectionVariants.Bcoff = lineCoffs.Bcoff
            
        console.log(`COFFS: ${collectionVariants.Acoff}  ${collectionVariants.Bcoff}`)
        console.log(collectionVariants)
        console.log(`RARITY SCORE RESOLVED`)
        resolve(collectionVariants)

    })
}