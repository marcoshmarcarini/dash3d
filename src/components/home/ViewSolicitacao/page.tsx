"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import styles from "./ViewSolicitacao.module.css";
import Image from "next/image";

interface Solicitacao {
  id?: string;
  cliente?: string;
  telefone?: string;
  arquivoURL?: string;
  dataEncomenda?: string;
  valor?: number;
  tamanho?: number;
  cor?: string;
  entrega?: string;
  status?: string;
  pagamento?: string;
  link3d?: string;
}

export default function ViewSolicitacao() {
  const [solicitacao, setSolicitacao] = useState<Solicitacao[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSolicitacao = async () => {
      setLoading(true);
      try {
        const docRef = collection(db, "solicitacoes");
        const docSnap = await getDocs(docRef);

        setSolicitacao(
          docSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Solicitacao[]
        );
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar solicitação:", error);
        setLoading(false);
      }
    };

    fetchSolicitacao();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Carregando solicitação...</p>
      ) : (
        solicitacao.map((solicitacaoItem: Solicitacao | undefined) => {
          if (solicitacaoItem) {
            return (
              <div className={styles.solicitacaoCard} key={solicitacaoItem.id}>
                <div className={styles.solicitacaoDetails}>
                  <div className={`${styles.solicitacaoHeader}`}>
                    <span>{solicitacaoItem.cliente}</span>
                    <p>{solicitacaoItem.telefone}</p>
                  </div>

                  <div className={`${styles.solicitacaoInfo}`}>
                    <p>{solicitacaoItem.tamanho} cm</p>
                    <p>{solicitacaoItem.cor}</p>
                  </div>
                  <div className={`${styles.solicitacaoDatas}`}>
                    <p>
                      Pedido:{" "}
                      <Image
                        width="15"
                        height="15"
                        src="https://img.icons8.com/ios-filled/b9f8cf/50/calendar--v1.png"
                        alt="calendar--v1"
                      />{" "}
                      {solicitacaoItem.dataEncomenda}
                    </p>
                    <p>
                      Entrega:{" "}
                      <Image
                        width="15"
                        height="15"
                        src="https://img.icons8.com/ios-filled/b9f8cf/50/calendar--v1.png"
                        alt="calendar--v1"
                      />{" "}
                      {solicitacaoItem.entrega}
                    </p>
                  </div>
                  <div className={styles.solicitacaoPayment}>
                    <p>
                      <Image width="15" height="15" src="https://img.icons8.com/windows/32/b9f8cf/cash--v1.png" alt="cash--v1"/>
                      {solicitacaoItem.valor
                        ? new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(solicitacaoItem.valor)
                        : ""}{" "}
                      - {solicitacaoItem.pagamento}
                    </p>
                  </div>
                  <div>
                    <span
                      className={
                        solicitacaoItem.status == "em produção"
                          ? `bg-blue-900 text-blue-200 text-xs font-medium px-1.5 py-0.5 rounded`
                          : solicitacaoItem.status == "espera"
                          ? `bg-yellow-900 text-yellow-200 text-xs font-medium px-1.5 py-0.5 rounded`
                          : solicitacaoItem.status == "entregue"
                          ? `bg-green-900 text-green-200 text-xs font-medium px-1.5 py-0.5 rounded`
                          : ``
                      }
                    >
                      {solicitacaoItem.status}
                    </span>
                  </div>
                  <div>
                    <a
                      href={solicitacaoItem.link3d}
                      target="_blank"
                      className={styles.link3d}
                    >
                      Link 3D
                    </a>
                  </div>
                </div>
                <div className={styles.solicitacaoImageContent}>
                  <Image
                    src={solicitacaoItem.arquivoURL || ""}
                    alt="Arquivo"
                    width={100}
                    height={100}
                    className={styles.solicitacaoImage}
                  />
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
}
