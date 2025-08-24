# 💻 Gerenciamento de Notebooks - Frontend

Este repositório contém o **frontend** do sistema de gerenciamento de notebooks. O projeto surgiu do meu estagio, onde todos os notebooks eram gerenciados por uma planilha em excel. Crie o sistema, afim de deixar mais visual e eficiente ao colocar os notebooks em projetos da emrpesa. 

---

## 🚀 Tecnologias Utilizadas

- **HTML5** – Estrutura das páginas  
- **CSS3** – Estilização e layout responsivo  
- **JavaScript (ES6+)** – Lógica do frontend e manipulação do DOM  

---

## 📂 Estrutura do Projeto

<details>
  <summary>Clique para ver</summary>

  ```bash
  assets
    ├── icon-adicionarNotebook.png
    ├── icon-filters.png
    ├── icon-lupa.png
    ├── logo-empresa.png
    └── notebook.jpeg
  pages
    ├── cadastro
    │   ├── pagina-cadastro-style.css
    │   ├── pagina-cadastro.html
    │   └── pagina-cadastro.js
    └── home
    │   ├── index.html
    │   ├── main.js
    │   └── style.css
  scripts
    └── services
        ├── apiMetodosHTTP.js
        └── gerarPlanilha.js      
```
</details>


---

## ⚙️ Funcionalidades

- Exibição de **cards** com informações dos notebooks  
- Indicação visual de notebooks **disponíveis** ou **indisponíveis**  
- Colocar o status do(s) notebook(s) ao tira-lo do estoque
- Alterar e verificar as infomações dos notebook(s) clicando nele
- Filtros para conseguir achar o notebook(s) de forma mais rapido
- Crud completo dos notebooks

---

## ▶️ Como Executar o Projeto

1. Clone estes repositórios:
   ```bash
   git clone https://github.com/gustavojoze/gerenciamento-notebooks.git
   git clone https://github.com/gustavojoze/api-gerenciamento-notebooks-api.git
   ```
2. Rode o gerencimento-notebooks-api:
   ```bash
   npm run dev
   ```
3. Agora abra o projeto em:
   ```bash
   pages
    ├── home
    │   └──index.html
   ```
