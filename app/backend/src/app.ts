import * as express from 'express';
import { UserFactory, TeamFactory } from './factory';
import { validateEmail, validatePassword, validateToken } from './middlewares/user.middlewares';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');

      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.post('/login', validateEmail, validatePassword, (req, res, next) => {
      UserFactory().login(req, res, next);
    });

    this.app.get('/login/validate', validateToken, (req, res, next) => {
      UserFactory().loginValidate(req, res, next);
    });

    this.app.get('/teams', (req, res, next) => {
      TeamFactory().getAll(req, res, next);
    });
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
