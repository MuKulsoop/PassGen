import { useState, useCallback, useRef, useEffect} from 'react'

import './App.css'

function App() {
  const [Length, setLength] = useState(8)
  const [addChar, setChar] = useState(false)
  const [addNum, setNum] = useState(false)
  const [password, setPassword] = useState("")

  const passref = useRef(null)

  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "QAWSDERFGTHYUJIKOLPMNBVCXZqwertyuioplkjhgfdsazxcvbnm"
    if (addChar) str+= "!@#$%^&*(){}?>:/"
    if (addNum) str += "1234567890"
    for( let i=0; i < Length ; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, 
  [Length, addChar,addNum, setPassword])

  useEffect( () => { 
    passwordGenerator()
  }, [Length, addChar, addNum, passwordGenerator])

  const copyPasswordToClipboard = useCallback( () => {
    passref.current?.select();
    passref.current?.setSelectionRange(0,99);
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
     <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password Generator</h1>
     
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      className='outline-none w-full py-1 px-3'
      placeholder='Password'
      readOnly
      ref={passref} 
      />
      <button 
      onClick={copyPasswordToClipboard}
      className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'
      >Copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={50}
        value={length}
        className='cursor-pointer'
        onChange={(e) => {setLength(e.target.value)}}/>    
        <label>Length: {Length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={addNum}
          id='addnum'
          onChange={ ()=>{
            setNum((prev) => !prev);
          }} />
          <label htmlFor="Addnum">Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">
          <input 
          type="checkbox"
          defaultChecked={addChar}
          id='addchar'
          onChange={ ()=>{
            setChar((prev) => !prev);
          }} />
          <label htmlFor="Addchar">Characters</label>

        </div>

     </div>
     </div>
    </>
  )
}

export default App
