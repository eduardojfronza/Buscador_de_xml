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

  // Iterar sobre os elementos <item> e imprimir os valores dentro de <wp:postmeta> com <wp:meta_key> igual a '_yoast_wpseo_focuskw'
  channel.item.forEach((item, index) => {
    const postMeta = item['wp:postmeta'];
    const focusKeyword = extractFocusKeyword(postMeta);
    console.log(`Item ${index + 1} - _yoast_wpseo_focuskw: ${focusKeyword}`);
  });
});

// Função para extrair o conteúdo dentro de <wp:postmeta> com <wp:meta_key> igual a '_yoast_wpseo_focuskw'
function extractFocusKeyword(postMeta) {
  if (!postMeta) return null;

  const focusMeta = postMeta.find(meta => meta['wp:meta_key'] === '_yoast_wpseo_focuskw');
  return focusMeta ? extractCDATA(focusMeta['wp:meta_value']) : null;
}

// Função para extrair conteúdo de CDATA
function extractCDATA(value) {
  if (value && value._ && value._.startsWith('<![CDATA[') && value._.endsWith(']]>')) {
    return value._.substring(9, value._.length - 3);
  }
  return value;
}
