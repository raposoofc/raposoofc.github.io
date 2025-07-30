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

    // Função para alternar entre abas (Tecnologias, Ferramentas, etc.)
    function configurarAbas(idContainerAbas) {
        const containerAbas = document.getElementById(idContainerAbas);
        if (containerAbas) {
            const botoesAbas = containerAbas.querySelectorAll('.btn-aba');
            const conteudosAbas = containerAbas.querySelectorAll('.conteudo-aba');

            botoesAbas.forEach(botao => {
                botao.addEventListener('click', () => {
                    // Remove 'ativo' de todos os botões e conteúdos
                    botoesAbas.forEach(b => b.classList.remove('ativo'));
                    conteudosAbas.forEach(c => c.classList.remove('ativo'));

                    // Adiciona 'ativo' ao botão clicado
                    botao.classList.add('ativo');

                    // Ativa o conteúdo da aba correspondente
                    const idConteudo = botao.getAttribute('data-tab');
                    const conteudoAtivo = document.getElementById(idConteudo);
                    if (conteudoAtivo) {
                        conteudoAtivo.classList.add('ativo');
                    }
                });
            });

            // Ativar a primeira aba por padrão
            if (botoesAbas.length > 0) {
                botoesAbas[0].click();
            }
        }
    }

    // Chama a função para a seção de Habilidades do Portfólio Web
    if (paginaAtual === 'pagina-portfolio-web') {
        configurarAbas('habilidades-web');
    }

    // Chama a função para a seção de Habilidades do Portfólio Design
    if (paginaAtual === 'pagina-portfolio-design') {
        configurarAbas('habilidades-design');
    }


    /*
     * Funcionalidades Específicas da Página de Contato
     */
    const formContato = document.getElementById('formContato');
    if (formContato) {
        formContato.addEventListener('submit', function (event) {
            event.preventDefault(); // Evita o envio padrão do formulário

            // Captura os valores dos campos do formulário
            const nome = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mensagem = document.getElementById('message').value;

            // Prepara os parâmetros para o EmailJS
            const templateParams = {
                from_name: nome,
                from_email: email,
                message: mensagem
            };

            // Envia o e-mail usando o EmailJS
            emailjs.send('service_7s92m6e', 'template_j51d2f8', templateParams)
                .then(function (response) {
                    console.log('E-mail enviado com sucesso!', response.status, response.text);
                    alert('Sua mensagem foi enviada com sucesso! Em breve entrarei em contato.');
                    formContato.reset(); // Limpa o formulário
                }, function (error) {
                    console.error('Erro ao enviar e-mail:', error);
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                });
        });
    }

    /*
     * Funcionalidade "Ver Todos os Projetos"
     */
    function configurarMostrarProjetos(idBotao, seletorContainerProjetos) {
        const btnVerTodos = document.getElementById(idBotao);
        const projetosContainer = document.querySelector(seletorContainerProjetos);

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