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
  const body = {id: 3, name: 'test'};
  const a = {body, statusCode: 200};
  const r = Crud.handleResult(a);
  expect(r).toEqual(body);


  const error = 'my error message';
  const b = {error, statusCode: 400};
  const e = new HttpError(error);
  expect(Crud.handleResult(b) instanceof HttpError).toEqual(true);
});

/*
works locally with the right env vars
test('data', async () => {
  const query = {Country: {projection: {name: true, id: true}, take : 2}};
  const r = await Crud.data(query);

  const data = {Country: [{name: 'Switzerland', id: 1}, {name: 'United States of America', id: 2}]};

  expect(r).toEqual(data);
});

test('list', async () => {
  const entity = 'Country';
  const params = {projection: {name: true, id: true}, take : 2};
  const r = await Crud.list(entity, params);

  const data = [{name: 'Switzerland', id: 1}, {name: 'United States of America', id: 2}];

  expect(r).toEqual(data);
});

test('detail', async () => {
  const entity = 'Country';
  const r = await Crud.detail(entity, {id: 1}, {name: true, id: true});

  const data = {name: 'Switzerland', id: 1};

  expect(r).toEqual(data);
});
*/