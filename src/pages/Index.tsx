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
  { id: "1",  abreviacao: "MUN MCI" }, // Man Utd x Man City
  { id: "2",  abreviacao: "CHE BRE" }, // Chelsea x Brentford
  { id: "3",  abreviacao: "LEE FUL" }, // Leeds x Fulham
  { id: "4",  abreviacao: "LIV BUR" }, // Liverpool x Burnley
  { id: "5",  abreviacao: "SUN CRY" }, // Sunderland x Crystal Palace
  { id: "6",  abreviacao: "TOT WHU" }, // Tottenham x West Ham
  { id: "7",  abreviacao: "NFO ARS" }, // Forest x Arsenal
  { id: "8",  abreviacao: "WOL NEW" }, // Wolves x Newcastle
  { id: "9",  abreviacao: "AVL EVE" }, // Aston Villa x Everton
  { id: "10", abreviacao: "BHA BOU" }, // Brighton x Bournemouth
],
  participantes: [
    {
      nome: "Brenno",
      pontos: 114,
      cravadas: 10,
      palpites: [
 { partidaId: "1",  placar: "0-4" }, // MUN 2 - 2 MCI
  { partidaId: "2",  placar: "2-1" }, // CHE 1 - 1 BRE
  { partidaId: "3",  placar: "2-0" }, // LIV 3 - 0 BUR
  { partidaId: "4",  placar: "1-0" }, // LEE 1 - 0 FUL
  { partidaId: "5",  placar: "2-0" }, // SUN 2 - 1 CRY
  { partidaId: "6",  placar: "2-1" }, // TOT 2 - 1 WHU
  { partidaId: "7",  placar: "0-3" }, // NFO 0 - 2 ARS
  { partidaId: "8",  placar: "0-4" }, // WOL 0 - 1 NEW
  { partidaId: "9",  placar: "2-0" }, // AVL 2 - 0 EVE
  { partidaId: "10", placar: "2-0" }, // BHA 1 - 0 BOU
      ],
    },
    {
      nome: "Karen",
      pontos: 126,
      cravadas: 17,
      palpites: [
  { partidaId: "1",  placar: "2-1" }, // MUN 2 - 1 MCI
  { partidaId: "2",  placar: "3-1" }, // CHE 1 - 1 BRE
  { partidaId: "3",  placar: "3-1" }, // LIV 3 - 0 BUR
  { partidaId: "4",  placar: "2-2" }, // LEE 1 - 0 FUL
  { partidaId: "5",  placar: "2-1" }, // SUN 2 - 1 CRY
  { partidaId: "6",  placar: "2-1" }, // TOT 2 - 1 WHU
  { partidaId: "7",  placar: "1-3" }, // NFO 0 - 2 ARS
  { partidaId: "8",  placar: "2-3" }, // WOL 0 - 1 NEW
  { partidaId: "9",  placar: "2-1" }, // AVL 2 - 0 EVE
  { partidaId: "10", placar: "2-0" }, // BHA 1 - 0 BOU
      ],
    },
    {
      nome: "Nicolas",
      pontos: 129,
      cravadas: 14,
      palpites: [
  { partidaId: "1",  placar: "0-2" }, // MUN 2 - 2 MCI
  { partidaId: "2",  placar: "2-1" }, // CHE 1 - 1 BRE
  { partidaId: "3",  placar: "2-1" }, // LIV 3 - 0 BUR
  { partidaId: "4",  placar: "2-2" }, // LEE 1 - 0 FUL
  { partidaId: "5",  placar: "3-1" }, // SUN 2 - 1 CRY
  { partidaId: "6",  placar: "2-1" }, // TOT 2 - 1 WHU
  { partidaId: "7",  placar: "0-3" }, // NFO 0 - 2 ARS
  { partidaId: "8",  placar: "1-3" }, // WOL 0 - 1 NEW
  { partidaId: "9",  placar: "3-1" }, // AVL 2 - 0 EVE
  { partidaId: "10", placar: "2-0" }, // BHA 1 - 0 BOU
      ],
    },
    {
      nome: "Victor",
      pontos: 126,
      cravadas: 15,
      palpites: [
 { partidaId: "1",  placar: "2-1" }, // MUN x MCI
{ partidaId: "2",  placar: "2-1" }, // CHE x BRE
{ partidaId: "3",  placar: "3-0" }, // LIV x BUR
{ partidaId: "4",  placar: "2-1" }, // LEE x FUL
{ partidaId: "5",  placar: "2-0" }, // SUN x CRY
{ partidaId: "6",  placar: "1-0" }, // TOT x WHU
{ partidaId: "7",  placar: "0-3" }, // NFO x ARS
{ partidaId: "8",  placar: "1-2" }, // WOL x NEW
{ partidaId: "9",  placar: "2-0" }, // AVL x EVE
{ partidaId: "10", placar: "2-0" }, // BHA x BOU
      ],
    },
  ],
  placarFinal: [
{ partidaId: "1",  placar: "1-2" }, // West Ham 1 x 2 Forest
{ partidaId: "2",  placar: "2-0" }, // Bournemouth 0 x 2 Chelsea
{ partidaId: "3",  placar: "1-0" }, // Brentford 0 x 1 Leeds
{ partidaId: "4",  placar: "1-1" }, // Crystal Palace 1 x 1 Burnley
{ partidaId: "5",  placar: "2-1" }, // Everton 1 x 2 Sunderland
{ partidaId: "6",  placar: "1-2" }, // Fulham 2 x 1 West Ham
{ partidaId: "7",  placar: "0-0" }, // Man City 0 x 0 Arsenal
{ partidaId: "8",  placar: "2-0" }, // Burnley 0 x 2 Man Utd
{ partidaId: "9",  placar: "0-0" }, // Newcastle 0 x 0 Wolves
  { partidaId: "10", placar: "-" }, // BHA 1 - 0 BOU
  ],
};

 const dadosParticipantes: BolaoData = {
  partidas:[
  { id: "1",  abreviacao: "MUN MCI" }, // Man Utd x Man City
  { id: "2",  abreviacao: "CHE BRE" }, // Chelsea x Brentford
  { id: "3",  abreviacao: "LEE FUL" }, // Leeds x Fulham
  { id: "4",  abreviacao: "LIV BUR" }, // Liverpool x Burnley
  { id: "5",  abreviacao: "SUN CRY" }, // Sunderland x Crystal Palace
  { id: "6",  abreviacao: "TOT WHU" }, // Tottenham x West Ham
  { id: "7",  abreviacao: "NFO ARS" }, // Forest x Arsenal
  { id: "8",  abreviacao: "WOL NEW" }, // Wolves x Newcastle
  { id: "9",  abreviacao: "AVL EVE" }, // Aston Villa x Everton
  { id: "10", abreviacao: "BHA BOU" }, // Brighton x Bournemouth
],
  participantes: [
    {
      nome: "BRF_Arsenal",
      pontos: 7,
      cravadas: 2,
      palpites: [
  
  {partidaId: "1",  placar: "1-3" }, // MUN 1 - 3 MCI
  { partidaId: "2",  placar: "2-0" }, // SUN 2 - 0 CRY
  { partidaId: "3",  placar: "2-2" }, // CHE 2 - 2 BRE
  { partidaId: "4",  placar: "5-1" }, // LIV 5 - 1 BUR
  { partidaId: "5",  placar: "0-2" }, // LEE 0 - 2 FUL
  { partidaId: "6",  placar: "1-2" }, // TOT 1 - 2 WHU
  { partidaId: "7",  placar: "0-4" }, // NFO 0 - 4 ARS
  { partidaId: "8",  placar: "1-2" }, // WOL 1 - 2 NEW
  { partidaId: "9",  placar: "3-2" }, // AVL 3 - 2 EVE
  { partidaId: "10", placar: "3-1" }, // BHA 3 - 1 BOU
      ],
    },
    {
      nome: "Citron",
      pontos: 4,
      cravadas: 1,
      palpites: [
 { partidaId: "1",  placar: "2-2" }, // MUN 2 - 2 MCI
  { partidaId: "2",  placar: "1-1" }, // CHE 1 - 1 BRE
  { partidaId: "3",  placar: "3-0" }, // LIV 3 - 0 BUR
  { partidaId: "4",  placar: "1-0" }, // LEE 1 - 0 FUL
  { partidaId: "5",  placar: "2-1" }, // SUN 2 - 1 CRY
  { partidaId: "6",  placar: "2-1" }, // TOT 2 - 1 WHU
  { partidaId: "7",  placar: "0-2" }, // NFO 0 - 2 ARS
  { partidaId: "8",  placar: "0-1" }, // WOL 0 - 1 NEW
  { partidaId: "9",  placar: "2-0" }, // AVL 2 - 0 EVE
  { partidaId: "10", placar: "1-0" }, // BHA 1 - 0 BOU
      ],
    },
    {
      nome: "Coluna Wolves",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1",  placar: "2-2" },
  { partidaId: "2",  placar: "2-2" },
  { partidaId: "3",  placar: "2-3" },
  { partidaId: "4",  placar: "3-1" },
  { partidaId: "5",  placar: "2-1" },
  { partidaId: "6",  placar: "2-0" },
  { partidaId: "7",  placar: "1-3" },
  { partidaId: "8",  placar: "2-2" },
  { partidaId: "9",  placar: "3-1" },
  { partidaId: "10", placar: "2-2" },
      ],
    },
    // {
  //     nome: "-",
  //     pontos: 0,
  //     cravadas: 0,
  //     palpites: [
  // { partidaId: "1", placar: "" },
  // { partidaId: "2", placar: "-" },
  // { partidaId: "3", placar: "-" },
  // { partidaId: "4", placar: "-" },
  // { partidaId: "5", placar: "-" },
  // { partidaId: "6", placar: "-" },
  // { partidaId: "7", placar: "-" },
  // { partidaId: "8", placar: "-" },
  // { partidaId: "9", placar: "-" },
  // { partidaId: "10", placar:"-" },
  //     ],
  //   },
  //    {
  //     nome: "-",
  //     pontos: 0,
  //     cravadas: 0,
  //     palpites: [
  // { partidaId: "1", placar: "" },
  // { partidaId: "2", placar: "-" },
  // { partidaId: "3", placar: "-" },
  // { partidaId: "4", placar: "-" },
  // { partidaId: "5", placar: "-" },
  // { partidaId: "6", placar: "-" },
  // { partidaId: "7", placar: "-" },
  // { partidaId: "8", placar: "-" },
  // { partidaId: "9", placar: "-" },
  // { partidaId: "10", placar:"-" },
  //     ],
    // },
  ],
  placarFinal: [
{ partidaId: "1",  placar: "1-2" }, // West Ham 1 x 2 Forest
{ partidaId: "2",  placar: "2-0" }, // Bournemouth 0 x 2 Chelsea
{ partidaId: "3",  placar: "1-0" }, // Brentford 0 x 1 Leeds
{ partidaId: "4",  placar: "1-1" }, // Crystal Palace 1 x 1 Burnley
{ partidaId: "5",  placar: "2-1" }, // Everton 1 x 2 Sunderland
{ partidaId: "6",  placar: "1-2" }, // Fulham 2 x 1 West Ham
{ partidaId: "7",  placar: "0-0" }, // Man City 0 x 0 Arsenal
{ partidaId: "8",  placar: "2-0" }, // Burnley 0 x 2 Man Utd
{ partidaId: "9",  placar: "0-0" }, // Newcastle 0 x 0 Wolves
{ partidaId: "10", placar: "-" }, // BHA 1 - 0 BOU
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