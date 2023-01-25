import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getAll(req: Request, res: Response) {
    const teams = await this.matchService.getMatches();
    return res.status(200).json(teams);
  }
}

export default MatchController;
