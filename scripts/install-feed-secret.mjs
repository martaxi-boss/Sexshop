// One-time envelope decryption. Only the VPS has the transfer private key.
import { readFileSync, writeFileSync } from 'node:fs';
import { privateDecrypt, createDecipheriv } from 'node:crypto';
const root='/srv/projects/Sexshop';
const e=JSON.parse(readFileSync(process.argv[2],'utf8'));
const key=privateDecrypt({key:readFileSync(root+'/.private/feed-transfer.pem'),oaepHash:'sha256'},Buffer.from(e.key,'base64'));
const cipher=createDecipheriv('aes-256-gcm',key,Buffer.from(e.iv,'base64'));cipher.setAuthTag(Buffer.from(e.tag,'base64'));
const data=Buffer.concat([cipher.update(Buffer.from(e.data,'base64')),cipher.final()]);
const url=new URL(data.toString().trim());if(url.protocol!=='https:'||url.hostname!=='productdata.awin.com'||!url.pathname.includes('/fid/78949/'))throw Error('invalid_feed_endpoint');
writeFileSync(root+'/.private/diversual-feed-url',data,{mode:0o600});
console.log('PRIVATE_FEED_CONFIG=INSTALLED');
