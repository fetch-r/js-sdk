import request from './request';

import { host, token } from './config';
import HttpError from './http-error';

export const handleResult = r => {
  if (typeof r === 'boolean') {
    return {status: r};
  }

  if (!r.error) {
    return r;
  }

  return new HttpError(r.message + ' - ' + r.error);
}

export const data = async query => {  
  const result = await request('/query/data', query);

  return handleResult(result);
};

export const mutate = async query => {
  const result = await request(`/query/mutate`,  query);
  return handleResult(result);
};

export const list = async (entity, params) => {
  if (typeof params === 'undefined') {
    params = {};
  }

  const query = {
    [entity]: params
  };

  const d = await data(query);

  return wrapperList(d, entity);
};

export const detailById = async (entity, id) => {
  const query = {
    [entity]: {
      filters:{ id: Number(id) }
    }
  };

  const l = await data(query);

  return wrapperDetail(l, entity);
};

export const detail = async (entity, params) => {
  const query = {
    [entity]: {
      filters: params
    }
  };

  const l = await data(query);

  return wrapperDetail(l, entity);
};

export const insert = async (entity, data) => {
  const result = await request(`/query/${entity.toLowerCase()}/insert`, { data });
  return handleResult(result);
};

export const update = async (entity, params, data) => {
  const url = `/query/${entity.toLowerCase()}/update`;
  const body = {params, data};

  const result = await request(url, body);

  return handleResult(result);
};

export const deleteById = async (entity, id) => {
  if (typeof id !== 'number') {
    return new HttpError('argument has to be of type number', 500);
  }
  const result = await request(`/query/${entity.toLowerCase()}/delete`, {params: { id }});
  return handleResult(result);
};

// does not work - to check with latest version of crud
export const deleteFilter = async (entity, filters) => {

  const result = await request(`/query/${entity.toLowerCase()}/delete`, {params: {filters}});
  return handleResult(result);
}



/**
 * insert multiple - wrapper around `mutate`
 * @param rows: alrady formatted rows (array)
 * @return tbd
 */
export const insertMultiple = async (entity, rows) => {
  if (rows.length === 0) {
    return new HttpError('the array is empty');
  }

  const query = {
    [entity]: {
      insert: {data: rows}
    }
  };

  return await mutate(query);
}

/**
 * only send Nmax records and then create a new request
 * @param  {[type]} entity [description]
 * @param  {[type]} rows   [description]
 * @return {[type]}        [description]
 */
export const insertMultipleWithUpperBound = async (entity, rows, nmax = 500) => {
  let j = 0;

  const n = Math.ceil(rows.length/nmax);

  console.log(`the request while be divided in ${n} requests`);

  while (j < n) {
    const im = await insertMultiple(entity, rows.splice(0, nmax));

    j += 1;
  }
}

export const updateMultiple = async (entity, rows) => {
  return await Promise.all(rows.map(async data => {
    return await update(entity, {id: data.id}, data);
  }))
}

export const deleteMultiple = async (entity, params) => {
  return await Promise.all(params.map(async p => {
    return await deleteById(entity, p.id);
  }))
}

/**
 * delete multipe
 * @param ids: list of ids
 * @return tbd
 * // todo check syntax for insertmultiple (mutate)
 * // for now simple wrapper around insert
 */
export const deleteIds = async (entity, ids) => {
  const query = {
    [entity]: {
      delete: {
        filters: {
          id: {'$in': ids}
        }
      }
    }
  };

  // data instead of mutate ?!
  return await Crud.data(query);
};

export const count = async (entity, filters = {}) => {
  const body = {params: {filters}}
  return await request(`/query/${entity.toLowerCase()}/count`, body);
}

/**
 * when only one record is expected, wrap result of detail to get data of interest
 * @param  data: output of `data()`
 * @param  `entity` entity name
 * @param allowsNull: if the query returns an empty array, the function will then return `null` instead of throwing an error
 * @return only record of interest or `HttpError`
 */
export const wrapperDetail = (data, entity, allowsNull = false) => {
  if (!data.hasOwnProperty(entity)) {
    return new HttpError('something went wrong while querying for the requested entity');
  }

  if (data[entity].length === 0) {
    if (allowsNull) {
      return null;
    }

    return new HttpError('the requested resource does not exist');
  }

  return data[entity][0];
};

export const wrapperList = (data, entity) => {
  if (!data.hasOwnProperty(entity)) {
    return new HttpError('something went wrong while querying for the requested entity');
  }

  return data[entity];
}
