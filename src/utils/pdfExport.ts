import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Team {
  position: number;
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

export const exportToPDF = (standings: Team[], matches: Match[]) => {
  const doc = new jsPDF();
  
  // Configurar fontes e cores
  doc.setFont('helvetica');
  
  // Cabeçalho
  doc.setFontSize(20);
  doc.setTextColor(148, 0, 211); // Cor roxa da Premier League
  doc.text('FUTEBOL INGLÊS BRASIL', 105, 20, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('Relatório da Premier League 2024/25', 105, 30, { align: 'center' });
  
  doc.setFontSize(10);
  doc.setTextColor(150, 150, 150);
  const currentDate = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${currentDate}`, 105, 38, { align: 'center' });
  
  // Linha separadora
  doc.setDrawColor(148, 0, 211);
  doc.setLineWidth(0.5);
  doc.line(20, 42, 190, 42);
  
  // Tabela de Classificação
  doc.setFontSize(16);
  doc.setTextColor(148, 0, 211);
  doc.text('TABELA DE CLASSIFICAÇÃO', 20, 55);
  
  // Preparar dados da tabela
  const tableData = standings.map((team) => [
    team.position.toString(),
    team.team.name,
    team.playedGames.toString(),
    team.won.toString(),
    team.draw.toString(),
    team.lost.toString(),
    team.goalsFor.toString(),
    team.goalsAgainst.toString(),
    team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference.toString(),
    team.points.toString()
  ]);

  autoTable(doc, {
    head: [['Pos', 'Time', 'J', 'V', 'E', 'D', 'GP', 'GC', 'SG', 'Pts']],
    body: tableData,
    startY: 60,
    theme: 'grid',
    headStyles: { 
      fillColor: [148, 0, 211],
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { 
      fontSize: 9,
      textColor: [60, 60, 60]
    },
    alternateRowStyles: { 
      fillColor: [250, 250, 250] 
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 15 },
      1: { cellWidth: 45 },
      2: { halign: 'center', cellWidth: 12 },
      3: { halign: 'center', cellWidth: 12 },
      4: { halign: 'center', cellWidth: 12 },
      5: { halign: 'center', cellWidth: 12 },
      6: { halign: 'center', cellWidth: 15 },
      7: { halign: 'center', cellWidth: 15 },
      8: { halign: 'center', cellWidth: 15 },
      9: { halign: 'center', cellWidth: 15, fontStyle: 'bold' }
    },
    didParseCell: function(data) {
      // Colorir posições especiais
      if (data.column.index === 0 && data.row.index >= 0) {
        const position = parseInt(data.cell.text[0]);
        if (position <= 4) {
          data.cell.styles.fillColor = [34, 197, 94]; // Verde - Champions League
        } else if (position <= 6) {
          data.cell.styles.fillColor = [59, 130, 246]; // Azul - Europa League
        } else if (position >= 18) {
          data.cell.styles.fillColor = [239, 68, 68]; // Vermelho - Rebaixamento
        }
        if (position <= 6 || position >= 18) {
          data.cell.styles.textColor = [255, 255, 255];
        }
      }
    }
  });

  // Verificar se precisa de nova página
  const finalY = (doc as any).lastAutoTable.finalY;
  let currentY = finalY + 20;
  
  if (currentY > 250) {
    doc.addPage();
    currentY = 30;
  }

  // Resultados dos Jogos
  doc.setFontSize(16);
  doc.setTextColor(148, 0, 211);
  doc.text('ÚLTIMOS RESULTADOS', 20, currentY);
  
  currentY += 10;
  
  matches.forEach((match, index) => {
    if (currentY > 270) {
      doc.addPage();
      currentY = 30;
    }
    
    const matchDate = new Date(match.utcDate).toLocaleDateString('pt-BR');
    const matchTime = new Date(match.utcDate).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    // Status do jogo
    let statusText = '';
    switch (match.status) {
      case 'FINISHED':
        statusText = 'Finalizado';
        break;
      case 'IN_PLAY':
        statusText = 'Ao Vivo';
        break;
      case 'TIMED':
        statusText = 'Agendado';
        break;
      default:
        statusText = match.status;
    }
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`${matchDate} - ${matchTime} | ${statusText} | Rodada ${match.matchday}`, 20, currentY);
    
    currentY += 8;
    
    // Placar
    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);
    
    const homeTeam = match.homeTeam.name.length > 20 ? match.homeTeam.shortName : match.homeTeam.name;
    const awayTeam = match.awayTeam.name.length > 20 ? match.awayTeam.shortName : match.awayTeam.name;
    
    if (match.score.fullTime.home !== null && match.score.fullTime.away !== null) {
      doc.text(`${homeTeam} ${match.score.fullTime.home} x ${match.score.fullTime.away} ${awayTeam}`, 20, currentY);
    } else {
      doc.text(`${homeTeam} vs ${awayTeam}`, 20, currentY);
    }
    
    currentY += 12;
    
    // Linha separadora entre jogos
    if (index < matches.length - 1) {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(20, currentY - 2, 190, currentY - 2);
    }
  });

  // Legenda
  if (currentY > 250) {
    doc.addPage();
    currentY = 30;
  } else {
    currentY += 15;
  }
  
  doc.setFontSize(12);
  doc.setTextColor(148, 0, 211);
  doc.text('LEGENDA:', 20, currentY);
  
  currentY += 8;
  
  doc.setFontSize(9);
  doc.setTextColor(60, 60, 60);
  
  // Champions League
  doc.setFillColor(34, 197, 94);
  doc.rect(20, currentY - 3, 8, 4, 'F');
  doc.text('Posições 1-4: Champions League', 32, currentY);
  
  currentY += 8;
  
  // Europa League
  doc.setFillColor(59, 130, 246);
  doc.rect(20, currentY - 3, 8, 4, 'F');
  doc.text('Posições 5-6: Europa League / Conference League', 32, currentY);
  
  currentY += 8;
  
  // Rebaixamento
  doc.setFillColor(239, 68, 68);
  doc.rect(20, currentY - 3, 8, 4, 'F');
  doc.text('Posições 18-20: Rebaixamento', 32, currentY);

  // Rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    doc.text('Futebol Inglês Brasil - Sistema de Acompanhamento da Premier League', 105, 295, { align: 'center' });
  }

  // Salvar o PDF
  doc.save(`premier-league-relatorio-${currentDate.replace(/\//g, '-')}.pdf`);
};