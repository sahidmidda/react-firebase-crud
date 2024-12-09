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
      <AddBook baseChangeChecker={baseChangeChecker} setBaseChangeChecker={setBaseChangeChecker} currentBookId={currentBookId} />
      <DisplayBooks baseChangeChecker={baseChangeChecker} setCurrentBookId={setCurrentBookId} />
    </>
  )
}

export default App
