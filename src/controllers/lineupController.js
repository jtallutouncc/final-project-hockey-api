import {getAllLineupsService, getLineupByIdService, createLineupService, updateLineupService, deleteLineupService, addPlayerToLineupService, removePlayerFromLineupService} from '../services/lineupService.js'

export async function getAllLineupsHandler(req, res, next) {
    try {
        const lineups = await getAllLineupsService(req.user.id);
        res.status(200).json(lineups);
    } catch (err) {
        next(err);
    }
}

export async function getLineupByIdHandler(req, res, next) {
    try {
        const lineupId = parseInt(req.params.id);
        const lineup = await getLineupByIdService(lineupId, req.user.id);
        res.status(200).json(lineup);
    } catch (err) {
        next(err);
    }
}

export async function createLineupHandler(req, res, next) {
    try {
        const lineup = await createLineupService(req.body, req.user.id);
        res.status(201).json(lineup);
    } catch (err) {
        next(err);
    }
}

export async function updateLineupHandler(req, res, next) {
    try {
        const lineupId = parseInt(req.params.id);
        const updatedLineup = await updateLineupService(lineupId, req.user.id, req.body);
        res.status(200).json(updatedLineup);
    } catch (err) {
        next(err);
    }
}

export async function deleteLineupHandler(req, res, next) {
    try {
        const lineupId = parseInt(req.params.id);
        await deleteLineupService(lineupId, req.user.id);
        res.status(200).json({message: 'Lineup deleted successfully'})
    } catch (err) {
        next(err);
    }
}

export async function addPlayerToLineupHandler(req, res, next) {
    try {
        const lineupId = parseInt(req.params.id);
        const {playerId} = req.body;
        const updatedLineup = await addPlayerToLineupService(lineupId, playerId, req.user.id);
        res.status(200).json(updatedLineup);
    } catch (err) {
        next(err);
    }
}

export async function removePlayerFromLineupHandler(req, res, next) {
    try {
        const lineupId = parseInt(req.params.id);
        const playerId = parseInt(req.params.playerId);
        const updatedLineup = await removePlayerFromLineupService(lineupId, playerId, req.user.id);
        //res.status(200).json(updatedLineup);
        res.status(200).json({message: 'Player deleted from lineup successfully'});
    } catch (err) {
        next(err);
    }
}