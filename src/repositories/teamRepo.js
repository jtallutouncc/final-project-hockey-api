import prisma from '../config/db.js';

export async function getAll(userId) {
    return prisma.team.findMany({
        where: {userId}
    });
}

export async function getById(teamId) {
    return prisma.team.findUnique({
        where: {id: teamId}
    });
}

export async function createTeam(data) {
    return prisma.team.create({
        data
    });
}

export async function updateTeam(teamId, data) {
    return prisma.team.update({
        where: {id: teamId},
        data
    });
}

export async function deleteTeam(teamId) {
    return prisma.team.delete({
        where: {id: teamId}
    });
}