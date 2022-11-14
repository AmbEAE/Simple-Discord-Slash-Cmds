const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv'); dotenv.config();

const commands = [{
    name: 'ping',
    description: 'Replies with Pong!'
}];

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Lancement des slash (/) commandes.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log("J'ai fini de charger les slash (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let randomStatus = [
        "/ping",
        "By @Ambre👑 #0001",
    ];
    setInterval(function () {
        let status = randomStatus[Math.floor(Math.random() * randomStatus.length)];
        client.user.setActivity(status, {type: "STREAMING", url: 'https://www.twitch.tv/ambreae'});
    }, 5000);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('> 🏓 Pong !');
    }
});

client.login(process.env.TOKEN);