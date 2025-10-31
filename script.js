// Função para Confirmar Presença
function confirmarPresenca() {
    document.getElementById('mensagemConfirmacao').innerHTML = 'Que bom que você vem! 💕';
    document.getElementById('mensagemConfirmacao').style.display = 'block';
    setTimeout(() => {
        document.getElementById('mensagemConfirmacao').style.display = 'none';
    }, 3000);
}

// Função para Não Poderei Ir
function naoPodereiIr() {
    document.getElementById('mensagemConfirmacao').innerHTML = 'Poxa, Sentiremos sua falta 💗';
    document.getElementById('mensagemConfirmacao').style.display = 'block';
    setTimeout(() => {
        document.getElementById('mensagemConfirmacao').style.display = 'none';
    }, 3000);
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

// Gerar pétalas a cada 500ms
setInterval(criarPetala, 500);

// Instrução para adicionar foto: Substitua o src da imagem
console.log('Para adicionar sua foto principal, substitua o src do elemento #fotoPrincipal no HTML.');