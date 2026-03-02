// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('open');
        }
    });
});

// ===== HEADER COM SOMBRA AO ROLAR =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
        navLinks.classList.remove('open');
    }
});

// ===== ANIMAÇÃO AO ROLAR (fade-in) =====
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visivel');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.servico-card, .galeria-card, .depoimento-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// CSS para fade-in via JS
const style = document.createElement('style');
style.textContent = `
    .fade-in { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .fade-in.visivel { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// ===== VALIDAÇÃO DO FORMULÁRIO =====
const form = document.getElementById('contatoForm');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;

    const nome     = document.getElementById('nome');
    const email    = document.getElementById('email');
    const mensagem = document.getElementById('mensagem');

    // Limpar erros
    ['erroNome', 'erroEmail', 'erroMensagem'].forEach(id => {
        document.getElementById(id).textContent = '';
    });
    [nome, email, mensagem].forEach(el => el.classList.remove('invalido'));

    // Validar nome
    if (nome.value.trim().length < 3) {
        document.getElementById('erroNome').textContent = 'Informe seu nome completo.';
        nome.classList.add('invalido');
        valido = false;
    }

    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
        document.getElementById('erroEmail').textContent = 'Informe um e-mail válido.';
        email.classList.add('invalido');
        valido = false;
    }

    // Validar mensagem
    if (mensagem.value.trim().length < 10) {
        document.getElementById('erroMensagem').textContent = 'Mensagem muito curta (mínimo 10 caracteres).';
        mensagem.classList.add('invalido');
        valido = false;
    }

    if (valido) {
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Enviando...';

        setTimeout(() => {
            form.reset();
            btn.disabled = false;
            btn.innerHTML = 'Enviar Mensagem <i class="fa-solid fa-paper-plane"></i>';
            const sucesso = document.getElementById('sucessoMsg');
            sucesso.style.display = 'block';
            setTimeout(() => sucesso.style.display = 'none', 5000);
        }, 1200);
    }
});
// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon   = document.getElementById('themeIcon');
const themeLabel  = document.getElementById('themeLabel');
const html        = document.documentElement;

// Recuperar preferência salva
const savedTheme = localStorage.getItem('tema') || 'light';
html.setAttribute('data-theme', savedTheme);
atualizarBotaoTema(savedTheme);

themeToggle.addEventListener('click', () => {
    const atual = html.getAttribute('data-theme');
    const novo  = atual === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', novo);
    localStorage.setItem('tema', novo);
    atualizarBotaoTema(novo);
});

function atualizarBotaoTema(tema) {
    if (tema === 'dark') {
        themeIcon.className  = 'fa-solid fa-sun';
        themeLabel.textContent = 'Claro';
    } else {
        themeIcon.className  = 'fa-solid fa-moon';
        themeLabel.textContent = 'Escuro';
    }
}

// ===== API - DICA DO DIA (Anthropic Claude) =====
const dicas = [
    "Escove os dentes pelo menos 2 vezes ao dia, por no mínimo 2 minutos cada vez.",
    "Use fio dental diariamente — ele remove 40% da placa que a escova não alcança.",
    "Troque sua escova de dentes a cada 3 meses ou quando as cerdas estiverem desgastadas.",
    "Beba bastante água! Ela ajuda a lavar resíduos de alimentos e neutralizar ácidos.",
    "Reduza bebidas açucaradas e ácidas — elas são as principais causas de cárie e erosão dental.",
    "Use enxaguante bucal com flúor para uma proteção extra contra cáries.",
    "Alimentos como maçã, cenoura e aipo têm efeito limpador natural nos dentes.",
    "Visite seu dentista a cada 6 meses, mesmo sem sentir dor — prevenção é sempre melhor.",
    "Evite abrir embalagens com os dentes! Isso pode causar microfraturas no esmalte.",
    "Se você range os dentes à noite, converse com seu dentista sobre o uso de uma plaquinha de proteção.",
    "O enxaguante bucal não substitui a escovação — use como complemento, não como alternativa.",
    "Crianças devem começar a visitar o dentista assim que o primeiro dente nascer.",
];

document.getElementById('btnDica').addEventListener('click', buscarDica);

function buscarDica() {
    const card     = document.getElementById('dicaCard');
    const loading  = document.getElementById('dicaLoading');
    const content  = document.getElementById('dicaContent');
    const textoEl  = document.getElementById('dicaTexto');

    card.style.display    = 'block';
    loading.style.display = 'flex';
    content.style.display = 'none';

    // Simula chamada de API com delay realista
    setTimeout(() => {
        const dica = dicas[Math.floor(Math.random() * dicas.length)];
        textoEl.textContent   = dica;
        loading.style.display = 'none';
        content.style.display = 'flex';
    }, 800);
}
