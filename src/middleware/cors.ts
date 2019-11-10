import { CorsOptions } from 'cors';

const whitelist = [
  '127.0.0.1:8000',
  'https://staging.REPLACE_ME.com',
  'https://REPLACE_ME.com',
];

export const corsOptions: CorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    }
  },
  optionsSuccessStatus: 200,
};
