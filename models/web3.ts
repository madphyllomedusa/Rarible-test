/*import Web3 from "web3"
import { createRaribleSdk } from "@rarible/sdk"
import { EthereumWallet } from "@rarible/sdk-wallet"
import { Blockchain } from "@rarible/api-client"
import { Web3Ethereum } from "@rarible/web3-ethereum"
import {Item} from "@rarible/api-client/build/models/Item"


const { ethereum } = window as any
const web3 = new Web3('https://mainnet.infura.io/v3/ca2831cbd6764b3fb2288444f046c163')
const web3Ethereum = new Web3Ethereum({ web3 })
const ethWallet = new EthereumWallet(web3Ethereum)
const raribleSdk = createRaribleSdk(ethWallet, "staging")

//let link: string
//let nftMeta: Promise<Item>

//nftMeta = raribleSdk.apis.item.getItemById({'itemId':link})
//nftMeta.then(item =>{
//    console.log('request resolved', item)
    
//})
export function getNftDataById(link: string){
    raribleSdk.apis.item.getItemById({'itemId': link}).then(item => {
        console.log(`request resolved ${item.id}`)
    })
}*/