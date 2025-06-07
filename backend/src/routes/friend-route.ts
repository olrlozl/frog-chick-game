import { Router } from 'express';
import {
  searchFriend,
  applyFriend,
  getFriendList,
  getReceivedFriendList,
} from '../controllers/friend-controller';

const friendRouter = Router();

friendRouter.get('/search', searchFriend);
friendRouter.post('/apply', applyFriend);
friendRouter.get('/', getFriendList);
friendRouter.get('/receipts', getReceivedFriendList);

export default friendRouter;
