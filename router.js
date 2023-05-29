const express = require("express")
const moment = require("moment")
const router = express.Router()
let atividades = require('./data/database.js')

router.get('/atividade', (request, response) => {
 response.json(atividades);   
})

router.get('/atividade/:id', (request, response) => {
    let id = request.params.id;
    let atividade = atividades.find(l=>l.id == id)
    response.json(atividade)
})

router.post('/atividade',  (request, response) => {

    
    const { dataCadastro, nome, atvStatus, dataFinalizacao } = request.body;
    // Verifica se os campos obrigatórios foram fornecidos
    if (!nome) {
      response.status(400).json({ error: 'Dados incompletos' });
    } else {
      const agora  = moment().format('DD/MM/YYYY')
      const novaAtividade = {
        id: atividades.length + 1, // Gerar ID único
        dataCadastro: agora,
        nome,
        atvStatus: 'Em andamento',
        dataFinalizacao: ''
      };
  
      atividades.push(novaAtividade); // Adiciona a nova atividade ao array de atividades
      response.status(201).json(novaAtividade); // Retorna a resposta com o status 201 (Created) e o objeto da nova atividade
    }
  });

  
  router.put('/atividade/finalizar', (request, response) => {
    const id = request.body.id;
    console.log('/atividade/finalizar')
    // Procura a atividade pelo ID
    const atividade = atividades.find((l) => l.id == id);
  
    // Verifica se a atividade existe
    if (!atividade) {
        response.status(404).json({ error: 'Atividade não encontrada' });
    } else {
        const agora = moment().format('DD/MM/YYYY')
        // Atualiza o campo atv_status da atividade
        atividade.atvStatus = 'Finalizada';
        atividade.dataFinalizacao = agora.toString()
  
      response.json(atividade); // Retorna a resposta com a atividade atualizada
    }
  });


router.put('/atividade/:id', (request, response) => {
    const id = request.params.id;
    

    const {nome} = request.body;
    
  
    // Procura a atividade pelo ID
    const atividade = atividades.find((l) => l.id == id);
  
    // Verifica se a atividade existe
    if (!atividade) {
      response.status(404).json({ error: 'Atividade não encontrada' });
    } else {
      // Atualiza os campos da atividade
      
      atividade.nome = nome;
      
      
  
      response.json(atividade); // Retorna a resposta com a atividade atualizada
    }
});


router.delete('/atividade/:id', (request, response) => {
    const id = request.params.id;

    // Filtra as atividades removendo a que possui o ID informado
    atividades = atividades.filter((l) => l.id != id);

    response.status(200).send(); // Retorna a resposta com o status 200 (OK)
});

module.exports = router