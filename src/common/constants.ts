import os from 'os';
import path from 'path';

export const DEFAULT_URL = 'https://api.co.clearstreet.io/studio';
export const DEFAULT_AUTH_URL = 'https://auth-dev.clearstreet.io';
export const RCFILE = '.sturc';
export const RCPATH = path.join(os.homedir(), RCFILE);
