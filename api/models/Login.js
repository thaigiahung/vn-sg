/**
* Login.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: { type: 'integer', autoIncrement: true, primaryKey: true },
    user: { model: 'User' },
    ip: { type: 'string' },
    status: { type: 'integer' }, //1: success, 2: fail
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

