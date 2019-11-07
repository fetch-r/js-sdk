import Index from './';



test('export crud', () => {
  const e = Index.Crud;
  console.log(e)
  expect(typeof e).toEqual('object');
});

