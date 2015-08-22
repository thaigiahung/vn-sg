/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    user: { model: 'User' },
    receiver: { type: 'string' },
    address: { type: 'string' },
    lat: { type: 'float' },
    lng: { type: 'float' },
    phone: { type: 'string' },
    total: { type: 'float' },
    status: { type: 'integer' }, //1: pending, 2: confirmed, 3: canceled
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

