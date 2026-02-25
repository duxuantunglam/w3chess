import { useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

function ChessBoard() {
  const gameRef = useRef(new Chess())
  const [position, setPosition] = useState(gameRef.current.fen())

  // Hàm xử lý logic nước đi với chess.js
  const handleMove = (sourceSquare, targetSquare) => {
    const game = gameRef.current

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q',
    })

    if (move === null) {
      return false
    }

    setPosition(game.fen())

    return true
  }

  return (
    <Chessboard
      options={{
        position,
        boardOrientation: 'white',
        allowDragging: true,
        onPieceDrop: ({ sourceSquare, targetSquare }) =>
          handleMove(sourceSquare, targetSquare),
      }}
    />
  )
}

export default ChessBoard

