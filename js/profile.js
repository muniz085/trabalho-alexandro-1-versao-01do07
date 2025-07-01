const API_BASE = "http://localhost:3000";

function buscarAluno() {
  const cpf = document.getElementById('cpf').value.trim();

  if (!cpf) {
    document.getElementById('resultado').innerText = "Digite um CPF.";
    return;
  }

  fetch(`${API_BASE}/alunos?cpf=${cpf}`)
    .then(res => res.json())
    .then(async data => {
      if (!data.length) {
        document.getElementById('resultado').innerText = "Aluno não encontrado.";
        return;
      }

      const aluno = data[0];
      const curso = await fetch(`${API_BASE}/cursos/${aluno.cursoId}`).then(r => r.json());

      document.getElementById('resultado').innerHTML = `
        <h3>Dados do Aluno</h3>
        <strong>Nome:</strong> ${aluno.nome}<br>
        <strong>CPF:</strong> ${aluno.cpf}<br>
        <strong>Nascimento:</strong> ${formatarData(aluno.dataNascimento)}<br><br>
        <h3>Curso</h3>
        <strong>Nome:</strong> ${curso.nome}<br>
        <strong>Carga Horária:</strong> ${curso.cargaHoraria}<br>
        <strong>Descrição:</strong> ${curso.descricao}<br>
        <strong>Data de Cadastro:</strong> ${formatarData(curso.dataCadastro)}
      `;
    })
    .catch(() => {
      document.getElementById('resultado').innerText = "Erro ao buscar aluno.";
    });
}

function formatarData(data) {
  if (!data) return '';
  return data.split('-').reverse().join('/');
}
