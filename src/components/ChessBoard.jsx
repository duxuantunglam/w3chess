import { useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

function ChessBoard() {
  const gameRef = useRef(new Chess())
  const [position, setPosition] = useState(gameRef.current.fen())
  const currentTurn = gameRef.current.turn() === 'w' ? 'Trắng' : 'Đen'

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
    <section className="chessboard-card">
      <p className="chessboard-turn">
        Lượt đi hiện tại: <span>{currentTurn}</span>
      </p>
      <div className="chessboard-wrapper">
        <Chessboard
          options={{
            position,
            boardOrientation: 'white',
            allowDragging: true,
            onPieceDrop: ({ sourceSquare, targetSquare }) =>
              handleMove(sourceSquare, targetSquare),
            boardStyle: {
              width: '100%',
              borderRadius: 12,
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
            },
          }}
        />
      </div>
    </section>
  )
}

export default ChessBoard

