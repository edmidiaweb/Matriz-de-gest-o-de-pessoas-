let registros = [];

function adicionarRegistro() {

  const funcionario =
    document.getElementById("funcionario").value;

  const atividade =
    document.getElementById("atividade").value;

  const categoria =
    document.getElementById("categoria").value;

  const observacao =
    document.getElementById("observacao").value;

  if (
    funcionario === "" ||
    atividade === "" ||
    categoria === ""
  ) {

    alert("Preencha todos os campos obrigatórios.");

    return;
  }

  const data =
    new Date().toLocaleString("pt-BR");

  const registro = {

    funcionario,
    atividade,
    categoria,
    observacao,
    data
  };

  registros.push(registro);

  atualizarLista();

  limparCampos();
}

function atualizarLista() {

  const lista =
    document.getElementById("lista");

  lista.innerHTML = "";

  registros.forEach((item) => {

    lista.innerHTML += `

      <li>

        <strong>Funcionário:</strong>
        ${item.funcionario}
        <br>

        <strong>Atividade:</strong>
        ${item.atividade}
        <br>

        <strong>Categoria:</strong>
        ${item.categoria}
        <br>

        <strong>Observação:</strong>
        ${item.observacao}
        <br>

        <strong>Data:</strong>
        ${item.data}

      </li>
    `;
  });
}

function limparCampos() {

  document.getElementById("funcionario").value = "";

  document.getElementById("atividade").value = "";

  document.getElementById("categoria").value = "";

  document.getElementById("observacao").value = "";
}

function limparRegistros() {

  const confirmar =
    confirm("Deseja apagar todos os registros?");

  if (!confirmar) {

    return;
  }

  registros = [];

  atualizarLista();

  limparRelatorio();
}

function gerarRelatorio() {

  let texto =

`RELATÓRIO OPERACIONAL

====================================

`;

  registros.forEach((item, index) => {

    texto +=

`${index + 1}º REGISTRO

Funcionário:
${item.funcionario}

Atividade:
${item.atividade}

Categoria:
${item.categoria}

Observação:
${item.observacao}

Data:
${item.data}

------------------------------------

`;
  });

  texto +=

`TOTAL DE REGISTROS:
${registros.length}

====================================`;

  document.getElementById("relatorio").value =
    texto;
}

function limparRelatorio() {

  document.getElementById("relatorio").value = "";
}

function enviarWhatsApp() {

  const texto =
    document.getElementById("relatorio").value;

  if (texto === "") {

    alert("Gere o relatório antes.");

    return;
  }

  const mensagem =
    encodeURIComponent(texto);

  const numero =
    "5513996305218";

  window.open(

    `https://wa.me/${numero}?text=${mensagem}`,

    "_blank"
  );
}
