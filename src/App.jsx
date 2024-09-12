import { useState, useEffect, useRef } from "react";
import { useCallback } from "react";

function App() {
  const [password, setPassword] = useState();
  const [length, setLength] = useState(8);
  const [isCharacter, setIsCharacter] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const passwordRef = useRef(null);
  const [toast, setToast] = useState(false);

  const createPassword = function () {
    let char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let specialChar = "!@#$%^&*()-_=+|{};:/?.>";
    let number = "0123456789";

    if (isCharacter) char += specialChar;

    if (isNumber) char += number;

    let genratedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomChar = Math.floor(Math.random() * char.length) + 1;
      genratedPassword += char.charAt(randomChar);
    }

    setPassword(genratedPassword);
    setToast(false);
  };

  const PasswordGenerator = useCallback(createPassword, [
    isCharacter,
    isNumber,
    length,
    setPassword,
  ]);

  useEffect(() => {
    PasswordGenerator();
  }, [isCharacter, isNumber, length, setPassword]);

  return (
    <div className="text-center flex flex-col justify-start items-center bg-black w-full h-screen ">
      {toast && <div
        id="toast-default"
        className="flex items-center mt-2 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 z-10"
        role="alert"
      >
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
            />
          </svg>
          <span className="sr-only">Fire icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">Password Copied</div>
        <button
          type="button"
          onClick={()=>setToast(false)}
          className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-default"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>}

      <div className="overflow-visible z-0 bg-gray-800 rounded-md px-8 py-4 mt-[8rem] top-0">
        <h1 className="text-orange-600 text-[1.8rem] mb-5">
          Password Generator
        </h1>
        <div className="flex w-[30rem] rounded-lg">
          <input
            ref={passwordRef}
            type="text"
            placeholder="Password"
            value={password}
            className="w-full outline-none rounded-l-lg text-[1.1rem] py-2 px-3"
          />
          <button
            onClick={() => {
              window.navigator.clipboard.writeText(password);
              setToast(true);
            }}
            className="text-center text-[1.05rem] text-white bg-blue-700 w-[5rem] rounded-r-lg"
          >
            copy
          </button>
        </div>
        <div className="flex mt-5 gap-4">
          <div>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className=" ml-1 text-center text-orange-600">
              Length: {length}
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => {
                setIsCharacter((prev) => !prev);
              }}
            />
            <label className=" ml-1 text-center text-orange-600">
              Characters
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              onChange={() => {
                setIsNumber((prev) => !prev);
              }}
            />
            <label className=" ml-1 text-center text-orange-600">Numbers</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
