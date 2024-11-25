import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


type Tarefa = {
    tarefaId: string
    categoriaId: string
    titulo: string
    descricao: string
    status: string
    criadoEm: string
};

const TarefasNaoConcluidas = () => {
    const navigate = useNavigate();


    const [tarefas, setTarefas] = useState<Tarefa[]>([]);


    useEffect(() => {
        const PegarTarefas = async () => {

            const responseTarefa = await Axios.get(`http://localhost:5000/api/tarefas/naoconcluidas`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });

            setTarefas(responseTarefa.data)
            console.log(responseTarefa.data)
        }

        PegarTarefas();

    }, [])
    
    return (
        <div>
            <div>
                <h1>Tarefas nao concluidas</h1>
            </div>

            <div style={{width: "100%", color: "white", textAlign: "center"}}>
                {tarefas.map((tare) => (
                    <div style={{width: "100%", height: "fit-content", backgroundColor: "grey", marginBottom: "10px"}}>
                    <h2>{tare.titulo}</h2>
                    <p>
                        Descrição: {tare.descricao}
                    </p>
                    <p>
                        Status: {tare.status}
                    </p>
                    <p>
                        Criado Em: {tare.criadoEm.split("T")[0]}
                    </p>
                </div>
                ))}
            </div>

            <div style={{marginTop: "50px"}}>
                                <button onClick={() => navigate('../')}>Voltar a home</button>
                            </div>
        </div>
    )
}

export default TarefasNaoConcluidas;