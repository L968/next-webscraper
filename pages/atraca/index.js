import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.css';

export default function Lineup() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadData() {
            const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            let { data } = await axios.get(url + '/api/atraca');
            data.sort((a,b)=>a.Nr_2.localeCompare(b.Nr_2))
            setData(data);
        }

        loadData();
    }, []);

    return (
        <div>
            <table cellPadding='10' style={{ borderCollapse: 'collapse', fontSize: '10px', tableLayout: 'auto', minWidth: '10px' }}>
                <thead style={{ backgroundColor: '#da221a', color: '#ffffff' }}>
                    <tr>
                        <th className={styles.border}>Berço</th>
                        <th className={styles.border}>Nome</th>
                        <th className={styles.border}>Tipo</th>
                        <th className={styles.border}>Saída</th>
                        <th className={styles.border}>Hora</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(function(row) {
                        if (row.Nr_2.length===6){
                            row.Nr_2 = row.Nr_2.slice(0,-2)
                        }
                        return (
                            <tr key={row.Navio} style={{ }}>
                                <td className={styles.border}>{row.Nr_2}</td>
                                <td className={styles.border}>{row.Bandeira_2}</td>
                                <td className={styles.border}>{row.Indicativo_2}</td>
                                <td className={styles.border}>{row.Para_2}</td>
                                <td className={styles.border}>{row['14']}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}