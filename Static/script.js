{
// 1. "Ache o cartão no meu HTML"
    const card = document.querySelector('.cartao');

    // 2. "Fique vigiando quando o mouse se mexer (mousemove)"
    card.addEventListener('mousemove', (e) => {
        // Calcula a posição do mouse em relação ao centro da tela
        let xAxis = (e.pageX - window.innerWidth / 2) / 17; 
    let yAxis = (window.innerHeight / 2 - e.pageY) / 17; 
    
    card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) scale(1.05)`;
    });

    // 3. "Quando o mouse sair (mouseleave), volte ao normal"
    card.addEventListener('mouseleave', (e) => {
        card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
    });

const cursor = document.getElementById('cursor-costumizado');

document.addEventListener('mousemove', (e) => {
cursor.style.left = e.clientX + 'px';
cursor.style.top = e.clientY + 'px';

// Pega todos os elementos exatamente na posição do mouse
const elementos = document.elementsFromPoint(e.clientX, e.clientY);

// Detecta o que tem embaixo do mouse
const alvo = e.target;

// A caveira só "brilha" se for EXATAMENTE um link, um botão ou o ícone do play
const isClickable = 
    alvo.tagName === 'A' || 
    alvo.tagName === 'BUTTON' || 
    alvo.closest('button') || 
    alvo.closest('a') ||
    alvo.id === 'status-icone';

if (isClickable) {
    cursor.classList.add('clicavel');
} else {
    cursor.classList.remove('clicavel');
}

    // 3. MOVIMENTO 3D (Unificado para os dois cartões)
    let x = (e.pageX - window.innerWidth / 2) / 25; 
    let y = (e.pageY - window.innerHeight / 2) / 25;
    const movimento = `rotateY(${x}deg) rotateX(${-y}deg)`;
    
    if(cartaoPerfil) cartaoPerfil.style.transform = movimento;
    if(musicaCard) musicaCard.style.transform = movimento;
})

}

const musica = document.getElementById('playerAudio');
const barraRoxa = document.getElementById('barraRoxa');
const tempoAtual = document.getElementById('tempo-atual');
const tempoTotal = document.getElementById('tempo-total');

// Formata segundos para o padrão 0:00
function formatarTempo(segundos) {
    let min = Math.floor(segundos / 60);
    let seg = Math.floor(segundos % 60);
    if (seg < 10) seg = "0" + seg;
    return min + ":" + seg;
}

// Atualiza o tempo total quando a música carrega
musica.addEventListener('loadedmetadata', () => {
    tempoTotal.innerText = formatarTempo(musica.duration);
});

// Faz a barra crescer e os minutos mudarem
musica.addEventListener('timeupdate', () => {
    // 1. Atualiza o texto do tempo atual
    tempoAtual.innerText = formatarTempo(musica.currentTime);
    
    // 2. Faz a barra roxa crescer (regra de três)
    const porcentagem = (musica.currentTime / musica.duration) * 100;
    barraRoxa.style.width = porcentagem + "%";
});

const btnPlay = document.getElementById('botaoPlay');
const icone = document.getElementById('status-icone'); // Pegamos o ícone novo
const music = document.getElementById('playerAudio');

btnPlay.addEventListener('click', () => {
    if (musica.paused) {
        musica.play();
        icone.innerText = "⏸"; // Quando toca, vira Pause
    } else {
        musica.pause();
        icone.innerText = "▶"; // Quando para, vira Play
    }
});

const musicaCard = document.querySelector('.musica-container');

// Função para o movimento 3D
document.addEventListener('mousemove', (e) => {
    // Pegamos a posição do mouse em relação ao centro da tela
    // Inverti o cálculo (e.pageX - centro) para ele seguir o mouse corretamente
    let x = (e.pageX - window.innerWidth / 2) / 25; 
    let y = (e.pageY - window.innerHeight / 2) / 25;

    // Aplicando a rotação
    // O eixo Y controla a inclinação horizontal e o X a vertical
    // Note que agora os valores não estão negativos para seguir o mouse
    musicaCard.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

// Faz ele voltar à posição original suavemente se o mouse sair da janela
document.addEventListener('mouseleave', () => {
    musicaCard.style.transition = "transform 0.5s ease";
    musicaCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

// Remove a transição quando o mouse entra para o movimento ser instantâneo
document.addEventListener('mouseenter', () => {
    musicaCard.style.transition = "none";
});

// Pegamos os dois "atores": o cartão do perfil e o da música
const cartaoPerfil = document.querySelector('.cartao');
const card = document.querySelector('.musica-container');

document.addEventListener('mousemove', (e) => {
    // Calcula a posição do mouse em relação ao centro da tela
    let x = (e.pageX - window.innerWidth / 2) / 25; 
    let y = (e.pageY - window.innerHeight / 2) / 25;

    // Aplicamos o "olhar" (rotação) nos dois ao mesmo tempo
    // O sinal de - no y é para que ele incline para frente quando o mouse sobe
    const movimento = `rotateY(${x}deg) rotateX(${-y}deg)`;
    
    cartaoPerfil.style.transform = movimento;
    musicaCard.style.transform = movimento;
});

// Faz os dois voltarem ao normal suavemente quando o mouse sai da tela
document.addEventListener('mouseleave', () => {
    const suave = "transform 0.5s ease";
    const parado = `rotateY(0deg) rotateX(0deg)`;

    cartaoPerfil.style.transition = suave;
    cartaoPerfil.style.transform = parado;

    musicaCard.style.transition = suave;
    musicaCard.style.transform = parado;
});

// Tira o delay quando o mouse entra para a resposta ser rápida
document.addEventListener('mouseenter', () => {
    cartaoPerfil.style.transition = "none";
    musicaCard.style.transition = "none";
});