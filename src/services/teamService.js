import {getAll, getById, createTeam, updateTeam, deleteTeam} from '../repositories/teamRepo.js'

export async function getAllTeamService(userId) {
    return await getAll(userId);
}

export async function getByIdTeamService(teamId, userId) {

    if (!Number.isInteger(teamId)) {
        const error = new Error('teamId must be an integer');
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(userId)) {
        const error = new Error('userId must be an integer');
        error.status = 400;
        throw error;
    }

    const team = await getById(teamId);

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

    return team;
}

export async function createTeamService(name, userId) {
    const team = await createTeam({
        name,
        userId
    });

    return team;
}

export async function updateTeamService(teamId, userId, data) {
    const team = await getById(teamId);

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

    return await updateTeam(teamId, data);
}

export async function deleteTeamService(teamId, userId) {

    if (!Number.isInteger(teamId)) {
        const error = new Error('teamId must be an integer');
        error.status = 400;
        throw error;
    }

    if (!Number.isInteger(userId)) {
        const error = new Error('userId must be an integer');
        error.status = 400;
        throw error;
    }

    const team = await getById(teamId);

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

    return await deleteTeam(teamId);
}