import express from 'express';
import {getAllTeamsHandler, getTeamByIdHandler, createTeamHandler, updateTeamHandler, deleteTeamHandler} from '../controllers/teamController.js'
import {authenticate} from '../middleware/authenticate.js'

const router = express.Router();

router.get('/', authenticate, getAllTeamsHandler);
router.get('/:id', authenticate, getTeamByIdHandler);
router.post('/', authenticate, createTeamHandler);
router.put('/:id', authenticate, updateTeamHandler);
router.delete('/:id', authenticate, deleteTeamHandler);

export default router;