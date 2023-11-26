import { useState } from 'react'
import styled from '@emotion/styled'


const Label = styled.label`
    font-family: 'Lato', sans-serif;
    color: #FFF;
    font-weight: 700;
    font-size: 20px;
    margin-top: 30px;
    display: block;
`
const Select = styled.select`
    width: 100%;
    font-size: 18px;
    padding: 14px;
    border-radius: 10px;
`

const useSelectMonedas = (label,opciones) => {

    const [state, setState] = useState('') //inicializar el estado, en este caso vacio

    const selectMonedas = () => ( //dar por implicito el return en esta funcion
        <>
            <Label>{label}</Label>
            <Select
                value={state}
                onChange={e => setState(e.target.value)}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
                ))}
            </Select>
        </>
    )

  return (
    [
        state,
        selectMonedas
    ]
  )
}

export default useSelectMonedas