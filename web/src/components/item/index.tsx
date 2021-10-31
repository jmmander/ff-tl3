import styled from 'styled-components'
import BoardI from '../../types/board'
import SectionI from '../../types/section'
import CardI from '../../types/card'

const ItemContainer = styled.div`
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
type ItemType = BoardI | CardI | SectionI

const ItemTitle = styled.div``

const Item = ({ item: { id, title, items }, onClick }: { item: ItemType; onClick: Function }) => {
  return (
    <ItemContainer>
      <ItemTitle>{title}</ItemTitle>
    </ItemContainer>
  )
}

export default Item
