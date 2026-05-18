let registros =
  JSON.parse(localStorage.getItem("registros")) || [];

let pendencias =
  JSON.parse(localStorage.getItem("pendencias")) || [];

let indiceEdicao = null;

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

  if (indiceEdicao !== null) {

    registros[indiceEdicao] = registro;

    indiceEdicao = null;

    alert("Registro atualizado.");

  } else {

    registros.push(registro);

    alert("Registro criado com sucesso.");
  }

  salvarLocalStorage();

  atualizarLista();

  gerarRelatorio();

  limparCampos();
}

function editarRegistro(index) {

  const item = registros[index];

  indiceEdicao = index;

  document.getElementById("funcionario").value =
    item.funcionario;

  document.getElementById("atividade").value =
    item.atividade;

  document.getElementById("observacao").value =
    item.observacao;

  document.getElementById("epis").value =
    item.epis;

  document.getElementById("organizacao").value =
    item.organizacao;

  document.getElementById("produtividade").value =
    item.produtividade;

  document.getElementById("abandono").value =
    item.abandono;

  document.getElementById("regras").value =
    item.regras;

  document.getElementById("iniciativa").value =
    item.iniciativa;

  document.getElementById("comunicacao").value =
    item.comunicacao;

  document.getElementById("confiabilidade").value =
    item.confiabilidade;

  document.getElementById("pontualidade-chegada").value =
    item.pontualidadeChegada;

  document.getElementById("pontualidade-saida").value =
    item.pontualidadeSaida;

  document.getElementById("obs-epis").value =
    item.obsEpis;

  document.getElementById("obs-organizacao").value =
    item.obsOrganizacao;

  document.getElementById("obs-produtividade").value =
    item.obsProdutividade;

  document.getElementById("obs-regras").value =
    item.obsRegras;

  document.getElementById("obs-iniciativa").value =
    item.obsIniciativa;

  document.getElementById("obs-comunicacao").value =
    item.obsComunicacao;

  document.getElementById("obs-confiabilidade").value =
    item.obsConfiabilidade;

  document.getElementById("obs-pontualidade-chegada").value =
    item.obsPontualidadeChegada;

  document.getElementById("obs-pontualidade-saida").value =
    item.obsPontualidadeSaida;

  document.getElementById("formulario")
    .classList.remove("oculto");

  window.scrollTo({

    top: 0,

    behavior: "smooth"
  });
}

function excluirRegistro(index) {

  const confirmar =
    confirm("Deseja excluir esta ocorrência?");

  if (!confirmar) {

    return;
  }

  registros.splice(index, 1);

  salvarLocalStorage();

  atualizarLista();

  gerarRelatorio();
}

function atualizarLista() {

  const lista =
    document.getElementById("lista");

  lista.innerHTML = "";

  registros.forEach((item, index) => {

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
        <br><br>

        <button onclick="editarRegistro(${index})">
          Editar
        </button>

        <button onclick="excluirRegistro(${index})">
          Excluir
        </button>

      </li>

      <hr>
    `;
  });
}

function limparCampos() {

  document.getElementById("funcionario").selectedIndex = 0;

  document.getElementById("atividade").value = "";

  document.getElementById("observacao").value = "";

  document.querySelectorAll("textarea").forEach((campo) => {

    if (campo.id !== "relatorio") {

      campo.value = "";
    }
  });
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

      <hr>
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
    new Date()
      .toLocaleDateString("pt-BR")
      .replace(/\//g, "-");

  doc.save(`Relatorio_${dataAtual}.pdf`);
}
