import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface Team {
  apiPosition: number;      // posição da API
  displayPosition: number;  // posição sequencial única
  team: {
    id: number;
    name: string;
    shortName: string;
    crest: string;
  };
  playedGames: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form?: string;
}

interface LeagueTableProps {
  standings: Team[];
  isLoading: boolean;
}

const getPositionBadge = (position: number) => {
  if (position <= 4) return "bg-pl-green text-white";
  if (position <= 6) return "bg-pl-blue text-white";
  if (position >= 18) return "bg-pl-red text-white";
  return "bg-gray-100 text-gray-800";
};

const getPositionText = (position: number) => {
  if (position <= 4) return "Champions League";
  if (position === 5) return "Europa League";
  if (position === 6) return "Conference League";
  if (position >= 18) return "Rebaixamento";
  return "";
};

export const LeagueTable = ({ standings, isLoading }: LeagueTableProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-pl-black">
            Tabela de Classificação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pl-purple mx-auto"></div>
            <p className="mt-2 text-gray-600">Carregando tabela...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-[#2E1065] flex items-center gap-2">
          <Trophy color="#2E1065" />
          Tabela de Classificação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12 text-center">Pos</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-center">J</TableHead>
                <TableHead className="text-center">V</TableHead>
                <TableHead className="text-center">E</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">GP</TableHead>
                <TableHead className="text-center">GC</TableHead>
                <TableHead className="text-center">SG</TableHead>
                <TableHead className="text-center font-bold">Pts</TableHead>
                <TableHead className="text-center">Forma</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow key={team.team.id} className="hover:bg-muted/30">
                  <TableCell className="text-center">
                    <Badge
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${getPositionBadge(team.displayPosition)}`}
                      title={getPositionText(team.displayPosition)}
                    >
                      {team.displayPosition}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={team.team.crest}
                        alt={team.team.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                      <div>
                        <div className="font-medium">{team.team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.team.shortName}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.playedGames}</TableCell>
                  <TableCell className="text-center text-pl-green font-medium">{team.won}</TableCell>
                  <TableCell className="text-center text-gray-600">{team.draw}</TableCell>
                  <TableCell className="text-center text-pl-red">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-medium ${
                        team.goalDifference > 0
                          ? "text-pl-green"
                          : team.goalDifference < 0
                          ? "text-pl-red"
                          : "text-gray-600"
                      }`}
                    >
                      {team.goalDifference > 0 ? "+" : ""}
                      {team.goalDifference}
                    </span>
                  </TableCell>
                  <TableCell className="text-center font-bold text-pl-purple">{team.points}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex space-x-1 justify-center">
                      {team.form?.slice(-5).split("").map((result, index) => (
                        <div
                          key={index}
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            result === "W"
                              ? "bg-pl-green"
                              : result === "D"
                              ? "bg-gray-400"
                              : "bg-pl-red"
                          }`}
                        >
                          {result === "W" ? "V" : result === "D" ? "E" : "D"}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pl-green rounded"></div>
            <span>Champions League</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pl-blue rounded"></div>
            <span>Europa League</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pl-red rounded"></div>
            <span>Rebaixamento</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
