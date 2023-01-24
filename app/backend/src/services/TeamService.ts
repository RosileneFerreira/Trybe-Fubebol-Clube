import Team from '../database/models/Team';

export default class TeamService {
  public teamModel = Team;

  public getTeams() {
    const teams = this.teamModel.findAll();
    return teams;
  }
}
