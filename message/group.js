const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const moment = require("moment-timezone")

const { getBuffer } = require('../lib/myfunc')
const { color, bgcolor } = require('../lib/color')

let setting = JSON.parse(fs.readFileSync('./setting.json'))
prefix = setting.prefix

module.exports = welcome = async (yoks, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    mem = anu.participants[0]
			    console.log(anu)
                try {
                pp_user = await yoks.getProfilePicture(mem)
                } catch (e) {
                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
                try {
                pp_grup = await yoks.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://i.postimg.cc/SN54m6LW/SAVE-20210728-133334.jpg'
            }
            if (anu.action == 'add' && mem.includes(yoks.user.jid)) {
            yoks.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik ${prefix}menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(yoks.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await yoks.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = yoks.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                teks = `Halo ${anu_user} \n\nNama : \nUmur :\nGender : \nAsal :\n\nSemoga Betah dan jangan lupa isi\nAnd Following Rules Group`
	            buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                buttons = [{buttonId: `y`,buttonText:{displayText: 'Welcome👋'},type:1}]
                imageMsg = (await yoks.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${teks}`, footerText: 'Semoga betah ☕', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await yoks.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                yoks.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(yoks.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await yoks.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = yoks.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                time_wel = moment.tz('Asia/Jakarta').format("HH:mm")
                memeg = mdata.participants.length
                out = `Kenapa tuh? kok bisa keluar? \nSayonara ${anu_user} we will miss you`
                buff = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${time_wel}&memcount=${memeg}&gcname=${encodeURI(mdata.subject)}&pp=${pp_user}&bg=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg`)
                buttons = [{buttonId: `y`,buttonText:{displayText: 'Sayonara👋'},type:1}]
                imageMsg = (await yoks.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage
                buttonsMessage = { contentText: `${out}`, footerText: 'Nitip gorengan ya', imageMessage: imageMsg, buttons: buttons, headerType: 4 }
                prep = await yoks.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
                yoks.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}