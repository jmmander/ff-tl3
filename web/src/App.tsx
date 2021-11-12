import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import SectionI from './types/section'
import BoardI from './types/board';

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

export const ActiveBoardError = styled.div`
  color: white;
`

function App() {
  const [sections, setSections] = useState<SectionI[]>([])

  const initalBoardList: BoardI[] = [
    {
      id: 1,
      title: 'board1',
      sections: [
        {
          id: 1,
          title: 'Backlog',
          board_title: 'board1',
          cards: [
            {
              id: 1,
              title: 'Card drag/drop',
              section_id: 1
            },
            {
              id: 2,
              title: 'Card details',
              section_id: 1
            },
            {
              id: 3,
              title: 'Multiple boards',
              section_id: 1
            },
            {
              id: 4,
              title: 'new title',
              section_id: 1
            }
          ]
        },
        {
          id: 2,
          title: 'Ready for Development',
          board_title: 'board1',
          cards: []
        },
        {
          id: 5,
          title: 'Done',
          board_title: 'board1',
          cards: []
        },
        {
          id: 4,
          title: 'In Review',
          board_title: 'board1',
          cards: []
        },
        {
          id: 3,
          title: 'In Progress',
          board_title: 'board1',
          cards: []
        }
      ]
    },
    {
      id: 2,
      title: 'board2',
      sections: [
        {
          id: 1,
          title: 'Backlog',
          board_title: 'board2',
          cards: [
            {
              id: 1,
              title: 'Card 1',
              section_id: 1
            },
            {
              id: 2,
              title: 'Card 2',
              section_id: 1
            },
            {
              id: 3,
              title: 'Card 3',
              section_id: 1
            },
            {
              id: 4,
              title: 'Card 4',
              section_id: 1
            }
          ]
        },
        {
          id: 2,
          title: 'Ready for Development',
          board_title: 'board2',
          cards: []
        },
        {
          id: 5,
          title: 'Done',
          board_title: 'board2',
          cards: []
        },
        {
          id: 4,
          title: 'In Review',
          board_title: 'board2',
          cards: []
        },
        {
          id: 3,
          title: 'In Progress',
          board_title: 'board2',
          cards: []
        }
      ]
    }
  ]

  type acceptableBoardTypes = BoardI | null
  const [boards, setBoards] = useState<BoardI[]>(initalBoardList)
  const [activeBoard, setActiveBoard] = useState<acceptableBoardTypes>(null)

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      //Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  }, [])

  const onCardSubmit = (sectionId: number, title: string) => {
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3001/cards',
    //   data: { sectionId, title }
    // }).then((response) => {
    //   let sectionsClone: SectionI[] = [...sections]
    //   for (let i = 0; i < sectionsClone.length; i++) {
    //     let section: SectionI = sectionsClone[i]
    //     if (section.id == sectionId) {
    //       section.cards.push({
    //         id: response.data.id,
    //         title: response.data.title,
    //         section_id: sectionId
    //       })
    //       setSections(sectionsClone)
    //     }
    //   }
    // }
    console.log('card submitted')

    }
      
      

    let sectionsClone: SectionI[] = [...sections]
    for (let i = 0; i < sectionsClone.length; i++) {
      let section: SectionI = sectionsClone[i]
      section.cards.push({ id: id, title: title, section_id: sectionId })
      setSections(sectionsClone)
    }
  }

  const handleBoardClick = (board_id: number) => {
    const selected_board = boards.filter((board) => board.id === board_id)[0]
    setActiveBoard(selected_board)
  }

  const handleCardClick = () => {
    console.log('i clicked a card')
  }

  const onBoardSubmit = (title: string) => {
    // axios({
    //   method: 'post',
    //   url: 'http://localhost:3001/boards',
    //   data: { title }
    // }).then((response) => {
    //   let boardsClone = [...boards]
    //   boardsClone.push({
    //     id: response.data.id,
    //     title: response.data.title,
    //     items: response.data.sections
    //   })
    //   setBoards(boardsClone)
    // })
    let boardsClone = [...boards]
    const id = Math.max(...boardsClone.map((o) => o.id), 0) + 1
    const sections = [
      {
        id: 1,
        title: 'Backlog',
        board_title: 'board2',
        cards: []
      },
      {
        id: 2,
        title: 'Ready for Development',
        board_title: 'board1',
        cards: []
      },
      {
        id: 5,
        title: 'Done',
        board_title: 'board1',
        cards: []
      },
      {
        id: 4,
        title: 'In Review',
        board_title: 'board1',
        cards: []
      },
      {
        id: 3,
        title: 'In Progress',
        board_title: 'board1',
        cards: []
      }
    ]
    boardsClone.push({ id: id, title: title, sections: sections })
    setBoards(boardsClone)
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
                ></List>
              )
            })}
          </ActiveBoardView>
        )}
        {!activeBoard && <ActiveBoardError>Please select a board</ActiveBoardError>}
        {!!activeBoard && !activeBoard.sections.length && (
          <ActiveBoardError>This board has no data to display</ActiveBoardError>
        )}
      </BoardContainer>
    </React.Fragment>
  )
}

export default App
