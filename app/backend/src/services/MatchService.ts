import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/match.interface';

export default class MatchService {
  public matchModel = Match;

  public getMatches() {
    const matches = this.matchModel.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public getMatchesByQuery(inProgress: boolean) {
    const matches = this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public createMatch(match: Omit<IMatch, 'id'>) {
    const newMatch = this.matchModel.create({
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    });
    return newMatch;
  }

  public async updateMatch(id: number) {
    await this.matchModel.update(
      { inProgress: false },
      {
        where: { id },
      },
    );
    return { error: '', message: 'Finished' };
  }
}
