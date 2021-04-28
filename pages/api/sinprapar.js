const tabletojson = require('tabletojson').Tabletojson;

export default async (request, response) => {
    const tables = await tabletojson.convertUrl('http://www.sinprapar.com.br/PREV.HTM');

    response.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate');
    response.status(200).json(tables[1]);
}