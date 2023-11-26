import { useState, useEffect } from 'react'
import axios from 'axios'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import Error from './Error'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    /* background-color: #9497ff; */
    background-color: #E05151;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        /* background-color: #7a7dfe; */
        background-color: #D43F3F;
        cursor: pointer;
    }
`


// eslint-disable-next-line react/prop-types
const Formulario = ({ setMonedas }) => {

    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)// si es booleano no se renderiza, si es un objeto si se renderiza aunque sea false o vacio

    const [stateMoneda, SelectMonedas] = useSelectMonedas('Select a currency', monedas)
    const [stateCrypto, SelectCrypto] = useSelectMonedas('Select a cryptocurrency', criptos)

    // 

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=${stateMoneda}`

            try {
                const respuesta = await axios.get(url);
                const resultado = respuesta.data;

                const arrayCriptos = resultado.Data.map(cripto => {
                    const objeto = {
                        id: cripto.CoinInfo.Name,
                        nombre: cripto.CoinInfo.FullName
                    }

                    return objeto
                })

                setCriptos(arrayCriptos)

            } catch (error) {
                console.log(error);

            }
        }
        consultarAPI()
    }, [stateMoneda])

    const handleSubmit = e => {
        e.preventDefault()
        if ([stateCrypto, stateMoneda].includes('')) {
            setError(true)
            // alert('Todos los campos son obligatorios')
            return
        }

        setError(false)

        setMonedas({
            stateCrypto,
            stateMoneda
        })

    }

    return (
        <>
            {error && <Error>All fields are mandatory</Error>}
            <form
                onSubmit={handleSubmit}
            >

                <SelectMonedas />
                <SelectCrypto />

                <InputSubmit
                    type='submit'
                    value='Get Quote'
                />
            </form>
        </>
    )
}

export default Formulario