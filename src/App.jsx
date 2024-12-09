import './App.css'
import AddBook from './components/AddBook'
import NavBar from './components/NavBar'
import DisplayBooks from './components/DisplayBooks'
import { useState } from 'react';
import NewNavBar from './components/NewNavBar';

function App() {
  const [baseChangeChecker, setBaseChangeChecker] = useState(false);
  const [currentBookId, setCurrentBookId] = useState('');

  return (
    <>
      {/* <NavBar /> */}
      <NewNavBar />
      <div className="flex flex-row justify-around mx-auto w-[80%]">

        <AddBook baseChangeChecker={baseChangeChecker} setBaseChangeChecker={setBaseChangeChecker} currentBookId={currentBookId} setCurrentBookId={setCurrentBookId} />
        <DisplayBooks baseChangeChecker={baseChangeChecker} setCurrentBookId={setCurrentBookId} />
      </div>
    </>
  )
}

export default App
