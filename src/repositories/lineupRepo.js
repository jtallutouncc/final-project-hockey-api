import prisma from '../config/db.js';

export async function getAllLineups(userId) {
    return prisma.lineup.findMany({
        where: {team: {userId: userId}},
        include: {players: {
            include: {
                player: true
            }
        }}
    });
}

export async function getLineupById(lineupId) {
    return prisma.lineup.findUnique({
        where: {id: lineupId},
        include: {players: {
            include: {
                player: true
            }
        }}
    });
}

export async function createLineup(data) {
    return prisma.lineup.create({data});
}

export async function updateLineup(lineupId, data) {
    return prisma.lineup.update({
        where: {id: lineupId},
        data
    });
}

export async function deleteLineup(lineupId) {
    return prisma.lineup.delete({
        where: {id: lineupId}
    });
}

export async function addPlayerToLineup(lineupId, playerId) {
    return prisma.lineupPlayer.create({
        data: {lineupId, playerId}
    });
}

export async function removePlayerFromLineup(lineupId, playerId) {
    return prisma.lineupPlayer.delete({
        where: {
            lineupId_playerId: {
                lineupId,
                playerId
            }
        }
    });
}