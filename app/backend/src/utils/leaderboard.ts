import { ITeam } from '../interfaces/team.interface';
import IScore from '../interfaces/score.interface';
import { IMatch } from '../interfaces/match.interface';

export default class Leaderboard {
  public leaderboardHome = (score: IScore, team: ITeam, matches: IMatch[]) => {
    const homeBoard = { ...score };

    matches.forEach((match) => {
      if (match.homeTeamId === team.id) {
        homeBoard.name = team.teamName;
        homeBoard.totalGames += 1;
        homeBoard.goalsFavor += match.homeTeamGoals;
        homeBoard.goalsOwn += match.awayTeamGoals;
        if (match.homeTeamGoals > match.awayTeamGoals) homeBoard.totalVictories += 1;
        if (match.homeTeamGoals === match.awayTeamGoals) homeBoard.totalDraws += 1;
        if (match.homeTeamGoals < match.awayTeamGoals) homeBoard.totalLosses += 1;
        homeBoard.goalsBalance = homeBoard.goalsFavor - homeBoard.goalsOwn;
        homeBoard.totalPoints = (homeBoard.totalVictories * 3) + homeBoard.totalDraws;
        homeBoard.efficiency = ((homeBoard.totalPoints / (homeBoard.totalGames * 3)) * 100)
          .toFixed(2);
      }
    });
    return homeBoard;
  };

  public leaderboardAway = (score: IScore, team: ITeam, matches: IMatch[]) => {
    const awayBoard = { ...score };

    matches.forEach((match) => {
      if (match.awayTeamId === team.id) {
        awayBoard.name = team.teamName;
        awayBoard.totalGames += 1;
        awayBoard.goalsFavor += match.awayTeamGoals;
        awayBoard.goalsOwn += match.homeTeamGoals;
        if (match.awayTeamGoals > match.homeTeamGoals) awayBoard.totalVictories += 1;
        if (match.awayTeamGoals === match.homeTeamGoals) awayBoard.totalDraws += 1;
        if (match.awayTeamGoals < match.homeTeamGoals) awayBoard.totalLosses += 1;
        awayBoard.goalsBalance = awayBoard.goalsFavor - awayBoard.goalsOwn;
        awayBoard.totalPoints = (awayBoard.totalVictories * 3) + awayBoard.totalDraws;
        awayBoard.efficiency = ((awayBoard.totalPoints / (awayBoard.totalGames * 3)) * 100)
          .toFixed(2);
      }
    });
    return awayBoard;
  };
}
