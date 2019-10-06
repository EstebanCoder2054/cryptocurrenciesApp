import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Criptomoneda from '../components/Criptomoneda';
import Error from './Error';

function Formulario({guardarMoneda, guardarCriptomoneda}) {

    const [error, guardarError] = useState(false);
    const [criptoCotizar, guardarCriptoCotizar] = useState(''); 
    const [monedaCotizar, guardarMonedaCotizar] = useState('');
    const [criptomonedas, guardarCriptomonedas] = useState([]);
  
    useEffect( () => {
      const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  
        const resultado = await axios.get(url);
  
        //colocar en el state
        guardarCriptomonedas(resultado.data.Data);
      }
  
      consultarAPI();
    }, [] )

    //validando que el usuario haya llenado ambos campos
    const cotizarMoneda = (e) => {
        e.preventDefault();
        if(monedaCotizar === '' || criptoCotizar === ''){
            guardarError(true);
            return; //el return es para que deje de ejecutar las siguientes líneas
        }

        //si luego el usuario SÍ llena los campos entonces ya no hay error
        guardarError(false);

        //enviar al componente principal
        guardarMoneda(monedaCotizar);
        guardarCriptomoneda(criptoCotizar);
    }

    //mostrar el error en caso de que exista
    const componente = (error) ? <Error mensaje='Ambos campos son obligatorios' /> : null;

    return(

    <form
        onSubmit={cotizarMoneda}
    > 
        {componente}
        <div className="row">
            <label>Elige tu moneda</label>
            <select className="u-full-width"
                    onChange={ (e) => guardarMonedaCotizar(e.target.value) }
            >
                <option value="">- Elige tu moneda -</option>
                <option value="USD">Dolar Estadounidense</option>
                <option value="COP">Peso Colombiano</option>
                <option value="MXN">Peso Mexicano</option>
                <option value="GBP">Libras</option>
                <option value="EUR">Euro</option>
            </select>
        </div>

        <div className="row">
            <label>- Elige tu criptomoneda -</label>
            <select className="u-full-width"
                onChange={ (e) => guardarCriptoCotizar(e.target.value) }
            >
                <option value="">- Elige tu criptomoneda -</option>
                {criptomonedas.map( (criptomoneda) => {
                    return(
                    <Criptomoneda
                        key={criptomoneda.CoinInfo.Id}
                        criptomoneda={criptomoneda}
                    />
                    ) 
                } )}
            </select>
        </div>

        <input type="submit"
                className="button-primary u-full-width"
                value="Calcular"
        />
                

    </form> 
    );

}

export default Formulario;