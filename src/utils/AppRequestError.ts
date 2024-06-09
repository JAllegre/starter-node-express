import http from 'http';
import { snakeCase } from 'lodash';

/**
 * A custom exception that allows to better handle request errors
 * @class
 *
 */
class AppRequestError extends Error {
  /**
   * Constructs an AppRequestError object
   * @constructs
   * @param clientHttpStatus An HTTP error code. 500 by default
   * @param clientMessage A simple message that ca be parsed by client to specify the error. Node http error text by default
   * @param extraMessage An extra message that will be only used at server side (logs)
   */
  constructor(
    public clientHttpStatus?: number,
    public clientMessage?: string,
    public extraMessage?: string
  ) {
    super('');
    this.clientHttpStatus = clientHttpStatus || 500;
    this.clientMessage = clientMessage || snakeCase(http.STATUS_CODES[this.clientHttpStatus]);
    this.extraMessage = extraMessage || '';
    this.message = `${this.clientMessage} (${this.clientHttpStatus}) ${this.extraMessage}`;
  }
}

export default AppRequestError;
