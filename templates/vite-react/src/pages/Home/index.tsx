import { useEffect, useState } from 'react'
import HelloWorld from '@/components/HelloWorld';
import logo from '@/assets/logo.svg'
import request from '@/utils/request';
import './index.css'

function Index() {
  const [count, setCount] = useState(0)

  const testRequest = async () => {
    try {
      const data = await request(`${window.globalConfig?.appServer}`);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    testRequest();
  }, [])

  return (
    <div className="App">
      <HelloWorld />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default Index;
