import 'dotenv/config'

import express from 'express';
const app = express()
app.get("/", (req, res) => {
    res.send(`John 3:16 "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.`)
})

app.listen(3000, () => {
    console.log(`Express running`)
})


import {
  Client,
  GatewayIntentBits,
  StringSelectMenuBuilder,
  SlashCommandBuilder,
  PermissionsBitField,
  ButtonBuilder,
  EmbedBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder,
  REST,
  ButtonStyle,
  Routes,
} from "discord.js";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildInvites,
  ],
  allowedMentions: { 
    parse: ["roles", "users"],
    repliedUser: false,
  },
});
import fetch from 'node-fetch';
const rest = new REST().setToken(process.env.BOT_TOKEN);

client.on("ready", () => {
  client.user.setPresence({
    activities: [{ name: "/help" }],
    status: "online",
  });
  console.log(`Logged in as ${client.user.tag}`)
});
// 3276799

for (const e of ["rejectionHandled", "unhandledRejection", "uncaughtException"])
process.on(e, (error) => {
    console.error(error);
});

const commands = [
  {
    name: "help",
    description: "Bromu help",
  },
];

(async () => {
  try {
    await rest
.put(Routes.applicationCommands("840331113104801825"), { body: commands })
      .then(() =>
        console.log("Successfully registered application (/) commands.")
      );
  } catch (error) {
    console.error(error);
  }
})();

client.on("interactionCreate", async (interaction) => {
if(interaction.isStringSelectMenu()){
  const { fun, utility, moderation, roleplay } = require("./embeds.js");
  if (interaction.customId === "help") {
    switch (interaction.values[0]) {
      case "first":
        await interaction.update({ embeds: [fun] });
        break;
      case "second":
        await interaction.update({ embeds: [utility] });
        break;
      case "third":
        await interaction.update({ embeds: [moderation] });
        break;
      case "fourth":
        await interaction.update({ embeds: [roleplay] });
        break;
    }
  }
  if (interaction.customId === "shelp") {
    switch (interaction.values[0]) {
      case "first":
        await interaction.update({ embeds: [fun] });
        break;
      case "second":
        await interaction.update({ embeds: [utility] });
        break;
      case "third":
        await interaction.update({ embeds: [moderation] });
        break;
      case "fourth":
        await interaction.update({ embeds: [roleplay] });
        break;
    }
  }
}
  if (interaction.isChatInputCommand()) {
  if (interaction.commandName === "help") {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Help Menus:")
          .addFields(
            { name: "**`Fun`**", value: "Fun commands" },
            { name: "**`Utility`**", value: "Utility commands" },
            { name: "**`Moderation`**", value: "Moderation commands" },
            { name: "**`Roleplay`**", value: "Roleplay commands" }
          )
          .setFooter({ text: "Prefix: $" })
          .setColor('#2c2d31')
          .setThumbnail(client.user.displayAvatarURL({ extension: "png" })),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("shelp")
            .setPlaceholder("Choose Help Menu")
            .addOptions(
              new StringSelectMenuOptionBuilder()
                .setLabel("Fun")
                .setValue("first")
                .setEmoji("🌑"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Utility")
                .setValue("second")
                .setEmoji("🐚"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Moderation")
                .setValue("third")
                .setEmoji("🏯"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Roleplay")
                .setValue("fourth")
                .setEmoji("🖤")
            )
        ),
      ],
      fetchReply: true
    }).then((message) => {
      setTimeout(() => message.edit({
      components: [
        new ActionRowBuilder().addComponents(
        StringSelectMenuBuilder.from(message.components[0].components[0])
           .setDisabled(true)
        ),
      ]
    }), 15000)});
  }
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.toLowerCase() === "$help") {
    await message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Help Menus:")
          .addFields(
            { name: "**`Fun`**", value: "Fun commands" },
            { name: "**`Utility`**", value: "Utility  commands" },
            { name: "**`Moderation`**", value: "Moderation commands" },
            { name: "**`Roleplay`**", value: "Roleplay commands" }
          )
          .setFooter({ text: "Prefix: $" })
          .setColor('#2c2d31')
          .setThumbnail(client.user.displayAvatarURL({ extension: "png" })),
      ],
      components: [
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("help")
            .setPlaceholder("Choose Help Menu")
            .addOptions(
              new StringSelectMenuOptionBuilder()
                .setLabel("Fun")
                .setValue("first")
                .setEmoji("🌑"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Utility")
                .setValue("second")
                .setEmoji("🐚"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Moderation")
                .setValue("third")
                .setEmoji("🏯"),
              new StringSelectMenuOptionBuilder()
                .setLabel("Roleplay")
                .setValue("fourth")
                .setEmoji("🖤")
            )
        ),
      ],
    fetchReply: true
    }).then((message) => {
      setTimeout(() => message.edit({
      components: [
        new ActionRowBuilder().addComponents(
        StringSelectMenuBuilder.from(message.components[0].components[0])
           .setDisabled(true)
        ),
      ]
    }), 15000)});
  }
});

client.on("messageCreate", async (message) => {
  const args = message.content.split(" ");
  const emojie = "<:error:1019018432315920484>";
  if (message.author.bot || !message.guild) return;
  if (args[0].toLowerCase() === "$joke") {
    const jokeJSON = await (await fetch("https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,explicit")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .addFields({
            name: `${jokeJSON.setup}`,
            value: `${jokeJSON.delivery}`,
          })
          .setColor('#2c2d31'),
      ],
    });
  }
  if (args[0].toLowerCase() === "$quote") {
    const quoteJSON = await (await fetch("https://zenquotes.io/api/random/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .addFields({
            name: `"${quoteJSON[0].q}"`,
            value: `${quoteJSON[0].a}`,
          })
          .setColor('#2c2d31'),
      ],
    });
  }
  if (args[0].toLowerCase() === "$bible") {
    const bibleJSON = await (await fetch("https://labs.bible.org/api/?passage=random&type=json")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .addFields({
            name: `${bibleJSON[0].bookname} ${bibleJSON[0].chapter}:${bibleJSON[0].verse}`,
            value: `"${bibleJSON[0].text}"`,
          })
          .setColor('#2c2d31'),
      ],
    });
  }
  if(args[0].toLowerCase() === "$suggest") {
    if (!args[1])
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} You need to type a suggestion`)
            .setColor('#2c2d31'),
        ],
      });
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Your suggestion has been sent")
          .setColor('#2c2d31'),
      ],
    })
      client.channels.cache.get("1145359462639607828").send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: `${message.author.tag}`,
              iconURL: `${message.author.displayAvatarURL({
                extension: "png",
              })}`,
            })
            .setColor('#2c2d31')
            .addFields(
              { name: `Suggestion:`, value: `${args.slice(1).join(" ")}` },
              { name: `User ID:`, value: `${message.author.id}` }
            ),
        ],
      });
  }
  if (message.content.startsWith("$8ball")) {
    if (!args[2])
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Ask a full question`)
            .setColor('#2c2d31'),
        ],
      });
    let replies = ["Yes.", "No.", "I don't know."];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2c2d31')
          .addFields(
            { name: "Question", value: `${args.slice(1).join(" ")}` },
            { name: "Answer", value: replies[(Math.floor(Math.random() * Math.floor(replies.length)))] }
          ),
      ],
    });
  }
  if (message.content.startsWith("$hug")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const hugJSON = await (await fetch("https://kawaii.red/api/gif/hug/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} hugged ${user.username}`)
          .setImage(`${hugJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$punch")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const hugJSON = await (await fetch("https://kawaii.red/api/gif/punch/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} punched ${user.username}`)
          .setImage(`${hugJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$kill")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const killJSON = await (await fetch("https://kawaii.red/api/gif/kill/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} killed ${user.username}`)
          .setImage(`${killJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$kiss")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const kissJSON = await (await fetch("https://kawaii.red/api/gif/kiss/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} kissed ${user.username}`)
          .setImage(`${kissJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$slap")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const slapJSON = await (await fetch("https://kawaii.red/api/gif/slap/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} slapped ${user.username}`)
          .setImage(`${slapJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$bite")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const biteJSON = await (await fetch("https://kawaii.red/api/gif/bite/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} bit ${user.username}`)
          .setImage(`${biteJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$blush")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const blushJSON = await (await fetch("https://kawaii.red/api/gif/blush/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} blushed at ${user.username}`)
          .setImage(`${blushJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$yeet")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const yeetJSON = await (await fetch("https://kawaii.red/api/gif/yeet/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} yeeted ${user.username}`)
          .setImage(`${yeetJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
    if (message.content.startsWith("$die")) {
    const dieJSON = await (await fetch("https://kawaii.red/api/gif/die/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} died`)
          .setImage(`${dieJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$cuddle")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const cuddleJSON = await (await fetch("https://kawaii.red/api/gif/cuddle/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} cuddled ${user.username}`)
          .setImage(`${cuddleJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$pat")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const patJSON = await (await fetch("https://kawaii.red/api/gif/pat/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${message.author.username} pat ${user.username}`)
          .setImage(`${patJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content.startsWith("$highfive")) {
    let user =
      message.mentions.users.first() ||
      (await client.users.fetch(args[1]).catch(() => null)) ||
      client.user;
    const highfiveJSON = await (await fetch("https://kawaii.red/api/gif/highfive/token=anonymous/")).json();
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `${message.author.username} highfived ${user.username}`
          )
          .setImage(`${highfiveJSON.response}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if(message.content == "$ping") {
    return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Ping: ${client.ws.ping}ms`
            )
           .setColor('#2c2d31'),
        ],
      });
  }
  if (message.content.startsWith("$firstmessage")) {
    let fetchchannel = message.mentions.channels.first() ||  message.guild.channels.cache.get(args[1]) || message.channel;
    if (
      !fetchchannel
        .permissionsFor(client.user)
        .has(["ViewChannel", "ReadMessageHistory"])
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} Missing permissions: VIEW_CHANNEL / READ_MESSAGE_HISTORY`
            )
            .setColor('#2c2d31'),
        ],
      });
    const fetchMessages = await fetchchannel.messages.fetch({
      after: 1,
      limit: 1,
    });
    const firstmsg = await fetchMessages.first();
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`First Message in ${fetchchannel.name}`)
          .setURL(firstmsg.url)
          .setThumbnail(firstmsg.author.displayAvatarURL({ extension: "png" }))
          .setDescription("Content: " + firstmsg.content)
          .addFields(
            { name: "Author", value: firstmsg.author.tag },
            { name: "Message ID", value: firstmsg.author.id },
            {
              name: "Created At",
              value: firstmsg.createdAt.toLocaleDateString(),
            }
          )
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$stats") {
    const ms = require("ms");
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${client.user.username} Stats`)
          .addFields(
            {
              name: "**Uptime**",
              value: "` " + `${ms(client.uptime)}` + " `",
              inline: true,
            },
            { name: "\u200b", value: "\u200b", inline: true },
            {
              name: "**Ping**",
              value: "` " + `${client.ws.ping}ms` + " `",
              inline: true,
            },
            {
              name: "**Servers**",
              value: "` " + `${client.guilds.cache.size}` + " `",
              inline: true,
            },
            { name: "\u200b", value: "\u200b", inline: true },
            {
              name: "**Users**",
              value: "` " + `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}` + " `",
              inline: true,
            }
          )
          .setThumbnail(client.user.displayAvatarURL({ extension: "png" }))
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$support") {
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle("Support")
          .addFields(
            { name: "Server", value: "https://discord.gg/w9wMKyfhYS" },
            { name: "Invite", value: "https://bit.ly/3VXA4Xx" }
          )
          .setColor('#2c2d31')
          .setThumbnail(client.user.displayAvatarURL({ extension: "png" })),
      ]
    });
  }
  if (message.content.startsWith("$avatar")) {
    let user =
message.mentions.users.first() || (await client.users.fetch(args[1]).catch(() => null)) || message.author;
    if (!user) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${user.tag}'s Avatar`)
          .setImage(user.displayAvatarURL({ extension: "png", size: 1024 }))
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$meme") {
    const response = await fetch("https://reddit.com/r/memes/random/.json");
    const list = await response.json();
    const post = list[0].data.children[0];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${post.data.title}`)
          .setURL(`https://reddit.com${post.data.permalink}`)
          .setColor('#2c2d31')
          .setImage(post.data.url),
      ],
    });
  }
  if (message.content === "$confession") {
    const response = await fetch(
      "https://reddit.com/r/confessions/random/.json"
    );
    const list = await response.json();
    const post = list[0].data.children[0];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${post.data.title}`)
          .setURL(`https://reddit.com${post.data.permalink}`)
          .setDescription(`||${post.data.selftext}||`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$tifu") {
    const response = await fetch("https://reddit.com/r/tifu/random/.json");
    const list = await response.json();
    const post = list[0].data.children[0];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${post.data.title}`)
          .setURL(`https://reddit.com${post.data.permalink}`)
          .setDescription(`||${post.data.selftext}||`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$horror") {
    const response = await fetch(
      "https://reddit.com/r/twosentencehorror/random/.json"
    );
    const list = await response.json();
    const post = list[0].data.children[0];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${post.data.title}`)
          .setURL(`https://reddit.com${post.data.permalink}`)
          .setDescription(`${post.data.selftext}`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (message.content === "$food") {
    const response = await fetch(
      "https://reddit.com/r/foodporn/random/.json"
    );
    const list = await response.json();
    const post = list[0].data.children[0];
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${post.data.title}`)
          .setURL(`https://reddit.com${post.data.permalink}`)
          .setColor('#2c2d31')
          .setImage(post.data.url),
      ],
    });
  }
  if (args[0].toLowerCase() === `$userinfo`) {
    let umember =
      message.mentions.members.first() || message.guild.members.cache.get(args[1]) ||
      message.member;
    if (!umember) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2c2d31')
          .setThumbnail(umember.user.displayAvatarURL({ extension: "png" }))
          .addFields(
            { name: `Username:`, value: `${umember.user.tag}` },
            { name: "ID:", value: `${umember.user.id}` },
            {
              name: "Roles:",
              value: umember.roles.cache.map((r) => `${r}`).join(" "),
            },
            {
              name: "Joined Server On:",
              value: `<t:${new Date(umember.joinedAt / 1000).getTime()}:D>`,
            },
            {
              name: "Account Created On:",
              value: `<t:${new Date(
                umember.user.createdAt / 1000
              ).getTime()}:D>`,
            }
          ),
      ],
    });
  }
  if(message.content === "$serverinfo") {
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(message.guild.name)
          .addFields(
            {
              name: "Owner:",
              value: `<@${(await message.guild.fetchOwner()).user.id}>`,
              inline: true,
            },
            { 
              name: "Members:", 
              value: `${message.guild.memberCount}`,
              inline: true,
            },
            {
              name: "Created:",
              value: `<t:${new Date(
                message.guild.createdAt / 1000
              ).getTime()}:D>`,
              inline: true,
            },
            {
              name: "Channels:",
              value: `${message.guild.channels.cache.size}`,
              inline: true,
            },
            { 
              name: "Emojis:", 
              value: `${message.guild.emojis.cache.size}`,
              inline: true,
            },
            { 
              name: "Roles:", 
              value: `${message.guild.roles.cache.size}`,
              inline: true,
            }
          )
          .setColor('#2c2d31')
          .setThumbnail(message.guild.iconURL({ extension: "png" })),
      ],
    });
  }
  if(args[0].toLowerCase() === "$nickname") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissions: MANAGE_NICKNAMES`
            )
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: MANAGE_NICKNAMES`)
            .setColor('#2c2d31'),
        ],
      });
    }
    let nickuser = message.mentions.members.first() || (await message.guild.members.fetch(args[1]).catch(() => null));
    if (!nickuser) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      nickuser.roles.highest.position >=
        message.member.roles.highest.position ||
      nickuser.roles.highest.position >=
        message.guild.members.me.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: Role Hierarchy`)
            .setColor('#2c2d31'),
        ],
      });
    var newNickname = args.slice(2).join(" ");
    nickuser.setNickname(newNickname);

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2c2d31')
          .setDescription(
            `Changed <@${nickuser.user.id}>'s nickname to "${newNickname}"`
          ),
      ],
    });
  }
  if (args[0].toLowerCase() === "$pm") {
    if (message.guild.id != "764936103903887420") return;
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageRoles)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} You are not allowed to use this`)
            .setColor('#2c2d31'),
        ],
      });
    }
    let pm = message.mentions.members.first() || (await 
    message.guild.members.fetch(args[1]).catch(() => null));
    const pmRole = await message.guild.roles.fetch("934476243934535730");
    if (!pm) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    try {
      pm.roles.add(pmRole);
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Added partner manager for **${pm}**`)
            .setColor('#2c2d31'),
        ],
      });
    } catch (err) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} ${err}`)
            .setColor('#2c2d31'),
        ],
      });
    }
  }
  if (message.content === "$pms") {
  if (!message.guild.id === "764936103903887420") return;
  const list = await message.guild.roles.fetch('934476243934535730');
    message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${list.members.size} PMs`)
          .setDescription(`${list.members.map((m) => m.user).join("\n")}`),
      ],
    });
  }
  if (args[0].toLowerCase() === "$invites") {
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageGuild
      )
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: MANAGE_SERVER`)
            .setColor('#2c2d31'),
        ],
      });
    }
    let imember =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[1]).catch(() => null)) ||
      message.member;
    if (!imember) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    const invites = await message.guild.invites.fetch();
    let amount = 0;
    invites.forEach((invite) => {
      if (!invite.inviter || invite.inviter.id !== imember.id) return;
      let uses = invite.uses;
      amount += uses;
    });
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${imember.user} has: **${amount} Invites**`)
          .setColor('#2c2d31'),
      ],
    });
  }
  if (args[0].toLowerCase() === "$role") {
    if (
      !message.member.permissions.missing(PermissionsBitField.Flags.ManageRoles)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissions: MANAGE_ROLES`
            )
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      !message.guild.me.permissions.has(PermissionsBitField.Flags.ManageRoles)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: MANAGE_ROLES`)
            .setColor('#2c2d31'),
        ],
      });
    }
    const rrole = message.mentions.roles.first() || (await message.guild.roles.fetch(args[1]).catch(() => null));
    const rmember = message.mentions.members.first() (await message.guild.members.fetch(args[2]).catch(() => null)) || message.author;
    if (!rrole) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} You didnt mention a role`)
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      rrole.position >= message.member.roles.highest.position ||
      rrole.position >=
        message.guild.members.me.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: Role Hierarchy`)
            .setColor('#2c2d31'),
        ],
      });
    if (message.member.roles.cache.has(rrole.id)) {
      rmember.roles.remove(rrole);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#2c2d31')
            .setDescription(`Role ${rrole} removed from ${rmember}.`)
            .setFooter({ text: `Requested by ${message.author.username}` }),
        ],
      });
    } else {
      rmember.roles.add(rrole);
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setColor('#2c2d31')
            .setDescription(`Role ${rrole} added to ${rmember}.`)
            .setFooter({ text: `Requested by ${message.author.username}` }),
        ],
      });
    }
  }
  if (args[0].toLowerCase() === `$kick`) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissions: KICK_MEMBERS`
            )
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.KickMembers
      )
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: KICK_MEMBERS`)
            .setColor('#2c2d31'),
        ],
      });
    }
    let kickMember =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[1]).catch(() => null));
    if (!kickMember) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      kickMember.roles.highest.position >=
        message.member.roles.highest.position ||
      kickMember.roles.highest.position >=
        message.guild.members.me.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: Role Hierarchy`)
            .setColor('#2c2d31'),
        ],
      });
    let kickembed = new EmbedBuilder()
      .setColor('#2c2d31')
      .setDescription(`${kickMember} was kicked by ${message.author}`);
    kickMember.kick(`Kicked by: ${message.author.tag}`);
    message.reply({ embeds: [kickembed] });
  }
  if(args[0].toLowerCase() === `$ban`) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissions: BAN_MEMBERS`
            )
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    ) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: BAN_MEMBERS`)
            .setColor('#2c2d31'),
        ],
      });
    }
    let banMember =
    message.mentions.members.first() || (await message.guild.members.fetch(args[1]).catch(() => null));
    if (!banMember) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    if (
      banMember.roles.highest.position >=
        message.member.roles.highest.position ||
      banMember.roles.highest.position >=
        message.guild.members.me.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: Role Hierarchy`)
            .setColor('#2c2d31'),
        ],
      });
    banMember.ban({ reason: `Banned by: ${message.author.tag}` });
    message.reply({ 
      embeds: [
        new EmbedBuilder()
        .setColor('#2c2d31')
        .setDescription(`${banMember} was banned by ${message.author}`),
      ],
      })
  }
  if (args[0].toLowerCase() === `$unban`) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} Error: You are missing permissions BAN_MEMBERS`
            )
            .setColor('#2c2d31'),
        ],
      });
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    )
      return message.reply(
        `${emojie} Error: I am missing permissions BAN_MEMBERS`
      );
    const id = args[1];
    if (!id)
      return message.reply(`Please mention the user's ID to unban.`);
    const bannedMember = client.users.fetch(id);
    const bans = await message.guild.bans.fetch();
    if (bans.size == 0)
      return message.reply(`There are no users banned on this server.`);
    let bUser = bans.find((bannedMember) => bannedMember.user.id == id);
    if (!bUser)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not banned or found`)
            .setColor('#2c2d31'),
        ],
      });
    try {
      message.guild.members.unban(
        bUser.user.id,
        `Unbanned by: ${message.author.tag}`
      );
      message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${bUser.user.tag} Has been unbanned`)
            .setColor('#2c2d31'),
        ],
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (args[0].toLowerCase() === `$timeout`) {
    const ms = require("ms");
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissons: MODERATE_MEMBERS`
            )
            .setColor('#2c2d31'),
        ],
      });
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ModerateMembers
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: MODERATE_MEMBERS`)
            .setColor('#2c2d31'),
        ],
      });
    let timeoutMember =
      message.mentions.members.first() ||
      (await message.guild.members.fetch(args[1]).catch(() => null));
    if (!timeoutMember) {
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: This user is not found`)
            .setColor('#2c2d31'),
        ],
      });
    }
    if (timeoutMember.isCommunicationDisabled())
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Member is already timeouted`)
            .setColor('#2c2d31'),
        ],
      });
    if (
      timeoutMember.roles.highest.position >=
        message.member.roles.highest.position ||
      timeoutMember.roles.highest.position >=
        message.guild.members.me.roles.highest.position
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Error: Role Hierarchy`)
            .setColor('#2c2d31'),
        ],
      });
    if (!args[2])
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Specify the time`)
            .setColor('#2c2d31'),
        ],
      });
    const milliseconds = ms(args[2]);
    if (!milliseconds || milliseconds < 10000 || milliseconds > 604800000)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} Specify the time between **10 seconds** 10s and **7 days** 7d`
            )
            .setColor('#2c2d31'),
        ],
      });
    timeoutMember.timeout(milliseconds, `Timeouted by: ${message.author.tag}`);
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2c2d31')
          .setDescription(`Timeouted ${timeoutMember} for ${args[2]}`),
      ],
    });
  }
  if (args[0].toLowerCase() === "$purge") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permissions: MANAGE_MESSAGES`
            )
            .setColor('#2c2d31'),
        ],
      });
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageMessages
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing permissions: MANAGE_MESSAGES`)
            .setColor('#2c2d31'),
        ],
      });
    let amount = parseInt(args[1]) + 1;
    if (!amount)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Invalid Amount`)
            .setColor('#2c2d31'),
        ],
      });
    if (amount > 100 || amount < 1)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Amount must be between 1 and 100`)
            .setColor('#2c2d31'),
        ],
      });
    try {
      await message.channel.bulkDelete(amount);
      await message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor('#2c2d31')
           .setDescription(`Deleted ${args.slice(1).join(" ")} messages`),
        ],
      })
    .then((message) => {
      setTimeout(() => message.delete(), 5000)});
    } catch (error) {
      await message.channel.send({
        embeds: [
          new EmbedBuilder()
        .setDescription(`${emojie} ${error}`)
        .setColor('#2c2d31'),
        ],
      });
    }
  }
  if (args[0].toLowerCase() === "$slowmode") {
    if (
      !message.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `${emojie} You are missing permisssions: MANAGE_CHANNELS`
            )
            .setColor('#2c2d31'),
        ],
      });
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Missing Permissions: MANAGE_CHANNELS`)
            .setColor('#2c2d31'),
        ],
      });
    let amount = parseInt(args[1]);
    if (!amount)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Specify the time`)
            .setColor('#2c2d31'),
        ],
      });
    if (amount > 300 || amount < 0)
      return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`${emojie} Time must be between 1s to 300s`)
            .setColor('#2c2d31'),
        ],
      });
    message.channel.setRateLimitPerUser(
      amount,
      `Changed by: ${message.author.tag}`
    );
    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('#2c2d31')
          .setDescription(
            `Set <#${message.channel.id}> slowmode to ${amount} seconds`
          ),
      ],
    });
  }
});

client.on("guildMemberAdd", (member) => {
  if (member.guild.id === "764936103903887420") {
client.channels.cache.get("838993303982309387").send(`<@${member.id}>`).then((message) => {
    setTimeout(() => message.delete(), 500)});
client.channels.cache.get("1167283907666923521").send(`<@${member.id}>`).then((message) => {
    setTimeout(() => message.delete(), 500)});
  }
});

client.on("guildMemberRemove", (member) => {
if (member.guild.id === "764936103903887420") {
if (member.roles.cache.has(`934476243934535730`)) {
 client.channels.cache.get("1013989739671584959").send({
    embeds: [
      new EmbedBuilder()
        .setTitle(`Partner Manager Left`)
        .addFields(
          { name: `User:`, value: `<@${member.id}>` },
          { name: `Username:`, value: `${member.user.tag}` },
          { name: `ID`, value: `${member.id}` },
          { name: "Joined On:", value: `<t:${new Date(member.joinedAt / 1000).getTime()}:f>`,
          }
        )
        .setColor('#2c2d31'),
    ],
  });
  }
}
});

client.login(process.env.BOT_TOKEN);
