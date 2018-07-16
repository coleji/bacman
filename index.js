const fs = require('fs');
const ini = require('ini');
const exec = require('child_process').exec;

const iniData = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8'));
const key = iniData.config.key;
const sources = Object.keys(iniData).filter(e => /^src-(.*)$/.exec(e)).map(e => ({
	name: e,
	path: iniData[e].path,
	exclude: iniData[e].exclude || []
}))
console.log(sources)
