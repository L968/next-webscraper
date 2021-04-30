const tabletojson = require('tabletojson').Tabletojson;

export default async (request, response) => {
    const tables = await tabletojson.convertUrl('http://www.sinprapar.com.br/PREV.HTM');
    let table = tables[1];

    table = table.filter(row => (
           row.Tipo !== 'TQ'
        && row.Tipo !== 'TG'
        && !row.Manobra.includes('FOSPAR')
        && !row.Manobra.includes('PFELIX')
        && !row.Manobra.startsWith('EF')
    ));

    for (const row of table) {
        let x = row.Manobra.split(' ');

        if (x.length > 2) {
            if (x[2].length === 2) {
                x.splice(2, 1);
            }
        }

        if (x.length > 1) {
            let y = x[1].split('/');

            if (y.length > 1) {
                x[1] = y[1];
            }
        }

        row.Manobra = x.join(' ');
    }

    response.setHeader('Cache-Control', 's-maxage=120, stale-while-revalidate');
    response.status(200).json(table);
}