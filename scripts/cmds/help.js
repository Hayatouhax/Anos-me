const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "[ 𝗛𝗔𝗥𝗨𝗞𝗜-𝗞𝗨𝗡 | 🐱-👑]";
 
module.exports = {
  config: {
    name: "help",
    version: "1.17",
    author: "NTKhang", // orginal author Kshitiz
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage",
    },
    longDescription: {
      en: "View command usage and list all commands directly",
    },
    category: "info",
    guide: {
      en: "{pn} / help cmdName ",
    },
    priority: 1,
  },
 
  onStart: async function ({ message, args, event, threadsData, role }) {
  const { threadID } = event;
  const threadData = await threadsData.get(threadID);
  const prefix = getPrefix(threadID);
 
  if (args.length === 0) {
      const categories = {};
      let msg = "";
 
      msg += `╔══════════════╗\n      𝙺𝙸𝙼𝚈-🧚‍♀️\n╚══════════════╝`;
 
      for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role) continue;
 
          const category = value.config.category || "Uncategorized";
          categories[category] = categories[category] || { commands: [] };
          categories[category].commands.push(name);
      }
8
      Object.keys(categories).forEach(category => {
          if (category !== "info") {
              msg += `\n╭────────────⭓\n│『 ${category.toUpperCase()} 』`;
 
              const names = categories[category].commands.sort();
              for (let i = 0; i < names.length; i += 1) {
                  const cmds = names.slice(i, i + 1).map(item => `│★${item}`);
                  msg += `\n${cmds.join(" ".repeat(Math.max(0, 5 - cmds.join("").length)))}`;
              }
 
              msg += `\n╰────────⭓`;
          }
      });
 
      const totalCommands = commands.size;
      msg += `\n𝘓𝘦 𝘣𝘰𝘵 𝘥𝘪𝘴𝘱𝘰𝘴𝘦 𝘥𝘦${totalCommands} 𝘊𝘰𝘮𝘮𝘢𝘯𝘥𝘦𝘴 𝘶𝘵𝘪𝘭𝘪𝘴𝘢𝘣𝘭𝘦𝘴. ..\n`;
      msg += `𝙏𝙮𝙥𝙚 ${prefix} 𝗰𝗺𝗱 : 𝗣𝗼𝘂𝗿 𝗰𝗼𝗺𝗽𝗿𝗲𝗻𝗱𝗿𝗲 𝘀𝗲𝘀 𝗳𝗼𝗻𝗰𝘁𝗶𝗼𝗻𝗻𝗮𝗹𝗶𝘁𝗲́𝘀.\n`;
      msg += `𝗦𝗶 𝘃𝗼𝘂𝘀 𝗮𝘃𝗲𝘇 𝘂𝗻 𝗽𝗿𝗼𝗯𝗹𝗲𝗺𝗲, 𝘃𝗲𝘂𝗶𝗹𝗹𝗲𝘇 𝗰𝗼𝗻𝘁𝗮𝗰𝘁𝗲𝗿 𝗛𝗔𝗥𝗨𝗞𝗜-𝗞𝗨𝗡 🤝.`;
 
 
      const helpListImages = [
 
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg', ",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg",
"https://i.ibb.co/p2XTMGt/a578eabd-155d-40ee-a4ee-0b3fe0602d36.jpg"
];
 
 
      const helpListImage = helpListImages[Math.floor(Math.random() * helpListImages.length)];
 
 
      await message.reply({
          body: msg,
          attachment: await global.utils.getStreamFromURL(helpListImage)
      });
  } else {
      const commandName = args[0].toLowerCase();
      const command = commands.get(commandName) || commands.get(aliases.get(commandName));
 
      if (!command) {
        await message.reply(`Command "${commandName}" not found.`);
      } else {
        const configCommand = command.config;
        const roleText = roleTextToString(configCommand.role);
        const author = configCommand.author || "Unknown";
 
        const longDescription = configCommand.longDescription ? configCommand.longDescription.en || "No description" : "No description";
 
        const guideBody = configCommand.guide?.en || "No guide available.";
        const usage = guideBody.replace(/{p}/g, prefix).replace(/{n}/g, configCommand.name);
 
        const response = `╭── NAME ────⭓
  │ ${configCommand.name}
  ├── INFO
  │ Description: ${longDescription}
  │ Other names: ${configCommand.aliases ? configCommand.aliases.join(", ") : "Do not have"}
  │ Other names in your group: Do not have
  │ Version: ${configCommand.version || "1.0"}
  │ Role: ${roleText}
  │ Time per command: ${configCommand.countDown || 1}s
  │ Author: ${author}
  ├── Usage
  │ ${usage}
  ├── Notes
  │ The content inside <XXXXX> can be changed
  │ The content inside [a|b|c] is a or b or c
  ╰━━━━━━━❖`;
 
        await message.reply(response);
      }
    }
  },
};
 
function roleTextToString(roleText) {
  switch (roleText) {
    case 0:
      return "0 (All users)";
    case 1:
      return "1 (Group administrators)";
    case 2:
      return "2 (Admin bot)";
    default:
      return "Unknown role";
  }
                    }
