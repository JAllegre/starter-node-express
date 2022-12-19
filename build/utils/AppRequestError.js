"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const lodash_1 = require("lodash");
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
    constructor(clientHttpStatus, clientMessage, extraMessage) {
        super('');
        this.clientHttpStatus = clientHttpStatus;
        this.clientMessage = clientMessage;
        this.extraMessage = extraMessage;
        this.clientHttpStatus = clientHttpStatus || 500;
        this.clientMessage = clientMessage || (0, lodash_1.snakeCase)(http_1.default.STATUS_CODES[this.clientHttpStatus]);
        this.extraMessage = extraMessage || '';
        this.message = `${this.clientMessage} (${this.clientHttpStatus}) ${this.extraMessage}`;
    }
}
exports.default = AppRequestError;
