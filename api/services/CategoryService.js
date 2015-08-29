module.exports = {
  getAllCategories: function (callback) {
    Category.find().exec(function (err, categories) {
      callback(categories);
    });
  },
};