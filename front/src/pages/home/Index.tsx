import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from 'axios';


type Categoria = {
    nome: string
    categoriaId: string
};

type Tarefa = {
    tarefaId: string
    categoriaId: string
    titulo: string
    descricao: string
    status: string
};

const Home = () => {
    const navigate = useNavigate();


    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
    const [att, setAtt] = useState(true);

    const HandleAlterar = async (tarefaId: string, statusAtual: string) => {
        const responseTarefa = await Axios.put(`http://localhost:5000/api/tarefas/alterar/${tarefaId}`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            "Status": statusAtual === "Não iniciada" ? "Em Andamento" : "Concluído"
        });
        
        if (responseTarefa.status === 200) {
            if (att) {
                setAtt(false)
            } else {
                setAtt(true);
            }
        }
    }

    useEffect(() => {
        const PegarTarefas = async () => {

            const responseCategoria = await Axios.get(`http://localhost:5000/api/categoria/listar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });

            setCategorias(responseCategoria.data)

            const responseTarefa = await Axios.get(`http://localhost:5000/api/tarefas/listar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });

            setTarefas(responseTarefa.data);
        }

        PegarTarefas();

    }, [att])

    

    return (
        <div>
            <div style={{width: "100%", marginTop: "30px", display: "flex", justifyContent: "center", marginBottom: "20px"}}>
                <button style={{height: "50px", backgroundColor: "green", marginRight: "10px"}} onClick={() => navigate('./AdicionarTarefa')}>Adicionar Tarefa</button>
                <button style={{height: "50px", backgroundColor: "green", marginRight: "10px"}} onClick={() => navigate('./ListarTarefasNaoConcluidas')}>listar tarefas nao concluidas</button>
                <button style={{height: "50px", backgroundColor: "green"}} onClick={() => navigate('./ListarTarefasConcluidas')}>listar tarefas concluidas</button>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                {categorias.map((cate) => (
                    <div style={{width: "350px", backgroundColor: "black", marginLeft: "5px"}}>
                        <div style={{width: "100%", color: "white", textAlign: "center"}}>
                            <h1>{cate.nome}</h1>
                            {tarefas.map((tare) => (
                                cate.categoriaId === tare.categoriaId ? (
                                    <div style={{width: "100%", height: "fit-content", backgroundColor: "grey", marginBottom: "10px"}}>
                                        <h2>{tare.titulo}</h2>
                                        <p>
                                            {tare.descricao}
                                        </p>
                                        <p>Status: {tare.status}</p>
                                        <button style={{marginBottom: "10px"}} onClick={e => HandleAlterar(tare.tarefaId, tare.status)}>Alterar Status</button>
                                    </div>
                                ) : ("")
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;