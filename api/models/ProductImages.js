/**
* ProductImages.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    product: { model: 'Product' },
    url: { type: 'string' },
    description: { type: 'text' },
    status: { type: 'integer', defaultsTo: 1 }, //1: active, 2: disable
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

