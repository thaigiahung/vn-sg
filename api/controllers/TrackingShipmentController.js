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
  manageTracking: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else {
      var orderId = req.params.id;
      Order.findOne({
        id: orderId
      }).exec(function (err, order) {
        if(err || !order) {
          return res.view('admin/tracking-shipment', {layout: 'admin/layout', order: order, data: []});
        }
        else {
          TrackingShipment.find({
            order: orderId
          }).exec(function (err, trackings) {
            if(err || !trackings) {
              return res.view('admin/tracking-shipment', {layout: 'admin/layout', order: order, data: []});
            }
            else {
              return res.view('admin/tracking-shipment', {layout: 'admin/layout', order: order, data: trackings});
            } 
          });
        } 
      });
    }
  },
  removeTracking: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else {
      TrackingShipment.destroy({id:req.params.id}).exec(function deleteCB(err){
        if(err) {
          return res.json({
            status: 0,
            message: "Can't delete this tracking!"
          });
        }
        else {
          return res.json({
            status: 1,
            message: "Success!"
          });
        }
      });
    }
  },
  createTracking: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else {
      var type = req.body.rdoType;
      var id = req.params.id;
      TrackingShipment.create({
        order: id,
        type: type,
        url: req.body.txtUrl,
        message: req.body.txtMessage
      }).exec(function (err, createdTracking){
        if(err || !createdTracking) {
          return res.redirect('/manage/order/'+id+'/tracking');
        }
        else {
          if(type == 2) { //Type = image
            var uploadedFile = req.file('file');
            var originalName = uploadedFile._files[0].stream.filename;
            var uploadPath = './assets/images/tracking-shipments/'+id+'/';
            var url = '/images/tracking-shipments/'+id+'/'+originalName;

            uploadedFile.upload({
              dirname: require('path').resolve(uploadPath),
              saveAs: originalName
            },function (err, uploadedFile) {
              if(err || !uploadedFile) {
                return res.redirect('/manage/order/'+id+'/tracking');
              }
              else {
                createdTracking.url = url;
                createdTracking.save(function(err, updatedTracking){
                  return res.redirect('/manage/order/'+id+'/tracking');
                });
              }
            });
          }
          else {
            return res.redirect('/manage/order/'+id+'/tracking');
          }          
        }
      });
    }
  },
};

