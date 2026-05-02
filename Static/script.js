// 1. SELEÇÃO DE ELEMENTOS
const musica = document.getElementById('playerAudio');
const cursor = document.getElementById('cursor-costumizado');
const cartaoPerfil = document.querySelector('.cartao');
const musicaCard = document.querySelector('.musica-container');
const containerBarra = document.getElementById('containerBarra');
const barraRoxa = document.getElementById('barraRoxa');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');
const btnPlay = document.getElementById('botaoPlay');
const icone = document.getElementById('status-icone');

let arrastando = false;

// 2. FUNÇÃO DE FORMATAR TEMPO
function formatarTempo(segundos) {
    if (isNaN(segundos)) return "0:00";
    let min = Math.floor(segundos / 60);
    let seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
}

// 3. LÓGICA DE ARRASTAR A BARRA (ESTILO YOUTUBE)
function buscarPosicao(e) {
    const rect = containerBarra.getBoundingClientRect();
    const larguraTotal = rect.width;
    let cliqueX = (e.clientX || e.pageX) - rect.left;

    if (cliqueX < 0) cliqueX = 0;
    if (cliqueX > larguraTotal) cliqueX = larguraTotal;

    const duracaoTotal = musica.duration;
    if (!isNaN(duracaoTotal)) {
        musica.currentTime = (cliqueX / larguraTotal) * duracaoTotal;
        // Atualiza a barra visualmente na hora
        const porcentagem = (cliqueX / larguraTotal) * 100;
        barraRoxa.style.width = porcentagem + "%";
        tempoAtual.innerText = formatarTempo(musica.currentTime);
    }
}

containerBarra.addEventListener('mousedown', (e) => {
    arrastando = true;
    buscarPosicao(e);
});

document.addEventListener('mousemove', (e) => {
    if (arrastando) {
        buscarPosicao(e);
    }
});

document.addEventListener('mouseup', () => {
    arrastando = false;
});

// 4. MOVIMENTO DO MOUSE (3D + CURSOR + CLICÁVEL)
document.addEventListener('mousemove', (e) => {
    // Seguir o mouse
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    // Detectar se é clicável para mudar a foto do cursor
    const alvo = e.target;
    const isClickable = 
        alvo.tagName === 'A' || 
        alvo.tagName === 'BUTTON' || 
        alvo.closest('button') || 
        alvo.closest('a') ||
        alvo.id === 'status-icone' ||
        alvo.id === 'containerBarra' ||
        alvo.id === 'barraRoxa';

    if (isClickable) {
        cursor.classList.add('clicavel');
    } else {
        cursor.classList.remove('clicavel');
    }

    // Efeito 3D nos cartões
    let x = (e.pageX - window.innerWidth / 2) / 25; 
    let y = (e.pageY - window.innerHeight / 2) / 25;
    const movimento = `rotateY(${x}deg) rotateX(${-y}deg)`;
    
    if(cartaoPerfil) cartaoPerfil.style.transform = movimento;
    if(musicaCard) musicaCard.style.transform = movimento;
});

// 5. ATUALIZAÇÃO AUTOMÁTICA DA MÚSICA
musica.addEventListener('timeupdate', () => {
    // Só atualiza sozinho se o usuário NÃO estiver arrastando
    if (!arrastando) {
        const porcentagem = (musica.currentTime / musica.duration) * 100;
        barraRoxa.style.width = porcentagem + "%";
        tempoAtual.innerText = formatarTempo(musica.currentTime);
    }
});

musica.addEventListener('loadedmetadata', () => {
    tempoTotal.innerText = formatarTempo(musica.duration);
});

// 6. PLAY / PAUSE
btnPlay.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        icone.innerText = "⏸";
    } else {
        musica.pause();
        icone.innerText = "▶";
    }
});

// 7. EFEITOS DE ENTRADA E SAÍDA (SUAVIDADE)
document.addEventListener('mouseleave', () => {
    const suave = "transform 0.5s ease";
    const parado = `rotateY(0deg) rotateX(0deg)`;
    if(cartaoPerfil) { cartaoPerfil.style.transition = suave; cartaoPerfil.style.transform = parado; }
    if(musicaCard) { musicaCard.style.transition = suave; musicaCard.style.transform = parado; }
});

document.addEventListener('mouseenter', () => {
    if(cartaoPerfil) cartaoPerfil.style.transition = "none";
    if(musicaCard) musicaCard.style.transition = "none";
});

// 8. FEEDBACK DE CLIQUE NO CURSOR
document.addEventListener('mousedown', () => { cursor.classList.add('clicando'); });
document.addEventListener('mouseup', () => { cursor.classList.remove('clicando'); });

containerBarra.addEventListener('mousedown', (e) => {
    arrastando = true;
    musicaCard.style.transform += " scale(0.98)"; // Dá uma leve "encolhida" no card ao clicar
    buscarPosicao(e);
});

