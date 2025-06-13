        // Seleciona os elementos do DOM
        const staff = document.getElementById('staff');
        const notesContainer = document.getElementById('notes-container');
        const labelsContainer = document.getElementById('labels-container');
        const generateButton = document.getElementById('generateButton');

        const som = new Audio('./rizz-sound-effect.mp3')
        let audioAtual = null;

       
// --- Configurações 
const numberOfNotes = 5; // Quantidade de notas a gerar
const staffPaddingTop = 10; // Padding superior definido no CSS .staff-container
const staffHeight = 90; // Altura da pauta em pixels (corrigido para 90px como no CSS)
const lineCount = 5; // Número de linhas na pauta
const spaceBetweenLines = staffHeight / (lineCount - 1); // Espaço entre os centros das linhas

// Define as posições verticais (top) PRECISAS para o CENTRO das notas
// Ordem: Mi(1), Fá(1), Sol(2), Lá(2), Si(3), Dó(3), Ré(4), Mi(4), Fá(5) (de baixo para cima)
const possibleYPositions = [
    staffPaddingTop + staffHeight - spaceBetweenLines * 0,     // Linha 5 (Mi)
    staffPaddingTop + staffHeight - spaceBetweenLines * 0.5,   // Espaço entre linhas 4-5 (Fá)
    staffPaddingTop + staffHeight - spaceBetweenLines * 1,     // Linha 4 (Sol)
    staffPaddingTop + staffHeight - spaceBetweenLines * 1.5,   // Espaço entre linhas 3-4 (Lá)
    staffPaddingTop + staffHeight - spaceBetweenLines * 2,     // Linha 3 (Si)
    staffPaddingTop + staffHeight - spaceBetweenLines * 2.5,   // Espaço entre linhas 2-3 (Dó)
    staffPaddingTop + staffHeight - spaceBetweenLines * 3,     // Linha 2 (Ré)
    staffPaddingTop + staffHeight - spaceBetweenLines * 3.5,   // Espaço entre linhas 1-2 (Mi)
    staffPaddingTop + staffHeight - spaceBetweenLines * 4,     // Linha 1 (Fá)
];

// Define os nomes das notas correspondentes a cada posição vertical (de baixo para cima)
const noteNames = [
    "Mi", "Fá", "Sol", "Lá", "Si", "Dó", "Ré", "Mi", "Fá"
];

// Função para gerar as notas aleatórias e seus nomes
function generateNotes() {
    // Limpa as notas e os nomes anteriores
    notesContainer.innerHTML = '';
    labelsContainer.innerHTML = ''; // Limpa também os nomes

    // Obtém a largura da pauta para distribuir as notas
    const staffWidth = staff.offsetWidth;
    // Define uma margem nas laterais para não colocar notas muito nas bordas
    const horizontalMargin = 50; // Aumenta a margem para acomodar a clave e dar espaço
    const usableWidth = staffWidth - (2 * horizontalMargin);
    // Calcula o espaço horizontal para cada nota
    const horizontalSpacing = usableWidth > 0 ? usableWidth / numberOfNotes : 10; // Evita divisão por zero

    // Gera cada nota e seu nome
    for (let i = 0; i < numberOfNotes; i++) {
        // --- Cria a Bolinha da Nota ---
        const noteElement = document.createElement('div');
        noteElement.classList.add('note'); // Adiciona a classe CSS 'note'

        // Escolhe uma posição vertical aleatória da lista de posições possíveis
        const randomYIndex = Math.floor(Math.random() * possibleYPositions.length);
        const yPos = possibleYPositions[randomYIndex];

        // Calcula uma posição horizontal dentro do segmento da nota
        // Garante que as notas fiquem dentro da área útil
        const segmentStart = horizontalMargin + (i * horizontalSpacing);
        // Centraliza a nota no seu segmento horizontal
        const xPos = segmentStart + (horizontalSpacing / 2);

        // Define a posição da nota (bolinha) usando 'top' e 'left'
        noteElement.style.top = `${yPos}px`;
        noteElement.style.left = `${xPos}px`;

        // Adiciona a nota (bolinha) ao container de notas
        notesContainer.appendChild(noteElement);

        // --- Cria o Nome da Nota (Label) ---
        const labelElement = document.createElement('span'); // Usando span para o texto
        labelElement.classList.add('note-label'); // Adiciona a classe CSS

        // Obtém o nome da nota correspondente à posição vertical
        const noteName = noteNames[randomYIndex];
        labelElement.innerText = noteName; // Define o texto do nome

        // Define a posição do nome (label)
        // Usa a mesma posição horizontal da nota
        labelElement.style.left = `${xPos}px`;

        // Adiciona o nome (label) ao container de nomes
        labelsContainer.appendChild(labelElement);
    }
}

// função responsável pelo som tocado a cada clique no botão
function tocarsom() {
    if (som) {
        som.currentTime = 0;
        som.play();
    }
}

// Adiciona o evento de clique ao botão
generateButton.addEventListener('click', generateNotes);
generateButton.addEventListener('click', tocarsom);

// Pequeno atraso para garantir que offsetWidth esteja calculado
// Gera um conjunto inicial de notas e nomes ao carregar a página
window.onload = () => {
    setTimeout(generateNotes, 100); // Adiciona um pequeno delay
};