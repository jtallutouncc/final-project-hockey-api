import prisma from '../config/db.js';

export async function getAll(userId) {
    return prisma.player.findMany({
        where: {team: {userId: userId}}
    });
}

export async function getById(playerId) {
    return prisma.player.findUnique({
        where: {id: playerId}
    });
}

export async function createPlayer(data) {
    return prisma.player.create({
        data
    });
}

export async function updatePlayer(playerId, data) {
    return prisma.player.update({
        where: {id: playerId},
        data
    });
}

export async function deletePlayer(playerId) {
    return prisma.player.delete({
        where: {id: playerId}
    });
}