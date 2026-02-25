import ChessBoard from './components/ChessBoard'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>w3chess</h1>
      </header>

      <main className="app-content">
        <ChessBoard />
      </main>
    </div>
  )
}

export default App
