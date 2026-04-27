import {getAllLineups, getLineupById, createLineup, updateLineup, deleteLineup, addPlayerToLineup, removePlayerFromLineup} from '../repositories/lineupRepo.js'
import {getById as getTeamById} from '../repositories/teamRepo.js'
import {getById as getPlayerById} from '../repositories/playerRepo.js'

export async function getAllLineupsService(userId) {
    return await getAllLineups(userId);
}

export async function getLineupByIdService(lineupId, userId) {

    if (!Number.isInteger(lineupId)) {
        const error = new Error('lineupId must be an integer');
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(userId)) {
        const error = new Error('userId must be an integer');
        error.status = 400;
        throw error;
    }

    const lineup = await getLineupById(lineupId);

    if (!lineup) {
        const error = new Error('Lineup not found');
        error.status = 404;
        throw error;
    }
    
    const team = await getTeamById(lineup.teamId);

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

    return lineup;
}

export async function createLineupService(data, userId) {
    const {teamId} = data;
    const team = await getTeamById(teamId);

    if (!team) {
        const error = new Error('Team not found')
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden')
        error.status = 403;
        throw error;
    }

    return await createLineup(data);
}

export async function updateLineupService(lineupId, userId, data) {

    if (!Number.isInteger(lineupId)) {
        const error = new Error('lineupId must be an integer');
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(userId)) {
        const error = new Error('userId must be an integer');
        error.status = 400;
        throw error;
    }

    const lineup = await getLineupById(lineupId);

    if (!lineup) {
        const error = new Error('Lineup not found')
        error.status = 404;
        throw error;
    }
    
    const team = await getTeamById(lineup.teamId);

    if (!team) {
        const error = new Error('Team not found')
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden')
        error.status = 403;
        throw error;
    }

    return await updateLineup(lineupId, data);
}

export async function deleteLineupService(lineupId, userId) {
    const lineup = await getLineupById(lineupId);

    if (!lineup) {
        const error = new Error('Lineup not found')
        error.status = 404;
        throw error;
    }
    
    const team = await getTeamById(lineup.teamId);

    if (!team) {
        const error = new Error('Team not found')
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden')
        error.status = 403;
        throw error;
    }

    return await deleteLineup(lineupId);
}

export async function addPlayerToLineupService(lineupId, playerId, userId) {
    const lineup = await getLineupById(lineupId);

    if (!lineup) {
        const error = new Error('Lineup not found')
        error.status = 404;
        throw error;
    }
    
    const team = await getTeamById(lineup.teamId);

    if (!team) {
        const error = new Error('Team not found')
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden')
        error.status = 403;
        throw error;
    }

    const player = await getPlayerById(playerId);

    if (!player) {
        const error = new Error('Player not found')
        error.status = 404;
        throw error;
    }

    if (player.teamId !== lineup.teamId) {
        const error = new Error('Player must belong to the same team that the lineup belongs to')
        error.status = 400;
        throw error;
    }

    return await addPlayerToLineup(lineupId, playerId);
}

export async function removePlayerFromLineupService(lineupId, playerId, userId) {
    const lineup = await getLineupById(lineupId);

    if (!lineup) {
        const error = new Error('Lineup not found')
        error.status = 404;
        throw error;
    }
    
    const team = await getTeamById(lineup.teamId);

    if (!team) {
        const error = new Error('Team not found')
        error.status = 404;
        throw error;
    }

    if (team.userId !== userId) {
        const error = new Error('Forbidden')
        error.status = 403;
        throw error;
    }

    return await removePlayerFromLineup(lineupId, playerId);
}