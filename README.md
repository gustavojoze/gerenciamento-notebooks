# 💻 Gerenciamento de Notebooks - Frontend

#### Este repositório contém o **frontend** do sistema de gerenciamento de notebooks. A ideia do projeto, surgiu em meu estagio, onde os notebooks eram enviados para os projetos da empresa. O gerencimaento era feito por meio de uma planilha em excel. Com isso, criei o sisteme para gerenciar os notebooks de uma maneira mais otimizada, colocando imagens, filtros, pesquisas otimizadas e adicionando o crud para os notebooks. Assim, facilitando o trabalho ao administra-los.

#### 🚪 Venha conhecer: https://gerenciamento-notebooks.vercel.app/pages/home/index.html
#### ⚒️ Conheça o backend da aplicação:https://github.com/gustavojoze/gerenciamento-notebooks-api
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
- Pesquisar notebooks
- Alterar e verificar as infomações dos notebook(s) clicando nele
- Filtros para achar o notebook(s) de forma mais rapido
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
