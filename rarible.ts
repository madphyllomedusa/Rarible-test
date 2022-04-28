import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
})

client.on('ready',async () => {
    console.log('bot ready')
    new WOKCommands(client, {
        commandDir: path.join(__dirname,'commands'),
        typeScript: true,
        testServers:['965209143801704480'],
        mongoUri:process.env.MONGO_URI,
        dbOptions:{
            keepAlive: true
        }
        
    })

})

client.login(process.env.TOKEN)