document.addEventListener('DOMContentLoaded', () => {
    // Esconder o preloader quando a página estiver totalmente carregada
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0'; // Inicia a transição de opacidade para sumir
            setTimeout(() => {
                preloader.remove(); // Remove o preloader do DOM após a transição
            }, 500); // Tempo igual à transição de opacidade no CSS
        }
    });

    // Animação de luz no nome
    const nomePerfil = document.querySelector('.nome-perfil');
    if (nomePerfil) {
        // Quebra o texto em letras e cria um <span> para cada uma
        const textoOriginal = nomePerfil.textContent;
        nomePerfil.innerHTML = ''; // Limpa o conteúdo original

        // Loop para criar um <span> para cada letra
        for (let i = 0; i < textoOriginal.length; i++) {
            const letra = textoOriginal[i];
            const spanLetra = document.createElement('span');

            // Adiciona a classe para estilização e o texto da letra
            spanLetra.classList.add('letra-nome');
            spanLetra.textContent = letra === ' ' ? '\u00A0' : letra; // Adiciona um espaço fixo para espaços
            nomePerfil.appendChild(spanLetra);
        }

        const letras = document.querySelectorAll('.letra-nome');
        let index = 0;

        const animarLuz = () => {
            // Remove a classe de brilho de todas as letras
            letras.forEach(l => l.classList.remove('letra-brilho'));

            // Adiciona a classe de brilho à letra atual
            if (letras[index]) {
                letras[index].classList.add('letra-brilho');
            }

            // Move para a próxima letra ou reinicia o loop
            index++;
            if (index >= letras.length) {
                index = 0; // Reinicia para criar um loop contínuo
            }
        };

        // Inicia a animação em loop após um pequeno atraso
        setInterval(animarLuz, 150); // Velocidade do efeito de luz (ajuste para a velocidade desejada)
    }

    // Bloquear download de imagens (clique direito e arrastar)
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
        img.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
    });
});