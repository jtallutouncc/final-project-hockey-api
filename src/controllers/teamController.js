import {getAllTeamService, getByIdTeamService, createTeamService, updateTeamService, deleteTeamService} from '../services/teamService.js'

export async function getAllTeamsHandler(req, res, next) {
    try {
        const teams = await getAllTeamService(req.user.id);
        res.status(200).json(teams);
    } catch (err) {
        next(err);
    }
}

export async function getTeamByIdHandler(req, res, next) {
    try {
        const teamId = parseInt(req.params.id);
        const team = await getByIdTeamService(teamId, req.user.id);
        res.status(200).json(team);
    } catch (err) {
        next(err);
    }
}

export async function createTeamHandler(req, res, next) {
    try {
        const {name} = req.body;
        const team = await createTeamService(name, req.user.id);
        res.status(201).json(team);
    } catch (err) {
        next(err);
    }
}

export async function updateTeamHandler(req, res, next) {
    try{
        const teamId = parseInt(req.params.id);
        const updatedTeam = await updateTeamService(
            teamId,
            req.user.id,
            req.body
        );
        res.status(200).json(updatedTeam);
    } catch (err) {
        next(err);
    }
}

export async function deleteTeamHandler(req, res, next) {
    try {
        const teamId = parseInt(req.params.id);
        await deleteTeamService(teamId, req.user.id);
        res.status(200).json({message: 'Team deleted successfully'});
    } catch (err) {
        next(err);
    }
}