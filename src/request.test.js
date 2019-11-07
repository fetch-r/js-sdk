import request from './request';

test('request', async () => {
  const urlpath = '/post';
  const data = {arg1: 'myarg1', arg2: 'myarg2'};

  const host = 'https://postman-echo.com';
  const token = 'my token';

  const r = await request(urlpath, data, host, token);

  const { body, statusCode } = r;

  expect(body.data).toEqual(data);
  expect(body.headers.authorization).toEqual('Bearer ' + token);
  expect(body.url).toEqual(host + urlpath);
  expect(statusCode).toEqual(200);
});

/*
works in local with the right .env file
test('request with env', async () => {
  const urlpath = '/data';
  const query = {Country: {projection: {name: true, id: true}, take : 2}};

  const r = await request(urlpath, query);

  const data = {Country: [{name: 'Switzerland', id: 1}, {name: 'United States of America', id: 2}]};

  const { body, statusCode } = r;

  expect(body).toEqual(data);
  expect(statusCode).toEqual(200);
});
*/