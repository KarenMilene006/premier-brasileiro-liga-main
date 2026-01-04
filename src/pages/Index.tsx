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
   { id: "1", abreviacao: "AVL NFO" },
  { id: "2", abreviacao: "BHA BUR" },
  { id: "3", abreviacao: "WOL WHU" },
  { id: "4", abreviacao: "BOU ARS" },
  { id: "5", abreviacao: "LEE MUN" },
  { id: "6", abreviacao: "EVE BRE" },
  { id: "7", abreviacao: "FUL LIV" },
  { id: "8", abreviacao: "NEW CRY" },
  { id: "9", abreviacao: "TOT SUN" },
  { id: "10", abreviacao: "MCI CHE" },
  ],
  participantes: [
    {
      nome: "Brenno",
      pontos: 111,
      cravadas: 10,
      palpites: [
  { partidaId: "1", placar: "2-0" },
  { partidaId: "2", placar: "2-0" },
  { partidaId: "3", placar: "0-3" },
  { partidaId: "4", placar: "0-2" },
  { partidaId: "5", placar: "1-1" },
  { partidaId: "6", placar: "0-2" },
  { partidaId: "7", placar: "0-2" },
  { partidaId: "8", placar: "2-1" },
  { partidaId: "9", placar: "0-1" },
  { partidaId: "10", placar: "3-0" },
      ],
    },
    {
      nome: "Karen",
      pontos: 121,
      cravadas: 16,
      palpites: [
  { partidaId: "1", placar: "2-1" },
  { partidaId: "2", placar: "3-0" },
  { partidaId: "3", placar: "2-2" },
  { partidaId: "4", placar: "1-1" },
  { partidaId: "5", placar: "2-3" },
  { partidaId: "6", placar: "2-1" },
  { partidaId: "7", placar: "2-1" },
  { partidaId: "8", placar: "1-0" },
  { partidaId: "9", placar: "1-2" },
  { partidaId: "10", placar: "3-1" },
      ],
    },
    {
      nome: "Nicolas",
      pontos: 124,
      cravadas: 14,
      palpites: [
  { partidaId: "1", placar: "2-0" },
  { partidaId: "2", placar: "3-1" },
  { partidaId: "3", placar: "2-1" },
  { partidaId: "4", placar: "1-2" },
  { partidaId: "5", placar: "2-2" },
  { partidaId: "6", placar: "2-1" },
  { partidaId: "7", placar: "1-1" },
  { partidaId: "8", placar: "3-1" },
  { partidaId: "9", placar: "1-2" },
  { partidaId: "10", placar: "3-0" }
      ],
    },
    {
      nome: "Victor",
      pontos: 116,
      cravadas: 14,
      palpites: [
       { partidaId: "1", placar: "3-0" },
  { partidaId: "2", placar: "2-0" },
  { partidaId: "3", placar: "2-1" },
  { partidaId: "4", placar: "0-2" },
  { partidaId: "5", placar: "1-0" },
  { partidaId: "6", placar: "2-0" },
  { partidaId: "7", placar: "1-1" },
  { partidaId: "8", placar: "2-1" },
  { partidaId: "9", placar: "2-1" },
  { partidaId: "10", placar: "2-0" },
      ],
    },
  ],
  placarFinal: [
   { partidaId: "1", placar: "3-1" },   // AVL NFO
  { partidaId: "2", placar: "2-0" },   // BHA BUR  
  { partidaId: "3", placar: "3-0" },   // WOL WHU
  { partidaId: "4", placar: "2-3" },   // BOU ARS
  { partidaId: "5", placar: "1-1" },   // LEE MUN
  { partidaId: "6", placar: "2-4" },   // EVE BRE
  { partidaId: "7", placar: "2-0" },   // FUL LIV
  { partidaId: "8", placar: "1-1" },   // NEW CRY
  { partidaId: "9", placar: "2-2" },   // TOT SUN
  { partidaId: "10", placar: "1-1" },
  ],
};

 const dadosParticipantes: BolaoData = {
  partidas:[
  { id: "1", abreviacao: "WHU NFO" }, // West Ham x Forest
  { id: "2", abreviacao: "BOU TOT" }, // Bournemouth x Tottenham
  { id: "3", abreviacao: "BRE SUN" }, // Brentford x Sunderland
  { id: "4", abreviacao: "CRY AVL" }, // Crystal Palace x Aston Villa
  { id: "5", abreviacao: "EVE WOL" }, // Everton x Wolves
  { id: "6", abreviacao: "FUL CHE" }, // Fulham x Chelsea
  { id: "7", abreviacao: "MCI BHA" }, // Man City x Brighton
  { id: "8", abreviacao: "BUR MUN" }, // Burnley x Man Utd
  { id: "9", abreviacao: "NEW LEE" }, // Newcastle x Leeds
  { id: "10", abreviacao: "ARS LIV" } // Arsenal x Liverpool
],
  participantes: [
    {
      nome: "-",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1", placar: "" },
  { partidaId: "2", placar: "-" },
  { partidaId: "3", placar: "-" },
  { partidaId: "4", placar: "-" },
  { partidaId: "5", placar: "-" },
  { partidaId: "6", placar: "-" },
  { partidaId: "7", placar: "-" },
  { partidaId: "8", placar: "-" },
  { partidaId: "9", placar: "-" },
  { partidaId: "10", placar:"-" },
      ],
    },
    {
      nome: "-",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1", placar: "" },
  { partidaId: "2", placar: "-" },
  { partidaId: "3", placar: "-" },
  { partidaId: "4", placar: "-" },
  { partidaId: "5", placar: "-" },
  { partidaId: "6", placar: "-" },
  { partidaId: "7", placar: "-" },
  { partidaId: "8", placar: "-" },
  { partidaId: "9", placar: "-" },
  { partidaId: "10", placar:"-" },
      ],
    },
    {
      nome: "-",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1", placar: "" },
  { partidaId: "2", placar: "-" },
  { partidaId: "3", placar: "-" },
  { partidaId: "4", placar: "-" },
  { partidaId: "5", placar: "-" },
  { partidaId: "6", placar: "-" },
  { partidaId: "7", placar: "-" },
  { partidaId: "8", placar: "-" },
  { partidaId: "9", placar: "-" },
  { partidaId: "10", placar:"-" },
      ],
    },
    {
      nome: "-",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1", placar: "" },
  { partidaId: "2", placar: "-" },
  { partidaId: "3", placar: "-" },
  { partidaId: "4", placar: "-" },
  { partidaId: "5", placar: "-" },
  { partidaId: "6", placar: "-" },
  { partidaId: "7", placar: "-" },
  { partidaId: "8", placar: "-" },
  { partidaId: "9", placar: "-" },
  { partidaId: "10", placar:"-" },
      ],
    },
     {
      nome: "-",
      pontos: 0,
      cravadas: 0,
      palpites: [
  { partidaId: "1", placar: "" },
  { partidaId: "2", placar: "-" },
  { partidaId: "3", placar: "-" },
  { partidaId: "4", placar: "-" },
  { partidaId: "5", placar: "-" },
  { partidaId: "6", placar: "-" },
  { partidaId: "7", placar: "-" },
  { partidaId: "8", placar: "-" },
  { partidaId: "9", placar: "-" },
  { partidaId: "10", placar:"-" },
      ],
    },
  ],
  placarFinal: [
   { partidaId: "1", placar: "" },   // AVL NFO
  { partidaId: "2", placar: "" },   // BHA BUR  
  { partidaId: "3", placar: "" },   // WOL WHU
  { partidaId: "4", placar: "" },   // BOU ARS
  { partidaId: "5", placar: "" },   // LEE MUN
  { partidaId: "6", placar: "" },   // EVE BRE
  { partidaId: "7", placar: "" },   // FUL LIV
  { partidaId: "8", placar: "" },   // NEW CRY
  { partidaId: "9", placar: "" },   // TOT SUN
  { partidaId: "10", placar: "" },
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