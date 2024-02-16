import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"
import "./global.css"
import moment from "moment"
import "moment/dist/locale/pt-br"

console.log(moment.locale())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
