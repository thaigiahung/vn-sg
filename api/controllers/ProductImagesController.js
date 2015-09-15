/**
 * ProductImagesController
 *
 * @description :: Server-side logic for managing Productimages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');

module.exports = {
	uploadImage: function(req, res) {
    if(!req.session.user) {
      return res.json({
        status: 0,
        message: "Please login!"
      });
    }
    else 
    {
      var id = req.params.id;
      var uploadedFile = req.file('file');
      var originalName = uploadedFile._files[0].stream.filename;
      var uploadPath = './assets/images/products/'+id+'/';
      var url = '/images/products/'+id+'/'+originalName;

      uploadedFile.upload({
        dirname: require('path').resolve(uploadPath),
        saveAs: originalName
      },function (err, uploadedFiles) {
        if(err || !uploadedFiles) {
          return res.json({
            status: 0,
            message: "Image not found!"
          });
        }
        else {
          //Copy file to .tmp
          fs.createReadStream(uploadPath+originalName).pipe(fs.createWriteStream('./.tmp/public'+url));

          ProductImages.create({
            product: id,
            url: url
          }).exec(function (err, created) {          
            if(err || !created) {
              return res.json({
                status: 0,
                message: "Cannot upload image!"
              });
            }
            else {
              return res.json({
                status: 1,
                message: "Image uploaded successfully!"
              });
            }
          });
        }
      });
    }    
  },
  removeImage: function(req, res) { 
    if(!req.session.user) {
      return res.json({
        status: 0,
        message: "Please login!"
      });
    }
    else 
    {
      ProductImages.destroy({
        id: req.body.id,
        product: req.params.id
      }).exec(function(err, deleted) {
        if(err || !deleted) {
          return res.json({
            status: 0,
            message: "Cannot delete this image!"
          });
        }
        else {
          //Delete files
          deleted = deleted[0];
          fs.unlink('./assets'+deleted.url, function (err) {});
          fs.unlink('./.tmp/public'+deleted.url, function (err) {});

          return res.json({
            status: 1,
            message: "Image deleted successfully!"
          });
        }
      });
    }    
  },
};

