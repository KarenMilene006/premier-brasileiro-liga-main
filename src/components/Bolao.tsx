import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Filtro } from "./Filtro";

// Tipos para tipagem
export interface Partida {
  id: string;
  abreviacao: string;
}

export interface Palpite {
  partidaId: string;
  placar: string;
}

export interface Participante {
  nome: string;
  palpites: Palpite[];
  pontos: number;
  cravadas?: number;
}

export interface BolaoData {
  partidas: Partida[];
  participantes: Participante[];
  placarFinal: { partidaId: string; placar: string }[];
}

interface BolaoProps {
  data: BolaoData;
  className?: string;
}

type CellState = "normal" | "placar-vencedor" | "cravada";

export const Bolao = ({ data, className }: BolaoProps) => {
  const { partidas, participantes, placarFinal } = data;

  // 🔹 Função para calcular o vencedor de um placar
  const getVencedor = (placar: string): "casa" | "visitante" | "empate" => {
    const [golsCasa, golsVisitante] = placar.split("-").map(Number);
    if (golsCasa > golsVisitante) return "casa";
    if (golsVisitante > golsCasa) return "visitante";
    return "empate";
  };

  // 🔹 Função para calcular estado automático da célula
  const getAutomaticState = (
    participanteNome: string,
    partidaId: string
  ): CellState => {
    const palpite = participantes
      .find((j) => j.nome === participanteNome)
      ?.palpites.find((p) => p.partidaId === partidaId);
    
    const resultadoFinal = placarFinal.find((p) => p.partidaId === partidaId);

    // Se não tem palpite ou resultado, retorna normal
    if (!palpite?.placar || !resultadoFinal?.placar) return "normal";

    const palpiteVencedor = getVencedor(palpite.placar);
    const resultadoVencedor = getVencedor(resultadoFinal.placar);

    // 🔹 Cravada: placar exato
    if (palpite.placar === resultadoFinal.placar) return "cravada";

    // 🔹 Placar vencedor: acertou quem ganhou (mesmo sem placar exato)
    if (palpiteVencedor === resultadoVencedor) return "placar-vencedor";

    return "normal";
  };

  const getCellClass = (state: CellState) => {
    switch (state) {
      case "cravada":
        return "bg-green-500/80 text-white shadow-md";
      case "placar-vencedor":
        return "bg-blue-500/80 hover:bg-blue-500 text-white shadow-sm";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto p-6", className)}>
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-8 p-5 tracking-wider bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
        BOLÃO RODADA 20(Equipe) <Filtro matchdays={[1, 2, 3]} selectedMatchday={20} onChange={() => {}} />
      </h1>

      {/* Legenda */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm p-4 bg-muted/50 rounded-xl">
        <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="w-5 h-6 bg-green-500 rounded" />
          <span className="font-medium text-foreground/90">
            🟢 CRAVADA +3 (Placar exato)
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/50">
          <div className="w-5 h-6 bg-blue-500 rounded" />
          <span className="font-medium text-foreground/90">
            🔵 VENCEDOR +1 (Acertou quem ganhou)
          </span>
        </div>
  
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-2xl border-2 border-border/50 shadow-2xl shadow-black/10 backdrop-blur-sm bg-card/80">
        <table className="w-full border-collapse min-w-[950px]">
          {/* Header */}
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 to-secondary/20 border-b-2 border-border/50">
              <th className="bolao-header px-6 py-4 text-left font-bold text-lg text-foreground/90 w-36">
                PARTICIPANTE
              </th>
              {partidas.map((partida) => (
                <th
                  key={partida.id}
                  className="px-3 py-4 text-center font-bold text-base uppercase tracking-wide text-foreground/95 min-w-[80px]"
                >
                  {partida.abreviacao.split(" ").map((line, i) => (
                    <div key={i} className="leading-tight">
                      {line}
                    </div>
                  ))}
                </th>
              ))}
              <th className="px-6 py-4 text-right font-bold text-lg text-foreground/90 w-28">
                PONTOS
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {participantes.map((participante, index) => (
              <tr
                key={participante.nome}
                className={cn(
                  "transition-all duration-200 hover:bg-muted/80 border-b border-border/20",
                  index % 2 === 0 ? "bg-background" : "bg-muted/30"
                )}
              >
                <td className="px-6 py-4 font-semibold text-base text-foreground/95 text-left sticky left-0 bg-inherit z-10">
                  {participante.nome}
                </td>

                {partidas.map((partida) => {
                  const palpite = participante.palpites.find(
                    (p) => p.partidaId === partida.id
                  );
                  const state = getAutomaticState(participante.nome, partida.id);

                  return (
                    <td
                      key={partida.id}
                      className={cn(
                        "px-2 py-3 text-center font-mono text-lg transition-all duration-300 mx-1 border shadow-sm",
                        getCellClass(state)
                      )}
                    >
                      {palpite?.placar || "-"}
                    </td>
                  );
                })}

                <td className="px-6 py-4 font-bold text-xl text-right text-primary/95">
                  {participante.pontos}
                  {participante.cravadas !== undefined && (
                    <span className="text-sm text-muted-foreground ml-2">
                      ({participante.cravadas})
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {/* Linha do Placar Final */}
            <tr className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-t-4 border-purple-600">
              <td className="px-5 py-4 font-bold text-lg text-purple-900 text-left uppercase tracking-wide">
                PLACAR FINAL
              </td>
              {partidas.map((partida) => {
                const resultado = placarFinal.find(
                  (p) => p.partidaId === partida.id
                );
                return (
                  <td
                    key={partida.id}
                    className="px-3 py-4 text-center font-bold text-xl bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mx-1 shadow-lg border-2 border-purple-300"
                  >
                    <span className="font-mono tracking-wider">
                      {resultado?.placar || "-"}
                    </span>
                  </td>
                );
              })}
              <td className="px-6 py-4 font-bold text-lg text-right text-destructive/90"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
