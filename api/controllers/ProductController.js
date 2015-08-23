/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {
	view: function(req, res) {
    Product.find().exec(function (err, products) {
      if(err || !products) {
        return res.view('index', {data: []});
      }
      else {
        var data = [];
        async.eachSeries(products, function iterator(product, callback) {
          ProductImages.find({product: product.id}).exec(function (err, images) {
            var prod = {
              id: product.id,
              name: product.name,
              price: product.price,
              images: images
            }

            data.push(prod);
            callback(null, data);
          });          
        }, function done() {
          res.view('index', {data: data});
        });        
      }
    });
  },
};

