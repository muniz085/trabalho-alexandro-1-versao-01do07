
const API_BASE = "http://localhost:3000";

let cursosCache = [];
let alunosCache = [];


function carregarCursos() {
  fetch(`${API_BASE}/cursos`)
    .then(res => res.json())
    .then(cursos => {
      cursosCache = cursos;
      mostrarCursos(cursos);
    })
    .catch(() => alert("Erro ao carregar cursos."));
}

function mostrarCursos(cursos) {
  const section = document.getElementById('cursosSection');
  section.innerHTML = `
    <h3>Cursos</h3>
    <input type="text" id="buscaCurso" placeholder="Buscar curso..." oninput="filtrarCursos()">
    <button class="btn" onclick="mostrarFormularioCurso()">Novo Curso</button>
    <div id="formCurso" style="display:none;"></div>
    <table class="tabela">
      <thead>
        <tr><th>Nome</th><th>Descrição</th><th>Carga Horária</th><th>Data Cadastro</th><th>Ações</th></tr>
      </thead>
      <tbody id="listaCursos"></tbody>
    </table>
    <div id="msgCurso"></div>
  `;
  atualizarTabelaCursos(cursos);
}

function filtrarCursos() {
  const termo = document.getElementById('buscaCurso').value.toLowerCase();
  const filtrados = cursosCache.filter(c => c.nome.toLowerCase().includes(termo));
  atualizarTabelaCursos(filtrados);
}

function atualizarTabelaCursos(cursos) {
  const corpo = document.getElementById('listaCursos');
  corpo.innerHTML = cursos.length === 0 ?
    `<tr><td colspan="5">Nenhum curso encontrado.</td></tr>`
    : cursos.map(curso => `
      <tr>
        <td>${curso.nome}</td>
        <td>${curso.descricao}</td>
        <td>${curso.cargaHoraria}</td>
        <td>${curso.dataCadastro}</td>
        <td>
          <button class="btn-editar" onclick='mostrarFormularioCurso(${JSON.stringify(curso)})'>Editar</button>
          <button class="btn-excluir" onclick='deletarCurso(${curso.id})'>Excluir</button>
        </td>
      </tr>
    `).join('');
}

function mostrarFormularioCurso(curso = null) {
  const form = document.getElementById('formCurso');
  form.style.display = 'block';
  form.innerHTML = `
    <h4>${curso ? "Editar Curso" : "Novo Curso"}</h4>
    <input type="hidden" id="cursoId" value="${curso ? curso.id : ''}">
    <input type="text" id="cursoNome" placeholder="Nome" value="${curso?.nome || ''}" required>
    <input type="text" id="cursoDescricao" placeholder="Descrição" value="${curso?.descricao || ''}" required>
    <input type="text" id="cursoCarga" placeholder="Carga Horária (ex: 360h)" value="${curso?.cargaHoraria || ''}" required>
    <button class="btn" onclick="salvarCurso()">Salvar</button>
    <button class="btn-cancelar" onclick="document.getElementById('formCurso').style.display='none'">Cancelar</button>
  `;
}

function salvarCurso() {
  const id = document.getElementById('cursoId').value;
  const nome = document.getElementById('cursoNome').value.trim();
  const descricao = document.getElementById('cursoDescricao').value.trim();
  const carga = document.getElementById('cursoCarga').value.trim();
  if (!nome || !descricao || !carga) {
    alert("Preencha todos os campos!");
    return;
  }

  const data = {
    nome, descricao, cargaHoraria: carga,
    dataCadastro: id ? cursosCache.find(c => c.id == id).dataCadastro : new Date().toISOString().slice(0, 10)
  };

  if (id) {
    fetch(`${API_BASE}/cursos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data })
    })
      .then(() => {
        document.getElementById('formCurso').style.display = 'none';
        carregarCursos();
        msgSucesso('msgCurso', 'Curso atualizado com sucesso!');
      });
  } else {
    fetch(`${API_BASE}/cursos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(() => {
        document.getElementById('formCurso').style.display = 'none';
        carregarCursos();
        msgSucesso('msgCurso', 'Curso cadastrado com sucesso!');
      });
  }
}

function deletarCurso(id) {
  if (!confirm("Deseja realmente excluir este curso?")) return;
  fetch(`${API_BASE}/cursos/${id}`, { method: "DELETE" })
    .then(() => {
      carregarCursos();
      msgSucesso('msgCurso', 'Curso excluído!');
    });
}


function carregarAlunos() {
  Promise.all([
    fetch(`${API_BASE}/alunos`).then(res => res.json()),
    fetch(`${API_BASE}/cursos`).then(res => res.json())
  ]).then(([alunos, cursos]) => {
    alunosCache = alunos;
    mostrarAlunos(alunos, cursos);
  }).catch(() => alert("Erro ao carregar alunos."));
}

function mostrarAlunos(alunos, cursos) {
  const section = document.getElementById('alunosSection');
  section.innerHTML = `
    <h3>Alunos</h3>
    <button class="btn" onclick="mostrarFormularioAluno()">Novo Aluno</button>
    <div id="formAluno" style="display:none;"></div>
    <table class="tabela">
      <thead>
        <tr><th>Nome</th><th>CPF</th><th>Data Nasc.</th><th>Curso</th><th>Ações</th></tr>
      </thead>
      <tbody id="listaAlunos"></tbody>
    </table>
    <div id="msgAluno"></div>
  `;
  atualizarTabelaAlunos(alunos, cursos);
}

function atualizarTabelaAlunos(alunos, cursos) {
  const corpo = document.getElementById('listaAlunos');
  corpo.innerHTML = alunos.length === 0 ?
    `<tr><td colspan="5">Nenhum aluno encontrado.</td></tr>`
    : alunos.map(aluno => `
      <tr>
        <td>${aluno.nome}</td>
        <td>${aluno.cpf}</td>
        <td>${formatarData(aluno.dataNascimento)}</td>
        <td>${(cursosCache.find(c => c.id == aluno.cursoId) || {}).nome || '-'}</td>
        <td>
          <button class="btn-editar" onclick='mostrarFormularioAluno(${JSON.stringify(aluno)})'>Editar</button>
          <button class="btn-excluir" onclick='deletarAluno(${aluno.id})'>Excluir</button>
        </td>
      </tr>
    `).join('');
}

function mostrarFormularioAluno(aluno = null) {
  fetch(`${API_BASE}/cursos`).then(res => res.json()).then(cursos => {
    const form = document.getElementById('formAluno');
    form.style.display = 'block';

    let options = cursos.map(c =>
      `<option value="${c.id}" ${aluno?.cursoId == c.id ? "selected" : ""}>${c.nome}</option>`
    ).join('');

    form.innerHTML = `
      <h4>${aluno ? "Editar Aluno" : "Novo Aluno"}</h4>
      <input type="hidden" id="alunoId" value="${aluno ? aluno.id : ''}">
      <input type="text" id="alunoNome" placeholder="Nome" value="${aluno?.nome || ''}" required>
      <input type="text" id="alunoCpf" placeholder="CPF" value="${aluno?.cpf || ''}" required>
      <input type="date" id="alunoNascimento" value="${aluno?.dataNascimento || ''}" required>
      <select id="alunoCurso">${options}</select>
      <button class="btn" onclick="salvarAluno()">Salvar</button>
      <button class="btn-cancelar" onclick="document.getElementById('formAluno').style.display='none'">Cancelar</button>
    `;
  });
}

function salvarAluno() {
  const id = document.getElementById('alunoId').value;
  const nome = document.getElementById('alunoNome').value.trim();
  const cpf = document.getElementById('alunoCpf').value.trim();
  const dataNascimento = document.getElementById('alunoNascimento').value;
  const cursoId = document.getElementById('alunoCurso').value;

  if (!nome || !cpf || !dataNascimento || !cursoId) {
    alert("Preencha todos os campos!");
    return;
  }

  const data = { nome, cpf, dataNascimento, cursoId: Number(cursoId) };

  if (id) {
    fetch(`${API_BASE}/alunos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data })
    })
      .then(() => {
        document.getElementById('formAluno').style.display = 'none';
        carregarAlunos();
        msgSucesso('msgAluno', 'Aluno atualizado!');
      });
  } else {
    fetch(`${API_BASE}/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(() => {
        document.getElementById('formAluno').style.display = 'none';
        carregarAlunos();
        msgSucesso('msgAluno', 'Aluno cadastrado!');
      });
  }
}

function deletarAluno(id) {
  if (!confirm("Deseja realmente excluir este aluno?")) return;
  fetch(`${API_BASE}/alunos/${id}`, { method: "DELETE" })
    .then(() => {
      carregarAlunos();
      msgSucesso('msgAluno', 'Aluno excluído!');
    });
}


function mostrarSecao(secao) {
  document.getElementById('cursosSection').style.display = (secao === 'cursos') ? 'block' : 'none';
  document.getElementById('alunosSection').style.display = (secao === 'alunos') ? 'block' : 'none';
  if (secao === 'cursos') carregarCursos();
  if (secao === 'alunos') carregarAlunos();
}


function msgSucesso(id, msg) {
  const el = document.getElementById(id);
  el.innerHTML = `<span style="color:green">${msg}</span>`;
  setTimeout(() => el.innerHTML = '', 2000);
}
function formatarData(data) {
  if (!data) return '';
  return data.split('-').reverse().join('/');
}


window.onload = () => mostrarSecao('cursos');
