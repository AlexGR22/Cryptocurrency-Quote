import { useState, useEffect } from 'react'
import axios from 'axios';
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
   font-family: 'Lato', sans-serif;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    /* background-color: #66A2FE; */
    background-color: #FE6666;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState([])
  const [cotizacion, setCotizacion] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if (Object.keys(monedas).length > 0) {
      const cotizar = async () => {
        setCargando(true)
        setCotizacion({})// es para resetear el objeto y nose vea por ejemplo mal la imagen o mal el resultado mientras se carga la cotizacion nueva
        const { stateMoneda, stateCrypto } = monedas

        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${stateCrypto}&tsyms=${stateMoneda}`
        
        // const respuesta = await fetch(url)
        // const resultado = await respuesta.json()
        try{
        const respuesta = await axios.get(url);
        const resultado = respuesta.data;
        setCotizacion(resultado.DISPLAY[stateCrypto][stateMoneda])
        
      }catch(error){
        console.log(error);
      }

      setCargando(false)
       
      }
      cotizar()
    }
  }, [monedas])


  return (
    <Contenedor>

      
      <div>
        <Heading>Cryptocurrency Quote Generator</Heading>
        <Formulario setMonedas={setMonedas} />
        {cargando && <Spinner />}
        {cotizacion.PRICE && <Resultado cotizacion={cotizacion} />}  {/* para que se envie un valor thruty o falsy  no puede ser un objeto, tiene que ser una propiedad en especifico */}
      </div>
      <Imagen
        src={imagenCripto}
        alt="Criptomonedas"
      />

    </Contenedor>
  )
}

export default App
