import fs from 'node:fs';
import path from 'node:path';

const BIANACE_ENV = {
  domain: process.env.BIANACE_DOMAIN || '',
  privateKey: fs.readFileSync(path.join(__dirname, process.env.BIANACE_PRIVATE_KEY_PATH || ''), 'utf8'),
  publicKey: fs.readFileSync(path.join(__dirname, process.env.BIANACE_PUBLIC_KEY_PATH || ''), 'utf8'),
};
// console.log('BIANACE_ENV', BIANACE_ENV);
export { BIANACE_ENV };
