import express from 'express';
import {getAllLineupsHandler, getLineupByIdHandler, createLineupHandler, updateLineupHandler, deleteLineupHandler, addPlayerToLineupHandler, removePlayerFromLineupHandler} from '../controllers/lineupController.js'
import {authenticate} from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', authenticate, getAllLineupsHandler);
router.get('/:id', authenticate, getLineupByIdHandler);
router.post('/', authenticate, createLineupHandler);
router.put('/:id', authenticate, updateLineupHandler);
router.delete('/:id', authenticate, deleteLineupHandler);
router.post('/:id/players', authenticate, addPlayerToLineupHandler);
router.delete('/:id/players/:playerId', authenticate, removePlayerFromLineupHandler);

export default router;