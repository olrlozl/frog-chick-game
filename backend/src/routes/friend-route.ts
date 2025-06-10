import { Router } from 'express';
import {
  searchFriend,
  applyFriend,
  cancelApplyFriend,
  getFriendList,
  getReceivedFriendList,
  acceptFriend,
} from '../controllers/friend-controller';

const friendRouter = Router();

friendRouter.get('/search', searchFriend);
friendRouter.post('/apply', applyFriend);
friendRouter.delete('/apply/:nickname', cancelApplyFriend);
friendRouter.get('/', getFriendList);
friendRouter.get('/receipts', getReceivedFriendList);
friendRouter.post('/accept/:nickname', acceptFriend);

export default friendRouter;
