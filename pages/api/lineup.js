const tabletojson = require('tabletojson').Tabletojson;

export default async (request, response) => {
    const tables = await tabletojson.convertUrl('http://www.appaweb.appa.pr.gov.br/appaweb/pesquisa.aspx?WCI=relEmitirLineUp');
    let atracados = tables[1];
    let programados = tables[2];
    let aoLargoatracacao = tables[3];
    let aoLargo = tables[4];
    let esperados = tables[5];

    atracados = filterTable(atracados);
    programados = filterTable(programados);
    aoLargoatracacao = filterTable(aoLargoatracacao);
    aoLargo = filterTable(aoLargo);
    esperados = filterTable(esperados);

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    response.status(200).json([atracados, programados, aoLargoatracacao, aoLargo, esperados]);
}

function filterTable(table) {
    table = table.filter(row => row.Berço >= 201);

    for (const row of table) {
        if (row.Operador) {
            row.Operador = row.Operador.split(' ')[0];
        }

        if (row.Mercadoria) {
            row.Mercadoria = row.Mercadoria.split(' ')[0];
        }
    }

    return table;
}