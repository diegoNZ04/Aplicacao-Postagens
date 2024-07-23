import express from 'express'
import { engine } from 'express-handlebars'
import Post from './models/Post.js'
import { where } from 'sequelize';


const app = express()

// Config
    // Template Engine
    app.engine('handlebars', engine({
        defaultLayout: 'main',
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }));
    app.set('view engine', 'handlebars');

    // Envio de Informação, Clientes Externos
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

// Rotas

app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
        res.render('home', {posts: posts}) // acessar variáveis de home
    })
})

app.get('/cad', function(req, res){
    res.render('formulario')
})

app.post('/add', function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect('/')
    }).catch(function(erro){
        res.send(`Houve um erro: ${erro}`)
    })
})

app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send('Postagem Deletada Com Sucesso!')
    }).catch(function(){
        res.send('Essa Postagem Não Existe.')
    })
})


app.listen(8081, () => console.log('Servidor Rodando na url http://localhost8081'));


