const fs = require('fs');

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/dummyProducts.json`)
);

const getAllProducts = (req, res) => {
    let results = [];
  
    if (req.query.q != undefined || req.query.q != null) {
      let query = decodeURIComponent(req.query.q.toLowerCase());
  
      results = products.filter(
        (item) =>
          item.name.includes(query) ||
          item.description.includes(query) ||
          item.price.includes(query) ||
          item.brand.includes(query) ||
          item.quantity.includes(query)||
          item.shopname.includes(query)
      );
      if (results.length == 0) {
        return res.status(404).json({
          status: 'failed',
          message: 'No products found!'
        });
      }
    } else {
      results = products;
    }
  
    res.status(200).json({
      status: 'success',
      count: results.length,
      results: results
    });
  };

  module.exports = {
    getAllProducts
  };