// Função para Confirmar Presença
function confirmarPresenca() {
    // Mostrar o formulário que estava escondido
    const sec = document.getElementById('secaoMensagem');
    const nomeInput = document.getElementById('nome');
    const msg = document.getElementById('mensagemConfirmacao');

    if (sec) {
        sec.style.display = 'block';
        // focar no input nome
        if (nomeInput) nomeInput.focus();
        // rolar suavemente até o formulário
        sec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (msg) {
        msg.innerHTML = 'Que bom que você vem! Preencha o formulário abaixo para confirmar sua presença.';
        msg.style.display = 'block';
        setTimeout(() => { msg.style.display = 'none'; }, 3500);
    }
}

// Função para Não Poderei Ir
function naoPodereiIr() {
    // Redirecionar para a página de agradecimento pela resposta
    window.location.href = './obrigado-nao.html';
}

// Animação de Pétalas Caindo
function criarPetala() {
    const petala = document.createElement('div');
    petala.classList.add('petala');
    petala.style.left = Math.random() * 100 + 'vw';
    petala.style.animationDuration = (Math.random() * 3 + 2) + 's';
    petala.style.animationDelay = Math.random() * 2 + 's';
    
    // IMPORTANTE: Posicionar no topo da viewport, não acima
    petala.style.top = '0px';
    
    document.body.appendChild(petala);

    // Remover após a animação (mais rápido)
    setTimeout(() => {
        if (petala.parentNode) {
            petala.remove();
        }
    }, 4000); // Remove antes que saia completamente da tela
}

// Gerar pétalas a cada 500ms
setInterval(criarPetala, 500);

// Instrução para adicionar foto: Substitua o src da imagem
console.log('Para adicionar sua foto principal, substitua o src do elemento #fotoPrincipal no HTML.');

// --- Formulário (formsubmit.co) - Validação e UX ---
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('conviteForm');
    const status = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const nextInput = document.getElementById('_next_redirect');

    // Definir _next para redirecionar de volta à página de obrigado usando URL absoluto.
    // FormSubmit muitas vezes reescreve caminhos relativos para o domínio deles — por isso usamos um URL absoluto.
    if (nextInput && (!nextInput.value || nextInput.value.trim() === '')) {
        let nextUrl = '';
        try {
            const loc = window.location;
            if (loc.protocol === 'file:') {
                // fallback para file:// — usar href sem o nome do arquivo
                const base = loc.href.replace(/\/[^^\/]*$/, '/');
                nextUrl = base + 'obrigado-confirmado.html';
            } else {
                const pathBase = loc.pathname.replace(/\/[^\/]*$/, '/');
                nextUrl = loc.origin + pathBase + 'obrigado-confirmado.html';
            }
        } catch (err) {
            // fallback relativo caso algo dê errado
            nextUrl = './obrigado-confirmado.html';
        }
        nextInput.value = nextUrl;
    }

    if (!form) return; // nada a fazer se o formulário não existir

    form.addEventListener('submit', (e) => {
        // validação simples: apenas o nome é obrigatório neste formulário
        const nome = document.getElementById('nome');
        if (!nome || !nome.value.trim()) {
            e.preventDefault();
            status.style.display = 'block';
            status.innerText = 'Por favor, digite seu nome para confirmar a presença.';
            status.style.color = '#b91c1c';
            return;
        }

        // boa experiência: indicar envio e prevenir múltiplos cliques
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';
        status.style.display = 'block';
        status.style.color = '#0f766e';
        status.innerText = 'Enviando sua confirmação — você será redirecionado(a) em seguida.';

        // Não abrir nova janela: permitir envio normal (mesma aba). O _next já foi definido
        // para apontar para a página de obrigado; o navegador fará o POST e redirecionamento.
        // Não chamamos e.preventDefault(), então o envio segue normalmente.

        // Reativar botão após 6s por segurança (caso algo falhe)
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Enviar';
        }, 6000);
    });
});

// pequena função para escapar valores em HTML
function encodeHTML(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}