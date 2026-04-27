import express from 'express';
import {getAllPlayersHandler,getPlayerByIdHandler, createPlayerHandler, updatePlayerHandler, deletePlayerHandler} from '../controllers/playerController.js'
import {authenticate} from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', authenticate, getAllPlayersHandler);
router.get('/:id', authenticate, getPlayerByIdHandler);
router.post('/', authenticate, createPlayerHandler);
router.put('/:id', authenticate, updatePlayerHandler);
router.delete('/:id', authenticate, deletePlayerHandler);

export default router;