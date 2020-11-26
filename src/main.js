import api from './api'

class App{
    constructor(){
        //lista de repositorios 
        this.repositorios = [];

        // form
        this.form = document.querySelector('form')
                
        // recupera lista
        this.list = document.querySelector('.list-group')

        // metodo para registrar os eventos do formulario
        this.registrarEventos();
    }
    registrarEventos(){
        // recupera formulario
        this.form.onsubmit = evento => this.adicionarRepositorio(evento);


    }
     async adicionarRepositorio(evento){
        evento.preventDefault();

        //recuperar o valor do input 
        let input = this.form.querySelector('input[id=repositorio]').value;

        //se o input vier vazio sai da aplicacao
        if(input.length === 0){
            return; 
        }

        let response = await api.get(`/repos${input}`);

        //destructuring
        let {name, description, html_url, owner:{avatar_url}} = response.data;
        //add o repositorio na lista 
        this.repositorios.push( {
            nome: name, 
            descricao: description,
            avatar_url, 
            link:html_url,
        });

        //renderizar a tela
        this.renderizaTela();
    }
    // renderiza a tela 
    renderizaTela(){
        // limpar o conteudo de lista
        this.list.innerHTML = '';

        //iterar toda a lista de repositorios e criar os elementos
        this.repositorios.forEach(repositorio => {
            //<li>
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');
            
            //<img>
            let img = document.createElement('img'); 
            img.setAttribute('src',repositorio.avatar_url); 
            li.appendChild(img);
            
            //<strong>
            let strong = document.createElement('strong'); 
            let txtName = document.createTextNode(repositorio.nome);
            strong.appendChild(txtName);
            li.appendChild(strong)

            //<p>
            let p = document.createElement('p'); 
            let txtDescription = document.createTextNode(repositorio.descricao); 
            p.appendChild(txtDescription); 
            li.appendChild(p);


            //<a>
            let a = document.createElement('a');
            a.setAttribute('target', '_blank'); 
            a.setAttribute('href', repositorio.link); 
            let txtA = document.createTextNode("Acessar")
            a.appendChild(txtA); 
            li.appendChild(a);

            //add li como filho da ul 
            this.list.appendChild(li);

            //limpar o conteúdo do input
            this.form.querySelector('input[id=repositorio').value = '';

            // add foco no input
            this.form.querySelector('input[id=repositorio]').focus();

        })
    }
}
new App()