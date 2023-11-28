import { writeFileSync } from 'node:fs';
import { generateKeyPairSync } from 'node:crypto';
import { log } from '../logger.mjs';

export const generateKeyPEMFile = () => {

  const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'pkcs1', 
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem',
    },
  });
  
  writeFileSync('src/api/private.key', privateKey);
  writeFileSync('src/api/public.key', publicKey);

  log("KEYS 🔑 ", "Keys successfully generated and saved");
}



