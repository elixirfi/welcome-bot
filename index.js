import {Client , GatewayIntentBits , EmbedBuilder, AttachmentBuilder, time} from 'discord.js';
import {config} from 'dotenv';

// Testing Build
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.on('ready', () => {
  console.log("Bot Started........")
  console.log(`Logged in as ${client.user.tag}!`);
});

//Role Update event
client.on('guildMemberUpdate', (oldmember, newmember) =>
{
    //Check if Holder role updates to ovols
    const ovolsHolderRoleID = "1043042371996229692"
    if(!oldmember.roles.cache.has(ovolsHolderRoleID) && newmember.roles.cache.has(ovolsHolderRoleID))
    {
         //Find Holder Channel to post Update
         const holderUpdateChannel = client.channels.cache.find(channel => channel.name === 'welcome-holder')
        
         //welcome image
         const file = new AttachmentBuilder('./Welcome.jpg');

         //Create Embeded Message
         const embed = new EmbedBuilder()
            .setColor('#8652ff')
            .setThumbnail(oldmember.user.displayAvatarURL())
            .setTitle('Elixir City has a New Citizen  🔮')
            .setDescription(`Welcome our new holder ${oldmember.user}  to the City !\n\n **HOOT HOOT!** 🦉\n\n`)
            .setImage('attachment://Welcome.jpg')

         //Send Update
         try{
          holderUpdateChannel.send({ embeds: [embed] , files: [file] });
         }
         catch(e)
         {
          console.log(e)
         }

         //Logging here about the new holder
         const timestamp = Date.now();
         console.log(`User  ${oldmember.user.username}#${oldmember.user.discriminator} became a holder at timestamp ${timestamp}`)
    }
});

//bot login
client.login(process.env.BOT_TOKEN);
