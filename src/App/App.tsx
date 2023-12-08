

function App() {
  
  return (
    <div>
      <header className="App-header">
        <h1>Todos (5)</h1>
      </header>
        <div>
          <input className="input" placeholder="What needs to be done?" />
          <input type="button" value="submit" />
        </div>
        <main className="flex items-center">
          <ul>
            <li>
              <label>
                <input type="checkbox" /> Eat
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Sleep
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" /> Repeat
              </label>
            </li>
          </ul>
        </main>
        
      
    </div>
  )
}
export default App;
