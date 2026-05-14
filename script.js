let registros = [];

function adicionarRegistro() {

  const funcionario =
    document.getElementById("funcionario").value;

  const atividade =
    document.getElementById("atividade").value;

  const observacao =
    document.getElementById("observacao").value;

  if (
    funcionario === "" ||
    atividade === ""
  ) {

    alert("Preencha os campos obrigatórios.");

    return;
  }

  const registro = {

    funcionario,

    atividade,

    observacao,

    epis:
      document.getElementById("epis").value,

    organizacao:
      document.getElementById("organizacao").value,

    produtividade:
      document.getElementById("produtividade").value,

    abandono:
      document.getElementById("abandono").value,

    regras:
      document.getElementById("regras").value,

    iniciativa:
      document.getElementById("iniciativa").value,

    comunicacao:
      document.getElementById("comunicacao").value,

    confiabilidade:
      document.getElementById("confiabilidade").value,

    data:
      new Date().toLocaleString("pt-BR")
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
        <br><br>

        <strong>Uso de EPIs:</strong>
        ${item.epis}
        <br>

        <strong>Organização:</strong>
        ${item.organizacao}
        <br>

        <strong>Produtividade:</strong>
        ${item.produtividade}
        <br>

        <strong>Abandono de Área:</strong>
        ${item.abandono}
        <br>

        <strong>Cumprimento de Regras:</strong>
        ${item.regras}
        <br>

        <strong>Iniciativa:</strong>
        ${item.iniciativa}
        <br>

        <strong>Comunicação:</strong>
        ${item.comunicacao}
        <br>

        <strong>Confiabilidade:</strong>
        ${item.confiabilidade}
        <br><br>

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

======================================

`;

  registros.forEach((item, index) => {

    texto +=

`${index + 1}º REGISTRO

Funcionário:
${item.funcionario}

Atividade:
${item.atividade}

AVALIAÇÃO OPERACIONAL

Uso de EPIs:
${item.epis}

Organização:
${item.organizacao}

Produtividade:
${item.produtividade}

Abandono de Área:
${item.abandono}

Cumprimento de Regras:
${item.regras}

Iniciativa:
${item.iniciativa}

Comunicação:
${item.comunicacao}

Confiabilidade:
${item.confiabilidade}

Observação:
${item.observacao}

Data:
${item.data}

--------------------------------------

`;
  });

  texto +=

`TOTAL DE REGISTROS:
${registros.length}

======================================`;

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
