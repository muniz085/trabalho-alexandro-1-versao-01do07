function buscarAluno() {
  const cpf = document.getElementById('cpf').value;

  fetch(`http://localhost:3000/alunos?cpf=${cpf}`)
    .then(res => res.json())
    .then(async data => {
      if (data.length === 0) {
        document.getElementById('resultado').innerText = "Aluno não encontrado.";
        return;
      }

      const aluno = data[0];
      const curso = await fetch(`http://localhost:3000/cursos/${aluno.cursoId}`).then(r => r.json());

      document.getElementById('resultado').innerHTML = `
        <h3>Dados do Aluno</h3>
        Nome: ${aluno.nome}<br>
        CPF: ${aluno.cpf}<br>
        Nascimento: ${aluno.dataNascimento}<br><br>
        <h3>Curso</h3>
        Nome: ${curso.nome}<br>
        Carga Horária: ${curso.cargaHoraria}<br>
        Descrição: ${curso.descricao}<br>
        Data de Cadastro: ${curso.dataCadastro}
      `;
    });
}
