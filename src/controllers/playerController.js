import {getAllPlayerService, getPlayerByIdService, createPlayerService, updatePlayerService, deletePlayerService} from '../services/playerService.js'

export async function getAllPlayersHandler(req, res, next) {
    try {
        const players = await getAllPlayerService(req.user.id);
        res.status(200).json(players);
    } catch (err) {
        next(err);
    }
}

export async function getPlayerByIdHandler(req, res, next) {
    try {
        const playerId = parseInt(req.params.id);
        const player = await getPlayerByIdService(playerId, req.user.id);
        res.status(200).json(player);
    } catch (err) {
        next(err);
    }
}

export async function createPlayerHandler(req, res, next) {
    try {
        const player = await createPlayerService(req.body, req.user.id);
        res.status(201).json(player);
    } catch (err) {
        next(err);
    }
}

export async function updatePlayerHandler(req, res, next) {
    try {
        const playerId = parseInt(req.params.id);
        const updatedPlayer = await updatePlayerService(playerId, req.user.id, req.body);
        res.status(200).json(updatedPlayer);
    } catch (err) {
        next(err);
    }
}

export async function deletePlayerHandler(req, res, next) {
    try {
        const playerId = parseInt(req.params.id);
        await deletePlayerService(playerId, req.user.id);
        res.status(200).json({message: 'Player deleted successfully'})
    } catch (err) {
        next(err);
    }
}