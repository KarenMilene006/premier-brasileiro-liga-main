import { Header } from "@/components/Header";
import { LeagueTable } from "@/components/LeagueTable";
import { MatchResults } from "@/components/MatchResults";
import { usePremierLeagueData } from "@/hooks/usePremierLeagueData";
import { exportToPDF } from "@/utils/pdfExport";
import { Button } from "@/components/ui/button";
import { Bolao, BolaoData } from "@/components/Bolao";
import { RefreshCw, Wifi } from "lucide-react";
import { toast } from "sonner";
import { BolaoParticipantes } from "@/components/BolaoParticipantes";

const Index = () => {
  const { standings, matches, isLoading, refreshData } = usePremierLeagueData();

  const handleExportPDF = () => {
    try {
      exportToPDF(standings, matches);
      toast.success("PDF exportado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar PDF. Tente novamente.");
    }
  };

  const handleRefresh = () => {
    refreshData();
    toast.info("Atualizando dados...");
  };


  const dadosEquipe: BolaoData = {
  partidas: [
 { id: "1",  abreviacao: "BHA - EVE" }, // Brighton x Everton
{ id: "2",  abreviacao: "LEE - ARS" }, // Leeds x Arsenal
{ id: "3",  abreviacao: "WOL - BOU" }, // Wolves x Bournemouth
{ id: "4",  abreviacao: "CHE - WHU" }, // Chelsea x West Ham
{ id: "5",  abreviacao: "LIV - NEW" }, // Liverpool x Newcastle
{ id: "6",  abreviacao: "AVL - BRE" }, // Aston Villa x Brentford
{ id: "7",  abreviacao: "MUN - FUL" }, // Manchester United x Fulham
{ id: "8",  abreviacao: "NFO - CRY" }, // Nottingham Forest x Crystal Palace
{ id: "9",  abreviacao: "TOT - MCI" }, // Tottenham x Manchester City
{ id: "10", abreviacao: "SUN - BUR" }, // Sunderland x Burnley

// { id: "1",  abreviacao: "LEE - NFO" }, // Leeds x Nottingham Forest
// { id: "2",  abreviacao: "MUN - TOT" }, // Manchester United x Tottenham
// { id: "3",  abreviacao: "ARS - SUN" }, // Arsenal x Sunderland
// { id: "4",  abreviacao: "BOU - AVL" }, // Bournemouth x Aston Villa
// { id: "5",  abreviacao: "BUR - WHU" }, // Burnley x West Ham
// { id: "6",  abreviacao: "FUL - EVE" }, // Fulham x Everton
// { id: "7",  abreviacao: "WOL - CHE" }, // Wolves x Chelsea
// { id: "8",  abreviacao: "NEW - BRE" }, // Newcastle x Brentford
// { id: "9",  abreviacao: "BHA - CRY" }, // Brighton x Crystal Palace
// { id: "10", abreviacao: "LIV - MCI" }, // Liverpool x Manchester City


],
  participantes: [
    {
      nome: "Brenno",
      pontos: 134,
      cravadas: 13,
      palpites: [
 { partidaId: "1",  placar: "1-1" }, // Brighton 1 - 1 Everton
{ partidaId: "2",  placar: "0-2" }, // Leeds 0 - 2 Arsenal
{ partidaId: "3",  placar: "0-2" }, // Wolves 0 - 2 Bournemouth
{ partidaId: "4",  placar: "3-0" }, // Chelsea 3 - 0 West Ham
{ partidaId: "5",  placar: "2-0" }, // Liverpool 2 - 0 Newcastle
{ partidaId: "6",  placar: "2-0" }, // Aston Villa 2 - 0 Brentford
{ partidaId: "7",  placar: "2-0" }, // Manchester United 2 - 0 Fulham
{ partidaId: "8",  placar: "2-1" }, // Nottingham Forest 2 - 1 Crystal Palace
{ partidaId: "9",  placar: "0-2" }, // Tottenham 0 - 2 Man City
{ partidaId: "10", placar: "3-0" }, // Sunderland 3 - 0 Burnley
      ],
    },
    {
      nome: "Karen",
      pontos: 139,
      cravadas: 19,
      palpites: [
{ partidaId: "1",  placar: "2-2" }, // Brighton 2 - 2 Everton
{ partidaId: "2",  placar: "1-1" }, // Leeds 1 - 1 Arsenal
{ partidaId: "3",  placar: "2-1" }, // Wolves 2 - 1 Bournemouth
{ partidaId: "4",  placar: "3-2" }, // Chelsea 3 - 2 West Ham
{ partidaId: "5",  placar: "1-1" }, // Liverpool 1 - 1 Newcastle
{ partidaId: "6",  placar: "3-1" }, // Aston Villa 3 - 1 Brentford
{ partidaId: "7",  placar: "3-1" }, // Manchester United 3 - 1 Fulham
{ partidaId: "8",  placar: "2-1" }, // Nottingham Forest 2 - 1 Crystal Palace
{ partidaId: "9",  placar: "1-3" }, // Tottenham 1 - 3 Man City
{ partidaId: "10", placar: "3-1" }, // Sunderland 3 - 1 Burnley
      ],
    },
    {
      nome: "Nicolas",
      pontos: 152,
      cravadas: 18,
      palpites: [
  { partidaId: "1",  placar: "2-2" }, // BHA 2 - 2 EVE
{ partidaId: "2",  placar: "1-2" }, // LEE 1 - 2 ARS
{ partidaId: "3",  placar: "2-0" }, // WOL 2 - 0 BOU
{ partidaId: "4",  placar: "3-0" }, // CHE 3 - 0 WHU
{ partidaId: "5",  placar: "2-1" }, // LIV 2 - 1 NEW
{ partidaId: "6",  placar: "2-0" }, // AVL 2 - 0 BRE
{ partidaId: "7",  placar: "2-0" }, // MUN 2 - 0 FUL
{ partidaId: "8",  placar: "1-1" }, // NFO 1 - 1 CRY
{ partidaId: "9",  placar: "2-2" }, // TOT 2 - 2 MCI
{ partidaId: "10", placar: "2-1" }, // SUN 2 - 1 BUR

      ],
    },
    {
      nome: "Victor",
      pontos: 142,
      cravadas: 17,
      palpites: [
 { partidaId: "1",  placar: "1-1" }, // BHA x EVE
{ partidaId: "2",  placar: "1-3" }, // LEE x ARS
{ partidaId: "3",  placar: "2-2" }, // WOL x BOU
{ partidaId: "4",  placar: "2-1" }, // CHE x WHU
{ partidaId: "5",  placar: "1-1" }, // LIV x NEW
{ partidaId: "6",  placar: "2-0" }, // AVL x BRE
{ partidaId: "7",  placar: "2-0" }, // MUN x FUL
{ partidaId: "8",  placar: "1-1" }, // NFO x CRY
{ partidaId: "9",  placar: "2-1" }, // TOT x MCI
{ partidaId: "10", placar: "2-0" }, // SUN x BUR

// { id: "1",  abreviacao: "LEE - NFO" }, // Leeds x Nottingham Forest
// { id: "2",  abreviacao: "MUN - TOT" }, // Manchester United x Tottenham
// { id: "3",  abreviacao: "BOU - AVL" }, // Bournemouth x Aston Villa
// { id: "4",  abreviacao: "ARS - SUN" }, // Arsenal x Sunderland
// { id: "5",  abreviacao: "BUR - WHU" }, // Burnley x West Ham
// { id: "6",  abreviacao: "FUL - EVE" }, // Fulham x Everton
// { id: "7",  abreviacao: "WOL - CHE" }, // Wolves x Chelsea
// { id: "8",  abreviacao: "NEW - BRE" }, // Newcastle x Brentford
// { id: "9",  abreviacao: "BHA - CRY" }, // Brighton x Crystal Palace
// { id: "10", abreviacao: "LIV - MCI" }, // Liverpool x Manchester City
],
    },
  ],
  placarFinal: [
{ partidaId: "1",  placar: "1-1" }, // Brighton 1 x 1 Everton
{ partidaId: "2",  placar: "0-4" }, // Leeds 0 x 4 Arsenal
{ partidaId: "3",  placar: "0-2" }, // Wolves 0 x 2 Bournemouth
{ partidaId: "4",  placar: "3-2" }, // Chelsea 3 x 2 West Ham
{ partidaId: "5",  placar: "4-1" }, // Liverpool 4 x 1 Newcastle
{ partidaId: "6",  placar: "0-1" }, // Aston Villa 0 x 1 Brentford
{ partidaId: "7",  placar: "3-2" }, // Manchester United 3 x 2 Fulham
{ partidaId: "8",  placar: "1-1" }, // Nottingham Forest 1 x 1 Crystal Palace
{ partidaId: "9",  placar: "2-2" }, // Tottenham 2 x 2 Manchester City
{ partidaId: "10", placar: "3-0" }, // Sunderland x Burnley (não aparece no print)
  ],
};

 const dadosParticipantes: BolaoData = {
  partidas:[
 { id: "1",  abreviacao: "BHA - EVE" }, // Brighton x Everton
{ id: "2",  abreviacao: "LEE - ARS" }, // Leeds x Arsenal
{ id: "3",  abreviacao: "WOL - BOU" }, // Wolves x Bournemouth
{ id: "4",  abreviacao: "CHE - WHU" }, // Chelsea x West Ham
{ id: "5",  abreviacao: "LIV - NEW" }, // Liverpool x Newcastle
{ id: "6",  abreviacao: "AVL - BRE" }, // Aston Villa x Brentford
{ id: "7",  abreviacao: "MUN - FUL" }, // Manchester United x Fulham
{ id: "8",  abreviacao: "NFO - CRY" }, // Nottingham Forest x Crystal Palace
{ id: "9",  abreviacao: "TOT - MCI" }, // Tottenham x Manchester City
{ id: "10", abreviacao: "SUN - BUR" }, // Sunderland x Burnley

],
  participantes: [
    {
      nome: "BRF_Arsenal",
      pontos: 9,
      cravadas: 1,
      palpites: [
  
{ partidaId: "1",  placar: "2-0" }, // Brighton 2 - 0 Everton
{ partidaId: "2",  placar: "0-5" }, // Leeds 0 - 5 Arsenal
{ partidaId: "3",  placar: "1-3" }, // Wolves 1 - 3 Bournemouth
{ partidaId: "4",  placar: "3-0" }, // Chelsea 3 - 0 West Ham
{ partidaId: "5",  placar: "0-2" }, // Liverpool 0 - 2 Newcastle
{ partidaId: "6",  placar: "3-2" }, // Aston Villa 3 - 2 Brentford
{ partidaId: "7",  placar: "2-0" }, // Manchester United 2 - 0 Fulham
{ partidaId: "8",  placar: "1-2" }, // Nottingham Forest 1 - 2 Crystal Palace
{ partidaId: "9",  placar: "2-4" }, // Tottenham 2 - 4 Man City
{ partidaId: "10", placar: "3-0" }, // Sunderland 3 - 0 Burnley
      ],
    },
    {
      nome: "Citron",
      pontos: 15,
      cravadas: 2,
      palpites: [
 { partidaId: "1",  placar: "1-0" }, // Brighton 1 - 0 Everton
{ partidaId: "2",  placar: "0-2" }, // Leeds 0 - 2 Arsenal
{ partidaId: "3",  placar: "1-2" }, // Wolves 1 - 2 Bournemouth
{ partidaId: "4",  placar: "3-0" }, // Chelsea 3 - 0 West Ham
{ partidaId: "5",  placar: "2-2" }, // Liverpool 2 - 2 Newcastle
{ partidaId: "6",  placar: "3-1" }, // Aston Villa 3 - 1 Brentford
{ partidaId: "7",  placar: "2-0" }, // Manchester United 2 - 0 Fulham
{ partidaId: "8",  placar: "0-0" }, // Nottingham Forest 0 - 0 Crystal Palace
{ partidaId: "9",  placar: "1-0" }, // Tottenham 1 - 0 Man City
{ partidaId: "10", placar: "4-1" }, // Sunderland 4 - 1 Burnley

      ],
    },

    {
      nome: "Caio",
      pontos: 17,
      cravadas: 1,
      palpites: [
 
  { partidaId: "1",  placar: "2-1" }, // BHA 2 - 1 EVE
{ partidaId: "2",  placar: "1-1" }, // LEE 1 - 1 ARS
{ partidaId: "3",  placar: "2-2" }, // WOL 2 - 2 BOU
{ partidaId: "4",  placar: "3-1" }, // CHE 3 - 1 WHU
{ partidaId: "5",  placar: "1-1" }, // LIV 0 - 0 NEW
{ partidaId: "6",  placar: "2-1" }, // AVL 2 - 1 BRE
{ partidaId: "7",  placar: "2-1" }, // MUN 2 - 1 FUL
{ partidaId: "8",  placar: "1-1" }, // NFO 1 - 1 CRY
{ partidaId: "9",  placar: "0-0" }, // TOT 0 - 0 MCI
{ partidaId: "10", placar: "2-0" }, // SUN 2 - 0 BUR

      ],
    },
  ],
  placarFinal: [
{ partidaId: "1",  placar: "1-1" }, // Brighton 1 x 1 Everton
{ partidaId: "2",  placar: "0-4" }, // Leeds 0 x 4 Arsenal
{ partidaId: "3",  placar: "0-2" }, // Wolves 0 x 2 Bournemouth
{ partidaId: "4",  placar: "3-2" }, // Chelsea 3 x 2 West Ham
{ partidaId: "5",  placar: "4-1" }, // Liverpool 4 x 1 Newcastle
{ partidaId: "6",  placar: "0-1" }, // Aston Villa 0 x 1 Brentford
{ partidaId: "7",  placar: "3-2" }, // Manchester United 3 x 2 Fulham
{ partidaId: "8",  placar: "1-1" }, // Nottingham Forest 1 x 1 Crystal Palace
{ partidaId: "9",  placar: "2-2" }, // Tottenham 2 x 2 Manchester City
{ partidaId: "10", placar: "3-0" }, // Sunderland x Burnley (não aparece no print)

  ],
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header onExportPDF={handleExportPDF} />
      
      <main className="container mx-auto px-4 py-8">
       
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-pl-green text-white rounded-full text-sm font-medium">
              <Wifi className="w-4 h-4" />
              <span>Dados em Tempo Real</span>
            </div>
          </div>
          
          <Button 
            onClick={handleRefresh}
            variant="outline"
            className="border-pl-purple text-pl-purple hover:bg-pl-purple hover:text-white"
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar Dados
          </Button>
        </div>

        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          <div className="xl:col-span-2">
            <LeagueTable standings={standings} isLoading={isLoading} />
          </div>
          
          
          <div className="xl:col-span-1">
            <MatchResults matches={matches} isLoading={isLoading} />
          </div>
        </div>
         <Bolao data={dadosEquipe} />
          <BolaoParticipantes data={dadosParticipantes} />
        
      </main>
    </div>
  );
};

export default Index;