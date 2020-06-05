import { Router } from 'express';
import userController from '../controller/userController';
import auth from '../controller/auth';

const router = Router();
/*
  Route : /api/user/test   GET
   Register new user
   Public Route
*/
router.get('/test', userController.test);

/*
  Route : /api/user/register   POST
   Register new user
   Public Route
*/
router.post('/register', userController.register);

/*
   Route : /api/user/login   POST
   Register new user
   Public Route
*/
router.post('/login', userController.login);

/*
   Route : /api/user/dashboard   GET
   Dashboard Route
   Private Route
*/

router.get('/dashboard',auth,userController.dashboard)

export default router;
