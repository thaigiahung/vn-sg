module.exports = {
  updateEntity: function(req, res) {
    /* ------- User Manual -------
    Input:
      model_name: model to be updated
      id: item id to be updated
      field: field to be updated
      value: value to be used for updating
    Example: if you need to update category name of category number 2
      model_name: 'Category'
      id: 2
      field: 'name'
      value: 'New value'
    ------- End ------- */

    var categoryFields = ['name','status'];
    var orderFields = ['receiver','address','lat','lng','phone','total','status'];
    var orderDetailFields = ['quantity','price','total'];
    var productFields = ['category','name','description','price','quantity','status','priority'];
    var fields;

    var models = ['Category', 'Order', 'OrderDetail', 'Product'];

    var modelName = req.body.model_name;
    var id = req.body.id;
    var field = req.body.field;
    var value = req.body.value;

    if(!modelName || !id || !field || !value) {
      return res.json({
        status: 0,
        message: "Missing params!"
      });
    }
    else if(models.indexOf(modelName) == -1) {
      return res.json({
        status: 0,
        message: "This model is not supported!"
      });
    }
    else {
      switch(modelName) {
        case 'Category':
          fields = categoryFields;
          break;
        case 'Order':
          fields = orderFields;
          break;
        case 'OrderDetail':
          fields = orderDetailFields;
          break;
        case 'Product':
          fields = productFields;
          break;
      }

      if(fields.indexOf(field) == -1) {
        return res.json({
          status: 0,
          message: "This field is not supported!"
        });
      }
      else {
        //Create dynamic key
        var data = {};
        data[field] = value;        

        //global[modelName]: convert string to object model
        global[modelName].update(
          {id: id},
          data
        ).exec(function (err, updated) {          
          if(err || !updated) {
            return res.json({
              status: 0,
              message: "Cannot update this "+ modelName +"!"
            });
          }
          else {
            return res.json({
              status: 1,
              message: modelName +" updated successfully!"
            });
          }
        });
      }
    }
  },
};