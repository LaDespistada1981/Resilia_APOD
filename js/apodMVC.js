class UserModel {
    constructor() 
    {
        console.log('Model foi criada!')

        this._title = '';
        this._date = '';
        this._image = '';
        this._explanation = '';
    }

    buscaImagem()
    {
        console.log('Model buscando imagem...')

        let request = new XMLHttpRequest();

        request.open( 'GET', 'https://api.nasa.gov/planetary/apod?api_key=ECpoRsNJWK3SQxK9HfxJQcXii7ZCh7YXxaaffIg0', false);

        request.setRequestHeader('Authorization', 'ECpoRsNJWK3SQxK9HfxJQcXii7ZCh7YXxaaffIg0')

        request.addEventListener('load', function(){
            
            if ( request.status == 200 )
            {
                this._title = this.responseText.title;
                this._date = this.responseText.date;
                this._image = this.responseText.url;
                this._explanation = this.responseText.explanation;
            }
        })

        request.send();

        console.log(request);
    }

    getTitle()
    {
        return this._title;
    }

    getDate()
    {
        return this._date;
    }

    getImage()
    {
        return this._image;
    }

    getExplanation()
    {
        return this._explanation;
    }
}

class UserView
{
    constructor() { console.log('View criada!')}

    renderView ( model )
    {
        console.log('View recebendo uma imagem e criando uma visualização.')

        let card = document.createElement('div');

        document.querySelector('body')

        document.body.appendChild( card );

        card.innerHTML =
        `
            <p>${model.getDate()}</p>
            <img src = ${model.getImage()}>
            <h2>${model.getTitle()}</h2>
            <p>${model.getExplanation()}</p>
        `
    }
}

class UserController
{
    constructor(){ console.log( 'Controller criado!')}

    adicionaImagem()
    {
        console.log('Controller adicionando uma imagem...')

        let page = new UserModel();
        page.buscaImagem();

        let view = new UserView();
        view.renderView( page )
    }
}

let controller = new UserController();

controller.adicionaImagem();