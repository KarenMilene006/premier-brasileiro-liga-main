interface FiltroProps {
  matchdays: number[];
  selectedMatchday: number | "all";
  onChange: (value: number | "all") => void;
}

export const Filtro = ({
  matchdays,
  selectedMatchday,
  onChange,
}: FiltroProps) => {
  return (
    <select
      className="border rounded px-2 py-1 text-sm bg-white"
      value={selectedMatchday}
      onChange={(e) =>
        onChange(e.target.value === "all" ? "all" : Number(e.target.value))
      }
    >
      <option value="all">Todas as rodadas</option>
      {matchdays.map((md) => (
        <option key={md} value={md}>
          Rodada {md}
        </option>
      ))}
    </select>
  );
};
