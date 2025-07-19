const inputs = document.querySelectorAll('.formulario-input')

const botaoConcluir = document.querySelector('.formulario-btnConcluite')
const botaoDelete = document.querySelector('.formulario-btnDelete')
const botaoAlterar = document.querySelector('.formulario-btnAltere')

const tituloFormulario = document.querySelector('.formulario-titulo')
const textoDeVerificacao = document.createElement('p')

function verificarRespostaDaApi(resposta){
    textoDeVerificacao.className="formulario-resposta"
    textoDeVerificacao.textContent = `${resposta}`
    tituloFormulario.appendChild(textoDeVerificacao)
}

let atributos = []

const acessoApi = 'http://localhost:8000'


async function adicionarNotebook(vun, modelo, status, armazenamento, sistema, NSerie, Observacoes) {
    const url = `${acessoApi}/api/cadastro`;
    try {
        const colocarNotebook = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                VUN: vun,
                Modelo: modelo,
                Sistema: sistema,
                Disco: armazenamento,
                Observacoes: Observacoes,
                Status: status,
                NumeroSerie: NSerie
            })
        });

        if (!colocarNotebook.ok) {
            console.log('Erro na requisição:', colocarNotebook.status);
            verificarRespostaDaApi("Não foi possivel adicionar o notebook!!!")
            return;
        }

        const resposta = await colocarNotebook.json(); 
        verificarRespostaDaApi("Notebook adicionado com sucesso!")

    }
    catch (error) {
        console.log('Erro ao enviar a requisição:', error);
    }
}

botaoConcluir.addEventListener('click', async (event) => {
    event.preventDefault()
    inputs.forEach((input) => {

        atributos.push(input.value)
    })
    await adicionarNotebook(atributos[0], atributos[1], atributos[2], atributos[3], atributos[4], atributos[5], atributos[6])
    console.log(atributos)
    atributos = []
    console.log(atributos)
})



async function removerNotebook(vun) {
    const url = `${acessoApi}/api/remove_notebook`;
    try {
        const removerNotebook = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                VUN: vun
            })
        });

        if (!removerNotebook.ok) {
            console.log('Erro na requisição:', removerNotebook.status);
            verificarRespostaDaApi("Não foi possivel remover notebook!!!")
            return;
        }

        const resposta = await removerNotebook.json();  
        console.log('removido:', resposta);
        verificarRespostaDaApi("Notebook removido com sucesso!")

    }
    catch (error) {
        console.log('Erro ao enviar a requisição:', error);
    }
}


botaoDelete.addEventListener('click', async (event) => {
    event.preventDefault()
    inputs.forEach((input) => {
        atributos.push(input.value)
    })
    await removerNotebook(atributos[0])
    console.log(atributos)
    atributos = []
    console.log(atributos)
})



async function alterarNotebook(vun, modelo, status, armazenamento, sistema, NSerie, Observacoes) {
    const url = `${acessoApi}/api/update_notebook=${vun}`;

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
        verificarRespostaDaApi("Não foi possivel atulizar notebook!!!")

        return;
    }

    const resposta = await atualizarLista.json();  
    console.log('removido:', resposta);
    verificarRespostaDaApi("Não foi possivel atulizar notebook!!!")

}
catch (error) {
    console.log('Erro ao enviar a requisição:', error);
}
}
botaoAlterar.addEventListener('click', async (event) => {
    event.preventDefault()
    inputs.forEach((input) => {
        atributos.push(input.value)
    })
    await alterarNotebook(atributos[0], atributos[1], atributos[2], atributos[3], atributos[4], atributos[5], atributos[6])
    console.log(atributos)
    atributos = []
    console.log(atributos)
})



async function pesquisarNotebook(vun) {
    const url = `${acessoApi}/api/info_notebook=${vun}`;
    try {
        const acharNotebook = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        if (!acharNotebook.ok) {
            console.log('Erro na requisição:', acharNotebook.status);
            verificarRespostaDaApi("Não foi possivel encontrar notebook!!!")
            return;
        }

        const resposta = await acharNotebook.json();  
        console.log('notebook encontrado:', resposta);
        verificarRespostaDaApi("Notebook encontrado com sucesso!")
    }
    catch (error) {
        console.log('Erro ao enviar a requisição:', error);
    }
}


botaoDelete.addEventListener('click', async (event) => {
    event.preventDefault()
    inputs.forEach((input) => {
        atributos.push(input.value)
    })
    await removerNotebook(atributos[0])
    console.log(atributos)
    atributos = []
    console.log(atributos)
})
