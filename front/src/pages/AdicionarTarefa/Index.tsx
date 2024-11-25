import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

type Categoria = {
    nome: string
    categoriaId: string
};

const AdicionarTarefa = () => {
    const navigate = useNavigate();


    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState("")
    const [descricao, setDescricao] = useState("")
    const [categoria, setCategoria] = useState("6d091456-5a2f-4b5a-98fc-f1a3b50a627d")


    useEffect(() => {
        const PegarTarefas = async () => {
            const responseCategoria = await Axios.get(`http://localhost:5000/api/categoria/listar`, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });

            setCategorias(responseCategoria.data)

        }

        PegarTarefas();

    }, [])

    const HandleSave = async () => {

        const responseTarefa = await Axios.post(`http://localhost:5000/api/tarefas/cadastrar`, {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            "titulo": titulo,
            "descricao": descricao,
            "categoriaId": categoria,
            "status": "Não iniciada"
        });

        if (responseTarefa.status === 201) {
            navigate('../')

        }
    }


    return (
        <div style={{width: "100%", height: "100vh", display: "flex", justifyContent: "center"}}>
            <div style={{width: "600px", height: "600px", backgroundColor: "grey", marginTop: "100px"}}>
                <div>
                    <h1 style={{textAlign: "center"}}>Adicionar Tarefa</h1>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", marginTop: "50px"}}>
                        <div>
                            <label>Titulo:</label>
                            <input type="text" onChange={e => setTitulo(e.target.value)} style={{width: "100%", height: "30px", marginBottom: "10px"}} />
                            <label>Descrição:</label>
                            <input type="text" onChange={e => setDescricao(e.target.value)} style={{width: "100%", height: "30px", marginBottom: "10px"}} />
                            <select onChange={e => setCategoria(e.target.value)} value={categoria}>
                                {categorias.map((cate) => (
                                    <option value={cate.categoriaId}>{cate.nome}</option>
                                ))}
                            </select>
                            <div style={{marginTop: "50px"}}>
                                <button onClick={HandleSave}>Salvar</button>
                            </div>
                            <div style={{marginTop: "50px"}}>
                                <button onClick={() => navigate('../')}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdicionarTarefa;