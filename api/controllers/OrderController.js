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
};

