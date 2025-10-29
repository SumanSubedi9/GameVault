import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-24 hover:animate-pulse"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-24 hover:animate-spin"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl font-bold mb-8 text-blue-400">Vite + React</h1>

      <div className="bg-gray-800 p-6 rounded-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-medium transition-colors"
        >
          count is {count}
        </button>
        <p className="mt-4 text-gray-300">
          Edit{" "}
          <code className="bg-gray-700 px-2 py-1 rounded">src/App.jsx</code> and
          save to test HMR
        </p>
      </div>

      <p className="mt-8 text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
