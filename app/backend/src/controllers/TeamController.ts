import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  private teamService: TeamService;

  constructor() {
    this.teamService = new TeamService();
  }

  public async getAll(req: Request, res: Response) {
    const teams = await this.teamService.getTeams();
    return res.status(200).json(teams);
  }

  public async getTeam(req: Request<{ id: number }>, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.getTeamById(id);
    return res.status(200).json(team);
  }
}

export default TeamController;
