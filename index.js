const fs = require('fs');
const ini = require('ini');
const exec = require('child_process').exec;

const iniData = ini.parse(fs.readFileSync('./ini/private.ini', 'utf-8'));
const key = iniData.config.key;

function getTarCmd(source, destination, excludes, doEncrypt) => {
	// with encryption (works)
	// tar --exclude='/home/jcole/tmp/sonar/public/p1' --exclude='/home/jcole/tmp/sonar/public/p3' -zcv /home/jcole/tmp/sonar/public | openssl enc -aes-256-cbc -out /home/jcole/tmp/sonar-out/src-enc.tar.gz.crypt -pass file:/home/jcole/tmp/backblaze-encrypt-2018-01-03

	// decrypt and unzip
	// openssl enc -d -aes-256-cbc -in /home/jcole/tmp/sonar-out/src-enc.tar.gz.crypt -pass file:/home/jcole/tmp/backblaze-encrypt-2018-01-03 | tar -zxv

	// no encryption
	// tar --exclude='/home/jcole/tmp/sonar/public/p1' --exclude='/home/jcole/tmp/sonar/public/p3' -zcv /home/jcole/tmp/sonar/public -f /home/jcole/tmp/sonar-out/src-enc.tar.gz

	// unzip
	// tar -xzf src-enc.tar.gz.crypt
}

const sources = Object.keys(iniData).filter(e => /^src-(.*)$/.exec(e)).map(e => ({
	name: e,
	path: iniData[e].path,
	exclude: iniData[e].exclude || []
}))
