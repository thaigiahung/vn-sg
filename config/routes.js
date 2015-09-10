/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  /*'/': {
    view: 'index'
  }*/

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  *  If a request to a URL doesn't match any of the custom routes above, it  *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  //VIEW
  'GET /': 'ProductController.view',
  'GET /product/:id': 'ProductController.viewDetail',
  'GET /category/:id': 'ProductController.viewProductByCategory',
  'GET /cart': 'OrderController.viewCart',
  'GET /checkout': 'OrderController.checkout',
  'GET /manage': 'CategoryController.manage',
  'GET /manage/category': 'CategoryController.manage',
  'GET /manage/product': 'ProductController.manage',
  'GET /manage/product/:id': 'ProductController.manageDetail',
  'GET /manage/order/all': 'OrderController.viewAll',
  'GET /manage/order/new': 'OrderController.viewNew',
  'GET /manage/order/confirmed': 'OrderController.viewConfirmed',
  'GET /manage/order/canceled': 'OrderController.viewCanceled',
  'GET /manage/order/:id/detail': 'OrderController.viewDetail',
  

  //API
  'POST /order': 'OrderController.order',
  'POST /entity/update': 'ServiceController.updateEntity',
  'POST /entity/create': 'ServiceController.createEntity',
  'POST /product/:id': 'ProductController.updateProduct',
  'POST /product/:id/image': 'ProductImagesController.uploadImage',
  'POST /product/:id/image/remove': 'ProductImagesController.removeImage',
};
