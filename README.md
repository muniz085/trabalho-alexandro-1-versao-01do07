

---

# Portal Escolar - Trabalho AVS Frontend

Sistema web desenvolvido para a disciplina de Desenvolvimento Web - Estácio CE.
Atende ao teste prático com **HTML**, **CSS**, **JavaScript** e **JSON Server**.

## 📂 Estrutura do Projeto

```
├── css/
│   └── style.css
├── htmls/
│   ├── admin.html
│   └── alunos.html
├── imagem/
│   └── logo.webp
├── js/
│   ├── admin.js
│   └── profile.js
├── json/
│   └── db.json
├── index.html
└── README.md
```

## ⚙️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript 
* JSON Server

---

## 🧩 Funcionalidades

### 👨‍🏫 Administração

* Gerenciar **cursos** (nome, descrição, carga horária, data).
* Gerenciar **alunos** (nome, CPF, nascimento, curso).
* Tela com botões para alternar entre "Cursos" e "Alunos".
* Edição e exclusão via tabela.
* Busca por cursos.

### 👨‍🎓 Aluno

* Consulta de **perfil** pelo número do CPF.
* Exibição dos dados completos do aluno e do curso vinculado.

---

## 🚀 Como rodar

1. **Instale o JSON Server** (se ainda não tiver):

   ```bash
   npm install -g json-server
   ```

2. **Na raiz do projeto, inicie o servidor:**

   ```bash
   json-server --watch json/db.json --port 3000
   ```

3. **Abra o arquivo `index.html` (da raiz) com o Live Server do VSCode.**

   * Ou, se preferir, navegue manualmente até `http://127.0.0.1:5501/index.html` no navegador (padrão do Live Server).

---

## ✅ Observações

* Não requer login ou autenticação.
* O arquivo `db.json` já vem populado com dados de exemplo para facilitar o teste.
* Recomenda-se utilizar o VSCode com a extensão Live Server para melhor experiência de desenvolvimento e testes.

---

## 📧 Envio

Envie o link do repositório no GitHub ou o arquivo ZIP do projeto para o professor, conforme orientações do enunciado.

---
