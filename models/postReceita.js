const mongoose = require('mongoose');




const ingredientesShema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
});

const ModoDePreparoShema = new mongoose.Schema({
  passos: {
    type: String,
    
  },
});



const receitaSchema = new mongoose.Schema({
  nome: {
    type: String,
    
  },
  foto: {
    type: String,
    
  },
  ingredientes: [ingredientesShema],
  modoDePreparo: [ModoDePreparoShema],
});

// Crie o modelo com base no esquema
const Receita = mongoose.model('Receita', receitaSchema);

module.exports = Receita;