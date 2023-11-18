const express = require('express');
const router = express.Router();
const PostReceitaMobile = require('../models/postReceitaMobile');




// Rota para obter todos os dados do banco
router.get('/', async (req, res) => {
  try {
    const Receitas = await PostReceitaMobile.find();
    res.json(Receitas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// rota para pegar apenas o _id e nome do banco de dados
router.get('/nomeid', async (req, res) => {
  try {
    const alimentos = await PostReceitaMobile.find().select('nome');
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// rota para pegar apenas o _id e nome do banco de dados
router.get('/NomeTempoFoto', async (req, res) => {
  try {
    const alimentos = await PostReceitaMobile.find().select('nome').select('tempoDePreparo').select('foto')
    
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});







// Rota para pesquisar por nome no banco
router.get('/:nome', getReceita, (req, res) => {
  res.json(res.alimento);
});





// função para pegar um dado por nome
async function getReceita(req, res, next) {
  try {
    const postAlimento = await PostReceitaMobile.findOne({ nome: req.params.nome });

    if (postAlimento == null) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    
    res.alimento = postAlimento;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
  }
};







// Rota para pesquisar por nome no banco
router.get('/nomeIncompleto/:nome', getReceitaIncompleta, (req, res) => {
  res.json(res.alimento);
});




async function getReceitaIncompleta(req, res, next) {

  const nomeIncompleto = req.params.nome;

  try {
    const postAlimento = await PostReceitaMobile.find({ nome: { $regex: nomeIncompleto, $options: 'i' } });

    if (postAlimento == null) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    
    res.alimento = postAlimento;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
  }
};






























// Rota para deletar um registro
router.delete('/deletarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await PostReceitaMobile.findOneAndDelete({ nome: nome });

    if (!deletedPostAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json({ message: 'Registro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o registro' });
  }
});



  // anotações muito uteis, não excluir
  // tipoDoAlimento: req.body.id_topico[0].subTopico[0].nomesubTopico,
  //     nomeCientifico: req.body.id_topico[0].nomeTopico,
  




// // busca no banco de dados pelos ingredientes da Receita
//   router.get('/buscaIngredientes/:ingrediente', async (req, res) => {
//     const ingrediente = req.params.ingrediente;
  
//     try {
//       // Use o método findOneAndDelete para buscar e deletar o registro
//       const registrosEncontrados = await PostReceitaMobile.find({ "ingredientes.nome": ingrediente });

//       res.json(registrosEncontrados);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erro ao deletar o registro' });
//     }
//   });











// cria nova receita
router.post('/', async(req, res) => {

    try {
    

    const dadosDaAPI = req.body;
    const Receita = converterDadosAPIReceitas(dadosDaAPI);
    const newPostReceita = await Receita.save();

    // Responder com o novo documento criado
    res.status(201).json(newPostReceita);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





const converterDadosAPIReceitas = (dadosAPI) => {

  const novaReceita = new PostReceitaMobile({
    nome: dadosAPI.nome,
    foto: dadosAPI.foto,
    tempoDePreparo: dadosAPI.tempoDePreparo,
    ingredientes: dadosAPI.ingredientes,
    modoDePreparo: dadosAPI.modoDePreparo,
  });

  return novaReceita;
};























// Rota para editar por Nome
router.put('/editarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;
  const novosDados = req.body; // Novos dados para atualização

  try {
    // Use o método findOneAndUpdate para buscar e atualizar o registro
    const postAlimento = await PostReceitaMobile.findOneAndUpdate(
      { nome: nome },
      novosDados,
      { new: true } // Para retornar o documento atualizado
    );

    if (!postAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json(postAlimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao editar o registro' });
  }
});


module.exports = router;
