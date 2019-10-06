import React from 'react';

function Resultado({resultado}){
    
    if(Object.keys(resultado).length === 0){
        return null;
    }
    
    return(
        <div className="resultado">
            <h1>Resultado</h1>
            <p className="precio">El precio es: <span>{resultado.PRICE}</span></p>
            <p>Precio más alto del día: <span>{resultado.HIGHDAY}</span></p>
            <p>Precio más bajo del día: <span>{resultado.LOWDAY}</span></p>
            <p>Variación últimas 24 horas: <span>{resultado.CHANGEPCT24HOUR} % </span></p>
            <p>última actualización: <span>{resultado.LASTUPDATE}</span></p>
        </div>
    )
}

export default Resultado;