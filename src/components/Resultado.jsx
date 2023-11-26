
import styled from '@emotion/styled'

const ResultadoDiv = styled.div`
    color: #FFF;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
    `

const Texto = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`
const Precio = styled.p`
    font-size: 24px;
    span {
        font-weight: bold;
    }
`
const Imagen = styled.img`
    display: block; //para que no se estire
    max-width: 120px;
    margin: 10px auto;
    `


// eslint-disable-next-line react/prop-types
const Resultado = ({ cotizacion }) => {

    // eslint-disable-next-line react/prop-types
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE } = cotizacion

    return (
        <ResultadoDiv>
            <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="imagen cripto" />
            <div>
            <Precio>The current price is: <span>{PRICE}</span></Precio>
            <Texto>Highest price of the day: <span>{HIGHDAY}</span></Texto>
            <Texto>Lowest price of the day: <span>{LOWDAY}</span></Texto>
            <Texto>Change in the last 24 hours: <span>{CHANGEPCT24HOUR}</span></Texto>
            <Texto>Last update: <span>{LASTUPDATE}</span></Texto>
            </div>
            
        </ResultadoDiv>
    )
}

export default Resultado