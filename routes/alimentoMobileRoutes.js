const express = require('express');
const router = express.Router();
const PostAlimentoMobile = require('../models/postAlimentoMobile');






// Rota para obter todos os dados do banco
router.get('/', async (req, res) => {
  try {
    const alimentos = await PostAlimentoMobile.find();
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});











// rota para pegar apenas o _id e nome do banco de dados
router.get('/Nomeid', async (req, res) => {
  try {
    const alimentos = await PostAlimentoMobile.find().select('nome');
    res.json(alimentos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});










// Rota para pegar as colunas nome, descricao e foto

router.get('/nomeEdescricaoEfotoPequenasTodas', async (req, res) => {
  try {
    const alimentos = await PostAlimentoMobile.find().select('nome').select('descricao').select('foto');
    res.json(alimentos);


  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

































// Rota para pesquisar por nome no banco
router.get('/:nome', getAlimento, (req, res) => {
  res.json(res.alimento);
});

// função para pegar um registro por nome
async function getAlimento(req, res, next) {
  try {
    const postAlimento = await PostAlimentoMobile.findOne({ nome: req.params.nome });

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


































// Rota para pesquisar por nome incompleto no banco
router.get('/nomeIncompleto/:nome', getReceitaIncompleta, (req, res) => {
  res.json(res.alimento);
});

// Função para pesquisar por nome incompleto no banco

async function getReceitaIncompleta(req, res, next) {

  const nomeIncompleto = req.params.nome;

  try {
    const postAlimento = await PostAlimentoMobile.find({ nome: { $regex: nomeIncompleto, $options: 'i' } });

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






















router.delete('/deletarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await PostAlimentoMobile.findOneAndDelete({ nome: nome });

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
  






















// Rota para criar um novo contato
router.post('/', async (req, res) => {

  try {
    const dadosDaAPI = req.body;
    const postAlimento = converterDadosAPIEmPostAlimento(dadosDaAPI);

    // Salvar o novo documento no banco de dados
    const newPostAlimento = await postAlimento.save();

    // Responder com o novo documento criado
    res.status(201).json(newPostAlimento);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Função para converter dados da API em postAlimento
const converterDadosAPIEmPostAlimento = (dadosAPI) => {




  const postAlimento = new PostAlimentoMobile({
    nome: dadosAPI.nome,
    descricao: dadosAPI.descricao,
    foto:dadosAPI.foto,
    nomeCientifico:dadosAPI.nomeCientifico,
    categoria:dadosAPI.categoria,
  });



  return postAlimento;
};






// Rota para editar por Nome
router.put('/editarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;
  const novosDados = req.body; // Novos dados para atualização

  try {
    // Use o método findOneAndUpdate para buscar e atualizar o registro
    const postAlimento = await PostAlimentoMobile.findOneAndUpdate(
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






// pucha o dado por categoria:



// Rota para obter os dados com categoria 'vegetal'
router.get('/categoria/vegetal', async (req, res) => {
  try {
    const alimentosVegetais = await PostAlimentoMobile.find({ categoria: 'vegetal' });

    if (alimentosVegetais.length === 0) {
      return res.status(404).json({ message: 'Nenhum alimento vegetal encontrado' });
    }

    res.json(alimentosVegetais);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Rota para obter os dados com categoria 'fruta'
router.get('/categoria/fruta', async (req, res) => {
  try {
    const alimentosVegetais = await PostAlimentoMobile.find({ categoria: 'fruta' });

    if (alimentosVegetais.length === 0) {
      return res.status(404).json({ message: 'Nenhum alimento fruta encontrado' });
    }

    res.json(alimentosVegetais);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Rota para obter os dados com categoria 'erva'
router.get('/categoria/erva', async (req, res) => {
  try {
    const alimentosVegetais = await PostAlimentoMobile.find({ categoria: 'erva' });

    if (alimentosVegetais.length === 0) {
      return res.status(404).json({ message: 'Nenhum alimento erva encontrado' });
    }

    res.json(alimentosVegetais);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});




module.exports = router;
