"use client";

import Solicitacao from "../../components/admin/Solicitacao/page";
export default function SolicitacaoPage() {
  return (
    <div className={`flex flex-col gap-4 text-center items-center min-h-screen p-8`}>
      <div>Solicitação</div>
      <p>Insira os dados das solicitações de impressão</p>
      <Solicitacao />
    </div>
  );
}
