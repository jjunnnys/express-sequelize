const model = require('../../models');

exports.get_products = (_, res) => {
  res.render(
    'admin/products.html',
    { message: 'hello' } // message 란 변수를 템플릿으로 내보낸다.
  );
};

exports.get_products_write = (_, res) => {
  res.render('admin/write.html');
};

// INSERT 하기 (sequelize에선 create)
exports.post_products_write = (req, res) => {
  // res.send(req.body);
  // 필드 맞추기
  model.Products.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  }).then(() => {
    // 저장 후 메인페이지로 redirect
    res.redirect('/admin/products');
  });
};
