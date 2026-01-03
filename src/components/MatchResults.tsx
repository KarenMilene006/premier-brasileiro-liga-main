import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Flag } from "lucide-react";

interface Match {
  id: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  status: string;
  utcDate: string;
  matchday: number;
}

interface MatchResultsProps {
  matches: Match[];
  isLoading: boolean;
  currentMatchday?: number; // 🔹 ADICIONADO
}

const getMatchStatus = (status: string, utcDate: string) => {
  const matchDate = new Date(utcDate);
  const now = new Date();

  switch (status) {
    case "FINISHED":
      return { text: "Finalizado", color: "bg-pl-green text-white" };
    case "IN_PLAY":
      return { text: "Ao Vivo", color: "bg-pl-red text-white animate-pulse" };
    case "PAUSED":
      return { text: "Intervalo", color: "bg-yellow-500 text-white" };
    case "TIMED":
      if (matchDate > now) {
        return { text: "Aguardando", color: "bg-pl-blue text-white" };
      }
      return { text: "Adiado", color: "bg-gray-500 text-white" };
    case "SCHEDULED":
      return { text: "Aguardando", color: "bg-pl-blue text-white" };
    default:
      return { text: status, color: "bg-gray-500 text-white" };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const MatchResults = ({ matches, isLoading, currentMatchday }: MatchResultsProps) => {
  const [selectedMatchday, setSelectedMatchday] = useState<number | "all">("all");

  // 🔹 já começa na rodada atual
  useEffect(() => {
    if (currentMatchday) {
      setSelectedMatchday(currentMatchday);
    }
  }, [currentMatchday]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-pl-purple">
            Partidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pl-purple mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const matchdays = Array.from(new Set(matches.map((m) => m.matchday))).sort(
    (a, b) => a - b
  );

  const filteredMatches =
    selectedMatchday === "all"
      ? matches
      : matches.filter((m) => m.matchday === selectedMatchday);

  const matchesByDate = filteredMatches.reduce((acc, match) => {
    const date = formatDate(match.utcDate);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(match);
    return acc;
  }, {} as Record<string, Match[]>);

  return (
    <Card className="h-[1660px] overflow-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-[#2E1065] flex items-center gap-2">
            <Flag color="#2E1065" />
            Partidas
          </CardTitle>

          <select
            className="border rounded px-2 py-1 text-sm"
            value={selectedMatchday}
            onChange={(e) =>
              setSelectedMatchday(
                e.target.value === "all" ? "all" : Number(e.target.value)
              )
            }
          >
            <option value="all">Todas as rodadas</option>
            {matchdays.map((md) => (
              <option key={md} value={md}>
                Rodada {md}
              </option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(matchesByDate).map(([date, dayMatches]) => (
            <div key={date}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-4 h-4 text-[#2E1065]" />
                <h3 className="font-semibold text-lg text-[#2E1065]">{date}</h3>
              </div>

              <div className="space-y-3">
                {dayMatches.map((match) => {
                  const status = getMatchStatus(match.status, match.utcDate);

                  return (
                    <div
                      key={match.id}
                      className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={status.color}>{status.text}</Badge>
                          <span className="text-sm text-muted-foreground">
                            Rodada {match.matchday}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(match.utcDate)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <img
                            src={match.homeTeam.crest}
                            alt={match.homeTeam.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <span className="font-medium">
                            {match.homeTeam.shortName}
                          </span>
                        </div>

                        <div className="flex items-center space-x-4 px-4">
                          {match.score.fullTime.home !== null &&
                          match.score.fullTime.away !== null ? (
                            <div className="text-center">
                              <div className="text-2xl font-bold text-pl-purple">
                                {match.score.fullTime.home} -{" "}
                                {match.score.fullTime.away}
                              </div>
                            </div>
                          ) : (
                            <div className="text-lg font-medium text-muted-foreground">
                              VS
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-3 flex-1 justify-end">
                          <span className="font-medium">
                            {match.awayTeam.shortName}
                          </span>
                          <img
                            src={match.awayTeam.crest}
                            alt={match.awayTeam.name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
