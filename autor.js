const fs = require('fs');
const parser = require('xml2js').parseString;

// Ler o arquivo XML
const xmlData = fs.readFileSync('wordpress.xml', 'utf-8');

// Parse do XML para JavaScript
parser(xmlData, { explicitArray: false, ignoreAttrs: true }, (err, result) => {
  if (err) {
    console.error('Erro ao analisar XML:', err);
    return;
  }

  // A estrutura de dados resultante é um objeto JavaScript
  const channel = result.rss.channel;

  // Iterar sobre os elementos <item> e imprimir os wp:post_date_gmt
  channel.item.forEach((item, index) => {
    const postDateGMT = item['dc:creator'];
    console.log(`${postDateGMT}`);
  });
});
