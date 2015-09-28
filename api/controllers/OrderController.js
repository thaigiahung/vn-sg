/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment-timezone');
var uuid = require('node-uuid');
var async = require('async');

module.exports = {
  viewCart: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      return res.view('cart', {ip: req.ip, categories: categories});
    });    
  },
  checkout: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      return res.view('checkout', {ip: req.ip, categories: categories});
    });    
  },
  order: function(req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var receiver = firstName + " " + lastName;
    var email = req.body.email;
    var address = req.body.address;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var phone = req.body.phone;
    var total = parseFloat(req.body.total);
    var note = req.body.note;

    var products = JSON.parse(req.body.products);
    var quantities = JSON.parse(req.body.quantities);

    if(!firstName || !lastName || !email ||
        !address || !lat || !lng || !phone) {
      return res.json ({
        "status": 0,
        "message": "Please fill all required fields!"
      });
    }
    else if(products.length == 0 || quantities.length == 0 
        || total <= 0) {
      return res.json ({
        "status": 0,
        "message": "Please add at least one item to your cart!"
      });
    }
    else if(quantities.length == 1 && quantities[0] <= 0) {
      //If cart has 1 product but quantity <= 0: skip it
      return res.json ({
        "status": 0,
        "message": "Please add at least one item to your cart!"
      });
    }
    else {
      Order.create({
        user: 1,
        uuid: uuid.v4(),
        email: email,
        receiver: receiver,
        address: address,
        lat: lat,
        lng: lng,
        phone: phone,
        total: total,
        note: note
      }).exec(function (err, createdOrder){
        if(err || !createdOrder) {
          return res.json ({
            "status": 0,
            "message": "Cannot create order!"
          });
        }
        else {
          var htmlBody = '<table border="0" cellpadding="10" cellspacing="0" id="tableOrderDetail" style="margin: 0 50px;"><thead><tr style="background-color: #f7f7f7;"><td style="border-top: 2px solid #ddd;border-bottom: 2px solid #ddd;">Product</td><td style="border-top: 2px solid #ddd;border-bottom: 2px solid #ddd;">Price</td><td style="border-top: 2px solid #ddd;border-bottom: 2px solid #ddd;">Qty</td><td style="border-top: 2px solid #ddd;border-bottom: 2px solid #ddd;">Subtotal</td></tr></thead><tbody>';
          async.forEachOfSeries(products, function (product, index, callback) {
            OrderDetail.create({
              order: createdOrder.id,
              product: product.id,
              quantity: quantities[index],
              price: product.price,
              total: quantities[index] * product.price
            }).exec(function (err, createdOrderDetail){});

            htmlBody += '<tr><td width="400px" style="border-bottom: 1px solid #ddd;">'+product.name+'</td><td width="150px" style="border-bottom: 1px solid #ddd;">'+product.price+' SGD</td><td width="50px" style="border-bottom: 1px solid #ddd;">'+quantities[index]+'</td><td width="150px" style="border-bottom: 1px solid #ddd;">'+(quantities[index] * product.price)+' SGD</td></tr>';    
            
            callback();     
          }, function done() {
            htmlBody += '<tr style="color:#7bbd42;font-size:18px;"><td colspan="3">Grand Total</td><td>'+total+' SGD</td></tr></tbody></table>';

            //Send mail
            EmailService.sendMail(htmlBody, email, 'Receipt', createdOrder.uuid, receiver, phone, address, function (result) {
              createdOrder.emailResult = JSON.stringify(result);
              createdOrder.save(function(err,s){});
            });
          });

          return res.json ({
            "status": 1,
            "message": "Your order has been created successfully!"
          });
        }
      });
    }
  },
  viewAll: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      Order.find({}).exec(function (err, orders) {
        if(err || !orders) {
          return res.view('admin/order', {layout: 'admin/layout', data: {}, type: 'all'});
        }
        else {
          return res.view('admin/order', {layout: 'admin/layout', data: orders, type: 'all'});
        } 
      });
    }    
  },
  viewNew: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      Order.find({
        status: 1
      }).exec(function (err, orders) {
        if(err || !orders) {
          return res.view('admin/order', {layout: 'admin/layout', data: {}, type: 'new'});
        }
        else {
          return res.view('admin/order', {layout: 'admin/layout', data: orders, type: 'new'});
        } 
      });
    }    
  },
  viewConfirmed: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      Order.find({
        status: 2
      }).exec(function (err, orders) {
        if(err || !orders) {
          return res.view('admin/order', {layout: 'admin/layout', data: {}, type: 'confirmed'});
        }
        else {
          return res.view('admin/order', {layout: 'admin/layout', data: orders, type: 'confirmed'});
        } 
      });
    }    
  },
  viewCanceled: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      Order.find({
        status: 3
      }).exec(function (err, orders) {
        if(err || !orders) {
          return res.view('admin/order', {layout: 'admin/layout', data: {}, type: 'canceled'});
        }
        else {
          return res.view('admin/order', {layout: 'admin/layout', data: orders, type: 'canceled'});
        } 
      });
    }    
  },
  viewDetail: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      var orderId = req.params.id;
      Order.findOne({
        id: orderId
      }).exec(function (err, order) {
        if(err || !order) {
          return res.view('admin/order-new', {layout: 'admin/layout', order: {}, orderDetails: []});
        }
        else {
          OrderDetail.find({
            order: orderId
          }).populate('product').exec(function (err, orderDetails) {
            if(err || !orderDetails) {
              return res.view('admin/order-detail', {layout: 'admin/layout', moment: moment, order: order, orderDetails: []});
            }
            else {
              return res.view('admin/order-detail', {layout: 'admin/layout', moment: moment, order: order, orderDetails: orderDetails});
            } 
          });
        } 
      });
    }
  },
  
};

