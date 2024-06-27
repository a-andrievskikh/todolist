import ReactDOM from 'react-dom/client'
import { App } from 'app/ui'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { store } from 'app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// const rerenderEntireTree = () => {
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
// }

// rerenderEntireTree()
//
// if (process.env.NODE_ENV === 'development' && (module as any).hot) {
//   ;(module as any).hot.accept('./app/ui', () => {
//     rerenderEntireTree()
//   })
// }
