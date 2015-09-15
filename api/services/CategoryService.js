module.exports = {
  getAllCategories: function (callback) {
    Category.find({status: 1}).exec(function (err, categories) {
      callback(categories);
    });
  },
};