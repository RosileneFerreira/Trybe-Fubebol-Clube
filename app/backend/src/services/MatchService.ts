import Team from '../database/models/Team';
import Match from '../database/models/Match';

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
}
