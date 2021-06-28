import { useState, useEffect } from 'react';

import axios from 'axios';
import styles from './style.module.css';

export default function Lineup() {
    const [data, setData] = useState([[], [],  [], [], []]);

    useEffect(() => {
        async function loadData() {
            const url = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
            const { data } = await axios.get(url + '/api/lineup');

            setData(data);
        }

        loadData();
    }, []);

    return (
        <div>
            <table cellPadding='10' cellSpacing='0' className={styles.table}>
                <thead>
                    <tr className={styles.first_header}>
                        <th colSpan='8'>ATRACADOS</th>
                    </tr>
                    <tr>
                        <th>Berço</th>
                        <th>Embarcação</th>
                        <th>Operador</th>
                        <th>Mercadoria</th>
                        <th>Atracação</th>
                        <th>ETS</th>
                        <th>Previsto</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {data[0].map(row => {
                        let className = styles.gray;

                        if (row.Mercadoria.toUpperCase() === 'VEICULOS' || row.Mercadoria.toUpperCase() === 'AUTOMOVEIS') {
                            className = styles.orange;
                        }

                        if (row.Mercadoria.toUpperCase() === 'SOJA' || row.Mercadoria.toUpperCase() === 'FARELO') {
                            className = styles.yellow;
                        } 

                        if (row.Mercadoria.toUpperCase() === 'PASTA') {
                            className = styles.blue;
                        }

                        if (row.Mercadoria.toUpperCase() === 'FERTILIZ.MINER.QUIM.C/NITROGEN') {
                            row.Mercadoria = 'DAP';
                        }
                        if (row.Mercadoria.toUpperCase() === 'OUTS.ACUCARES') {
                            row.Mercadoria = 'AÇÚCAR';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTÊINERES') {
                            row.Mercadoria = 'CONTAINER';
                        }

                        if (row.Mercadoria.toUpperCase() === 'CONTAINER') {
                            className = styles.pink;
                        } 

                        var texto = row.Previsto.split(' ');
                        var posicaoVirgula = texto[0].indexOf(',');

                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }
                        
                        row.Previsto = texto.join(' ');

                        texto = row.Saldo.split(' ');
                        posicaoVirgula = texto[0].indexOf(',');
                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }
                        
                        row.Saldo = texto.join(' ');
                        return (
                            <tr className={className}>
                                <td>{row.Berço}</td>
                                <td>{row.Embarcação}</td>
                                <td>{row.Operador}</td>
                                <td>{row.Mercadoria.toUpperCase() === 'PASTA' ? 'CELULOSE' : row.Mercadoria}</td>
                                <td>{row.Atracação}</td>
                                <td>{row.ETS}</td>
                                <td>{row.Previsto}</td>
                                <td>{row.Saldo}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table cellPadding='10' cellSpacing='0' className={styles.table}>
                <thead>
                    <tr className={styles.first_header}>
                        <th colSpan='8'>PROGRAMADOS</th>
                    </tr>
                    <tr>
                        <th>Berço</th>
                        <th>Embarcação</th>
                        <th>Operador</th>
                        <th>Mercadoria</th>
                        <th>ETB</th>
                        <th>ETS</th>
                        <th>Previsto</th>
                    </tr>
                </thead>
                <tbody>
                    {data[1].map(row => {
                        let className = styles.gray;
                        if (row.Mercadoria.toUpperCase() === 'FERTILIZ.MINER.QUIM.C/NITROGEN') {
                            row.Mercadoria = 'DAP';
                        }
                        if (row.Mercadoria.toUpperCase() === 'VEICULOS' || row.Mercadoria.toUpperCase() === 'AUTOMOVEIS') {
                            className = styles.orange;
                        }

                        if (row.Mercadoria.toUpperCase() === 'SOJA' || row.Mercadoria.toUpperCase() === 'FARELO') {
                            className = styles.yellow;
                        }

                        if (row.Mercadoria.toUpperCase() === 'PASTA') {
                            className = styles.blue;
                        }
                        if (row.Mercadoria.toUpperCase() === 'OUTS.ACUCARES') {
                            row.Mercadoria = 'AÇÚCAR';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTÊINERES') {
                            row.Mercadoria = 'CONTAINER';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTAINER') {
                            className = styles.pink;
                        } 

                        var texto = row.Previsto.split(' ');
                        var posicaoVirgula = texto[0].indexOf(',');

                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }

                        row.Previsto = texto.join(' ');

                        return (
                            <tr className={className}>
                                <td>{row.Berço}</td>
                                <td>{row.Embarcação}</td>
                                <td>{row.Operador}</td>
                                <td>{row.Mercadoria.toUpperCase() === 'PASTA' ? 'CELULOSE' : row.Mercadoria}</td>
                                <td>{row.ETB}</td>
                                <td>{row.ETS}</td>
                                <td>{row.Previsto}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table cellPadding='10' cellSpacing='0' className={styles.table}>
                <thead>
                    <tr className={styles.first_header}>
                        <th colSpan='8'>AO LARGO REATRACAÇÃO</th>
                    </tr>
                    <tr>
                        <th>Berço</th>
                        <th>Embarcação</th>
                        <th>Operador</th>
                        <th>Mercadoria</th>
                        <th>Atracacao</th>
                        <th>ETS</th>
                        <th>Previsto</th>
                        <th>Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {data[2].map(row => {
                        let className = styles.gray;

                        if (row.Mercadoria.toUpperCase() === 'VEICULOS' || row.Mercadoria.toUpperCase() === 'AUTOMOVEIS') {
                            className = styles.orange;
                        }
                        if (row.Mercadoria.toUpperCase() === 'FERTILIZ.MINER.QUIM.C/NITROGEN') {
                            row.Mercadoria = 'DAP';
                        }
                        if (row.Mercadoria.toUpperCase() === 'OUTS.ACUCARES') {
                            row.Mercadoria = 'AÇÚCAR';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTÊINERES') {
                            row.Mercadoria = 'CONTAINER';
                        }
                        
                        if (row.Mercadoria.toUpperCase() === 'CONTAINER') {
                            className = styles.pink;
                        } 

                        if (row.Mercadoria.toUpperCase() === 'SOJA' || row.Mercadoria.toUpperCase() === 'FARELO') {
                            className = styles.yellow;
                        } 
                        if (row.Mercadoria.toUpperCase() === 'PASTA') {
                            className = styles.blue;
                        }

                        var texto = row.Previsto.split(' ');
                        var posicaoVirgula = texto[0].indexOf(',');

                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }

                        row.Previsto = texto.join(' ');

                        return (
                            <tr className={className}>
                                <td>{row.Berço}</td>
                                <td>{row.Embarcação}</td>
                                <td>{row.Operador}</td>
                                <td>{row.Mercadoria.toUpperCase() === 'PASTA' ? 'CELULOSE' : row.Mercadoria}</td>
                                <td>{row.Atracação}</td>
                                <td>{row.ETS}</td>
                                <td>{row.Previsto}</td>
                                <td>{row.Saldo}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <table cellPadding='10' cellSpacing='0' className={styles.table}>
                <thead>
                    <tr className={styles.first_header}>
                        <th colSpan='8'>AO LARGO</th>
                    </tr>
                    <tr>
                        <th>Berço</th>
                        <th>Embarcação</th>
                        <th>Operador</th>
                        <th>Mercadoria</th>
                        <th>ETA</th>
                        <th>ETS</th>
                        <th>Previsto</th>
                    </tr>
                </thead>
                <tbody>
                    {data[3].map(row => {
                        let className = styles.gray;
                        if (row.Mercadoria.toUpperCase() === 'FERTILIZ.MINER.QUIM.C/NITROGEN') {
                            row.Mercadoria = 'DAP';
                        }
                        if (row.Mercadoria.toUpperCase() === 'VEICULOS' || row.Mercadoria.toUpperCase() === 'AUTOMOVEIS') {
                            className = styles.orange;
                        }

                        if (row.Mercadoria.toUpperCase() === 'SOJA' || row.Mercadoria.toUpperCase() === 'FARELO') {
                            className = styles.yellow;
                        } 
                        if (row.Mercadoria.toUpperCase() === 'PASTA') {
                            className = styles.blue;
                        }
                        
                        if (row.Mercadoria.toUpperCase() === 'OUTS.ACUCARES') {
                            row.Mercadoria = 'AÇÚCAR';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTÊINERES') {
                            row.Mercadoria = 'CONTAINER';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTAINER') {
                            className = styles.pink;
                        } 

                        var texto = row.Previsto.split(' ');
                        var posicaoVirgula = texto[0].indexOf(',');

                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }

                        row.Previsto = texto.join(' ');

                        return (
                            <tr className={className}>
                                <td>{row.Berço}</td>
                                <td>{row.Embarcação}</td>
                                <td>{row.Operador}</td>
                                <td>{row.Mercadoria.toUpperCase() === 'PASTA' ? 'CELULOSE' : row.Mercadoria}</td>
                                <td>{row.ETA}</td>
                                <td>{row.ETS}</td>
                                <td>{row.Previsto}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <table cellPadding='10' cellSpacing='0' className={styles.table}>
                <thead>
                    <tr className={styles.first_header}>
                        <th colSpan='8'>ESPERADOS</th>
                    </tr>
                    <tr>
                        <th>Berço</th>
                        <th>Embarcação</th>
                        <th>Operador</th>
                        <th>Mercadoria</th>
                        <th>ETA</th>
                        <th>ETS</th>
                        <th>Previsto</th>
                    </tr>
                </thead>
                <tbody>
                    {data[4].map(row => {
                        let className = styles.gray;

                        if (row.Mercadoria.toUpperCase() === 'VEICULOS' || row.Mercadoria.toUpperCase() === 'AUTOMOVEIS') {
                            className = styles.orange;
                        }
                        if (row.Mercadoria.toUpperCase() === 'FERTILIZ.MINER.QUIM.C/NITROGEN') {
                            row.Mercadoria = 'DAP';
                        }
                        if (row.Mercadoria.toUpperCase() === 'OUTS.ACUCARES') {
                            row.Mercadoria = 'AÇÚCAR';
                        }
                        if (row.Mercadoria.toUpperCase() === 'CONTÊINERES') {
                            row.Mercadoria = 'CONTAINER';
                        }
                        
                        if (row.Mercadoria.toUpperCase() === 'CONTAINER') {
                            className = styles.pink;
                        } 

                        if (row.Mercadoria.toUpperCase() === 'SOJA' || row.Mercadoria.toUpperCase() === 'FARELO') {
                            className = styles.yellow;
                        } 
                        if (row.Mercadoria.toUpperCase() === 'PASTA') {
                            className = styles.blue;
                        }

                        var texto = row.Previsto.split(' ');
                        var posicaoVirgula = texto[0].indexOf(',');

                        if (posicaoVirgula > -1) {
                            texto[0] = texto[0].slice(0, posicaoVirgula);
                        }

                        row.Previsto = texto.join(' ');

                        return (
                            <tr className={className}>
                                <td>{row.Berço}</td>
                                <td>{row.Embarcação}</td>
                                <td>{row.Operador}</td>
                                <td>{row.Mercadoria.toUpperCase() === 'PASTA' ? 'CELULOSE' : row.Mercadoria}</td>
                                <td>{row.ETA}</td>
                                <td>{row.ETS}</td>
                                <td>{row.Previsto}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}