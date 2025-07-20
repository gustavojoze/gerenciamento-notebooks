import { listarNotebooks } from "./apiMetodosHTTP.js";

const iconExcel = document.querySelector('.nav-icon-excel')

 const notebooks = await listarNotebooks()

const gerarPlanilha = (notebooks) => {
    const dados = notebooks.map(notebook => ({
                VUN: notebook.VUN,
                Modelo: notebook.Modelo,
                Sistema: notebook.Sistema,
                Disco: notebook.Disco,
                Observacoes: notebook.Observacoes,
                Status: notebook.Status,
                NumeroSerie: notebook.NumeroSerie
    }));

    // Cria a planilha
    const worksheet = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Notebooks");

    // Gera o arquivo
    XLSX.writeFile(workbook, "estoque_notebooks.xlsx");
};



iconExcel.addEventListener('click',()=>{gerarPlanilha(notebooks)});