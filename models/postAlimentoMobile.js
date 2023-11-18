const mongoose = require('mongoose');




const postAlimentoMobileSchema = new mongoose.Schema({
  foto: {
    type: String,
  },
  descricao: {
    type: String,
  },
  nome: {
    type: String,
    
  },
  nomeCientifico: {
    type: String,
  },

  categoria: {
    type: String,
  },
});






const PostAlimentoMobile = mongoose.model('PostAlimentoMobile', postAlimentoMobileSchema);

module.exports = PostAlimentoMobile;