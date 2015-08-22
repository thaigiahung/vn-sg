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
    description: { type: 'text' },
    price: { type: 'float' },
    quantity: { type: 'integer' },
    status: { type: 'integer' },
    sold: { type: 'integer' },
    revenue: { type: 'float' },
    priority: { type: 'integer' },
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

