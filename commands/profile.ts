import { Interaction, MessageActionRow, MessageSelectMenu,MessageEmbed, MessageAttachment } from 'discord.js'
import { ICommand } from 'wokcommands'
import path from 'path'
import embed from './embed'


export default{
    category: 'profile',
    description: 'your profile',
    slash: true,
    testOnly: true,

    
    callback: async({user,message,interaction,channel,args}) => {
        const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(1)
					.addOptions([
						{
							label: 'ETHIRIUM',
							description: 'bind your wallet',
							value: '1_option',
						},
						{
							label: 'FLOW',
							description: 'bind your wallet',
							value: '2_option',
						},
						{
							label: 'TEZOS',
							description: 'bind your wallet',
							value: '3_option',
						},
                        {
							label: 'MATIC',
							description: 'bind your wallet',
							value: '4_option',
						},
					]),
			)
			
            const embed = new MessageEmbed()
                .setColor('#ffcc00')
                .setTitle('Use your wallet')
                .setImage('https://cdn.discordapp.com/attachments/967536440743448627/968483220796637214/addWallet.png')
                .setThumbnail('')
                
        
        await interaction.reply({
        embeds: [embed],
        components: [row]})
    }

} as ICommand