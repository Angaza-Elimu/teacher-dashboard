import { useEffect, useRef, useState } from "react";
import ChevronDown from "../assets/ChevronDown";

export default function ListBox({ onChange, options }) {
  const boxRef = useRef(null);
  const [shown, setShown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  useEffect(() => {
    // Function for click event
    function handleOutsideClick(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShown(false);
      }
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [boxRef]);

  return (
    <div
      className="bg-light rounded-lg p-2 px-4 flex justify-between items-center gap-x-3 cursor-pointer relative shadow-sm select-none flex-1 border-primary-700 border"
      ref={boxRef}
      onClick={() => setShown((prev) => !prev)}
    >
      {/* button */}
      <p className="font-medium text-lg text-primary-700">{selectedOption?.name}</p>
      <ChevronDown className={"stroke-primary-700"} />
      {shown && (
        <div className="absolute left-0 top-12 shadow-lg rounded-lg bg-light flex flex-col gap-0 w-full z-10 py-1 min-w-max min-h-max max-h-52 overflow-y-auto scrollbar-track-neutral-900 scrollbar-thumb-primary-800 scrollbar-thin border border-primary-700">
          {options.map((option, i) => (
            <div
              className={` p-3 py-1  ${
                selectedOption.value === option.value
                  ? " text-light bg-primary-800"
                  : "text-dark hover:text-primary-700 hover:bg-primary-900/10"
              }`}
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setShown(false);
                setSelectedOption(option);
                onChange(option.value);
              }}
            >
              <p className="p-1">{option.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
