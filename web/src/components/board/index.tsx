import styled from 'styled-components'
import BoardI from '../../types/board'

const CardContainer = styled.div`
  border-radius: 3px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  position: relative;
  padding: 10px;
  cursor: pointer;
  max-width: 250px;
  margin-bottom: 7px;
  min-width: 230px;
`

const CardTitle = styled.div``

const Board = ({ board: { id, name } }: { board: BoardI }) => {
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
    </CardContainer>
  )
}

export default Board
