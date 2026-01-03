import { useState, useEffect } from "react";

const API_BASE_URL = "https://api.football-data.org/v4/competitions/PL";
const API_KEY = "81b5e2df7fb04d25b819a0684bb24c89";
const CORS_PROXY = "https://corsproxy.io/?";

export const usePremierLeagueData = () => {
  const [standings, setStandings] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMatchday, setCurrentMatchday] = useState<number | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [competitionRes, standingsRes, matchesRes] = await Promise.all([
        fetch(`${CORS_PROXY}${encodeURIComponent(API_BASE_URL)}`, {
          headers: { "X-Auth-Token": API_KEY },
        }),
        fetch(`${CORS_PROXY}${encodeURIComponent(`${API_BASE_URL}/standings`)}`, {
          headers: { "X-Auth-Token": API_KEY },
        }),
        fetch(`${CORS_PROXY}${encodeURIComponent(`${API_BASE_URL}/matches`)}`, {
          headers: { "X-Auth-Token": API_KEY },
        }),
      ]);

      if (!competitionRes.ok || !standingsRes.ok || !matchesRes.ok) {
        throw new Error("Falha ao buscar dados da API");
      }

      const competitionData = await competitionRes.json();
      const standingsData = await standingsRes.json();
      const matchesData = await matchesRes.json();

      // rodada atual da competição
      setCurrentMatchday(competitionData.currentSeason.currentMatchday);

      // cria um mapa de id -> crest com base nos standings (para fallback em matches)
      const crestMap: Record<number, string> = {};
      standingsData.standings[0]?.table.forEach((team: any) => {
        crestMap[team.team.id] = team.team.crest;
      });

      // Standings formatados
      const formattedStandings = standingsData.standings[0]?.table.map(
        (team: any, index: number) => ({
          apiPosition: team.position,
          displayPosition: index + 1,
          team: {
            id: team.team.id,
            name: team.team.name,
            shortName: team.team.tla,
            crest: team.team.crest,
          },
          playedGames: team.playedGames,
          won: team.won,
          draw: team.draw,
          lost: team.lost,
          points: team.points,
          goalsFor: team.goalsFor,
          goalsAgainst: team.goalsAgainst,
          goalDifference: team.goalDifference,
          form: team.form,
        })
      );

      // Matches formatados
      const formattedMatches = matchesData.matches.map((match: any) => ({
        id: match.id,
        homeTeam: {
          id: match.homeTeam.id,
          name: match.homeTeam.name,
          shortName: match.homeTeam.tla,
          crest: match.homeTeam.crest || crestMap[match.homeTeam.id] || "",
        },
        awayTeam: {
          id: match.awayTeam.id,
          name: match.awayTeam.name,
          shortName: match.awayTeam.tla,
          crest: match.awayTeam.crest || crestMap[match.awayTeam.id] || "",
        },
        score: match.score,
        status: match.status,
        utcDate: match.utcDate,
        matchday: match.matchday,
      }));

      setStandings(formattedStandings);
      setMatches(formattedMatches);
    } catch (error) {
      console.error("Erro ao buscar dados da Premier League:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    standings,
    matches,
    currentMatchday,
    isLoading,
    refreshData: fetchData,
  };
};
