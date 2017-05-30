var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var OrderSchema = new Schema({
  _customer: {type: ObjectId, ref: 'Customer'},
  _product: {type: ObjectId, ref: 'Product'},
  quantity: Number,
  created_at: {type: Date, default: Date.now()}
});

OrderSchema.statics.removeOrdersByCustomerId = function(customerId, cb){
  this.remove({_customer: customerId}, function(err){
    return cb(err);
  })
};

OrderSchema.statics.removeOrdersByProductId = function(productId, cb){
  this.remove({_product: productId}, function(err){
    return cb(err);
  })
};

module.exports = mongoose.model("Order", OrderSchema);
