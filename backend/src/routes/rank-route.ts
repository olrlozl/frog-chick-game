import { Router } from 'express';
import { getRanks } from '../controllers/rank-controller';

const rankRouter = Router();

rankRouter.get('/', getRanks);

export default rankRouter;
