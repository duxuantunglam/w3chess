import { useRef, useState } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'

function ChessBoard() {
  const gameRef = useRef(new Chess())
  const [position, setPosition] = useState(gameRef.current.fen())
  const [moveHistory, setMoveHistory] = useState([])
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
    setMoveHistory((prev) => [
      ...prev,
      {
        san: move.san,
        color: move.color,
      },
    ])

    return true
  }

  const handleUndo = () => {
    if (moveHistory.length === 0) return

    const confirmed = window.confirm('Bạn có chắc chắn muốn hoàn tác nước đi cuối cùng không?')
    if (!confirmed) return

    const game = gameRef.current
    game.undo()

    setPosition(game.fen())
    setMoveHistory((prev) => prev.slice(0, -1))
  }

  const handleRestart = () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn bắt đầu lại ván cờ từ đầu không?')
    if (!confirmed) return

    const game = gameRef.current
    game.reset()

    setPosition(game.fen())
    setMoveHistory([])
  }

  return (
    <section className="chessboard-card">
      <p className="chessboard-turn">
        Lượt đi hiện tại: <span>{currentTurn}</span>
      </p>
      <div className="chessboard-actions">
        <button
          type="button"
          className="chessboard-button"
          onClick={handleUndo}
          disabled={moveHistory.length === 0}
        >
          Undo
        </button>
        <button type="button" className="chessboard-button chessboard-button-danger" onClick={handleRestart}>
          Restart
        </button>
      </div>
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
      <div className="chessboard-moves">
        <h3 className="chessboard-moves-title">Lịch sử nước đi</h3>
        {moveHistory.length === 0 ? (
          <p className="chessboard-moves-empty">Chưa có nước đi nào.</p>
        ) : (
          <ol className="chessboard-moves-list">
            {moveHistory.map((move, index) => (
              <li key={index}>
                <span className="chessboard-move-index">{index + 1}.</span>{' '}
                <span className="chessboard-move-player">
                  {move.color === 'w' ? 'Trắng' : 'Đen'}:
                </span>{' '}
                <span className="chessboard-move-san">{move.san}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  )
}

export default ChessBoard

