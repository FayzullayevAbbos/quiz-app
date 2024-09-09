import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  Timestamp,
} from "firebase/firestore"; 
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Form, message, Radio, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function StartStep2({ formLoading, setFormLoading, selectedFan }) {
  const [variantSoni, setVariantSoni] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);
  const [next, setNext] = useState(0);
  const [value, setValue] = useState(0);
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finish, setFinish] = useState(false);
  const { currentUser } = useAuth();
  useEffect(() => {
    getVariantSoni();
    getQuestions();
  }, []);
 

  useEffect(() => {
    if (next === questionsArray.length) {
      setFinish(true);
      handleFinish();  
    } else {
      setFinish(false);
    }
  }, [next, questionsArray.length]);

  const getVariantSoni = async () => {
    try {
      const docRef = doc(db, "fanlar", selectedFan);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setVariantSoni(data.variantSoni);
      } else {
        console.log("Bunday hujjat mavjud emas!");
      }
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  const getQuestions = async () => {
    setFormLoading(true);
    try {
      const matematikaDocRef = doc(db, "fanlar", selectedFan);
      const questionsCollectionRef = collection(
        matematikaDocRef,
        "questions",
      );
      let questionsArray = [];
      const querySnapshot = await getDocs(questionsCollectionRef);
      querySnapshot.forEach((doc) => {
        questionsArray.push({ id: doc.id, ...doc.data() });
      });
      setQuestionsArray(questionsArray);
      setFormLoading(false);
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setIsSubmitted(false);
  };

  const handleSubmit = () => {
    if (value !== null) {
      const correctAnswer = questionsArray[next]?.togriVariant;
      const isCorrect = value === correctAnswer;
      setResults((prevResults) => [
        ...prevResults,
        { questionIndex: next, isCorrect },
      ]);
      setIsSubmitted(true);
      setTimeout(() => {
        setNext((prevNext) => prevNext + 1);
        setValue(0);
        setIsSubmitted(false);
      }, 500);
    }
  };
 
  const handleFinish = async () => {
    try {
      if (currentUser) {
  
        const userDocRef = doc(db, "solvedTests", currentUser.uid);
        await setDoc(
          userDocRef,
          {
            userName: currentUser.displayName,
            fanName: selectedFan,
            totalQuestions: questionsArray.length,
            correctAnswers: results.filter((r) => r.isCorrect).length,
            incorrectAnswers: results.filter((r) => !r.isCorrect)
              .length,
            solvedAt: Timestamp.now(),  
          },
          { merge: true },
        );
      }
      questionsArray.length
        ? message.info("Natijangiz saqlandi")
        : "";
    } catch (error) {
      console.error("Error saving test results:", error);
    }
  };

  return (
    <>
      <div className='h-full w-full flex flex-col items-center justify-center px-5'>
        {finish ? (
          <Link className='pb-[400px]' to={"/"}>
            <Button size='large' type='primary'>
              Bosh sahifa
            </Button>
          </Link>
        ) : (
          <div className='max-w-[600px] flex flex-col items-center mb-20 py-3 w-full rounded-xl border'>
            {formLoading ? (
              <Spin size='large' />
            ) : (
              <>
                <h2 className='text-[30px]'>Quiz boshlandi!!!</h2>
                <div className='w-full font-bold px-10 text-[23px] pt-10'>
                  {next + 1}) Savol: {questionsArray[next]?.savol}
                </div>
                <Form
                  layout='vertical'
                  className='w-full px-5 pt-8'
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name='variant'
                    label='Tanlov'
                    rules={[
                      {
                        required: true,
                        message: "Iltimos, bir variant tanlang.",
                      },
                    ]}
                  >
                    <Radio.Group
                      className='pb-5 w-full'
                      onChange={onChange}
                      value={value}
                    >
                      <Space className='w-full' direction='vertical'>
                        {questionsArray[next]?.variantlar.map(
                          (variant, index) => (
                            <Radio
                              key={index}
                              className='text-[18px] w-full border py-[6px] rounded-xl mb-2 px-5 font-semibold'
                              value={index}
                            >
                              {variant}
                            </Radio>
                          ),
                        )}
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item className='flex gap-3'>
                    <Button
                      className='mr-3'
                      type='primary'
                      htmlType='submit'
                    >
                      Yuklash
                    </Button>
                    <Link to={"/"}>
                      <Button htmlType='button'>Bosh sahifa</Button>
                    </Link>
                  </Form.Item>
                </Form>
              </>
            )}
          </div>
        )}
        <hr className='w-full' />
        <div className='max-w-[1220px] w-full'>
          <div className='flex gap-10 py-4 text-lg'>
            <div>
              To'g'ri javoblar :{" "}
              <span className='font-bold'>
                {results.filter((r) => r.isCorrect).length}
              </span>
            </div>
            <div>
              Noto'g'ri javoblar :{" "}
              <span className='font-bold'>
                {results.filter((r) => !r.isCorrect).length}
              </span>
            </div>
          </div>
          <div className='flex gap-3'>
            {questionsArray?.map((qu, index) => (
              <div
                key={index}
                className={`h-12 w-12 flex items-center justify-center border rounded-[50%] ${
                  results.find(
                    (result) => result.questionIndex === index,
                  )
                    ? results.find(
                        (result) => result.questionIndex === index,
                      ).isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : ""
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default StartStep2;
