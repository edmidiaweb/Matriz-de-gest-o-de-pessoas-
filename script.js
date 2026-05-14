let registros = [];

function adicionarRegistro() {

  const funcionario =
    document.getElementById("funcionario").value;

  const atividade =
    document.getElementById("atividade").value;

  const observacao =
    document.getElementById("observacao").value;

  const registro = {
    funcionario,
    atividade,
    observacao
  };

  registros.push(registro);

  atualizarLista();

  limparCampos();
}

function atualizarLista() {

  const lista =
    document.getElementById("lista");

  lista.innerHTML = "";

  registros.forEach((item, index) => {

    lista.innerHTML += `
      <li>
        <strong>${item.funcionario}</strong><br>
        ${item.atividade}<br>
        ${item.observacao}
      </li>
    `;
  });
}

function limparCampos() {

  document.getElementById("funcionario").value = "";
  document.getElementById("atividade").value = "";
  document.getElementById("observacao").value = "";
}

function gerarRelatorio() {

  let texto =
`RELATÓRIO OPERACIONAL\n\n`;

  registros.forEach((item, index) => {

    texto +=
`${index + 1}. Funcionário: ${item.funcionario}
Atividade: ${item.atividade}
Observação: ${item.observacao}

`;
  });

  document.getElementById("relatorio").value = texto;
}

function enviarWhatsApp() {

  const texto =
    document.getElementById("relatorio").value;

  const mensagem =
    encodeURIComponent(texto);

  window.open(
    `https://wa.me/?text=${mensagem}`,
    "_blank"
  );
}
