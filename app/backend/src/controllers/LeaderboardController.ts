import { Request, Response } from 'express';
import IScore from '../interfaces/score.interface';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;

  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  public async leaderboardHome(req: Request<object, object, IScore>, res: Response) {
    const home = await this.leaderboardService.leaderboardHome();
    return res.status(200).json(home);
  }
}
