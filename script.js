const fs = require('fs');
const parser = require('xml2js').parseString;

// Ler o arquivo XML
const xmlData = fs.readFileSync('wordpress.xml', 'utf-8');

// Parse do XML para JavaScript
parser(xmlData, (err, result) => {
  if (err) {
    console.error('Erro ao analisar XML:', err);
    return;
  }

  // A estrutura de dados resultante é um objeto JavaScript
  const channel = result.rss.channel[0];

  // Extrair e imprimir os títulos
  const titles = channel.item.map(item => item.title[0]);
  console.log('Titles:', titles);
});
