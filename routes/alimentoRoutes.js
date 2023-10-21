const express = require('express');
const router = express.Router();
const PostAlimento = require('../models/postAlimento');





// testando para ver se o node sai do git hub

// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const contatos = await PostAlimento.find();
    res.json(contatos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/buscarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    const postAlimento = await PostAlimento.findOne({ Nome: nome });

    if (!postAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json(postAlimento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar o registro' });
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
  const postAlimento = new PostAlimento({
    Nome: dadosAPI.Nome,
    tipoDoAlimento: dadosAPI.tipoDoAlimento,
    nomeCientifico: dadosAPI.nomeCientifico,
    id_topico: [], // Inicialize um array vazio
  });

  for (const idTopicoData of Object.values(dadosAPI.id_topico)) {
    const idTopicoObject = {
      idTopico: idTopicoData.idTopico,
      nomeTopico: idTopicoData.nomeTopico,
      descricaoTopico: idTopicoData.descricaoTopico,
      foto: idTopicoData.foto,
      subTopico: [], // Inicialize um array vazio
    };

    for (const subTopicoData of Object.values(idTopicoData.subTopico)) {
      const subTopicoObject = {
        idSubTopico: subTopicoData.idSubTopico,
        nomesubTopico: subTopicoData.nomesubTopico,
        descricaosubTopico: subTopicoData.descricaosubTopico,
      };

      idTopicoObject.subTopico.push(subTopicoObject);
    }

    postAlimento.id_topico.push(idTopicoObject);
  }

  return postAlimento;
};



// Rota para editar por Nome
router.put('/editarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;
  const novosDados = req.body; // Novos dados para atualização

  try {
    // Use o método findOneAndUpdate para buscar e atualizar o registro
    const postAlimento = await PostAlimento.findOneAndUpdate(
      { Nome: nome },
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




// Rota para deletar por Nome
router.delete('/deletarPorNome/:nome', async (req, res) => {
  const nome = req.params.nome;

  try {
    // Use o método findOneAndDelete para buscar e deletar o registro
    const deletedPostAlimento = await PostAlimento.findOneAndDelete({ Nome: nome });

    if (!deletedPostAlimento) {
      return res.status(404).json({ message: 'Registro não encontrado' });
    }

    res.status(200).json({ message: 'Registro deletado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar o registro' });
  }
});



module.exports = router;
