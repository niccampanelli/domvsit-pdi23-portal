import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"
import "./global.css"
import "moment/dist/locale/pt-br"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
