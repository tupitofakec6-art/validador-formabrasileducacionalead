const CHAVE = 7391;

// --- BANCO LOCAL ---
function getDocs() {
  return JSON.parse(localStorage.getItem("docs") || "[]");
}
function saveDocs(docs) {
  localStorage.setItem("docs", JSON.stringify(docs));
}

// --- ADMIN ---
function cadastrar() {
  const descricao = document.getElementById("desc").value;
  const data = document.getElementById("data").value;
  const base = document.getElementById("base").value;

  if (!descricao || !data || !base) {
    alert("Preencha tudo");
    return;
  }

  const publico = base - CHAVE;
  const docs = getDocs();
  docs.push({ descricao, data, base, publico });
  saveDocs(docs);

  document.getElementById("saida").textContent =
    "Código público: " + publico;
}

// --- VERIFICAR ---
function verificar() {
  const codigo = document.getElementById("codigo").value;
  const docs = getDocs();
  const base = parseInt(codigo) + CHAVE;

  const doc = docs.find(d => d.base == base);

  if (!doc) {
    document.getElementById("resultado").textContent =
      "Código inválido.";
    return;
  }

  localStorage.setItem("ultimo", JSON.stringify(doc));
  window.location = "documento.html";
}
