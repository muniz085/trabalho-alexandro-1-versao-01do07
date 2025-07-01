function mostrarSecao(secao) {
  document.getElementById('cursosSection').style.display = (secao === 'cursos') ? 'block' : 'none';
  document.getElementById('alunosSection').style.display = (secao === 'alunos') ? 'block' : 'none';
  if (secao === 'cursos') carregarCursos();
  if (secao === 'alunos') carregarAlunos();
}

// ===== CURSOS =====
function carregarCursos() {
  fetch('https://6855d3c31789e182b37c69eb.mockapi.io/api/v1/cursos')
    .then(res => res.json())
    .then(cursos => {
      const section = document.getElementById('cursosSection');
      section.innerHTML = `
        <h3>Gerenciar Cursos</h3>
        <input type="text" id="buscaCurso" placeholder="Buscar curso..." oninput="filtrarCursos()">
        <button onclick="mostrarFormularioCurso()">Novo Curso</button>
        <div id="formCurso" style="display:none;"></div>
        <table border="1">
          <thead><tr><th>Nome</th><th>Carga Horária</th><th>Ações</th></tr></thead>
          <tbody id="listaCursos"></tbody>
        </table>
      `;

      atualizarTabelaCursos(cursos);
    });
}

function atualizarTabelaCursos(cursos) {
  const corpo = document.getElementById('listaCursos');
  corpo.innerHTML = '';
  cursos.forEach(curso => {
    corpo.innerHTML += `
      <tr>
        <td>${curso.nome}</td>
        <td>${curso.cargaHoraria}</td>
        <td>
          <button onclick='editarCurso(${JSON.stringify(curso)})'>Editar</button>
          <button onclick='deletarCurso(${curso.id})'>Excluir</button>
        </td>
      </tr>
    `;
  });
}

function mostrarFormularioCurso(curso = null) {
  const form = document.getElementById('formCurso');
  form.style.display = 'block';
  form.innerHTML = `
    <h4>${curso ? "Editar Curso" : "Novo Curso"}</h4>
    <input type="hidden" id="cursoId" value="${curso ? curso.id : ''}">
    <input type="text" id="cursoNome" placeholder="Nome" value="${curso?.nome || ''}">
    <input type="text" id="cursoDescricao" placeholder="Descrição" value="${curso?.descricao || ''}">
    <input type="text" id="cursoCarga" placeholder="Carga Horária" value="${curso?.cargaHoraria || ''}">
    <button onclick="salvarCurso()">Salvar</button>
    <button onclick="document.getElementById('formCurso').style.display='none'">Cancelar</button>
  `;
}



// ===== ALUNOS =====
function carregarAlunos() {
  fetch('https://6855d3c31789e182b37c69eb.mockapi.io/api/:endpoint/v1/alunos')
    .then(res => res.json())
    .then(alunos => {
      const section = document.getElementById('alunosSection');
      section.innerHTML = `
        <h3>Gerenciar Alunos</h3>
        <button onclick="mostrarFormularioAluno()">Novo Aluno</button>
        <div id="formAluno" style="display:none;"></div>
        <table border="1">
          <thead><tr><th>Nome</th><th>CPF</th><th>Ações</th></tr></thead>
          <tbody id="listaAlunos"></tbody>
        </table>
      `;

      atualizarTabelaAlunos(alunos);
    });
}

function atualizarTabelaAlunos(alunos) {
  const corpo = document.getElementById('listaAlunos');
  corpo.innerHTML = '';
  alunos.forEach(aluno => {
    corpo.innerHTML += `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.cpf}</td>
        <td>
          <button onclick='editarAluno(${JSON.stringify(aluno)})'>Editar</button>
          <button onclick='deletarAluno(${aluno.id})'>Excluir</button>
        </td>
      </tr>
    `;
  });
}

function mostrarFormularioAluno(aluno = null) {
  fetch('http://localhost:3000/cursos')
    .then(res => res.json())
    .then(cursos => {
      const form = document.getElementById('formAluno');
      form.style.display = 'block';

      let options = cursos.map(c =>
        `<option value="${c.id}" ${aluno?.cursoId == c.id ? "selected" : ""}>${c.nome}</option>`
      ).join('');

      form.innerHTML = `
        <h4>${aluno ? "Editar Aluno" : "Novo Aluno"}</h4>
        <input type="hidden" id="alunoId" value="${aluno ? aluno.id : ''}">
        <input type="text" id="alunoNome" placeholder="Nome" value="${aluno?.nome || ''}">
        <input type="text" id="al
