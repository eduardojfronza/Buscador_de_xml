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
  const items = result.rss.channel[0].item;

  // Iterar sobre os itens
  items.forEach(item => {
    const contentEncoded = item['content:encoded'][0];
    
    // Encontrar todas as ocorrências de <!-- wp:paragraph -->
    const paragraphs = contentEncoded.split('<!-- wp:paragraph -->');
    
    // Iterar sobre os parágrafos e imprimir o número e conteúdo
    paragraphs.forEach((paragraph, index) => {
      const paragraphNumber = index + 1;
      console.log(`Paragraph ${paragraphNumber}: ${paragraph.trim()} \n`);
    });
  });
});
