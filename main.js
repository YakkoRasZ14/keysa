const { WAConnection, Browsers } = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const fs = require("fs-extra")
const figlet = require('figlet')
const { uncache, nocache } = require('./lib/loader')
const setting = JSON.parse(fs.readFileSync('./setting.json'))
const welcome = require('./message/group')
baterai = 'unknown'
charging = 'unknown'

//nocache
require('./keysa')
nocache('../keysa', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))
require('./message/group.js')
nocache('../message/group.js', module => console.log(color('[WATCH]', 'cyan'), color(`'${module}'`, 'green'), 'File is updated!'))

const starts = async (yoks = new WAConnection()) => {
	yoks.logger.level = 'warn'
	console.log(color(figlet.textSync('YAKKOXCODEBOT', {
		font: 'Standard',
		horizontalLayout: 'default',
		vertivalLayout: 'default',
		width: 80,
		whitespaceBreak: false
	}), 'cyan'))
	console.log(color('[KEYSA]', 'cyan'), color('Owner is online now!', 'green'))
	console.log(color('[YAKKOXCODE]', 'cyan'), color('Welcome back, Owner! Hope you are doing well~', 'green'))
	yoks.browserDescription = ["Keysa ❣️ YakkoXCode", "Firefox", "3.0.0"];

	// Menunggu QR
	yoks.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Please scan qr code'))
	})

	// Menghubungkan
	fs.existsSync(`./${setting.sessionName}.json`) && yoks.loadAuthInfo(`./${setting.sessionName}.json`)
	yoks.on('connecting', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color(' ⏳ Connecting...'));
	})

	//connect
	yoks.on('open', () => {
		console.log(color('[ SYSTEM ]', 'yellow'), color('Bot is now online!'));
	})

	// session
	await yoks.connect({
		timeoutMs: 30 * 1000
	})
	fs.writeFileSync(`./${setting.sessionName}.json`, JSON.stringify(yoks.base64EncodedAuthInfo(), null, '\t'))

	// Baterai
	yoks.on('CB:action,,battery', json => {
		global.batteryLevelStr = json[2][0][1].value
		global.batterylevel = parseInt(batteryLevelStr)
		baterai = batterylevel
		if (json[2][0][1].live == 'true') charging = true
		if (json[2][0][1].live == 'false') charging = false
		console.log(json[2][0][1])
		console.log('Baterai : ' + batterylevel + '%')
	})
	global.batrei = global.batrei ? global.batrei : []
	yoks.on('CB:action,,battery', json => {
		const batteryLevelStr = json[2][0][1].value
		const batterylevel = parseInt(batteryLevelStr)
		global.batrei.push(batterylevel)
	})

	// welcome
	yoks.on('group-participants-update', async (anu) => {
		await welcome(yoks, anu)
	})

	yoks.on('chat-update', async (message) => {
		require('./keysa')(yoks, message)
	})
}

starts()