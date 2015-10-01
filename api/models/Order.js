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
    uuid: { type: 'string' },
    email: { type: 'string' },
    emailResult: { type: 'text' },
    receiver: { type: 'string' },
    address: { type: 'string' },
    lat: { type: 'float' },
    lng: { type: 'float' },
    phone: { type: 'string' },
    phoneCountry: {
        type: 'string',
        enum: ['sg', 'vn']
    },
    total: { type: 'float' },
    note: { type: 'text' },
    status: { type: 'integer', defaultsTo: 1 }, //1: new, 2: confirmed, 3: canceled
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

