import { useSelector } from "react-redux";
import CreateStep1 from "../components/CreateStep1";
import CreateStep2 from "../components/CreateStep2";
import { useState } from "react";

function CreateQuiz() {
  const isGone = useSelector((state) => state.isGone);
  const [question, setQuestion] = useState(false);
  const [subject, setSubject] = useState("");
 

  return (
    <div className='h-full w-full flex items-center justify-center'>
      {question ? (
        <CreateStep2
          setSubject={setSubject}
          subject={subject}
          setQuestion={setQuestion}
        />
      ) : (
        <CreateStep1
          setSubject={setSubject}
          setQuestion={setQuestion}
        />
      )}
    </div>
  );
}

export default CreateQuiz;
