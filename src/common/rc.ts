import fs from 'fs';
import { RCPATH } from './constants.js';

export const saveRCValue = (key: string, value: string) => {
  const keyEquals = `${key}=`;
  const newEntry = `${keyEquals}${value}`;
  const regex = new RegExp(`^${keyEquals}.*$`, 'm');
  if (fs.existsSync(RCPATH)) {
    let env = fs.readFileSync(RCPATH, { encoding: 'utf8' });
    if (env.includes(keyEquals)) {
      env = env.replace(regex, newEntry);
    } else {
      env += newEntry;
    }
    fs.writeFileSync(RCPATH, env);
  } else {
    fs.writeFileSync(RCPATH, newEntry);
  }
};
