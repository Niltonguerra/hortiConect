const mongoose = require('mongoose');



const receitaSchemaMobile = new mongoose.Schema({
  nome: {
    type: String,
  },
  foto: {
    type: String,
  },
  tempoDePreparo: {
    type: String,
  },
  ingredientes: {
    type: String,
  },
  modoDePreparo: {
    type: String,
  },
});

// Crie o modelo com base no esquema
const ReceitaMobile = mongoose.model('ReceitaMobile', receitaSchemaMobile);

module.exports = ReceitaMobile;