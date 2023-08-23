import { Route } from 'react-router-dom/cjs/react-router-dom.min';


import Home from './componets/home';
import Chat from './componets/chat';

function App() {
  return (
    <div className="App">
      <div className=' bg-[#070113] w-screen h-screen text-white '>
        <Route path='/' component={Home} exact/>
        <Route path='/chats' component={Chat}/>
      </div>
    </div>
  );
}

export default App;
