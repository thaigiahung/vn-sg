/**
* TrackingShipment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    id: { type: 'integer', autoIncrement: true, primaryKey: true },
    order: {model: 'Order'},
    type: {type: 'integer'}, //1: Location, 2: Picture, 3: Video
    url: {type: 'string'},
    message: {type: 'text'},
    createdAt: {type: 'datetime'},
    updatedAt: {type: 'datetime'}
  }
};

