const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "info",
    aliases: ["Haruki-Kyo"],
    author: " Aesther ", 
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "owner",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Wait... ";
        await api.sendMessage(loadingMessage, event.threadID);

        const ownerInfo = {
          name: '𝗛𝗔𝗥𝗨𝗞𝗜 𝗞𝗨𝗡',
          gender: '𝗛𝗢𝗠𝗠𝗘',
          hobby: '𝗧𝗩',
          relationship: '𝗜𝗡 𝗔 𝗥𝗘𝗟𝗔𝗧𝗜𝗢𝗡𝗦𝗛𝗜𝗣',
          facebookLink: 'https://www.facebook.com/profile.php?id=61573015634696',
          bio: '𝗟𝗔 𝗩𝗜𝗘 𝗘𝗦𝗧 𝗨𝗡 𝗖𝗢𝗠𝗕𝗔𝗧, 𝗠𝗢𝗨𝗥𝗜𝗥 𝗘𝗦𝗧 𝗨𝗡𝗘 𝗢𝗣𝗧𝗜𝗢𝗡'
        };

        const videoUrl = 
["https://i.imgur.com/ZpgBKGA.mp4",
"https://i.imgur.com/h6J9tkb.mp4",
"https://i.imgur.com/RmMI3dC.mp4",
"https://i.imgur.com/jeyjWuk.mp4",
"https://i.imgur.com/HIWaV6d.mp4",
"https://i.imgur.com/BXmgByZ.mp4",
"https://i.imgur.com/wuo18rR.mp4",
"https://i.imgur.com/C4neV9i.mp4",
"https://i.imgur.com/pdr6e4T.mp4",
"https://i.imgur.com/OAmV2Wr.mp4",
"https://i.imgur.com/gPl8sV2.mp4",
"https://i.imgur.com/nU8Gsyn.mp4",];
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

        const response = `
          𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻🔬:
❍⌇─➭ 
(◍•ᴗ•◍)𝗡𝗔𝗠𝗘 : ${ownerInfo.name}
❍⌇─➭ 
♀𝗚𝗘𝗡𝗥𝗘♂: ${ownerInfo.gender}
❍⌇─➭ 
🏓𝗛𝗢𝗕𝗕𝗬⛹‍♂: ${ownerInfo.hobby}
❍⌇─➭ 
𝗥𝗘𝗟𝗔𝗧𝗢𝗡𝗦𝗛𝗜💞: ${ownerInfo.relationship}
❍⌇─➭ 
 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞🔗: ${ownerInfo.facebookLink}
❍⌇─➭ 
      ◈ 𝗦𝗧𝗔𝗧𝗨𝗦 ◈: $㊙️ 𝐀𝐑𝐂𝐀𝐍𝐎 𝐌𝐀𝐋𝐈𝐆𝐍𝐔𝐈𝐒 💯🔴 

𝐔𝐍 𝐏𝐀𝐒𝐒𝐈𝐎𝐍𝐍É 𝐃𝐄 𝐓𝐄𝐂𝐇𝐍𝐎𝐋𝐎𝐆𝐈𝐄𝐒, 𝐏𝐋𝐔𝐒 𝐒𝐎𝐌𝐁𝐑𝐄 𝐐𝐔𝐄 𝐋'𝐎𝐌𝐁𝐑𝐄
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();
        
        if (lowerCaseBody === "owner" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
}
