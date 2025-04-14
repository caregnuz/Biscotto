//Hey hey guarda la come ti diverti a guardare la mia creazione 🤓
let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid);
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return;
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "nuke":  
            if (!bot.restrict) return;
            if (!isBotAdmin) return;

            // Invio del messaggio decorato
            await conn.sendMessage(m.chat, { text: "*𝐀𝐯𝐞𝐭𝐞 𝐥'𝐨𝐧𝐨𝐫𝐞 𝐝𝐢 𝐞𝐬𝐬𝐞𝐫𝐞 𝐬𝐯𝐮𝐨𝐭𝐚𝐭𝐢 𝐝𝐚 𝐌𝑈𝐷𝛹*" });

            // Invio del link
            await conn.sendMessage(m.chat, { text: '* 𝐕𝐈𝐀 𝐂Ꮻ𝐆𝐋𝐈𝐎𝐍𝐈\n*𝐌𝐔𝐃𝐘 𝐃Ꮻ𝐌𝐈𝐍𝐀𝐍𝐀 𝐀𝐍𝐂𝐇𝐄 𝐐𝐔𝐄𝐒𝐓Ꮻ 𝐆𝐑𝐔𝐏𝐏Ꮻ*' });

            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid);   

            if (isBotAdmin && bot.restrict) { 
                await delay(1);
                let responseb = await conn.groupParticipantsUpdate(m.chat, users, 'remove');
                if (responseb[0].status === "404") 
                    await delay(1);
            } else return;
            break;           
    }
};

handler.command = ['nuke'];
handler.group = handler.owner = true;
handler.fail = null;
export default handler;
