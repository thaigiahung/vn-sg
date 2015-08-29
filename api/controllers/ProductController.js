/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {
	view: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
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
            return res.view('index', {categories: categories, data: data});
          });        
        }
      });
    });    
  },

  viewProductByCategory: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      Product.find({category: req.params.id}).exec(function (err, products) {
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
            return res.view('index', {categories: categories, data: data});
          });        
        }
      });
    });    
  },

  viewDetail: function(req, res) {   
    CategoryService.getAllCategories(function (categories) {
      Product.findOne({id: req.params.id}).exec(function (err, product) {
        if(err || !product) {
          return res.view('404');
        }
        else {        
          ProductImages.find({product: product.id}).exec(function (err, images) {
            var data = {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,            
              images: images
            }
            res.view('detail', {categories: categories, data: data});
          });       
        }
      });
    });    
  },
};

