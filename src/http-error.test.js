import HttpError from './http-error';
import { isError } from './http-error';

const message = 'something went wrong';
const statusCode = 500;
const myHttpError = new HttpError(message, statusCode);

test('check if input is an error', () => {
  class ARandomClass {};
  const myRandomClass = new ARandomClass;

  // typof always returns `object`
  // console.log(typeof e)

  expect(myHttpError instanceof HttpError).toEqual(true);
  expect('mystring' instanceof HttpError).toEqual(false);
  expect(myRandomClass instanceof HttpError).toEqual(false);

  expect(isError(myHttpError)).toEqual(true);
  expect(isError(myRandomClass)).toEqual(false);
  expect(isError('myString')).toEqual(false);

  console.log(myHttpError.message)
});

test('iserror attribute works', ()=> {
  expect(myHttpError.isError).toEqual(true);
})

test('attributes are being saved', () => {
  expect(myHttpError.message).toEqual(message);
  expect(myHttpError.statusCode).toEqual(statusCode);
});

test('default atttributes', () => {
  const defaultHttpError = new HttpError();
  expect(defaultHttpError.message).toEqual(null);
  expect(defaultHttpError.statusCode).toEqual(400);
});


