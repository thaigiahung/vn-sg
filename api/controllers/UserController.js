/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var CryptoJS = require("crypto-js");

module.exports = {
  hash: function(req, res) {
    if(!req.session.user) {
      return res.json({
        status: 0,
        message: "Please login!"
      });
    }
    else 
    {
      var key = req.param('username') + "vn-sg.com" + req.param("password");
      var hashedPassword = CryptoJS.HmacSHA1(req.param("password"), key);
      hashedPassword = hashedPassword.toString();

      return res.json({
        status: 1,
        message: hashedPassword
      });
    }
  },
	viewLogin: function(req, res) {
    return res.view('admin/login', {layout: false});
  },
  login: function(req, res) {
    // https://www.npmjs.com/package/crypto-js    
    var key = req.param('username') + "vn-sg.com" + req.param("password");
    var hashedPassword = CryptoJS.HmacSHA1(req.param("password"), key);
    hashedPassword = hashedPassword.toString();
    
    User.findOne({ 
      username: req.param('username'), 
      password: hashedPassword,
      role: 1
    }).exec(function (err, user) {
      if(err) {
        res.json({
          'status': 0,
          'message': 'Error'
        });
      }
      else if(!user) {
        res.json(
        {
          "message": "Invalid username or password!",
          "status": 0
        });
      }
      else if(user.status == 2) {
        res.json(
        {
          "message": "Account is disabled!",
          "status": 0
        });
      }
      else
      {
        req.session.user = user;        
        res.json(
        {
          "message": "Success!",
          "status": 1
        });
      }     
    }); 
  },
  logout: function(req, res) {
    req.session.user = undefined;
    res.redirect('/manage/login');
  },
};

