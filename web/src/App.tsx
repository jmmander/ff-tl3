import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import SectionI from './types/section'
import BoardI from './types/board'
import List from './components/list'

import './App.css'
import React from 'react'

export const BoardContainer = styled.div`
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
    } else if (!!activeBoard && !activeBoard.sections.length) {
      setBoardError('There is nothing to display. Try adding sections to the board')
    } else {
      setBoardError('')
    }
  }, [activeBoard])

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
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
  }

  const handleBoardClick = (board_id: number) => {
    const selected_board = boards.filter((board) => board.id === board_id)[0]
    setActiveBoard(selected_board)
  }

  const handleCardClick = () => {
    //to be implemented as part of card details
    console.log('i clicked a card')
  }

  const onBoardSubmit = (id: number, title: string) => {
    boards.find((board) => {
      return board.title.toLowerCase() === title.toLowerCase()
    })
      ? setBoardError('The board name must be unique. Please try another name.')
      : axios({
          method: 'post',
          url: 'http://localhost:3001/boards',
          data: { title }
        })
          .then((response) => {
            console.log(response.data)
            let boardsClone = [...boards]
            boardsClone.push({
              id: response.data.id,
              title: response.data.title,
              sections: []
            })
          })
          .catch((error) => {
            console.log(error)
            console.log(error.response)
            console.log(error.data)
          })
  }

  return (
    <React.Fragment>
      <BoardContainer>
        <List
          itemsList={boards}
          typeName='board'
          onItemSubmit={onBoardSubmit}
          handleSelect={handleBoardClick}
          title='Your Boards'
          id={-1}
        ></List>
      </BoardContainer>
      <BoardContainer>
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
      </BoardContainer>
    </React.Fragment>
  )
}

export default App
