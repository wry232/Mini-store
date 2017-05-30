var Order = require('../controllers/orders');
var Product = require('../controllers/products');
var Customer = require('../controllers/customers');

module.exports = function(app){
  app.get('/', function(req, res){
    res.sendFile(__dirname + '../../client/index.html');
  });

  app.get('/products', Product.index);
  app.get('/orders/recent', Order.recent);
  app.get('/customers/recent', Customer.recent);
  app.post('/customers', Customer.create);
  app.get('/customers', Customer.index);
  app.delete('/customers/:id', Customer.delete);
  app.post('/products', Product.create);
  app.delete('/products/:id', Product.delete);
  app.get('/orders', Order.index);
  app.post('/orders/:productId/:customerId', Order.create);
  app.delete('/orders/:id', Order.delete);
  app.get('/orders/:id', Order.show);
  app.get('/products/:id', Product.show);
}
