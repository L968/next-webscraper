const tabletojson = require('tabletojson').Tabletojson;

export default async (request, response) => {
    const tables = await tabletojson.convertUrl('http://www.sinprapar.com.br/ATRAC.HTM');
    let table = tables[1];

    table = table.filter(row => (
        row.Indicativo_2 !== 'TQ'
     && row.Indicativo_2 !== 'TG'
     && !row.Nr_2.includes('FOSPAR INT')
     && !row.Nr_2.includes('FOSPAR EXT')
     && !row.Nr_2.includes('PFELIX 1')
     && !row.Nr_2.includes('PFELIX 2')
 ));

    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    response.status(200).json(table);
}