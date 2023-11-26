import styled from "@emotion/styled"

const Texto = styled.p`
    background-color: #B7322C;
    color: #FFF;
    padding: 15px;
    font-size: 15px;
    text-transform: uppercase;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
`

const Error = ({ children }) => {
  return (
    <Texto>
      {children}
    </Texto>
  )
}

export default Error