import Leaderboard from '../utils/leaderboard';
import MatchService from './MatchService';
import TeamService from './TeamService';
import IScore from '../interfaces/score.interface';

export default class LeaderboardService {
  public matchService = new MatchService();
  public teamService = new TeamService();
  public leaderboard = new Leaderboard();

  private score: IScore = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  public sortLeaderboard = (score: IScore[]) =>
    score.sort((homeTeam, awayTeam) => {
      if (homeTeam.totalPoints !== awayTeam.totalPoints) {
        return awayTeam.totalPoints - homeTeam.totalPoints;
      }
      if (homeTeam.goalsBalance !== awayTeam.goalsBalance) {
        return awayTeam.goalsBalance - homeTeam.goalsBalance;
      }
      if (homeTeam.goalsFavor !== awayTeam.goalsFavor) {
        return awayTeam.goalsFavor - homeTeam.goalsFavor;
      }
      if (homeTeam.goalsOwn !== awayTeam.goalsOwn) {
        return homeTeam.goalsOwn - awayTeam.goalsOwn;
      }
      return 1;
    });

  public leaderboardHome = async () => {
    const teams = await this.teamService.getTeams();
    const finishedMatches = await this.matchService.getMatchesByQuery(false);

    const result = await Promise.all(
      teams.map((team) =>
        this.leaderboard.leaderboardHome(this.score, team, finishedMatches)),
    );
    return this.sortLeaderboard(result);
  };

  public leaderboardAway = async () => {
    const teams = await this.teamService.getTeams();
    const finishedMatches = await this.matchService.getMatchesByQuery(false);

    const result = await Promise.all(
      teams.map((team) =>
        this.leaderboard.leaderboardAway(this.score, team, finishedMatches)),
    );
    return this.sortLeaderboard(result);
  };
}
