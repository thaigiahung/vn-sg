/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment-timezone');

module.exports = {
  viewCart: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      return res.view('cart', {categories: categories});
    });    
  },
  checkout: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      return res.view('checkout', {categories: categories});
    });    
  },
  order: function(req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var address = req.body.address;
    var lat = req.body.lat;
    var lng = req.body.lng;
    var phone = req.body.phone;    
    var total = parseFloat(req.body.total);

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
        receiver: firstName + " " + lastName,
        address: address,
        lat: lat,
        lng: lng,
        phone: phone,
        total: total
      }).exec(function (err, createdOrder){
        if(err || !createdOrder) {
          return res.json ({
            "status": 0,
            "message": "Cannot create order!"
          });
        }
        else {
          products.forEach(function(product, index){
            OrderDetail.create({
              order: createdOrder.id,
              product: product.id,
              quantity: quantities[index],
              price: product.price,
              total: quantities[index] * product.price
            }).exec(function (err, createdOrderDetail){});
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
    Order.find({}).exec(function (err, orders) {
      if(err || !orders) {
        return res.view('admin/order', {layout: 'admin/layout', data: {}, type: 'all'});
      }
      else {
        return res.view('admin/order', {layout: 'admin/layout', data: orders, type: 'all'});
      } 
    });
  },
  viewNew: function(req, res) {
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
  },
  viewConfirmed: function(req, res) {
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
  },
  viewCanceled: function(req, res) {
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
  },
  viewDetail: function(req, res) {
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
  },
};

