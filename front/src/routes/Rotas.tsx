import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "../pages/home/Index";
import AdicionarTarefa from "../pages/AdicionarTarefa/Index";
import TarefasNaoConcluidas from "../pages/TarefasNaoConcluidas/Index";
import TarefasConcluidas from "../pages/TarefasConcluidas/Index";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/AdicionarTarefa" element={<AdicionarTarefa />} />
                <Route path="/ListarTarefasNaoConcluidas" element={<TarefasNaoConcluidas />} />
                <Route path="/ListarTarefasConcluidas" element={<TarefasConcluidas />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;