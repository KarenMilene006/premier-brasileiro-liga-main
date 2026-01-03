import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Tipos para tipagem
export interface Partida {
  id: string;
  abreviacao: string;
}

export interface Palpite {
  partidaId: string;
  placar: string;
}

export interface Jogador {
  nome: string;
  palpites: Palpite[];
  pontos: number;
  cravadas?: number;
}

export interface BolaoData {
  partidas: Partida[];
  jogadores: Jogador[];
  placarFinal: { partidaId: string; placar: string }[];
}

interface BolaoProps {
  data: BolaoData;
  className?: string;
}

type CellState = "normal" | "placar-vencedor" | "cravada";

export const Bolao = ({ data, className }: BolaoProps) => {
  const { partidas, jogadores, placarFinal } = data;

  const STORAGE_KEY = "bolao-cell-states";

  // 🔹 Estado carregado do localStorage
  const [cellStates, setCellStates] = useState<Record<string, CellState>>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  // 🔹 Salva sempre que o estado mudar
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cellStates));
  }, [cellStates]);

  const getCellKey = (jogadorNome: string, partidaId: string) => {
    return `${jogadorNome}-${partidaId}`;
  };

  const handleCellClick = (jogadorNome: string, partidaId: string) => {
    const key = getCellKey(jogadorNome, partidaId);
    const currentState = cellStates[key] || "normal";

    let nextState: CellState;
    switch (currentState) {
      case "normal":
        nextState = "placar-vencedor";
        break;
      case "placar-vencedor":
        nextState = "cravada";
        break;
      case "cravada":
        nextState = "normal";
        break;
      default:
        nextState = "normal";
    }

    setCellStates((prev) => ({
      ...prev,
      [key]: nextState,
    }));
  };

  const getCellClass = (state: CellState) => {
    switch (state) {
      case "cravada":
        return "bg-green-500/80 hover:bg-green-500 text-white shadow-md border-2 border-green-600/50";
      case "placar-vencedor":
        return "bg-blue-500/80 hover:bg-blue-500 text-gray-900 shadow-sm border border-blue-500/50";
      default:
        return "";
    }
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto p-6", className)}>
      {/* Título */}
      <h1 className="text-4xl md:text-5xl font-display font-bold text-center mb-8 tracking-wider bg-gradient-to-r from-foreground to-primary/80 bg-clip-text text-transparent drop-shadow-lg">
        BOLÃO
      </h1>

      {/* Legenda */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm p-4 bg-muted/50 rounded-xl">
        <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="w-5 h-6 bg-green-500 rounded" />
          <span className="font-medium text-foreground/90">
            CRAVADA +3 (2 cliques)
          </span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-500/20 rounded-lg border border-blue-500/50">
          <div className="w-5 h-6 bg-blue-500 rounded" />
          <span className="font-medium text-foreground/90">
            PLACAR OU VENCEDOR +1 (1 clique)
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
                JOGADOR
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
                PTS
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {jogadores.map((jogador, index) => (
              <tr
                key={jogador.nome}
                className={cn(
                  "transition-all duration-200 hover:bg-muted/80 border-b border-border/20",
                  index % 2 === 0 ? "bg-background" : "bg-muted/30"
                )}
              >
                <td className="px-6 py-4 font-semibold text-base text-foreground/95 text-left sticky left-0 bg-inherit z-10">
                  {jogador.nome}
                </td>

                {partidas.map((partida) => {
                  const palpite = jogador.palpites.find(
                    (p) => p.partidaId === partida.id
                  );
                  const cellKey = getCellKey(jogador.nome, partida.id);
                  const state = cellStates[cellKey] || "normal";

                  return (
                    <td
                      key={partida.id}
                      className={cn(
                        "px-2 py-3 text-center font-mono text-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md rounded-lg mx-1 select-none border border-transparent",
                        getCellClass(state),
                        state === "normal"
                          ? "hover:bg-muted/50 hover:border-border/50 text-foreground/70"
                          : ""
                      )}
                      onClick={() =>
                        handleCellClick(jogador.nome, partida.id)
                      }
                      tabIndex={0}
                      role="button"
                    >
                      {palpite?.placar || "-"}
                    </td>
                  );
                })}

                <td className="px-6 py-4 font-bold text-xl text-right text-primary/95">
                  {jogador.pontos}
                  {jogador.cravadas !== undefined && (
                    <span className="text-sm text-muted-foreground ml-2">
                      ({jogador.cravadas})
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {/* Linha do Placar Final */}
            <tr className="bg-purple-100 border-t-4 border-green-800">
              <td className="px-6 py-4 font-bold text-lg text-black text-left uppercase tracking-wide">
                PLACAR FINAL
              </td>
              {partidas.map((partida) => {
                const resultado = placarFinal.find(
                  (p) => p.partidaId === partida.id
                );
                return (
                  <td
                    key={partida.id}
                    className="px-3 py-4 text-center font-bold bg-blue/20 rounded-lg mx-1 shadow-inner"
                  >
                    {resultado?.placar || "-"}
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
