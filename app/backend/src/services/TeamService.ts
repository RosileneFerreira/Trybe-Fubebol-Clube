import Team from '../database/models/Team';
import HttpException from '../utils/http.exception';

export default class TeamService {
  public teamModel = Team;

  public getTeams() {
    const teams = this.teamModel.findAll();
    return teams;
  }

  public async getTeamById(id: number) {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      throw new HttpException(404, 'Team not found');
    }
    return team;
  }
}
