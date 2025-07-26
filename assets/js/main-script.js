/*
 * Arquivo: main-script.js
 * Descrição: Script JavaScript para a tela inicial do portfólio principal.
 * Autor: Rodolpho Rapôso
 */

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

    // Configuração da animação de digitação para o nome do perfil
    const nomePerfil = document.querySelector('.nome-perfil');
    if (nomePerfil) {
        // Armazena o texto original e limpa o elemento para a animação
        const textoOriginal = nomePerfil.textContent;
        nomePerfil.textContent = '';
        let indiceCaractere = 0;

        // Função para simular o efeito de digitação
        const digitarTexto = () => {
            if (indiceCaractere < textoOriginal.length) {
                nomePerfil.textContent += textoOriginal.charAt(indiceCaractere);
                indiceCaractere++;
                setTimeout(digitarTexto, 100); // Velocidade da digitação (ms)
            } else {
                // Remove o cursor piscando após a digitação
                nomePerfil.style.borderRight = 'none';
            }
        };
        // Inicia o efeito de digitação após um pequeno atraso
        setTimeout(digitarTexto, 1500);
    }

    console.log('🚀 Tela inicial do Portfólio carregada com sucesso!');
});