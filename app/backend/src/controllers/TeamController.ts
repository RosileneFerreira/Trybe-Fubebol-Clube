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
}

export default TeamController;
