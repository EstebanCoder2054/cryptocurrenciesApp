import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import axios from 'axios';
import Resultado from './components/Resultado';

function App() {

const [moneda, guardarMoneda] = useState('');
const [criptomoneda, guardarCriptomoneda] = useState('');
const [loading, guardarLoading] = useState(false);
const [resultado, guardarResultado] = useState({}); 

useEffect( () => {
  
  const cotizarCriptomoneda = async () => {

    //si no hay moneda, no ejecutar aún
    if(moneda === '') return;

    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    const resultado = await axios.get(url);

    //mostrar spinner
    guardarLoading(true);

    //ocultar spinner y mostrar información
    setTimeout(()=>{
      guardarLoading(false);
      guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
    }, 2000);
  }

  cotizarCriptomoneda();
}, [criptomoneda, moneda] );

//mostrar spinner loading o el resultado (componente condicional)
const componente = (loading) ? <Spinner/> : <Resultado resultado={resultado}/>;

  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo" />
        </div>

        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>
          <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
          />

          {/* muestra spinner o la info   */}
          {componente}
        </div>

      </div>
    </div>
  );
}

export default App;
