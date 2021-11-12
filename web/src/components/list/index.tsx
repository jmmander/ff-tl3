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

type ItemsListType = BoardI[] | CardI[]
type ItemType = BoardI | SectionI | CardI
type AcceptedTypes = 'board' | 'card'

const List = ({
  typeName,
  itemsList,
  onItemSubmit,
  handleSelect,
  title,
  id
}: {
  typeName: AcceptedTypes
  itemsList: ItemsListType
  onItemSubmit: Function
  handleSelect: Function
  title: string
  id: number
}) => {
  const [isTempItemActive, setIsTempItemActive] = useState(false)
  const [itemText, setItemText] = useState('')

  return (
    <Wrapper>
      <WrappedList>
        <ListHeader>
          <ListTitle>{title}</ListTitle>
        </ListHeader>
        <ItemsContainer>
          {itemsList &&
            !!itemsList.length &&
            itemsList.map((item: ItemType) => {
              return <Item key={item.id} item={item} handleSelect={handleSelect}></Item>
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
                    onItemSubmit(id, itemText)
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
