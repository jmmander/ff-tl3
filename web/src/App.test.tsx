import React from 'react'
import axios from 'axios'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'

import App from './App'
import { act } from 'react-dom/test-utils'

jest.mock('axios')

describe('<App />', () => {
  var mockedJest: jest.Mocked<typeof axios>

  beforeEach(() => {
    mockedJest = axios as jest.Mocked<typeof axios>
    mockedJest.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Board 1',
          sections: [
            {
              id: 2,
              title: 'Backlog',
              cards: [
                {
                  id: 3,
                  title: 'Test 1',
                  section_id: 1
                }
              ]
            },
            {
              id: 4,
              title: 'Ready for Development',
              cards: []
            }
          ]
        },
        {
          id: 5,
          title: 'Board 2',
          sections: [
            {
              id: 6,
              title: 'Backlog',
              cards: [
                {
                  id: 7,
                  title: 'Test 2',
                  section_id: 1
                }
              ]
            },
            {
              id: 8,
              title: 'Done',
              cards: [
                {
                  id: 7,
                  title: 'Test 3',
                  section_id: 1
                }
              ]
            }
          ]
        }
      ]
    })
  })

  afterEach(cleanup)

  it('matches snapshot', async () => {
    const { asFragment } = render(<App />)

    await screen.findByText('Your Boards')

    expect(asFragment).toMatchSnapshot()
  })

  it('renders Boards successfully', async () => {
    render(<App />)

    const boardHeading = await screen.findByText('Your Boards')
    const board1Text = await screen.findByText('Board 1')

    expect(boardHeading.nodeName).toBe('SPAN')
    expect(board1Text.nodeName).toBe('DIV')
  })

  it('does not render sections if no board has been selected', async () => {
    render(<App />)

    const noBoardError = await screen.findByText('No board selected')

    expect(screen.queryByText('Backlog')).toBeNull()
    expect(noBoardError.nodeName).toBe('DIV')
  })

  it('renders correct sections and card on board click', async () => {
    render(<App />)

    const board1Text = await screen.findByText('Board 1')
    act(() => {
      fireEvent.click(board1Text)
    })

    const readyForDevText = await screen.findByText('Ready for Development')
    const cardText = await screen.findByText('Test 1')

    expect(readyForDevText.nodeName).toBe('SPAN')
    expect(cardText.nodeName).toBe('DIV')
  })

  it('opens text input form on click of "add board"', async () => {
    render(<App />)

    const addNewBoard = await screen.findByText('Add another')
    act(() => {
      fireEvent.click(addNewBoard)
    })
    const inputText = screen.queryByPlaceholderText('Enter a title for the new board')
    expect(inputText.nodeName).toBe('TEXTAREA')
  })
})
