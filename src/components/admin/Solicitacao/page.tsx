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
  telefone?: string;
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
          telefone: solicitacao.telefone || "",
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
        telefone: "",
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
    <div className={`${styles.container}`}>
      <form onSubmit={handleForm} className={`${styles.form}`}>
        <div className={`${styles.form_control}`}>
          <label htmlFor="nomeSolicitacao" className={`hidden`}>
            Nome
          </label>
          <input
            type="text"
            id="nomeSolicitacao"
            className={`${styles.input}`}
            placeholder={`Nome do Cliente`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, cliente: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="telefoneSolicitacao" className={`hidden`}>
            Telefone
          </label>
          <input
            type="text"
            id="telefoneSolicitacao"
            className={`${styles.input}`}
            placeholder={`Telefone do Cliente`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, telefone: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="arquivoSolicitacao" className={`${styles.labelFile}`}>
            Arquivo
          </label>
          <input
            type="file"
            id="arquivoSolicitacao"
            className={`${styles.input} hidden`}
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
          <label htmlFor="valorSolicitacao" className={`hidden`}>
            Valor
          </label>
          <input
            type="number"
            id="valorSolicitacao"
            className={`${styles.input}`}
            placeholder={`Valor`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, valor: Number(e.target.value) })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="tamanhoSolicitacao" className={`hidden`}>
            Tamanho
          </label>
          <input
            type="number"
            id="tamanhoSolicitacao"
            className={`${styles.input}`}
            placeholder={`Tamanho`}
            onChange={(e) =>
              setSolicitacao({
                ...solicitacao,
                tamanho: Number(e.target.value),
              })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="corSolicitacao" className={`hidden`}>
            Cor
          </label>
          <input
            type="text"
            id="corSolicitacao"
            className={`${styles.input}`}
            placeholder={`Cor`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, cor: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="entregaSolicitacao">Data da Entrega</label>
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
          <label htmlFor="statusSolicitacao" className={`hidden`}>
            Status
          </label>
          <input
            type="text"
            id="statusSolicitacao"
            className={`${styles.input}`}
            placeholder={`Status`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, status: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="pagamentoSolicitacao" className={`hidden`}>
            Pagamento
          </label>
          <input
            type="text"
            id="pagamentoSolicitacao"
            className={`${styles.input}`}
            placeholder={`Pagamento`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, pagamento: e.target.value })
            }
          />
        </div>
        <div className={`${styles.form_control}`}>
          <label htmlFor="linkSolicitacao" className={`hidden`}>
            Link
          </label>
          <input
            type="text"
            id="linkSolicitacao"
            className={`${styles.input}`}
            placeholder={`Link do Modelo 3D`}
            onChange={(e) =>
              setSolicitacao({ ...solicitacao, link3d: e.target.value })
            }
          />
        </div>
        <button type="submit" className={`${styles.buttonSubmit}`}>
          Enviar
        </button>
      </form>
    </div>
  );
}
