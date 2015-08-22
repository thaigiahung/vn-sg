/**
* UserProfile.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: { type: 'integer', autoIncrement: true, primaryKey: true },
  	user: {model: 'User'},
  	fbId: { type: 'integer' },
  	fbJson: { type: 'json' },
  	ggId: { type: 'integer' },
  	ggJson: { type: 'json' },
  	lastName: { type: 'string' },
  	firstName: { type: 'string' },
  	phone: { type: 'string' },
  	address: { type: 'string' },
  	question: { type: 'text' },
  	answer: { type: 'text' },
  	createdAt: {type: 'datetime'},
  	updatedAt: {type: 'datetime'}
  }
};

