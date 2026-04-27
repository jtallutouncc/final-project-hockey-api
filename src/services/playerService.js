import {getAll, getById, createPlayer, updatePlayer, deletePlayer} from '../repositories/playerRepo.js'
import {getById as getTeamById} from '../repositories/teamRepo.js'

export async function getAllPlayerService(userId) {
    return await getAll(userId);
}

export async function getPlayerByIdService(playerId, userId) {
    const player = await getById(playerId);

    if (!player) {
        const error = new Error('Player not found');
        error.status = 404;
        throw error;
    }

    const team = await getTeamById(player.teamId);

    if (team.userId !== userId) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }

    return player;
}

export async function createPlayerService(data, userId) {
    const {teamId} = data;
    const team = await getTeamById(teamId);

    if (!team) {
        const error = new Error('Team not found');
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }

    return await createPlayer(data);
}

export async function updatePlayerService(playerId, userId, data) {
    const player = await getById(playerId);

    if (!player) {
        const error = new Error('Player not found');
        error.status = 404;
        throw error;
    }

    const team = await getTeamById(player.teamId);

    if (!team) {
        const error = new Error('Team not found');
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }

    return await updatePlayer(playerId, data);
}

export async function deletePlayerService(playerId, userId) {

    if (!Number.isInteger(playerId)) {
        const error = new Error('playerId must be an integer');
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(userId)) {
        const error = new Error('userId must be an integer');
        error.status = 400;
        throw error;
    }

    const player = await getById(playerId);

    if (!player) {
        const error = new Error('Player not found');
        error.status = 404;
        throw error;
    }

    const team = await getTeamById(player.teamId);

    if (!team) {
        const error = new Error('Team not found');
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden');
        error.status = 403;
        throw error;
    }

    return await deletePlayer(playerId);
}