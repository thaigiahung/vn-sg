/**
 * OrderController
 *
 * @description :: Server-side logic for managing Orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

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
};

