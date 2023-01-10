import {Client , GatewayIntentBits , EmbedBuilder, AttachmentBuilder, time} from 'discord.js';
import {config} from 'dotenv';

config();

//Create array to store last 24 hours users 
var holdersLastDay = [];
var time_reset = Date.now();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.on('ready', () => {
  console.log("Bot Started........")
  const holderUpdateChannel = client.channels.cache.find(channel => channel.name === 'welcome-holder')
  holderUpdateChannel.send("**Greetor Has been deployed**") 
  console.log(`Logged in as ${client.user.tag}!`);
});

//Role Update event
client.on('guildMemberUpdate', (oldmember, newmember) =>
{   
  if(oldmember.roles.cache.size < newmember.roles.cache.size)
  {
    //Check if Holder role updates to ovols
    const ovolsHolderRoleID = "1043042371996229692"
    var isOvolHolderRoleAdded = (!oldmember.roles.cache.has(ovolsHolderRoleID)) && newmember.roles.cache.has(ovolsHolderRoleID)

    //Check Reset condition
    var time_elapsed = Date.now()-time_reset
    if(time_elapsed > 86400000 && isOvolHolderRoleAdded)
    {
         console.log("Reset Last 24 hours Users");
         const holderUpdateChannel = client.channels.cache.find(channel => channel.name === 'welcome-holder')
         holderUpdateChannel.send("**User Reset Done for last 24 hours**") 
         holdersLastDay=[]
         time_reset= Date.now()
    }
    
    //Do HOLDER UPDATE
    if( isOvolHolderRoleAdded && !holdersLastDay.includes(newmember.id))
    {
         //Find Holder Channel to post Update
         const holderUpdateChannel = client.channels.cache.find(channel => channel.name === '💬│the-city')
         
         //welcome image
         const file = new AttachmentBuilder('./Welcome.jpg');

         //Create Embeded Message
         const embed = new EmbedBuilder()
            .setColor('#8652ff')
            .setThumbnail(oldmember.user.displayAvatarURL())
            .setTitle('Elixir City has a New Citizen 🔮')
            .setDescription(`Welcome our new holder **${newmember.user.username}** to the City!\n${newmember}\n\n**HOOT HOOT** 🦉\n\n`)
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
         holdersLastDay.push(oldmember.user.id)
    }
  }
});

//bot login
client.login(process.env.BOT_TOKEN);
