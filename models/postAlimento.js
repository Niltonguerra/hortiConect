const mongoose = require('mongoose');




const subTopicoSchema = new mongoose.Schema({
  idSubTopico: {
    type: Number,
  },
  nomesubTopico: {
    type: String,
  },
  descricaosubTopico: {
    type: String,
  },
});











const topicoSchema = new mongoose.Schema({
  idTopico: {
    type: Number,
  
  
  // Defina um valor padrão (por exemplo, null) se necessário
  // para corresponder ao seu modelo de tipagem no frontend.
  // Se não houver valor padrão, pode ser undefined quando não especificado no frontend.
  // Consulte o seu modelo de tipagem no frontend para definir isso corretamente.
  },
  nomeTopico: {
    type: String,
    
  },
  descricaoTopico: {
    type: String,
    
  },
  foto: {
    type: String,
    
  },
  subTopico: [subTopicoSchema],
});










const postAlimentoSchema = new mongoose.Schema({
  Nome: {
    type: String,
    
  },
  tipoDoAlimento: {
    type: String,
    
  },
  nomeCientifico: {
    type: String,
  },


  id_topico: [topicoSchema],
});

const PostAlimento = mongoose.model('PostAlimento', postAlimentoSchema);

module.exports = PostAlimento;