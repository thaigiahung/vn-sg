/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	view: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      Product.find({
        status: 1
      }).exec(function (err, products) {
        if(err || !products) {
          return res.view('index', {data: []});
        }
        else {
          var data = [];
          async.eachSeries(products, function iterator(product, callback) {
            ProductImages.find({
              product: product.id, 
              status: 1
            }).exec(function (err, images) {
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
            return res.view('index', {ip: req.ip, categories: categories, data: data});
          });        
        }
      });
    });    
  },

  viewProductByCategory: function(req, res) {
    CategoryService.getAllCategories(function (categories) {
      Product.find({
        category: req.params.id, 
        status: 1
      }).exec(function (err, products) {
        if(err || !products) {
          return res.view('index', {data: []});
        }
        else {
          var data = [];
          async.eachSeries(products, function iterator(product, callback) {
            ProductImages.find({
              product: product.id,
              status: 1
            }).exec(function (err, images) {
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
            return res.view('index', {ip: req.ip, categories: categories, data: data});
          });        
        }
      });
    });    
  },

  viewDetail: function(req, res) {   
    CategoryService.getAllCategories(function (categories) {
      Product.findOne({
        id: req.params.id, 
        status: 1
      }).exec(function (err, product) {
        if(err || !product) {
          return res.view('404');
        }
        else {        
          ProductImages.find({
            product: product.id,
            status: 1
          }).exec(function (err, images) {
            var data = {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,            
              images: images
            }
            res.view('detail', {ip: req.ip, categories: categories, data: data});
          });       
        }
      });
    });    
  },

  manage: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      CategoryService.getAllCategories(function (categories) {
        Product.find().populate('category').exec(function (err, products) {
          if(err || !products) {
            return res.view('admin/product', {layout: 'admin/layout', data: []});
          }
          else {
            var data = [];
            async.eachSeries(products, function iterator(product, callback) {
              ProductImages.find({
                product: product.id, 
                status: 1
              }).exec(function (err, images) {
                product.images = images

                data.push(product);
                callback(null, data);
              });          
            }, function done() {
              return res.view('admin/product', {layout: 'admin/layout', data: data, categories: categories});
            });        
          }
        });
      });
    }    
  },

  manageDetail: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      CategoryService.getAllCategories(function (categories) {
        Product.findOne({id: req.params.id}).populate('category').exec(function (err, product) {
          if(err || !product) {
            return res.view('admin/detail', {layout: 'admin/layout', data: []});
          }
          else {
            ProductImages.find({
              product: product.id, 
              status: 1
            }).exec(function (err, images) {
              if(err || !images) {
                images = [];
              }
              product.images = images;
              return res.view('admin/detail', {layout: 'admin/layout', data: product, categories: categories}); 
            });
          }
        });
      });
    }    
  },
  updateProduct: function(req, res) {
    if(!req.session.user) {
      return res.json({
        status: 0,
        message: "Please login!"
      });
    }
    else 
    {
      var data = JSON.parse(req.body.data);
      var id = req.params.id;
      
      Product.update(
        {id: id},
        data
      ).exec(function (err, updated) {          
        if(err || !updated) {
          return res.json({
            status: 0,
            message: "Cannot update this product!",
            data: {}
          });
        }
        else {
          return res.json({
            status: 1,
            message: "Product updated successfully!",
            data: updated
          });
        }
      });
    }    
  },  
};

