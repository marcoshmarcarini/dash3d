"use client";
import { useState } from "react";
import styles from "./Solicitacao.module.css";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

/*
cliente, string 
arquivo (img), file
data da encomenda, date
valor, number
tamanho, number
cor, string
entrega, date
status, string 
pagamento (observações), string
*/

interface Solicitacao {
  cliente?: string;
  arquivo?: File;
  dataEncomenda?: string;
  valor?: number;
  tamanho?: number;
  cor?: string;
  entrega?: string;
  status?: string;
  pagamento?: string;
  link3d?: string;
}

export default function Solicitacao() {
  const [solicitacao, setSolicitacao] = useState<Solicitacao>({});

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(solicitacao);
    // Aqui você pode adicionar a lógica para enviar os dados para o Firebase
    const sendData = async () => {
      try {
        let arquivoURL = "";
        if (solicitacao.arquivo) {
          const arquivoRef = ref(
            storage,
            `arquivos/${solicitacao.arquivo.name}`
          );
          await uploadBytes(arquivoRef, solicitacao.arquivo);
          arquivoURL = await getDownloadURL(arquivoRef);
        }
        await addDoc(collection(db, "solicitacoes"), {
          cliente: solicitacao.cliente || "",
          arquivoURL: arquivoURL,
          dataEncomenda: solicitacao.dataEncomenda || "",
          valor: solicitacao.valor || 0,
          tamanho: solicitacao.tamanho || 0,
          cor: solicitacao.cor || "",
          entrega: solicitacao.entrega || "",
          status: solicitacao.status || "",
          pagamento: solicitacao.pagamento || "",
          link3d: solicitacao.link3d || "",
        });
        alert("Solicitação enviada com sucesso!");
      } catch (error) {
        console.error("Erro ao enviar solicitação:", error);
        alert("Erro ao enviar solicitação. Por favor, tente novamente.");
      }
      setSolicitacao({
        cliente: "",
        arquivo: undefined,
        dataEncomenda: "",
        valor: 0,
        tamanho: 0,
        cor: "",
        entrega: "",
        status: "",
        pagamento: "",
      });
    };
    sendData();
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <div className={`${styles.form_control}`}>
          <label htmlFor="nomeSolicitacao">Nome</label>
          <input
            type="text"
            id="nomeSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, cliente: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="arquivoSolicitacao">Arquivo</label>
          <input
            type="file"
            id="arquivoSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, arquivo: e.target.files![0] })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="dataEncomendaSolicitacao">Data da Encomenda</label>
          <input
            type="date"
            id="dataEncomendaSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({
                ...solicitacao,
                dataEncomenda: e.target.value,
              })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="valorSolicitacao">Valor</label>
          <input
            type="number"
            id="valorSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, valor: Number(e.target.value) })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="tamanhoSolicitacao">Tamanho</label>
          <input
            type="number"
            id="tamanhoSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({
                ...solicitacao,
                tamanho: Number(e.target.value),
              })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="corSolicitacao">Cor</label>
          <input
            type="text"
            id="corSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, cor: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="entregaSolicitacao">Entrega</label>
          <input
            type="date"
            id="entregaSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, entrega: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="statusSolicitacao">Status</label>
          <input
            type="text"
            id="statusSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, status: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="pagamentoSolicitacao">Pagamento</label>
          <input
            type="text"
            id="pagamentoSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, pagamento: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="linkSolicitacao">Link</label>
          <input
            type="text"
            id="linkSolicitacao"
            className={`${styles.input}`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, link3d: e.target.value })
            }
          />
        </div>
        <button type="submit" className={`${styles.button}`}>
          Enviar
        </button>
      </form>
    </div>
  );
}
