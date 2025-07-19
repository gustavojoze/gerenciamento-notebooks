import { listarNotebooks, atualizarStatus, pesquisarNotebook, deletarNotebook, alterarNotebook } from "../../scripts/services/apiMetodosHTTP.js"

const input = document.querySelector('.header-input')
const buttons = document.querySelector('.select-buttons')
const btnClean = document.querySelector('.filter-clean-btn')
const btnConcluirAoSelecionar = document.querySelector('.concluite')
const btnSelecionarTudo = document.querySelector('.cancel')
const sectionModal = document.querySelector('.section-modal')
const filtroSelectProjeto = document.querySelector('.filter-selectProjeto')




const listaNotebooks = listarNotebooks()

let modoExibicao = "vertical"
function escolherModoExibicaoCard(notebook) {
    if (modoExibicao === "vertical") {
        return `
        <div class="container-card" title="${notebook.NumeroSerie}">
            <div class="card-cicle-status"></div>
            <input class="card-select-disable" type="checkbox" id="card-select">
            <div class="card-img">
                <img src="http://gerenciamento-notebooks-api.onrender.com/api/images=${notebook.Modelo}" alt="Imagem" title="Detalhe" loading="lazy">
            </div>
            <h2 class="card-name">${notebook.VUN}</h2>
            <h4 class="card-marca">${notebook.Modelo}</h4>
            <h3 class="card-status">${notebook.Status}</h3>
            <p class="card-observacoes">${notebook.Observacoes}</p>
            <div class="container-card-diseble"></div>
            <div class="container-card-selecionar"></div>
        </div>`;
    } else {
        return `
        <div class="container-card container-card-horizontal" title="${notebook.NumeroSerie}">
            <div class="card-img card-img-horizontal"> 
                <div class="card-cicle-status card-cicle-status-horizontal"></div>
                <img src="http://gerenciamento-notebooks-api.onrender.com/api/images=${notebook.Modelo}" alt="Imagem" title="Detalhe" loading="lazy">
            </div>
            <div class="card-info">
                <input class="card-select-disable card-select-disable-horizontal" type="checkbox" id="card-select">
                <p class="card-name card-name-horizontal">${notebook.VUN}</p>
                <p class="card-marca card-modelo-horizontal">${notebook.Modelo}</p>
                <p class="card-status card-status-horizontal">${notebook.Status}</p>
                <p class="card-disco card-disco-horizontal">${notebook.Disco}</p>
                <p class="card-sistema card-sistema-horizontal">${notebook.Sistema}</p>
                <p class="card-numeroSerie card-numeroSerie-horizontal">${notebook.NumeroSerie}</p>
                <p class="card-observacoes card-observacoes-horizontal">${notebook.Observacoes}</p>
                <div class="container-card-diseble container-card-diseble-horizontal"></div>
                <div class="container-card-selecionar container-card-selecionar-horizontal"></div>
            </div>
        </div>`;
    }
    
}





async function colocarCards(listaNotebooks = null) {
    const sectionCards = document.querySelector('.section-cards');

    sectionCards.innerHTML = ` `
    const listaFinal = listaNotebooks ?? await listarNotebooks();
    const listaOrdenada = listaFinal.sort((a, b) => { return a.Status.localeCompare(b.Status) })
    listaOrdenada.forEach((notebook) => {
        sectionCards.innerHTML += escolherModoExibicaoCard(notebook)     
    });
    notebookCorStatus();
    abrirModalCards()
    filtrar();
    selecionarNotebooks()
    input.addEventListener('input', pesquisarCards)

}
adicionarProjetosParaSelect() 
colocarCards(); 

const iconExibirCardVertical = document.querySelector('.vertical');
const iconExibirCardHorizontal = document.querySelector('.horizontal');

iconExibirCardVertical.addEventListener('click', () => {
    modoExibicao = "vertical";
    colocarCards();
});

iconExibirCardHorizontal.addEventListener('click', () => {
    modoExibicao = "horizontal";
    colocarCards(); 
})



function notebookCorStatus() {
    const statusList = document.querySelectorAll('.card-status');
    const cicles = document.querySelectorAll('.card-cicle-status');
    const statusListHorizontal = document.querySelectorAll('.card-status-horizontal');
    const ciclesHorizontal = document.querySelectorAll('.card-cicle-status-horizontal');

    statusList.forEach((statusNotebook, index) => {
        const cicle = cicles[index];

        if (statusNotebook.textContent.toLowerCase() !== "disponivel") {
            statusNotebook.className = "card-status card-status-diseble";
            cicle.className = "card-cicle-status card-cicle-status-diseble";
        } else {
            statusNotebook.className = "card-status";
            cicle.className = "card-cicle-status";
        }
    
    });
    statusListHorizontal.forEach((statusNotebook, index) => {
            const cicleHorizontal = ciclesHorizontal[index];
            if (statusNotebook.textContent.toLowerCase() !== "disponivel") {
                statusNotebook.className = "card-status card-status-diseble card-status-horizontal-diseble";
                cicleHorizontal.className = "card-cicle-status card-cicle-status-diseble";
            } else {
                statusNotebook.className = "card-status card-status-horizontal";
                cicleHorizontal.className = "card-cicle-status";
            }
        })
}




function pesquisarCards() {
    const valorInput = input.value.toLowerCase().trim();

    const cardsNotebooks = document.querySelectorAll('.container-card');
    const nomesVuns = valorInput.split(",").map(s => s.trim()).filter(Boolean); 

    for (let card of cardsNotebooks) {
        let nome = card.querySelector('.card-name').textContent.toLowerCase();
        let status = card.querySelector('.card-status').textContent.toLowerCase();
        let marca = card.querySelector('.card-marca').textContent.toLowerCase();
        let observacao = card.querySelector('.card-observacoes').textContent.toLowerCase();

        if (nomesVuns.length === 0) {
            card.style.display = "flex";
            continue;
        }

        const corresponde = nomesVuns.some(term =>
            nome.includes(term) ||
            status.includes(term) ||
            marca.includes(term) ||
            observacao.includes(term)
        );

        card.style.display = corresponde ? "flex" : "none";
    }
}







function selecionarNotebooks() {
    const iconSelect = document.querySelector('.nav-icon-select');
    const cards = document.querySelectorAll('.container-card');
    let modoSelecaoAtivo = false;

    iconSelect.addEventListener('click', () => {
        modoSelecaoAtivo = !modoSelecaoAtivo;

        cards.forEach((card) => {
            const select = card.querySelector('input[type="checkbox"]');
            const img = card.querySelector('.card-img');

            if (modoSelecaoAtivo) {
                select.classList.remove('card-select-disable');
                select.classList.add('card-select');
                select.checked = false;
                buttons.style.display = "block";

                img.style.pointerEvents = "none";

                card.addEventListener('click', handleCardClick);
            } else {
                select.classList.remove('card-select');
                select.classList.add('card-select-disable');
                buttons.style.display = "none";

                img.style.pointerEvents = "auto";

                card.removeEventListener('click', handleCardClick);
            }
        });
        
     

        btnConcluirAoSelecionar.addEventListener('click', aoSelecionarNotebooksAbrirModal);

        btnSelecionarTudo.addEventListener('click', () => {
        const cardsVisiveis = [...document.querySelectorAll('.container-card')].filter(card => card.style.display !== 'none');

    const todosSelecionados = cardsVisiveis.every(card =>
        card.querySelector('input[type="checkbox"]').checked
    );

    cardsVisiveis.forEach(card => {
        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.checked = !todosSelecionados;
    });

    btnSelecionarTudo.textContent = todosSelecionados ? "Selecionar Tudo" : "Desselecionar Tudo";
        });
    });

    function handleCardClick(e) {
        const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');
        checkbox.checked = !checkbox.checked;
    }
}



function aoSelecionarNotebooksAbrirModal() {
    const cardsNotebooks = document.querySelectorAll('.container-card');
let i = 0;

for (let card of cardsNotebooks) {
    let check = card.querySelector('input[type="checkbox"]').checked;

    if (check === true) {
        const modal = document.querySelector('.section-modal');
        buttons.style.display = "none";
        modal.style.display = "flex";

        let name = card.querySelector('.card-name').textContent;
        console.log(name);

        i++;
        atualizarStatusVunsNoModal(name, i);
    }
}

if (i === 0) {
    alert("Por favor, selecione pelo menos um notebook.");
}

}






function atualizarStatusVunsNoModal(name, index) {
    const checkboxCards = document.querySelector('.card-select')
    const modalListaVuns = document.querySelector('.modal-containerListVuns')
    const selecButtonCancel = document.querySelector('.modal-btnCancel')
    const selectButtonConcluite = document.querySelector('.modal-btnConcluite')

    modalListaVuns.innerHTML += `
 <p class="modal-list-vun">${index} - ${name}</p>
`
    selectButtonConcluite.addEventListener('click', async () => {
        const modalValueInput = document.querySelector('.modal-input').value
        if (modalValueInput.trim() !== "") {
            await atualizarStatus(name, modalValueInput)
            sectionModal.style.display = "none"
            location.reload()
        }
        else {
            alert("Prescisa colocar alguma coisa no campo de texto.")
        }
    })
    selecButtonCancel.addEventListener('click', () => {
        window.location.reload(true)
    })
}



const header_iconFilters = document.querySelector('.icon-filters')
const filter_iconBack = document.querySelector('.filters-iconBack')
const filters_container = document.querySelector('.filters-disable')



header_iconFilters.addEventListener('click',()=>{
    if (filters_container.className == 'filters-disable') {
       filters_container.className = 'filters'
    } 
    else{
         filters_container.className = 'filters-disable'
       
    }
})
filter_iconBack.addEventListener('click',()=>{
    filters_container.className = 'filters-disable'
})




function filtrar() {
    const aside = document.querySelector('aside');
    const header_iconFilters = document.querySelector('.icon-filters')
    const checkboxes = aside.querySelectorAll('input[type="checkbox"]');
    const selectOptions = aside.querySelector('.filter-selectProjeto')
 

    selectOptions.addEventListener('click', filtrarPelaPropriedade)

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('click', filtrarPelaPropriedade);
    });

}

async function adicionarProjetosParaSelect() {
    const nomesProjetos = await listarNotebooks(); 
    const filtroSelectProjeto = document.querySelector('.filter-selectProjeto');
    const armazenarProjetos = []
    nomesProjetos.forEach((projetoNome) => {
        if (!armazenarProjetos.includes(projetoNome.Status)) {
            armazenarProjetos.push(projetoNome.Status);
        }
        else {
            console.log("El")
        }
    });

    var novaArr = armazenarProjetos.filter((este, i) => armazenarProjetos.indexOf(este) === i);
    console.log(novaArr);
    novaArr.forEach((nome) => {
        filtroSelectProjeto.innerHTML += `<option value="${nome}" data-atributo="Status" class="select-option">${nome}</option>`;
    })
}



async function filtrarPelaPropriedade() {
    const listaNotebooks = await listarNotebooks(); 
    const checkboxesMarcadas = document.querySelectorAll('aside input[type="checkbox"]:checked');
    const selecionaOpcao = document.querySelector('.filter-selectProjeto');
    const opcaoSelecionada = selecionaOpcao.options[selecionaOpcao.selectedIndex];

    console.log("Projeto selecionado:", opcaoSelecionada.value);

    const opcoesCheckbox = [...checkboxesMarcadas];
    if (opcaoSelecionada.value) {
        opcoesCheckbox.push(opcaoSelecionada);
    }

    if (opcoesCheckbox.length === 0) {
        colocarCards(listaNotebooks);
        return;
    }

    const filtros = {};
    opcoesCheckbox.forEach(cb => {
        const atributo = cb.dataset.atributo;
        const valor = cb.value;

        if (!atributo) {
            console.warn("Elemento sem dataset.atributo:", cb);
            return;
        }

        if (!filtros[atributo]) {
            filtros[atributo] = [];
        }
        filtros[atributo].push(valor);
    });

    const listaFiltrada = listaNotebooks.filter(notebook => {
        return Object.entries(filtros).every(([atributo, valores]) => {
            let valorNotebook = String(notebook[atributo]);

            if (atributo === "Status" && valores.includes("Indisponivel")) {
                return valorNotebook !== "Disponivel";
            }

            if (atributo === "Modelo") {
                return valores.some(valorFiltro => valorNotebook.includes(valorFiltro));
            }

            return valores.includes(valorNotebook);
        });
    });

       
    colocarCards(listaFiltrada);

 


}

    



btnClean.addEventListener('click', async () => {
    const aside = document.querySelector('aside');
    
    // Limpa todos os checkboxes
    const checkboxes = aside.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // Reseta o <select> de status
    const filtroSelectProjeto = document.querySelector('.filter-selectProjeto');
    filtroSelectProjeto.selectedIndex = 0;

    // Recarrega todos os cards
    const lista = await listarNotebooks();
    colocarCards(lista);
});


filtrar();






async function abrirModalCards() {
    const card = document.querySelectorAll('.container-card')
    const iconFechar = document.querySelector('.cards-modal-iconClose')
    const SectionCardsModal = document.querySelector('.section-cards-modal')
    const inputsFormulario = SectionCardsModal.querySelectorAll('.formulario-input')
    const btnAlterar = SectionCardsModal.querySelector('.formulario-btnAltere')
    const btnDeletar = SectionCardsModal.querySelector('.formulario-btnDelete')

    card.forEach((card) => {
        const cardImg = card.querySelector('.card-img')
        cardImg.addEventListener('click', async (event) => {
            event.preventDefault()
            SectionCardsModal.style.display = "flex"
            const nomeVun = card.querySelector('.card-name').textContent;
            inputsFormulario[0]
            const notebook = await pesquisarNotebook(nomeVun)
            inputsFormulario[0].value = notebook.VUN
            inputsFormulario[1].value = notebook.Modelo
            inputsFormulario[2].value = notebook.Status
            inputsFormulario[3].value = notebook.Disco
            inputsFormulario[4].value = notebook.Sistema
            inputsFormulario[5].value = notebook.NumeroSerie
            inputsFormulario[6].value = notebook.Observacoes

        })
        iconFechar.addEventListener('click', () => {
            SectionCardsModal.style.display = "none"
        })

        btnAlterar.addEventListener('click', async (event) => {
            event.preventDefault()
            await alterarNotebook(inputsFormulario[0].value, inputsFormulario[1].value, inputsFormulario[2].value, inputsFormulario[3].value, inputsFormulario[4].value, inputsFormulario[5].value, inputsFormulario[6].value)
        })

        btnDeletar.addEventListener('click', async (event) => {
            event.preventDefault()
            await deletarNotebook(inputsFormulario[0].value)
        })
    })
}







