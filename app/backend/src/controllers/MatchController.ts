import { Request, Response } from 'express';
import { IMatch } from '../interfaces/match.interface';
import MatchService from '../services/MatchService';

class MatchController {
  private matchService: MatchService;

  constructor() {
    this.matchService = new MatchService();
  }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (!inProgress) {
      const matches = await this.matchService.getMatches();
      return res.status(200).json(matches);
    }

    const matchesByQuery = await this.matchService.getMatchesByQuery(inProgress === 'true');
    return res.status(200).json(matchesByQuery);
  }

  public async create(req: Request<object, object, IMatch>, res: Response) {
    const match = await this.matchService.createMatch(req.body);
    return res.status(201).json(match);
  }
}

export default MatchController;
