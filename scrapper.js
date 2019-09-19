
const cheerio = require('cheerio');
const rp = require('request-promise');

const url = `http://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg`;

exports.scrapper = function() {
  return rp(url).then((html) => {
    const $ = cheerio.load(html);
    const arr = []
    $('.table-responsive tbody tr td')
    .each(function(i, elem) {
      arr.push($(this).html())
    })
    .html();
  
    // Normalize array to object
    const normalized = [];
    let i;
    for (i = 0; i< arr.length; i += 7) {
      normalized.push({
        no: arr[i],
        waktu: arr[i+1].replace('<br>', ''),
        lintang: arr[i+2],
        bujur: arr[i+3],
        magnitudo: arr[i+4],
        kedalaman: arr[i+5],
        wilayah: arr[i+6],
      })
    }

    return normalized;
  })
}