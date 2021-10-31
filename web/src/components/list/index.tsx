import React, { useState } from 'react'
import {
  SubmitItemButton,
  SubmitItemButtonDiv,
  ListItemTextArea,
  ListItemDetails,
  ListItemComponent,
  ItemComposerDiv,
  AddItemButtonSpan,
  AddItemButtonDiv,
  ItemsContainer,
  ListTitle,
  ListHeader,
  WrappedList,
  Wrapper
} from './style'
import CardI from '../../types/card'
import BoardI from '../../types/board'
import SectionI from '../../types/section'
import Item from '../item/index'

type ItemsListType = BoardI[] | SectionI[]
type ItemType = BoardI | SectionI | CardI
type AcceptedTypes = 'board' | 'card'

const List = ({
  typeName,
  itemsList,
  onItemSubmit,
  onClick
}: {
  typeName: AcceptedTypes
  itemsList: ItemsListType
  onItemSubmit: Function
  onClick: Function
}) => {
  const [isTempItemActive, setIsTempItemActive] = useState(false)
  const [itemText, setItemText] = useState('')

  let selectItem = (item_id: number) => {
    return item_id
  }

  return (
    <Wrapper>
      <WrappedList>
        <ListHeader>
          <ListTitle>{typeName + 's'}</ListTitle>
        </ListHeader>
        <ItemsContainer>
          {itemsList.length &&
            itemsList.map((item: ItemType) => {
              return <Item key={item.id} item={item} onClick={() => selectItem(item.id)}></Item>
            })}
        </ItemsContainer>
        {isTempItemActive ? (
          <ItemComposerDiv>
            <ListItemComponent>
              <ListItemDetails>
                <ListItemTextArea
                  placeholder='Enter a title for the new Item'
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setItemText(e.target.value)
                  }
                />
              </ListItemDetails>
            </ListItemComponent>
            <SubmitItemButtonDiv>
              <SubmitItemButton
                type='button'
                value={itemText ? 'Add ' + typeName : 'Close'}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()

                  if (itemText) {
                    onItemSubmit(itemText)
                  }
                  setIsTempItemActive(false)
                }}
              />
            </SubmitItemButtonDiv>
          </ItemComposerDiv>
        ) : (
          <AddItemButtonDiv onClick={() => setIsTempItemActive(true)}>
            <AddItemButtonSpan>Add another</AddItemButtonSpan>
          </AddItemButtonDiv>
        )}
      </WrappedList>
    </Wrapper>
  )
}

export default List
