import ReactDOM from "react-dom"
import React from "react"
import App from "./App"
import "bootstrap/dist/css/bootstrap.min.css"
import "./_Style.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);