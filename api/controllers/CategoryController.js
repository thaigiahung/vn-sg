/**
 * CategoryController
 *
 * @description :: Server-side logic for managing Categories
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	manage: function(req, res) {
    if(!req.session.user) {
      return res.view('admin/login', {layout: false});
    }
    else 
    {
      CategoryService.getAllCategories(function (categories) {
        return res.view('admin/category', {layout: 'admin/layout', categories: categories}); 
      });
    }    
  },
};

