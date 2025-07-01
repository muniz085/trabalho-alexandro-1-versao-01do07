
# Portal Escolar - Trabalho AVS Frontend

Sistema web desenvolvido para a disciplina de Desenvolvimento Web - Estácio CE.  
Atende ao teste prático com HTML, CSS, JavaScript e JSON Server.

## 📂 Estrutura do Projeto

```
├── css/
│   └── style.css
├── htmls/
│   ├── index.html
│   ├── admin.html
│   └── profile.html
├── imagem/
│   └── logo.webp
├── js/
│   ├── admin.js
│   └── profile.js
├── json/
│   └── db.json
```

## ⚙️ Tecnologias usadas
- HTML5
- CSS3
- JavaScript
- JSON Server

---

## 🧩 Funcionalidades

### 👨‍🏫 Administração
- Gerenciar **cursos** (nome, descrição, carga horária, data).
- Gerenciar **alunos** (nome, CPF, nascimento, curso).
- Tela com botões para alternar entre "Cursos" e "Alunos".
- Edição e exclusão em tabela.
- Busca por cursos.

### 👨‍🎓 Aluno
- Consulta de **perfil** pelo número do CPF.
- Exibição dos dados do aluno e do curso.

---

## 🚀 Como rodar

1. Instale o JSON Server:
```bash
npm install -g json-server
```

2. Na raiz do projeto, rode o servidor:
```bash
json-server --watch json/db.json --port 3000
```

3. Abra o arquivo `htmls/index.html` com **Live Server** no VSCode.

---

## ✅ Observações
- Não requer login/autenticação.
- O `db.json` já vem com dados de exemplo para teste.

---

## 📧 Envio
Envie o link do GitHub ou ZIP para o professor no e-mail indicado no enunciado.
