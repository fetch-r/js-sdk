require('dotenv').config()

export const auth = {
  host: process.env.FETCHR_HOST,
  token: process.env.FETCHR_TOKEN
};
