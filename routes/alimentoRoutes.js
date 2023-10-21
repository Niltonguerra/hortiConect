const express = require('express');
const router = express.Router();
const PostAlimento = require('../models/postAlimento');
const Contato = require('../models/contato');


// Rota para obter todos os contatos
router.get('/', async (req, res) => {
  try {
    const contatos = await PostAlimento.find();
    res.json(contatos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// // Rota para obter um contato por ID
// router.get('/:id', getContato, (req, res) => {
//   res.json(res.contato);
// });
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



























// Rota para criar um novo contato
router.post('/', async (req, res) => {

  // anotações muito uteis, não excluir
  // tipoDoAlimento: req.body.id_topico[0].subTopico[0].nomesubTopico,
  //     nomeCientifico: req.body.id_topico[0].nomeTopico,
  
  
  try {


    const dadosDaAPI = req.body;
    const postAlimento = converterDadosAPIEmPostAlimento(dadosDaAPI);



    // Crie um novo documento PostAlimento
    // const postAlimento = new PostAlimento({
    //   Nome: req.body.Nome,
    //   tipoDoAlimento: req.body.tipoDoAlimento,
    //   nomeCientifico: req.body.nomeCientifico,
    //   id_topico: [
    //     {
    //       idTopico: req.body.id_topico[0].idTopico, // ID do Tópico
    //       nomeTopico: req.body.id_topico[0].nomeTopico, // Nome do Tópico
    //       descricaoTopico: req.body.id_topico[0].descricaoTopico, // Descrição do Tópico
    //       foto: req.body.id_topico[0].foto, // Foto do Tópico
          
    //       subTopico: [
    //         {
    //           idSubTopico: req.body.id_topico[0].subTopico[0].idSubTopico, // ID do Subtópico
    //           nomesubTopico: req.body.id_topico[0].subTopico[0].nomesubTopico, // Nome do Subtópico
    //           descricaosubTopico: req.body.id_topico[0].subTopico[0].descricaosubTopico, // Descrição do Subtópico
    //         },
    //         // Se houver mais subcampos, você pode adicioná-los aqui
    //         {
    //           idSubTopico: req.body.id_topico[0].subTopico[1].idSubTopico, // ID do Subtópico
    //           nomesubTopico: req.body.id_topico[0].subTopico[1].nomesubTopico, // Nome do Subtópico
    //           descricaosubTopico: req.body.id_topico[0].subTopico[1].descricaosubTopico, // Descrição do Subtópico
    //         },
    //       ],
    //     },





    //     {
    //       idTopico: req.body.id_topico[1].idTopico, // ID do Tópico
    //       nomeTopico: req.body.id_topico[1].nomeTopico, // Nome do Tópico
    //       descricaoTopico: req.body.id_topico[1].descricaoTopico, // Descrição do Tópico
    //       foto: req.body.id_topico[1].foto, // Foto do Tópico
          
    //       subTopico: [
    //         {
    //           idSubTopico: req.body.id_topico[1].subTopico[0].idSubTopico, // ID do Subtópico
    //           nomesubTopico: req.body.id_topico[1].subTopico[0].nomesubTopico, // Nome do Subtópico
    //           descricaosubTopico: req.body.id_topico[1].subTopico[0].descricaosubTopico, // Descrição do Subtópico
    //         },
    //         // Se houver mais subcampos, você pode adicioná-los aqui
    //       ],
    //     },



    //   ],
      
      
    // });

    // req.body.id_topico.forEach((form) => {
    //   postAlimento.id_topico.push({
    //     idTopico: form.idTopico,
    //     nomeTopico: form.nomeTopico,
    //     descricaoTopico: form.descricaoTopico,
    //     foto: form.foto,
    //     subTopico: form.subTopico.map((st) => ({
    //       idSubTopico: st.idSubTopico,
    //       nomesubTopico: st.nomesubTopico,
    //       descricaosubTopico: st.descricaosubTopico,
    //     })),
    //   });
    // });

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





























// // Rota para atualizar um contato por ID
// router.put('/:id', getContato, async (req, res) => {
//   if (req.body.nome != null) {
//     res.contato.nome = req.body.nome;
//   }
//   if (req.body.email != null) {
//     res.contato.email = req.body.email;
//   }
//   if (req.body.telefone != null) {
//     res.contato.telefone = req.body.telefone;
//   }
//   if (req.body.endereco != null) {
//     res.contato.endereco = req.body.endereco;
//   }
//   if (req.body.foto != null) {
//     res.contato.foto = req.body.foto;
//   }

//   try {
//     const updatedContato = await res.contato.save();
//     res.json(updatedContato);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });


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

















// // Rota para excluir um contato por ID
// router.delete('/:id', getContato, async (req, res) => {
//   try {
//     await res.contato.remove();
//     res.json({ message: 'PostAlimento excluído com sucesso!' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });




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



// async function getContato(req, res, next) {
//   try {
//     const contato = await PostAlimento.findById(req.params.id);
//     if (contato == null) {
//       return res.status(404).json({ message: 'PostAlimento não encontrado' });
//     }
//     res.contato = contato;
//     next();
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// }



module.exports = router;
