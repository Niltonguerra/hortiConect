const request = require('supertest');
const app = require('../app'); // Certifique-se de que o caminho esteja correto


describe('Testes de criação de registro na collection Alimentos', () => {

  it('Deve criar um requistro em alimentos)', async () => {
    const PostAlimento = require('../models/postAlimento');
  
    // esssa variavel é destinada a trocar o nome do registro, para facilitar na criação de novos registros par teste.
    const nomeRegistro = "Giló"

    const newContact = {
      nome: nomeRegistro,
      tipoDoAlimento: "vegetal",
      nomeCientifico: "Daucus carota",
      descricaoVegetal: "A cenoura é uma raiz comum de cor laranja, rica em vitamina A e fibras, conhecida por seu sabor doce e versatilidade culinária.",
      id_topico: 
      [
        {
          idTopico: 0,  // Substitua pelo valor desejado (número inteiro)
          nomeTopico: "Curiosidades",
          descricaoTopico: "Nessa sessão iremos tratar de algumas curiosidades da cenoura",
          foto: {
            imagem_grande:{
              filename: "carrot.jpg",
              name: "carrot",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/TrkFqQx/carrot.jpg",
            },
            imagem_media:{
              filename: "carrot.jpg",
              name: "carrot",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/KmX3ztp/carrot.jpg",
            },
            imagem_pequena:{
              filename: "carrot.jpg",
              name: "carrot",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/Ws6Ypr4/carrot.jpg",
            },
            excluir: "https://ibb.co/Ws6Ypr4/ce1a07a4b60cc3932bacd9256abccd3d",
          }, 
          subTopico: 
          [
            {
              idSubTopico: 0, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Variedade de Cores",
              descricaosubTopico: "Embora a cenoura alaranjada seja a mais comum, elas também podem ser encontradas em outras cores, como roxo, amarelo e branco. Essas variações de cor têm diferentes compostos antioxidantes e nutrientes.",
            },
            
            {
              idSubTopico: 1, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Origem",
              descricaosubTopico: "As cenouras têm uma longa história de cultivo, com origens que remontam a cerca de 5.000 anos na região que hoje é o Afeganistão. Elas eram originalmente cultivadas por suas folhas e sementes, em vez de suas raízes.",
            },
            
            
            {
              idSubTopico: 2, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Vitamina A Rica",
              descricaosubTopico: "Cenouras são conhecidas por serem uma excelente fonte de vitamina A, que é importante para a saúde da visão, crescimento celular e imunidade.",
            },
            
            
            {
              idSubTopico: 3, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Nutrientes e Benefícios",
              descricaosubTopico: "Além da vitamina A, cenouras contêm fibras, vitamina K, potássio e antioxidantes como o betacaroteno. Esses nutrientes podem ajudar a manter a saúde ocular, a pele e o sistema imunológico.",
            },
            
            
            { 
              idSubTopico: 4, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Ajuda à Visão",
              descricaosubTopico: " Embora a ideia de que cenouras melhoram a visão seja parcialmente um mito, elas contêm betacaroteno,que é convertido em vitamina A no corpo e pode contribuir para a saúde ocular. ",
            },
            
            {
              idSubTopico: 5, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Lenda da Vitamina A",
              descricaosubTopico: "Durante a Segunda Guerra Mundial, os britânicos promoveram a ideia de que seus pilotos de caça tinham uma visão excepcional devido ao consumo de cenouras, como forma de esconder o uso de radares para localização de aeronaves inimigas.",
            },
            
            {
              idSubTopico: 6, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Versatilidade na Culinária",
              descricaosubTopico: "Cenouras podem ser consumidas cruas, cozidas, assadas, em sopas, purês e até mesmo em sucos. Sua doçura natural as torna um ingrediente versátil em várias receitas.",
            },
            
            {
              idSubTopico: 7, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Cenouras Baby",
              descricaosubTopico: "Cenouras baby são variedades jovens e pequenas da raiz. Elas são frequentemente colhidas antes de atingirem o tamanho total e são adoradas por seu sabor adocicado e tamanho conveniente.",
            },
            
            {
              idSubTopico: 8, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Valor Nutricional das Folhas",
              descricaosubTopico: "As folhas verdes da cenoura também são comestíveis e nutritivas, mas muitas vezes são negligenciadas. Elas contêm nutrientes como vitamina K, cálcio e ferro.",
            },
            
            {
              idSubTopico: 9, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Armazenamento Duradouro",
              descricaosubTopico: "Cenouras podem ser armazenadas por um longo período, especialmente se mantidas em um local fresco e úmido. Isso é possível devido à pele protetora que cobre a raiz",
            },
            
            {
              idSubTopico: 10, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Agricultura Sustentável",
              descricaosubTopico: "Cenouras são consideradas um cultivo sustentável, pois podem ser cultivadas durante grande parte do ano e podem ser armazenadas sem perder muitos nutrientes.",
            },

            {
              idSubTopico: 11, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Crescimento Subterrâneo",
              descricaosubTopico: "A parte comestível da cenoura é a raiz, que cresce abaixo do solo. Elas são cultivadas em diferentes tamanhos e formatos, dependendo da variedade.",
            },
            
          ]
        },
        {
          idTopico: 0,  // Substitua pelo valor desejado (número inteiro)
          nomeTopico: "Beneficios",
          descricaoTopico: "Nessa sessão iremos tratar dos beneficios da cenoura",
          foto: {
            imagem_grande:{
              filename: "carrot-Earth.jpg",
              name: "carrot-Earth",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/BGsbd96/carrot-Earth.jpg",
            },
            imagem_media:{
              filename: "carrot-Earth.jpg",
              name: "carrot-Earth",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/pQXcGSK/carrot-Earth.jpg",
            },
            imagem_pequena:{
              filename: "carrot-Earth.jpg",
              name: "carrot-Earth",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/f90fBsN/carrot-Earth.jpg",
            },
            excluir: "https://ibb.co/f90fBsN/073125542629853a3a4c200baeb8fa53",
          },
          subTopico: 
          [
            {
              idSubTopico: 0, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Saúde Visual",
              descricaosubTopico: "As cenouras são ricas em betacarotenos, que são convertidos em vitamina A no corpo. A vitamina A é essencial para a saúde dos olhos, incluindo a visão noturna e a saúde da retina.",
            },
            {
              idSubTopico: 1, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Antioxidantes",
              descricaosubTopico: "Cenouras contêm antioxidantes como o betacaroteno e a vitamina C, que ajudam a combater os danos causados pelos radicais livres, auxiliando na prevenção de doenças crônicas.",
            },
            {
              idSubTopico: 2, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Saúde da Pele",
              descricaosubTopico: "Os antioxidantes presentes nas cenouras também contribuem para a saúde da pele, ajudando a prevenir o envelhecimento precoce e mantendo a pele saudável.",
            },
            {
              idSubTopico: 3, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Melhoria da Imunidade",
              descricaosubTopico: "A vitamina C encontrada nas cenouras desempenha um papel importante no fortalecimento do sistema imunológico, auxiliando na proteção contra infecções.",
            },
            {
              idSubTopico: 4, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Saúde Cardiovascular",
              descricaosubTopico: "Os antioxidantes e fibras das cenouras podem ajudar a reduzir o risco de doenças cardiovasculares, regulando os níveis de colesterol e a pressão arterial.",
            },
            {
              idSubTopico: 5, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Digestão",
              descricaosubTopico: "Cenouras são ricas em fibras alimentares, que são benéficas para a saúde digestiva, promovendo a regularidade intestinal e a saúde do trato gastrointestinal.",
            },
            {
              idSubTopico: 6, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Hidratação",
              descricaosubTopico: "Devido ao seu alto teor de água, as cenouras podem ajudar na hidratação do corpo, especialmente em climas quentes ou durante a prática de atividades físicas.",
            },
            {
              idSubTopico: 7, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Regulação do Açúcar no Sangue",
              descricaosubTopico: "O consumo de cenouras pode ajudar a regular os níveis de açúcar no sangue devido ao seu teor de fibras e baixo índice glicêmico.",
            },
            {
              idSubTopico: 8, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Cuidado com os Dentes",
              descricaosubTopico: "Roer cenouras cruas pode ajudar a estimular a produção de saliva, o que é benéfico para a saúde bucal e pode auxiliar na prevenção da cárie dentária.",
            },
            {
              idSubTopico: 9, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Promoção da Saciedade",
              descricaosubTopico: "As fibras presentes nas cenouras podem ajudar a promover a saciedade, o que pode ser útil para o controle do peso.",
            },
          ]
        },
        {
          idTopico: 0,  // Substitua pelo valor desejado (número inteiro)
          nomeTopico: "Fatos históricos",
          descricaoTopico: "Nessa sessão iremos tratar de da presença da cenoura na história humana",
          foto: {
            imagem_grande:{
              filename: "carrotplant.jpg",
              name: "carrotplant",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/TqyP0Kv/carrotplant.jpg",
            },
            imagem_media:{
              filename: "carrotplant.jpg",
              name: "carrotplant",
              mime: "image/jpeg",
              extension: "jpg",
              url:"https://i.ibb.co/0V5Y9BD/carrotplant.jpg",
            },
            imagem_pequena:{
              filename: "carrotplant.jpg",
              name: "carrotplant",
              mime: "image/jpeg",
              extension: "jpg",
              url: "https://i.ibb.co/Qj0YH8b/carrotplant.jpg",
            },
            excluir: "https://ibb.co/Qj0YH8b/c6ff33a468f5fa425e6b7239c390d393",
          },
          subTopico: 
          [
            {
              idSubTopico: 0, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Origem na Ásia",
              descricaosubTopico: "As cenouras são cultivadas há milênios. Acredita-se que sua origem remonta ao Afeganistão e às regiões circundantes. As primeiras cenouras não se assemelhavam muito às variedades modernas; elas eram provavelmente mais finas e roxas.",
            },
            {
              idSubTopico: 1, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Cultivo na Europa",
              descricaosubTopico: "As cenouras foram gradualmente introduzidas em diferentes partes do mundo. No início, as cenouras eram mais valorizadas por suas folhas e sementes do que pela raiz. Os romanos e os gregos antigos conheciam e consumiam cenouras.",
            },
            {
              idSubTopico: 2, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Evolução das Cores",
              descricaosubTopico: "Inicialmente, as cenouras eram de cores variadas, incluindo branco, amarelo e roxo. A cenoura alaranjada que conhecemos hoje é o resultado de cruzamentos seletivos feitos na Holanda no século XVII. A seleção foi feita para homogeneizar a cor laranja em homenagem à Casa de Orange-Nassau, uma família real holandesa.",
            },
            {
              idSubTopico: 3, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Popularização",
              descricaosubTopico: "A variedade de cenoura alaranjada rapidamente se tornou popular, não apenas por seu sabor, mas também por suas propriedades nutricionais. A cor alaranjada é devida aos carotenoides, especialmente ao betacaroteno, que é convertido em vitamina A no organismo",
            },
            {
              idSubTopico: 4, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Nutrição e Saúde",
              descricaosubTopico: "As cenouras são conhecidas por serem ricas em antioxidantes, fibras, vitaminas e minerais. O betacaroteno é especialmente importante para a saúde dos olhos e da pele.",
            },
            {
              idSubTopico: 5, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Cultivo Global",
              descricaosubTopico: "Hoje, as cenouras são cultivadas em todo o mundo, em uma variedade de climas e solos.Elas são uma parte essencial da culinária e podem ser consumidas cruas, cozidas, em sopas, saladas, sucos e muito mais.",
            },
            {
              idSubTopico: 6, // Substitua pelo valor desejado (número inteiro)
              nomesubTopico: "Cenoura na Cultura Pop",
              descricaosubTopico: "A cenoura também tem um lugar na cultura popular. Ela é frequentemente associada à ideia de melhorar a visão (graças ao betacaroteno) e é um alimento popular para personagens de desenhos animados, como o coelho Pernalonga da Warner Bros.",
            },
          ]
        }
      ]
      
    
    };
  
    const response = await request(app)
      .post('/alimentos')
      .send(newContact);
  
    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty('_id');
  });
  

});
