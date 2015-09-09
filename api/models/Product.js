/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    category: { model: 'Category' },
    name: { type: 'string' },
    nameAscii: { type: 'string' },
    description: { type: 'text' },
    descriptionAscii: { type: 'text' },
    price: { type: 'float' },
    quantity: { type: 'integer' },
    status: { type: 'integer', defaultsTo: 1 }, //1: active, 2: disable
    outOfStock: { type: 'integer', defaultsTo: 0 }, //0: false, 1: true
    sold: { type: 'integer', defaultsTo: 0 },
    revenue: { type: 'float', defaultsTo: 0 },
    priority: { type: 'integer' },
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

