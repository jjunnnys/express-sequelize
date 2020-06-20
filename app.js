const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const db = require('./models'); // index.js를 가져다 씀

class App {
  constructor() {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log(
          '🔥Connection has been established successfully. (성공적으로 연결되었습니다.)'
        );
      })
      .then(() => {
        console.log('👉DB Sync complete. (DB 동기화가 완료되었습니다.)'); // ex. 프로덕츠 모델을 만들면 프로덕츠 테이블을 생성함
      })
      .catch((err) => {
        console.error(
          '❌Unable to connect to the database (데이터베이스에 연결할 수 없습니다.): ',
          err
        );
      });
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setViewEngine() {
    nunjucks.configure('template', {
      autoescape: true,
      express: this.app,
    });
  }

  setStatic() {
    this.app.use('/uploads', express.static('uploads'));
  }

  setLocals() {
    // 템플릿 변수
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  getRouting() {
    this.app.use(require('./controllers'));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(404).render('common/404.html');
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      res.status(500).render('common/500.html');
    });
  }
}

module.exports = new App().app;
