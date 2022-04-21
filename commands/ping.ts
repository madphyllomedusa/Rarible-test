/*import { ICommand } from 'wokcommands'
//import {sendRequest} from "../models/api"
import {Item} from "@rarible/api-client/build/models/Item"
import { MessageEmbed } from "discord.js";

export default {
  category: 'Testing',
  description: 'Replies with pong', // Required for slash commands
  
  slash: true, // Create both a slash and legacy command
  testOnly: true, // Only register a slash command for the testing guilds
  
  callback: async ({message,text}) => {
    let nftData: Promise<Item>
    
   // nftData = sendRequest().then(data => {
      console.log(data)
      return data
    })
    //getNftDataById("ETHEREUM:0x5cc5b05a8a13e3fbdb0bb9fccd98d38e50f90c38:19037")
    const embed = new MessageEmbed()
      .setTitle('your NFT bro')
      //.setDescription(`Collection: ${nftData.then(data => {return data.collection})}`)
  },
} as ICommand*/ 