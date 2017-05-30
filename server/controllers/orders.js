var Order = require('../models/order');
var Product = require('../models/product');

module.exports = {
  index: function(req, res){
    Order.find({}).populate('_customer _product').exec(function(err, orders){
      if(err){
        res.json(false);
      } else {
        res.json(orders);
      }
    });
  },

  create: function(req, res){
    var quantity = req.body.quantity,
        _customer = req.params.customerId,
        _product = req.params.productId;

        if(quantity < 1){return res.json(false);}

        Product.isQuantityAvailable(_product, quantity, function(result, product){
          if(result){
            product.decrementQuantity(quantity, function(err){
              if(err){return res.json(err);}
              Order.create({quantity: quantity, _customer: _customer, _product: _product}, function(err){
                if(err) {return res.json(err);}
                return res.json(true)
              })
            })
          } else{
            return res.json(false);
          }
        })
  },

  delete: function(req, res){
    Order.remove({_id: req.params.id}, function(err){
      if(err){
        res.json(err);
      } else{
        res.json(true);
      }
    })
  },
  show: function(req, res){
    Order.findById(req.params.id, function(err, order){
      if(err){
        res.json(err);
      } else{
        console.log(order.quantity);
        res.json(order);
      }
    })
  },
  recent: function(req, res){
    Order.find({}).sort('-created_at').limit(3).populate('_customer _product').exec(function(err, results){
      res.json(results)
    });
  }
}
