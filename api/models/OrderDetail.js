/**
* OrderDetail.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    order: { model: 'Order' },
    product: { model: 'Product' },
    quantity: { type: 'integer' },
    price: { type: 'float' },
    total: { type: 'float' },
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

