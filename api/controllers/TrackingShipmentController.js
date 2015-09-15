/**
 * TrackingShipmentController
 *
 * @description :: Server-side logic for managing Trackingshipments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	view: function(req, res) {
    var orderUUID = req.query.id;
    if(!orderUUID) {
      return res.view('tracking', {layout: false, status: 0, message: 'Order ID is required!', data: []});  
    }
    else {
      Order.findOne({
        uuid: orderUUID
      }).exec(function (err, order) {
        if(err || !order) {
          return res.view('tracking', {layout: false, status: 0, message: 'Invalid Order ID!', data: []});
        }
        else {
          TrackingShipment.find({
            where: {
              order: order.id
            },            
            sort: 'createdAt'
          }).exec(function (err, shipments) {
            if(err || !shipments) {
              return res.view('tracking', {layout: false, status: 0, message: 'Invalid Order ID!', data: []});
            }
            else {
              return res.view('tracking', {layout: false, status: 1, message: 'Success!', data: shipments});
            }
          });
        }
      });      
    }        
  },
};

