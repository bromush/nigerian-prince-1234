const { EmbedBuilder } = require("discord.js");

const fun = new EmbedBuilder()
  .setTitle(`Fun Commands:`)
  .addFields(
    { name: "`meme`", value: "view reddit memes" },
    { name: "`food`", value: "view food on reddit" },
    { name: "`tifu`", value: "view stories from r/tifu" },
    { name: "`8ball`", value: "ask the magic 8ball a question" },
    { name: "`jesus`", value: "view a picture of Jesus" },
    { name: "`confession`", value: "view confessions from r/confessions" },
    { name: "`joke`", value: "sends a joke" },
    { name: "`quote`", value: "sends a quote" },
    { name: "`horror`", value: "view stories from r/twosentencehorror" }
  )
  .setColor("#2c2d31")
  .setThumbnail(
    "https://images-ext-2.discordapp.net/external/VDsZmcK2pPU9SvrHh3mOsGo8PMXGDbWenn28MylmorM/https/cdn.discordapp.com/avatars/840331113104801825/5aea8ac98e2b884a7ac71dd31f4bfc80.png"
  );

const utility = new EmbedBuilder()
  .setTitle("Utility Commands:")
  .addFields(
    { name: "`userinfo`", value: "view a users info" },
    { name: "`stats`", value: "view Bromu stats" },
    { name: "`firstmessage`", value: "view the firstmessage in a channel`" },
    { name: "`avatar`", value: "view a users avatar" },
    { name: "`support`", value: "get support for Bromu" },
    { name: "`suggest`", value: "suggest an implication for Bromu" },
    { name: "`invites`", value: "view a users invites" }
  )
  .setColor("#2c2d31")
  .setThumbnail(
    "https://images-ext-2.discordapp.net/external/VDsZmcK2pPU9SvrHh3mOsGo8PMXGDbWenn28MylmorM/https/cdn.discordapp.com/avatars/840331113104801825/5aea8ac98e2b884a7ac71dd31f4bfc80.png"
  );

const moderation = new EmbedBuilder()
  .setTitle("Moderation Commands:")
  .addFields(
    { name: "`kick`", value: "kick a member" },
    { name: "`ban`", value: "ban a member" },
    { name: "`purge`", value: "mass delete messages" },
    { name: "`nickname`", value: "change nicknames" },
    { name: "`role`", value: "remove and add roles" },
    { name: "`slowmode`", value: "set a slowmode" },
    { name: "`timeout`", value: "timeout a member" }
  )
  .setColor("#2c2d31")
  .setThumbnail(
    "https://images-ext-2.discordapp.net/external/VDsZmcK2pPU9SvrHh3mOsGo8PMXGDbWenn28MylmorM/https/cdn.discordapp.com/avatars/840331113104801825/5aea8ac98e2b884a7ac71dd31f4bfc80.png"
  );

const roleplay = new EmbedBuilder()
  .setTitle("Roleplay Commands:")
  .addFields(
    { name: "`hug`", value: "hug someone" },
    { name: "`kill`", value: "kill someone" },
    { name: "`kiss`", value: "kiss someone" },
    { name: "`slap`", value: "slap someone" },
    { name: "`bite`", value: "bite someone" },
    { name: "`blush`", value: "blush at someone" },
    { name: "`yeet`", value: "yeet someone`" },
    { name: "`cuddle`", value: "cuddle someone" },
    { name: "`pat`", value: "pat someone" },
    { name: "`punch`", value: "punch someone" },
    { name: "`die`", value: "die :100:" },
    { name: "`highfive`", value: "highfive someone" }
  )
  .setColor("#2c2d31")
  .setThumbnail(
    "https://images-ext-1.discordapp.net/external/NJE-NdpHvwRoicts4seqeltn-70PAqpQUBBss1u8GfE/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/840331113104801825/5aea8ac98e2b884a7ac71dd31f4bfc80.png"
  );

module.exports = { fun, utility, moderation, roleplay };
