import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isCharacterAllowed, setIsCharacterAllowed] = useState(false);
  const [notify, setNotify] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isNumberAllowed) str += "0123456789";
    if (isCharacterAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }

    setPassword(pass);
  }, [length, isCharacterAllowed, isNumberAllowed]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setNotify(false);
    setNotify(true);

    setTimeout(() => {
      setNotify(false);
    }, 2000);
  };

  useEffect(() => {
    generatePassword();
  }, [length, isNumberAllowed, isCharacterAllowed, generatePassword]);

  return (
    <div className="px-10 md:px-0 md:w-[600px] flex flex-col gap-10 items-center justify-center md:mx-auto h-screen">
      <div className="absolute top-4 w-screen  py-4 text-center text-3xl text-white from-stone-400">
        Password Generator
      </div>
      <div className="h-10 w-full flex flex-row ">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          className="search-bar h-full rounded-l-md grow px-4 text-lg ring-0 outline-none"
          readOnly
        />

        <button
          className="bg-blue-400 h-full px-4 rounded-r-md text-white"
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center gap-4 text-white">
        <input
          type="range"
          name="length"
          min={6}
          max={100}
          id="length"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label htmlFor="length" className="w-4">
          {length}
        </label>
        <div>
          <input
            type="checkbox"
            name="number"
            id="number"
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setIsNumberAllowed((prev) => !prev);
            }}
          />
          <label className=" pl-1" htmlFor="number">
            Numbers
          </label>
        </div>
        <div>
          <input
            type="checkbox"
            name="character"
            id="character"
            defaultChecked={isCharacterAllowed}
            onChange={() => {
              setIsCharacterAllowed((prev) => !prev);
            }}
          />
          <label className=" pl-1" htmlFor="character">
            Characters
          </label>
        </div>
      </div>
      {notify && (
        <div
          className="w-[400px] bg-blue-500 text-white absolute bottom-10 h-10 rounded flex items-center justify-center 
        animate-fade-down animate-once animate-duration-1000 animate-delay-400 animate-ease-in-out"
        >
          <p className="font-semibold">Copied to Clipboard!</p>
        </div>
      )}

      <div className="absolute bottom-0 py-4 text-white font-light text-sm w-screen text-right mr-10">Created By: Gaurav Shrestha</div>
    </div>
  );
}

export default App;
