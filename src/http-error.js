/**
 * error class to manage exceptions at service level
 */
export default class HTTPError {
  constructor(body, status) {
    this.body = body || null;
    this.status = status || 400;

    this.error = true;

    // deprecated
    this.message = this.body;
    this.statusCode = this.status;
    this.isError = this.error;
  }
};

/**
 * check whether of type error
 * @param any  input
 * @return boolean
 */
export const isError = e => e instanceof HTTPError;
