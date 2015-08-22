/**
* TrackingProduct.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    user: { model: 'User' },
    product: { model: 'Product' },
    action: { type: 'integer' }, //1: insert, 2: update, 3: delete
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

