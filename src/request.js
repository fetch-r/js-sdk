import rpn from 'request-promise-native';

import Config from './config'

export default async (path, body, host = Config.host, token = Config.token) => {
  const url = host + path;

  const headers = {
    Authorization: 'Bearer: ' + token,
    'Content-Type': 'application/json'
  };

  const method = 'POST';

  const options = {
    url,
    method,
    body,
    headers,
    resolveWithFullResponse: true,
    json: true
  };

  try {
    return await rpn(options);
  } catch (err) {
    console.log('error');
    return err;
  }
}