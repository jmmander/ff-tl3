import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import SectionI from './types/section'
import BoardI from './types/board'
import List from './components/list'

import './App.css'
import React from 'react'

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  padding: 5px;
  align-items: flex-start;
  flex-wrap: wrap;
`
export const ActiveBoardView = styled.div`
  border: 2px solid white;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.1);
`
export const ActiveBoardTitle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 2em;
`

export const BoardError = styled.div`
  color: orange;
`

function App() {
  const [boards, setBoards] = useState<BoardI[]>([])
  const [activeBoard, setActiveBoard] = useState<BoardI>(boards[0])
  const [boardError, setBoardError] = useState<string>('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/boards')
      .then((response) => {
        setBoards(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (!activeBoard) {
      setBoardError('No board selected')
    } else {
      setBoardError('')
    }
  }, [activeBoard])

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    })
      .then((response) => {
        let activeBoardClone: BoardI = activeBoard
        let sections: SectionI[] = [...activeBoardClone.sections]
        for (let i = 0; i < activeBoardClone.sections.length; i++) {
          let section: SectionI = sections[i]
          if (section.id === sectionId) {
            section.cards.push({
              id: response.data.id,
              title: response.data.title,
              section_id: sectionId
            })
            setActiveBoard(activeBoardClone)
            setBoards(
              boards.map((board) => (board.id === activeBoardClone.id ? activeBoardClone : board))
            )
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleBoardClick = (board_id: number) => {
    const selected_board: BoardI = boards.filter((board) => board.id === board_id)[0]
    setActiveBoard(selected_board)
  }

  const handleCardClick = () => {
    //to be implemented as part of card details
    console.log('i clicked a card')
  }

  const onBoardSubmit = (id: number, title: string) => {
    boards.find((board: BoardI) => {
      return board.title.toLowerCase() === title.toLowerCase()
    })
      ? setBoardError('The board name must be unique. Please try another name.')
      : axios({
          method: 'post',
          url: 'http://localhost:3001/boards',
          data: { title }
        })
          .then((response) => {
            let boardsClone: BoardI[] = [...boards]
            boardsClone.push({
              id: response.data.id,
              title: response.data.title,
              sections: response.data.sections
            })
            setBoards(boardsClone)
          })
          .catch((error) => {
            console.log(error)
          })
  }

  return (
    <React.Fragment>
      <PageContainer>
        <List
          itemsList={boards}
          typeName='board'
          onItemSubmit={onBoardSubmit}
          handleSelect={handleBoardClick}
          title='Your Boards'
          id={-1}
        ></List>
      </PageContainer>
      <PageContainer>
        {!!activeBoard && !!activeBoard.sections.length && (
          <ActiveBoardView>
            <ActiveBoardTitle>{activeBoard.title}</ActiveBoardTitle>
            {activeBoard.sections.map((section: SectionI) => {
              return (
                <List
                  itemsList={section.cards}
                  typeName='card'
                  onItemSubmit={onCardSubmit}
                  handleSelect={handleCardClick}
                  title={section.title}
                  id={section.id}
                ></List>
              )
            })}
          </ActiveBoardView>
        )}
        {!!boardError && <BoardError>{boardError}</BoardError>}
      </PageContainer>
    </React.Fragment>
  )
}

export default App
