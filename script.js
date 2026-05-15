let registros = JSON.parse(localStorage.getItem("registros")) || [];

let pendencias = JSON.parse(localStorage.getItem("pendencias")) || [];

window.onload = function () {

  atualizarLista();

  atualizarPendencias();

  gerarRelatorio();
};

function salvarLocalStorage() {

  localStorage.setItem(
    "registros",
    JSON.stringify(registros)
  );

  localStorage.setItem(
    "pendencias",
    JSON.stringify(pendencias)
  );
}

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

  salvarLocalStorage();

  atualizarLista();

  gerarRelatorio();

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

function adicionarPendencia() {

  const pendencia =
    document.getElementById("pendencia").value;

  const prioridade =
    document.getElementById("prioridade").value;

  const observacao =
    document.getElementById("obs-pendencia").value;

  if (pendencia === "") {

    alert("Descreva a pendência.");

    return;
  }

  const item = {

    pendencia,
    prioridade,
    observacao,

    data:
      new Date().toLocaleString("pt-BR")
  };

  pendencias.push(item);

  salvarLocalStorage();

  atualizarPendencias();

  gerarRelatorio();

  limparPendencias();

  alert("Pendência adicionada ao relatório.");
}

function atualizarPendencias() {

  const lista =
    document.getElementById("lista-pendencias");

  lista.innerHTML = "";

  pendencias.forEach((item) => {

    lista.innerHTML += `

      <li>

        <strong>Pendência:</strong>
        ${item.pendencia}
        <br>

        <strong>Prioridade:</strong>
        ${item.prioridade}
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

function limparPendencias() {

  document.getElementById("pendencia").value = "";

  document.getElementById("obs-pendencia").value = "";
}

function gerarRelatorio() {

  let texto =

`RELATÓRIO OPERACIONAL

======================================
`;

  registros.forEach((item, index) => {

    texto += `

${index + 1}º REGISTRO

Funcionário:
${item.funcionario}

Atividade:
${item.atividade}

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

Pontualidade ao Chegar:
${item.pontualidadeChegada}

Pontualidade ao Sair:
${item.pontualidadeSaida}

Observações Gerais:
${item.observacao}

Data:
${item.data}

--------------------------------------
`;
  });

  texto += `

SERVIÇOS PENDENTES

======================================
`;

  pendencias.forEach((item, index) => {

    texto += `

${index + 1}º PENDÊNCIA

Serviço:
${item.pendencia}

Prioridade:
${item.prioridade}

Observação:
${item.observacao}

Data:
${item.data}

--------------------------------------
`;
  });

  texto += `

TOTAL DE REGISTROS:
${registros.length}

TOTAL DE PENDÊNCIAS:
${pendencias.length}

======================================`;

  document.getElementById("relatorio").value =
    texto;
}

function limparRelatorio() {

  document.getElementById("relatorio").value = "";
}

function limparRegistros() {

  const confirmar =
    confirm("Deseja apagar todos os registros e pendências?");

  if (!confirmar) {

    return;
  }

  registros = [];

  pendencias = [];

  localStorage.removeItem("registros");

  localStorage.removeItem("pendencias");

  atualizarLista();

  atualizarPendencias();

  limparRelatorio();
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

function baixarPDF() {

  const texto =
    document.getElementById("relatorio").value;

  if (texto === "") {

    alert("Gere o relatório antes.");

    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  const linhas =
    doc.splitTextToSize(texto, 180);

  doc.text(linhas, 10, 10);

  const dataAtual =
    new Date().toLocaleDateString("pt-BR")
      .replace(/\//g, "-");

  doc.save(`Relatorio_${dataAtual}.pdf`);
}
