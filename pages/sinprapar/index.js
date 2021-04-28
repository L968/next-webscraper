import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.css';

export default function Lineup() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            const { data } = await axios.get(url + '/api/sinprapar');

            let filteredData = [];

            for (const row of data) {
                if (row.Tipo === 'TQ'
                 || row.Manobra.includes('FOSPAR')
                 || row.Manobra.includes('PFELIX')
                 || row.Manobra.startsWith('EF')) {
                    continue;
                } else {
                    filteredData.push(row);
                }
            }

            setData(filteredData);
        }

        loadData();
    }, []);

    return (
        <div>
            <table cellPadding='10' style={{ borderCollapse: 'collapse', fontSize: '10px', tableLayout: 'auto', minWidth: '10px' }}>
                <thead style={{ backgroundColor: '#da221a', color: '#ffffff' }}>
                    <tr>
                        <th className={styles.border}>Data</th>
                        <th className={styles.border}>Hora</th>
                        <th className={styles.border}>Navio</th>
                        <th className={styles.border}>Manobra</th>
                        <th className={styles.border}>Tipo</th>
                        <th className={styles.border}>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(function(row) {
                        let rowColor = '#fff';
                        let fontColor = '#000';

                        if (row.Situação === 'CONFIRMADA') {
                            rowColor = '#f6fc82';
                        } else if (row.Situação === 'A CONFIRMAR') {
                            rowColor = '#e7cabc';
                        } else if (row.Situação === 'EM ANDAMENTO') {
                            rowColor = '#91f79b';
                        }

                        if (row.Manobra.startsWith('AT')
                         || row.Manobra.startsWith('EA')) {
                            fontColor = '#000fff';
                        }

                        let x = row.Manobra.split(' ');

                        if (x.length > 2) {
                            if (x[2].length === 2) {
                                x.splice(2, 1);
                            }
                        }

                        let y = x[1].split('/');

                        if (y.length > 1) {
                            x[1] = y[1];
                        }

                        const manobra = x.join(' ');

                        return (
                            <tr key={row.Navio} style={{ backgroundColor: rowColor, color: fontColor }}>
                                <td className={styles.border}>{row.Data}</td>
                                <td className={styles.border}>{row.Hora}</td>
                                <td className={styles.border}>{row.Navio}</td>
                                <td className={styles.border}>{manobra}</td>
                                <td className={styles.border}>{row.Tipo}</td>
                                <td className={styles.border}>{row.Situação}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}