import StartStep1 from "../components/StartStep1";
import StartStep2 from "../components/StartStep2";
import { useEffect, useState } from "react";

function StartQuiz() {
  const [selectedFan, setSelectedFan] = useState("");
  function handleCheck(value) {

    setSelectedFan(value);
  }
console.log(selectedFan);

  return (
    <div className='w-full h-full'>
      {selectedFan ? (
        <StartStep2 />
      ) : (
        <StartStep1 handleCheck={handleCheck} />
      )}
    </div>
  );
}

export default StartQuiz;
