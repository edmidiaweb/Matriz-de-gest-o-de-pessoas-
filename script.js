let registros = [];

function mostrarFormulario() {

  const formulario =
    document.getElementById("formulario");

  formulario.classList.toggle("oculto");
}

function mostrarObs(id) {

  const select =
    document.getElementById(id);

  const textarea =
    document.getElementById(`obs-${id}`);

  if (select.value === "Ruim") {

    textarea.classList.remove("oculto");

  } else {

    textarea.classList.add("oculto");

    textarea.value = "";
  }
}

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

    obsEpis:
      document.getElementById("obs-epis").value,

    organizacao:
      document.getElementById("organizacao").value,

    obsOrganizacao:
      document.getElementById("obs-organizacao").value,

    produtividade:
      document.getElementById("produtividade").value,

    obsProdutividade:
      document.getElementById("obs-produtividade").value,

    abandono:
      document.getElementById("abandono").value,

    regras:
      document.getElementById("regras").value,

    obsRegras:
      document.getElementById("obs-regras").value,

    iniciativa:
      document.getElementById("iniciativa").value,

    obsIniciativa:
      document.getElementById("obs-iniciativa").value,

    comunicacao:
      document.getElementById("comunicacao").value,

    obsComunicacao:
      document.getElementById("obs-comunicacao").value,

    confiabilidade:
      document.getElementById("confiabilidade").value,

    obsConfiabilidade:
      document.getElementById("obs-confiabilidade").value,

    pontualidadeChegada:
      document.getElementById("pontualidade-chegada").value,

    obsPontualidadeChegada:
      document.getElementById("obs-pontualidade-chegada").value,

    pontualidadeSaida:
      document.getElementById("pontualidade-saida").value,

    obsPontualidadeSaida:
      document.getElementById("obs-pontualidade-saida").value,

    data:
      new Date().toLocaleString("pt-BR")
  };

  registros.push(registro);

  atualizarLista();

  limparCampos();

  alert("Registro criado com sucesso.");
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

        <strong>Abandono de Área:</strong>
        ${item.abandono}
        <br>

        <strong>Data:</strong>
        ${item.data}

      </li>
    `;
  });
}

function limparCampos() {

  document.getElementById("funcionario").selectedIndex = 0;

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

Uso de EPIs:
${item.epis}
Observação:
${item.obsEpis || "Nenhuma"}

Organização:
${item.organizacao}
Observação:
${item.obsOrganizacao || "Nenhuma"}

Produtividade:
${item.produtividade}
Observação:
${item.obsProdutividade || "Nenhuma"}

Abandono de Área:
${item.abandono}

Cumprimento de Regras:
${item.regras}
Observação:
${item.obsRegras || "Nenhuma"}

Iniciativa:
${item.iniciativa}
Observação:
${item.obsIniciativa || "Nenhuma"}

Comunicação:
${item.comunicacao}
Observação:
${item.obsComunicacao || "Nenhuma"}

Confiabilidade:
${item.confiabilidade}
Observação:
${item.obsConfiabilidade || "Nenhuma"}

Pontualidade ao Chegar:
${item.pontualidadeChegada}
Observação:
${item.obsPontualidadeChegada || "Nenhuma"}

Pontualidade ao Sair:
${item.pontualidadeSaida}
Observação:
${item.obsPontualidadeSaida || "Nenhuma"}

Observações Gerais:
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
    document.getElementById("numero-whatsapp").value;

  window.open(

    `https://wa.me/${numero}?text=${mensagem}`,

    "_blank"
  );
}

function enviarEmail() {

  const texto =
    document.getElementById("relatorio").value;

  if (texto === "") {

    alert("Gere o relatório antes.");

    return;
  }

  const assunto =
    encodeURIComponent("Relatório Operacional");

  const corpo =
    encodeURIComponent(texto);

  const email =
    "seuemail@gmail.com";

  window.location.href =
    `mailto:${email}?subject=${assunto}&body=${corpo}`;
}
