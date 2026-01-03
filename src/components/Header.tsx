import { Button } from "@/components/ui/button";
import { Download, Trophy } from "lucide-react";
import bannerImg from "@/assets/banners.jpg";


interface HeaderProps {
  onExportPDF: () => void;
}

export const Header = ({ onExportPDF }: HeaderProps) => {
  return (
    <header
      className="relative bg-contain bg-no-repeat bg-center bg-[#02021A] text-white shadow-lg"
       style={{ backgroundImage: `url(${bannerImg})`, minHeight: "250px" }} 
    >

      {/* Opcional: overlay escuro para melhorar contraste do texto */}
    </header>
  );
};
