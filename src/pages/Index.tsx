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
 { id: "1",  abreviacao: "WHU - SUN" }, // West Ham x Sunderland
{ id: "2",  abreviacao: "BUR - TOT" }, // Burnley x Tottenham
{ id: "3",  abreviacao: "FUL - BHA" }, // Fulham x Brighton
{ id: "4",  abreviacao: "MCI - WOL" }, // Man City x Wolves
{ id: "5",  abreviacao: "BOU - LIV" }, // Bournemouth x Liverpool
{ id: "6",  abreviacao: "BRE - NFO" }, // Brentford x Forest
{ id: "7",  abreviacao: "CRY - CHE" }, // Crystal Palace x Chelsea
{ id: "8",  abreviacao: "NEW - AVL" }, // Newcastle x Aston Villa
{ id: "9",  abreviacao: "ARS - MUN" }, // Arsenal x Man United
{ id: "10", abreviacao: "EVE - LEE" }, // Everton x Leeds

],
  participantes: [
    {
      nome: "Brenno",
      pontos: 117,
      cravadas: 10,
      palpites: [
 { partidaId: "1",  placar: "0-3" }, // WHU 0 - 3 SUN
  { partidaId: "2",  placar: "1-0" }, // BUR 1 - 0 TOT
  { partidaId: "3",  placar: "2-1" }, // FUL 2 - 1 BHA
  { partidaId: "4",  placar: "4-0" }, // MCI 4 - 0 WOL
  { partidaId: "5",  placar: "1-1" }, // BOU 1 - 1 LIV
  { partidaId: "6",  placar: "3-0" }, // BRE 3 - 0 NFO
  { partidaId: "7",  placar: "0-2" }, // CRY 0 - 2 CHE
  { partidaId: "8",  placar: "1-2" }, // NEW 1 - 2 AVL
  { partidaId: "9",  placar: "2-1" }, // ARS 2 - 1 MUN
  { partidaId: "10", placar: "1-0" }, // EVE 1 - 0 LEE
      ],
    },
    {
      nome: "Karen",
      pontos: 131,
      cravadas: 18,
      palpites: [
 { partidaId: "1",  placar: "1-2" }, // WHU 1 - 2 SUN
  { partidaId: "2",  placar: "2-1" }, // BUR 2 - 1 TOT
  { partidaId: "3",  placar: "2-2" }, // FUL 2 - 1 BHA
  { partidaId: "4",  placar: "3-0" }, // MCI 4 - 0 WOL
  { partidaId: "5",  placar: "1-1" }, // BOU 1 - 1 LIV
  { partidaId: "6",  placar: "2-0" }, // BRE 3 - 0 NFO
  { partidaId: "7",  placar: "3-2" }, // CRY 0 - 2 CHE
  { partidaId: "8",  placar: "2-2" }, // NEW 1 - 2 AVL
  { partidaId: "9",  placar: "1-2" }, // ARS 2 - 1 MUN
  { partidaId: "10", placar: "2-1" }, // EVE 1 - 0 LEE
      ],
    },
    {
      nome: "Nicolas",
      pontos: 131,
      cravadas: 14,
      palpites: [
   { partidaId: "1",  placar: "0-3" }, // WHU 0 - 3 SUN
  { partidaId: "2",  placar: "2-1" }, // BUR 2 - 1 TOT
  { partidaId: "3",  placar: "1-0" }, // FUL 1 - 0 BHA
  { partidaId: "4",  placar: "4-1" }, // MCI 4 - 1 WOL
  { partidaId: "5",  placar: "2-0" }, // BOU 2 - 0 LIV
  { partidaId: "6",  placar: "3-1" }, // BRE 3 - 1 NFO
  { partidaId: "7",  placar: "1-2" }, // CRY 1 - 2 CHE
  { partidaId: "8",  placar: "3-2" }, // NEW 3 - 2 AVL
  { partidaId: "9",  placar: "1-1" }, // ARS 1 - 1 MUN
  { partidaId: "10", placar: "2-2" }, // EVE 2 - 2 LEE

      ],
    },
    {
      nome: "Victor",
      pontos: 130,
      cravadas: 15,
      palpites: [
  { partidaId: "1",  placar: "1-1" }, // WHU 1 - 1 SUN
  { partidaId: "2",  placar: "1-0" }, // BUR 1 - 0 TOT
  { partidaId: "3",  placar: "2-1" }, // FUL 2 - 1 BHA
  { partidaId: "4",  placar: "3-0" }, // MCI 3 - 0 WOL
  { partidaId: "5",  placar: "2-2" }, // BOU 2 - 2 LIV
  { partidaId: "6",  placar: "2-0" }, // BRE 2 - 0 NFO
  { partidaId: "7",  placar: "1-1" }, // CRY 1 - 1 CHE
  { partidaId: "8",  placar: "2-1" }, // NEW 2 - 1 AVL
  { partidaId: "9",  placar: "2-0" }, // ARS 2 - 0 MUN
  { partidaId: "10", placar: "2-0" }, // EVE 2 - 0 LEE
],
    },
  ],
  placarFinal: [
{ partidaId: "1",  placar: "" }, // Man Utd 2 x 0 Man City
{ partidaId: "2",  placar: "" }, // Chelsea 2 x 0 Brentford
{ partidaId: "3",  placar: "" }, // Leeds 1 x 0 Fulham
{ partidaId: "4",  placar: "" }, // Liverpool 1 x 1 Burnley
{ partidaId: "5",  placar: ""}, // Sunderland 2 x 1 Crystal Palace
{ partidaId: "6",  placar: "" }, // Tottenham 1 x 2 West Ham
{ partidaId: "7",  placar: "" }, // Forest 0 x 0 Arsenal
{ partidaId: "8",  placar:"" }, // Wolves 0 x 0 Newcastle
{ partidaId: "9",  placar: "" }, // Aston Villa 0 x 1 Everton
{ partidaId: "10", placar: ""   }, // Brighton x Bournemouth (ainda não iniciado)
  ],
};

 const dadosParticipantes: BolaoData = {
  partidas:[
 { id: "1",  abreviacao: "WHU - SUN" }, // West Ham x Sunderland
{ id: "2",  abreviacao: "BUR - TOT" }, // Burnley x Tottenham
{ id: "3",  abreviacao: "FUL - BHA" }, // Fulham x Brighton
{ id: "4",  abreviacao: "MCI - WOL" }, // Man City x Wolves
{ id: "5",  abreviacao: "BOU - LIV" }, // Bournemouth x Liverpool
{ id: "6",  abreviacao: "BRE - NFO" }, // Brentford x Forest
{ id: "7",  abreviacao: "CRY - CHE" }, // Crystal Palace x Chelsea
{ id: "8",  abreviacao: "NEW - AVL" }, // Newcastle x Aston Villa
{ id: "9",  abreviacao: "ARS - MUN" }, // Arsenal x Man United
{ id: "10", abreviacao: "EVE - LEE" }, // Everton x Leeds

],
  participantes: [
    {
      nome: "BRF_Arsenal",
      pontos: 0,
      cravadas: 0,
      palpites: [
  
  {partidaId: "1",  placar: "" }, // MUN 1 - 3 MCI
  { partidaId: "2",  placar: "" }, // SUN 2 - 0 CRY
  { partidaId: "3",  placar: "" }, // CHE 2 - 2 BRE
  { partidaId: "4",  placar: "" }, // LIV 5 - 1 BUR
  { partidaId: "5",  placar: "" }, // LEE 0 - 2 FUL
  { partidaId: "6",  placar: "" }, // TOT 1 - 2 WHU
  { partidaId: "7",  placar: "" }, // NFO 0 - 4 ARS
  { partidaId: "8",  placar: "" }, // WOL 1 - 2 NEW
  { partidaId: "9",  placar: "" }, // AVL 3 - 2 EVE
  { partidaId: "10", placar: "" }, // BHA 3 - 1 BOU
      ],
    },
    {
      nome: "Citron",
      pontos: 0,
      cravadas: 0,
      palpites: [
 { partidaId: "1",  placar: "1-1" }, // WHU 1 - 1 SUN
{ partidaId: "2",  placar: "0-1" }, // BUR 0 - 1 TOT
{ partidaId: "3",  placar: "2-1" }, // FUL 2 - 1 BHA
{ partidaId: "4",  placar: "3-0" }, // MCI 3 - 0 WOL
{ partidaId: "5",  placar: "2-2" }, // BOU 2 - 2 LIV
{ partidaId: "6",  placar: "3-1" }, // BRE 3 - 1 NFO
{ partidaId: "7",  placar: "1-1" }, // CRY 1 - 1 CHE
{ partidaId: "8",  placar: "1-0" }, // NEW 1 - 0 AVL
{ partidaId: "9",  placar: "2-3" }, // ARS 2 - 3 MUN
{ partidaId: "10", placar: "1-0" }, // EVE 1 - 0 LEE

      ],
    },
  //   {
  //     nome: "Coluna Wolves",
  //     pontos: 5,
  //     cravadas: 1,
  //     palpites: [
  // { partidaId: "1",  placar: "2-2" },
  // { partidaId: "2",  placar: "2-2" },
  // { partidaId: "3",  placar: "2-3" },
  // { partidaId: "4",  placar: "3-1" },
  // { partidaId: "5",  placar: "2-1" },
  // { partidaId: "6",  placar: "2-0" },
  // { partidaId: "7",  placar: "1-3" },
  // { partidaId: "8",  placar: "2-2" },
  // { partidaId: "9",  placar: "3-1" },
  // { partidaId: "10", placar: "2-2" },
  //     ],
  //   },
    {
      nome: "Caio",
      pontos: 0,
      cravadas: 0,
      palpites: [
 
  { partidaId: "1",  placar: "2-1" }, // WHU 2 - 1 SUN
  { partidaId: "2",  placar: "1-1" }, // BUR 1 - 1 TOT
  { partidaId: "3",  placar: "3-0" }, // FUL 3 - 0 BHA
  { partidaId: "4",  placar: "4-1" }, // MCI 4 - 1 WOL
  { partidaId: "5",  placar: "2-2" }, // BOU 2 - 2 LIV
  { partidaId: "6",  placar: "1-1" }, // BRE 1 - 1 NFO
  { partidaId: "7",  placar: "1-2" }, // CRY 1 - 2 CHE
  { partidaId: "8",  placar: "2-0" }, // NEW 2 - 0 AVL
  { partidaId: "9",  placar: "1-1" }, // ARS 1 - 1 MUN
  { partidaId: "10", placar: "2-0" }, // EVE 2 - 0 LEE

      ],
    },
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
{ partidaId: "1",  placar: "" }, // Man Utd 2 x 0 Man City
{ partidaId: "2",  placar: "" }, // Chelsea 2 x 0 Brentford
{ partidaId: "3",  placar: "" }, // Leeds 1 x 0 Fulham
{ partidaId: "4",  placar: "" }, // Liverpool 1 x 1 Burnley
{ partidaId: "5",  placar: "" }, // Sunderland 2 x 1 Crystal Palace
{ partidaId: "6",  placar: "" }, // Tottenham 1 x 2 West Ham
{ partidaId: "7",  placar: "" }, // Forest 0 x 0 Arsenal
{ partidaId: "8",  placar: "" }, // Wolves 0 x 0 Newcastle
{ partidaId: "9",  placar: "" }, // Aston Villa 0 x 1 Everton
{ partidaId: "10", placar: ""   }, // Brighton x Bournemouth (ainda não iniciado)
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