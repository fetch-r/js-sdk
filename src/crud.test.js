import * as Crud from './crud';
import HttpError from './http-error';
import { isError } from './http-error';

const entity = 'MyEntity';

test('wrapperDetail - ok', () => {
  const detail = {id: 1};

  // https://stackoverflow.com/questions/11508463/javascript-set-object-key-by-variable
  // const data = {};
  // data[entity] = [detail];
  // the two above lines can be replaced swith tthe following
  const data = {
    [entity]: [detail]
  };

  const r = Crud.wrapperDetail(data, entity);

  expect(r).toEqual(detail);
});

test('wrapperDetail - not ok', () => {
  
  const data = {
  };

  const r = Crud.wrapperDetail(data, entity);

  expect(isError(r)).toEqual(true);
});

test('wrapperDetail - empty array', () => {
  
  const data = {
    [entity]: []
  };

  const r = Crud.wrapperDetail(data, entity);

  expect(isError(r)).toEqual(true);
});

test('wrapperDetail - empty array, allows null', () => {
  
  const data = {
    [entity]: []
  };

  const r = Crud.wrapperDetail(data, entity, true);

  expect(r).toEqual(null);
});

test('handle result', () => {
  const a = {id: 3, name: 'test'};
  const r = Crud.handleResult(a);
  expect(r).toEqual(r);

  const b = new HttpError('my error messsage');
  expect(Crud.handleResult(b) instanceof HttpError).toEqual(true);
})