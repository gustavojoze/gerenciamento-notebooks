const tituloFormulario = document.querySelector('.formulario-titulo')
const textoDeVerificacao = document.createElement('p')

function verificarRespostaDaApi(resposta){
    
        textoDeVerificacao.className="formulario-resposta"
        textoDeVerificacao.textContent = `${resposta}`
        tituloFormulario.appendChild(textoDeVerificacao)
    
        setTimeout(()=>{textoDeVerificacao.remove()}, 2590)
}


const URLbase = 'https://gerenciamento-notebooks-api.onrender.com'

export async function listarNotebooks() {
    const pegarLista = await fetch(`${URLbase}/api/lista_notebook`)
    const json = await pegarLista.json()
    const notebooks = json.maquinas.Notebooks
    return notebooks
}    

export async function atualizarStatus(vun, Status) {
    const url = `${URLbase}/api/update_notebook=${vun}`;

const atualizarLista = await fetch(url, {
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
Status: Status
})
});
if (!atualizarLista.ok) {
console.log('Erro na requisição:', atualizarLista.status);
return;
}
}


export async function pesquisarNotebook(vun) {
    const url = `${URLbase}/api/info_notebook=${vun}`;
    try {
        const acharNotebook = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!acharNotebook.ok) {
            console.log('Erro na requisição:', acharNotebook.status);
            return;
        }

        const resposta = await acharNotebook.json(); 
        console.log('pesquisado:', resposta);
        return resposta.maquina
    }
    catch (error) {
        console.log('Erro ao enviar a requisição:', error);
    }
   
}

export async function deletarNotebook(vun) {
    const url = `${URLbase}/api/remove_notebook`;
    try {
        const removerNotebook = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                VUN: vun
            })
        });

        if ( removerNotebook) {
            const resposta = await removerNotebook.json(); 
            console.log('removido:', await resposta);
            verificarRespostaDaApi("Notebook removido com sucesso!")
        }
        else{
            console.log('Erro na requisição:', removerNotebook.status);
            verificarRespostaDaApi("Não foi possivel remover o notebook!!!!")
        }
    }
    catch (error) {
        console.log('Erro ao enviar a requisição:', error);
    }
}




export async function alterarNotebook(vun, modelo, status, armazenamento, sistema, NSerie, Observacoes) {
    const url = `${URLbase}/api/update_notebook=${vun}`;

 try{   const atualizarLista = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Modelo: modelo,
            Sistema: sistema,
            Disco: armazenamento,
            Observacoes: Observacoes,
            Status: status,
            NumeroSerie: NSerie
        })
    });
    if (!atualizarLista.ok) {
        console.log('Erro na requisição:', atualizarLista.status);
        verificarRespostaDaApi("Não foi possivel atulizar o notebook!!!")
        return;
    }

    const resposta = await atualizarLista.json();  
    console.log('alterado:', resposta);
    verificarRespostaDaApi("Notebook atualizado com sucesso!")
}
catch (error) {
    console.log('Erro ao enviar a requisição:', error);
}
}
