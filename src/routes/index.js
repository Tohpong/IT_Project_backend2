import { Router } from 'express';
import { router as account } from './modules/account.routes.js';
import { router as member } from './modules/member.routes.js';
import { router as course } from './modules/course.routes.js';
import { router as trainer } from './modules/trainer.routes.js';


export const router = Router();
router.use('/accounts', account);
router.use('/members', member);
router.use('/courses', course);
router.use('/trainers', trainer);