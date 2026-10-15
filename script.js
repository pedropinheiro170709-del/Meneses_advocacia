/* ===== Conteúdos: para adicionar um artigo, inclua um novo objeto abaixo ===== */
const artigos = [
  {
    titulo: "Como funciona uma notificação extrajudicial?",
    resumo: "Entenda a finalidade desse instrumento e em que situações ele pode ser utilizado.",
    imagem: "notificação.jpg",
    link: "#conteudos"
  },
  {
    titulo: "LGPD: medidas essenciais para reduzir riscos jurídicos.",
    resumo: "Conheça práticas de organização e proteção de dados pessoais nas empresas.",
    imagem: "LGPD.png",
    link: "#conteudos"
  },
  {
    titulo: "O que fazer quando um cliente não paga?",
    resumo: "Veja caminhos para prevenir e tratar a inadimplência com segurança jurídica.",
    imagem: "cliente.jpg",
    link: "#conteudos"
  }
];

const lista = document.getElementById("lista-artigos");
artigos.forEach(a => {
  const el = document.createElement("article");
  el.className = "artigo";
  el.innerHTML = `<div class="artigo-img" role="img" aria-label="Imagem do artigo (provisória)" style="background-image:url('${a.imagem}'),linear-gradient(135deg,#1B2C47,#345B9A)"></div>
    <div class="artigo-corpo"><h3></h3><p></p><a class="saiba" href="${a.link}">Ler artigo</a></div>`;
  el.querySelector("h3").textContent = a.titulo;
  el.querySelector("p").textContent = a.resumo;
  lista.appendChild(el);
});

/* ===== Menu mobile ===== */
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.getElementById("menu");
function fecharMenu() {
  menu.classList.remove("aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
menu.querySelectorAll("a").forEach(l => l.addEventListener("click", fecharMenu));
document.addEventListener("keydown", e => { if (e.key === "Escape") fecharMenu(); });

/* ===== WhatsApp: preencha o número oficial (somente dígitos, com DDI e DDD) ===== */
const NUMERO_WHATSAPP = ""; // ex.: "5515999999999"
const btnZap = document.getElementById("btn-whatsapp");
if (NUMERO_WHATSAPP) {
  btnZap.href = `https://wa.me/${NUMERO_WHATSAPP}`;
  btnZap.target = "_blank";
  btnZap.rel = "noopener";
}


const form = document.getElementById("form-contato");
const status = document.getElementById("status");
const regras = {
  nome: v => v.trim().length >= 3 || "Informe seu nome completo.",
  email: v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Informe um e-mail válido.",
  telefone: v => v.replace(/\D/g, "").length >= 10 || "Informe um telefone com DDD.",
  assunto: v => v.trim().length >= 3 || "Informe o assunto.",
  mensagem: v => v.trim().length >= 10 || "Escreva uma mensagem com pelo menos 10 caracteres."
};
function validar(campo) {
  const caixa = campo.closest(".campo");
  const r = regras[campo.name](campo.value);
  caixa.classList.toggle("invalido", r !== true);
  caixa.querySelector(".erro").textContent = r === true ? "" : r;
  return r === true;
}
Object.keys(regras).forEach(n => form.elements[n].addEventListener("blur", e => validar(e.target)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const invalidos = Object.keys(regras).map(n => form.elements[n]).filter(c => !validar(c));
  if (invalidos.length) {
    status.style.color = "#B3261E";
    status.textContent = "Corrija os campos destacados.";
    invalidos[0].focus();
    return;
  }
  
  status.style.color = "#555B63";
  status.textContent = "Dados validados. O envio ainda não está configurado: integre um serviço de envio para receber as mensagens.";
});

/* ===== Ano do rodapé ===== */
document.getElementById("ano").textContent = new Date().getFullYear();
