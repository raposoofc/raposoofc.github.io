/*
 * Arquivo: script.js
 * Descrição: Script JavaScript principal para as páginas de portfólio (Web e Design).
 * Autor: Rodolpho Rapôso
 */

document.addEventListener('DOMContentLoaded', () => {

    // Chave Pública do EmailJS (Substitua pela sua chave real)
    // Você pode obter uma em https://www.emailjs.com/
    // A chave pública que estava no seu script.js anterior era: 'kqNTbfAyYaXLTamPN'
    // Se essa for a sua chave pública correta, mantenha-a, caso contrário, substitua.
    emailjs.init('kqNTbfAyYaXLTamPN'); // <-- COLOQUE AQUI A SUA CHAVE PÚBLICA REAL DO EmailJS!

    // Identifica qual página está sendo carregada (web-portfolio.html ou design-portfolio.html)
    const paginaAtual = document.body.id;

    /*
     * Funções Comuns a Ambas as Páginas
     */

    // Função para alternar o menu mobile
    const btnMenuMobile = document.getElementById('btnMenuMobile');
    const navMobile = document.getElementById('navMobile');

    if (btnMenuMobile && navMobile) {
        btnMenuMobile.addEventListener('click', () => {
            navMobile.classList.toggle('ativo');
        });

        // Fechar menu mobile ao clicar em um link
        const linksMobile = navMobile.querySelectorAll('.link-nav');
        linksMobile.forEach(link => {
            link.addEventListener('click', () => {
                navMobile.classList.remove('ativo');
            });
        });
    }

    // Função para adicionar classe 'ativo' para animações de revelação
    const elementosRevelar = document.querySelectorAll('.revelar');

    const observadorRevelar = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ativo');
                observadorRevelar.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // Começa a animar quando 10% do elemento está visível

    elementosRevelar.forEach(elemento => {
        observadorRevelar.observe(elemento);
    });

    // Função para preloader (se existir na página)
    function configurarPreloader(idPreloader) {
        const preloader = document.querySelector(`.${idPreloader}`);
        if (preloader) {
            window.addEventListener('load', () => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            });
        }
    }

    // Função para o efeito de digitação
    function configurarEfeitoDigitacao(seletorDescricao) {
        const descricaoHero = document.querySelector(seletorDescricao);
        if (descricaoHero) {
            const textoParaDigitar = descricaoHero.getAttribute('data-texto');
            descricaoHero.textContent = ''; // Limpa o texto inicial
            let indiceChar = 0;
            let estaApagando = false;
            let velocidadeDigitacao = 100; // Velocidade inicial

            function digitar() {
                const textoAtual = textoParaDigitar.substring(0, indiceChar);
                descricaoHero.textContent = textoAtual;

                if (!estaApagando && indiceChar < textoParaDigitar.length) {
                    indiceChar++;
                    velocidadeDigitacao = 100;
                } else if (estaApagando && indiceChar > 0) {
                    indiceChar--;
                    velocidadeDigitacao = 50;
                }

                if (!estaApagando && indiceChar === textoParaDigitar.length) {
                    // Terminou de digitar, espera um pouco e começa a apagar
                    velocidadeDigitacao = 2000; // Tempo antes de apagar
                    estaApagando = true;
                } else if (estaApagando && indiceChar === 0) {
                    // Terminou de apagar, espera um pouco e começa a digitar novamente
                    velocidadeDigitacao = 500; // Tempo antes de digitar novamente
                    estaApagando = false;
                }

                setTimeout(digitar, velocidadeDigitacao);
            }

            // Inicia o efeito de digitação apenas na página relevante
            if (paginaAtual === 'pagina-portfolio-web' && seletorDescricao === '.descricao-hero') {
                digitar();
            } else if (paginaAtual === 'pagina-portfolio-design' && seletorDescricao === '.descricao-hero') {
                digitar();
            }
        }
    }

    // Configura o efeito de digitação para a descrição do herói em ambas as páginas
    configurarEfeitoDigitacao('.descricao-hero');

    // Configura o preloader (se aplicável, com a classe correta do preloader)
    // Se você tiver um preloader com a classe 'loader-web' ou 'loader-design', descomente a linha abaixo e ajuste.
    // configurarPreloader('loader-web');
    // configurarPreloader('loader-design');

    /*
     * Lógica de Envio de Formulário com EmailJS (Unificado)
     */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário e o recarregamento da página

            // Seus IDs do EmailJS fornecidos:
            const serviceID = 'service_kalwx5d'; // Service ID
            const templateID = 'template_3vioc2s'; // Template ID

            // Envia o formulário usando EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(function() {
                    alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
                    contactForm.reset(); // Limpa o formulário após o envio
                }, function(error) {
                    alert('Oops! Houve um problema ao enviar a mensagem. Por favor, tente novamente mais tarde.');
                    console.error('EmailJS Erro:', error); // Exibe o erro no console para depuração
                });
        });
    }

    // Função para mostrar/ocultar projetos
    function configurarMostrarProjetos(btnId, containerProjetosClass) {
        const btnVerTodos = document.getElementById(btnId);
        const projetosContainer = document.querySelector(containerProjetosClass);

        if (btnVerTodos && projetosContainer) {
            // Inicialmente, oculte os projetos a partir do quarto
            const todosOsProjetos = projetosContainer.querySelectorAll('.item-projeto');
            for (let i = 3; i < todosOsProjetos.length; i++) { // Começa do índice 3 (quarto projeto)
                todosOsProjetos[i].classList.add('oculto');
            }

            btnVerTodos.addEventListener('click', (event) => {
                event.preventDefault(); // Impede o comportamento padrão do link

                const projetosOcultos = projetosContainer.querySelectorAll('.item-projeto.oculto');
                if (projetosOcultos.length > 0) {
                    projetosOcultos.forEach(projeto => {
                        projeto.classList.remove('oculto');
                        projeto.classList.add('revelar'); // Adiciona a classe revelar para a animação
                        observadorRevelar.observe(projeto); // Observa para ativar a animação
                    });
                    btnVerTodos.style.display = 'none'; // Esconde o botão após revelar todos
                }
            });
        }
    }

    // Chama a função para a página de Portfólio Web
    if (paginaAtual === 'pagina-portfolio-web') {
        configurarMostrarProjetos('btnVerTodosProjetosWeb', '.grid-projetos');
    }

    // Chama a função para a página de Portfólio Design
    if (paginaAtual === 'pagina-portfolio-design') {
        configurarMostrarProjetos('btnVerTodosProjetosDesign', '.grid-projetos');
    }
});