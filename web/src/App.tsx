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
export const BoardList = styled.div``
export const BoardListTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 70%;
  padding: 10px;
`
export const BoardListContainer = styled.div`
  width: 280px;
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  padding: 10px;
  position: relative;
  display: inline-flex;
  height: auto;
  max-height: 90%;
  flex-direction: column;
`

function App() {
  const [sections, setSections] = useState<SectionI[]>([])

  const initalBoardList: BoardI[] = [
    {
      id: 1,
      title: 'board1',
      items: [
        {
          id: 1,
          title: 'Backlog',
          board_title: 'board1',
          items: [
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
          items: []
        },
        {
          id: 5,
          title: 'Done',
          board_title: 'board1',
          items: []
        },
        {
          id: 4,
          title: 'In Review',
          board_title: 'board1',
          items: []
        },
        {
          id: 3,
          title: 'In Progress',
          board_title: 'board1',
          items: []
        }
      ]
    },
    {
      id: 2,
      title: 'board2',
      items: [
        {
          id: 1,
          title: 'Backlog',
          board_title: 'board2',
          items: [
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
          items: []
        },
        {
          id: 5,
          title: 'Done',
          board_title: 'board2',
          items: []
        },
        {
          id: 4,
          title: 'In Review',
          board_title: 'board2',
          items: []
        },
        {
          id: 3,
          title: 'In Progress',
          board_title: 'board2',
          items: []
        }
      ]
    }
  ]

  type acceptableBoardTypes = BoardI | null
  const [boards, setBoards] = useState<BoardI[]>(initalBoardList)
  const [activeBoard, setActiveBoard] = useState<acceptableBoardTypes>(null)
  const [isTempBoardActive, setIsTempBoardActive] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response) => {
      //Section order is determined by ID so sort by ID
      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })
  })

  const onCardSubmit = (sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { sectionId, title }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id == sectionId) {
          section.items.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId
          })
          setSections(sectionsClone)
        }
      }
    })
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
    //   boards.push({
    //     id: response.data.id,
    //     title: response.data.title,
    //     items: response.data.sections
    //   })
    //   setBoards(boards)
    // })
    let boardsClone = [...boards]
    const id = Math.max(...boardsClone.map((o) => o.id), 0) + 1
    const sections = [
      {
        id: 1,
        title: 'Backlog',
        board_title: 'board2',
        items: []
      },
      {
        id: 2,
        title: 'Ready for Development',
        board_title: 'board1',
        items: []
      },
      {
        id: 5,
        title: 'Done',
        board_title: 'board1',
        items: []
      },
      {
        id: 4,
        title: 'In Review',
        board_title: 'board1',
        items: []
      },
      {
        id: 3,
        title: 'In Progress',
        board_title: 'board1',
        items: []
      }
    ]
    boardsClone.push({ id: id, title: title, items: sections })
    setBoards(boardsClone)
  }
  return (
    <React.Fragment>
      <BoardContainer>
        <List
          itemsList={boards}
          typeName='board'
          onItemSubmit={onBoardSubmit}
          onClick={handleBoardClick}
        ></List>
      </BoardContainer>
      {!!sections.length && (
        <BoardContainer>
          <List
            itemsList={sections}
            typeName='card'
            onItemSubmit={onCardSubmit}
            onClick={handleCardClick}
          ></List>
        </BoardContainer>
      )}
    </React.Fragment>
  )
}
//TODO refactor to use section component
// return (
//   <React.Fragment>
//     <BoardContainer>
//       <Wrapper>
//         <WrappedSection>
//           <SectionHeader>
//             <SectionTitle>My Boards</SectionTitle>
//           </SectionHeader>
//           <CardsContainer>
//             {boards.map((board: BoardI) => (
//               <Board board={board} key={board.id}></Board>
//             ))}
//           </CardsContainer>
//           {isTempBoardActive ? (
//             <CardComposerDiv>
//               <ListCardComponent>
//                 <ListCardDetails>
//                   <ListCardTextArea
//                     placeholder='Enter a name for the new board'
//                     onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//                       setBoardName(e.target.value)
//                     }
//                   />
//                 </ListCardDetails>
//               </ListCardComponent>
//               <SubmitCardButtonDiv>
//                 <SubmitCardButton
//                   type='button'
//                   value={boardName ? 'Add board' : 'Close'}
//                   onClick={(e: React.MouseEvent<HTMLElement>) => {
//                     e.preventDefault()
//                     if (boardName) {
//                       onBoardSubmit(boardName)
//                     }
//                     setIsTempBoardActive(false)
//                   }}
//                 />
//               </SubmitCardButtonDiv>
//             </CardComposerDiv>
//           ) : (
//             <AddCardButtonDiv onClick={() => setIsTempBoardActive(true)}>
//               <AddCardButtonSpan>Add another board</AddCardButtonSpan>
//             </AddCardButtonDiv>
//           )}
//         </WrappedSection>
//       </Wrapper>
//     </BoardContainer>

//     <BoardContainer>
//       {sections.map((section: SectionI) => {
//         return <Section section={section} onCardSubmit={onCardSubmit}></Section>
//       })}
//     </BoardContainer>
//   </React.Fragment>
// )

export default App
