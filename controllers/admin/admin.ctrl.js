const models = require('../../models');

exports.get_products = (_, res) => {
  //   res.render(
  //     'admin/products.html',
  //     { message: 'hello' } // message 란 변수를 템플릿으로 내보낸다.
  //   );
  // 죄회하기 findAll
  models.Products.findAll({
    // 결과를 다음 then의 프롭스로 준다.
  }).then((productList) => {
    res.render('admin/products.html', {
      productList,
    });
  });
};

exports.get_products_write = (_, res) => {
  res.render('admin/write.html');
};

// INSERT 하기 (sequelize에선 create)
exports.post_products_write = (req, res) => {
  // res.send(req.body);
  // 필드 맞추기
  models.Products.create(
    /* 
    {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    }
    이거랑 같다.
    */
    req.body
  ).then(() => {
    // 저장 후 메인페이지로 redirect
    res.redirect('/admin/products');
  });
};
// req.params.id 로 받을 수 있음

exports.get_products_detail = (req, res) => {
  models.Products.findByPk(req.params.id).then((product) => {
    res.render('admin/detail.html', { product });
  });
};

exports.get_products_edit = (req, res) => {
  //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
  models.Products.findByPk(req.params.id).then((product) => {
    res.render('admin/write.html', { product: product });
  });
};

exports.post_products_edit = (req, res) => {
  models.Products.update(
    // 데이터
    {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    },
    // 조건을 작성
    {
      where: { id: req.params.id },
    }
  ).then(() => {
    res.redirect(`/admin/products/detail/${req.params.id}`);
  });
};

exports.get_products_delete = (req, res) => {
  models.Products.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => {
    res.redirect('/admin/products');
  });
};
