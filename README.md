# 🎓 Palmiere Studio

> Sistema pessoal de organização de estudos para acompanhamento de disciplinas da faculdade.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-222222?logo=github)](https://cvpalmiere.github.io/PalmiereStudio/)

---

## 📋 Sobre o Projeto

**Palmiere Studio** é um organizador acadêmico pessoal desenvolvido para gerenciar minha rotina de estudos durante o curso de Engenharia de Software. O sistema foi criado para automatizar o planejamento diário, centralizar prazos e acompanhar o progresso ao longo do semestre.

### 🎯 Funcionalidades

- **Dashboard "Hoje"**: Exibe a aula do dia, o plano de estudo da manhã (3 blocos de 1h) e os próximos prazos.
- **Gerenciamento de Prazos**: Lista organizada de provas, trabalhos e seminários com contagem regressiva.
- **Calendário Acadêmico**: Visualização mensal com indicadores de aulas e eventos.
- **Planos de Aula**: Cronograma completo de todas as disciplinas com checkboxes de conclusão.
- **Planos de Estudo**: Visualização semanal do plano gerado automaticamente.
- **Progresso**: Estatísticas de dias estudados, prazos concluídos, frequência por disciplina e registro de menções.
- **Configurações**: Personalização de nome, tamanho da fonte e cursos extras.

### 🧠 Lógica do Plano de Estudo (3h da Manhã)

| Bloco | Duração | Conteúdo |
|-------|---------|----------|
| **1** | 1h | Pré-aula da disciplina do dia |
| **2** | 1h | Preparação para prova/trabalho (se houver em até 30 dias) ou revisão da matéria |
| **3** | 1h | Curso extra (Java, SQL, HTML/CSS/JS, etc.) |

---

## 🛠️ Tecnologias Utilizadas

- **React 18** — Biblioteca principal para construção da interface
- **Vite** — Ferramenta de build rápida
- **JavaScript (ES6+)** — Linguagem do projeto
- **CSS3** — Estilização com tema escuro e paleta vinho/bordô
- **Lucide React** — Ícones vetoriais profissionais
- **GitHub Pages** — Hospedagem gratuita
- **localStorage** — Persistência de dados no navegador

---

## 🎨 Identidade Visual

- **Tema escuro** com paleta de cores **vinho/bordô**
- **Fontes**: Syne (títulos) e DM Sans (corpo)
- **Ícones vetoriais** (sem emojis)
- **Layout**: Sidebar fixa + área de conteúdo principal

---

## 📦 Como Executar Localmente

```bash
# Clone o repositório
git clone https://github.com/cvpalmiere/PalmiereStudio.git

# Entre na pasta
cd PalmiereStudio

# Instale as dependências
npm install
npm install lucide-react

# Rode o servidor de desenvolvimento
npm run dev
O site estará disponível em http://localhost:5173/PalmiereStudio/

🚀 Deploy no GitHub Pages
bash
npm run build
npm run deploy

📁 Estrutura do Projeto

src/
├── App.jsx              # Componente principal
├── Hoje.jsx             # Dashboard diário
├── Prazos.jsx           # Lista de eventos
├── Calendario.jsx       # Calendário mensal
├── PlanosAula.jsx       # Planos de aula por disciplina
├── PlanosEstudo.jsx     # Plano semanal
├── Progresso.jsx        # Estatísticas e menções
├── Configuracoes.jsx    # Personalização
├── Sidebar.jsx          # Navegação
├── dados.js             # Dados das disciplinas, aulas e eventos
├── plano.js             # Lógica de geração do plano de estudo
├── styles.css           # Estilos globais
├── useLocalStorage.js   # Hook personalizado
└── main.jsx             # Ponto de entrada

🧪 Status do Projeto
✅ Concluído — Projeto finalizado e funcional.

👤 Autor
Carla Vick Palmiere
GitHub: @cvpalmiere
Site: https://cvpalmiere.github.io/PalmiereStudio/

📄 Licença
Este projeto é de uso pessoal e acadêmico, disponível para fins de portfólio.

