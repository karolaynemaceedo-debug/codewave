// --- 1. MÁSCARAS (Telefone, CPF, CEP) ---
const aplicarMascara = (id, tipo) => {
    const input = document.getElementById(id);
    if (!input) return; // Se não existir o campo na página, não faz nada

    input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
        if (tipo === 'tel') {
            v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        } else if (tipo === 'cpf') {
            v = v.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2");
            v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else if (tipo === 'cep') {
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }
        e.target.value = v;
    });
};

// Aplica as máscaras de forma segura
aplicarMascara('telefone', 'tel');
aplicarMascara('cpf', 'cpf');
aplicarMascara('cep', 'cep');


// --- 2. BUSCA AUTOMÁTICA DE CEP ---
const campoCep = document.getElementById('cep');
if (campoCep) { // Só roda se o campo CEP existir na página atual (Tela de Cadastro)
    campoCep.addEventListener('blur', function() {
        let cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(res => res.json())
                .then(dados => {
                    if (!dados.erro && document.getElementById('endereco')) {
                        document.getElementById('endereco').value = `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;
                    }
                });
        }
    });
}


// --- 3. VALIDAÇÃO DE CADASTRO ---
const formCadastro = document.getElementById('Cadastro');
if (formCadastro) { // Só roda se o formulário de cadastro existir na página atual
    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault(); 

        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;
        const confirma = document.getElementById('confirmar-senha').value;

        if (login.length !== 6) {
            alert("O Login deve ter exatamente 6 caracteres!");
            return;
        }

        if (senha.length < 8) {
            alert("A senha deve ter no mínimo 8 caracteres!");
            return;
        }

        if (senha !== confirma) {
            alert("As senhas não coincidem!");
            return;
        }

        alert("Cadastro concluído com sucesso!");
        window.location.href = "login.html"; // Cadastro envia para a minha página de Login
    });
}


// --- 4. CONFIRMAÇÃO DE LOGIN ---
const formLogin = document.getElementById('Login');
if (formLogin) { // Só roda se o formulário de login existir na página atual (Tela de Login)
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const login = document.getElementById('login').value;
        const senha = document.getElementById('senha').value;

        // Validação conforme os requisitos do projeto
        if (login.length === 6 && senha.length >= 8) { 
            alert("Login efetuado com sucesso! Bem-vindo à Codewave.");
            window.location.href = "form.html"; // Manda direto para o tela de formulário
        } else {
            alert("Login (6 caracteres) ou Senha (mín. 8) inválidos.");
        }
    });
}

// --- 5. SALVAR CADASTRO 
function salvarCadastro(){
    let nome = document.getElementById('nome').value
    let nomeMaterno = document.getElementById('nomeMaterno').value
    let cpf = document.getElementById('cpf').value
    let telefone = document.getElementById('telefone').value
    let cep = document.getElementById('cep').value
    let endereco = document.getElementById('endereco').value
    let login = document.getElementById('login').value
    let senha = document.getElementById('senha').value

   localStorage.setItem('nomeUsuario', nome);
   localStorage.setItem('nomeMaterno', nomeMaterno);
   localStorage.setItem('cpf', cpf);
   localStorage.setItem('telefone', telefone);
   localStorage.setItem('cep', cep);
   localStorage.setItem('endereco', endereco);
   localStorage.setItem('login', login);
   localStorage.setItem('senha', senha);
}

// MENSAGEM DE ENVIO DO FORMULÁRIO ---
const formServico = document.getElementById('form-servico');

if (formServico) { 
    formServico.addEventListener('submit', function(e) {
        e.preventDefault(); 

        alert("Formulário enviado com sucesso! Nosso time de especialistas entrará em contato.");
        formServico.reset(); 
        window.location.href = "index.html"; 
    });
}
