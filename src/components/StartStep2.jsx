import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Button, Form, Input, Radio, Space, Spin } from "antd";
import { Link } from "react-router-dom";

function StartStep2({ formLoading, setFormLoading, selectedFan }) {
  const [variantSoni, setVariantSoni] = useState(0);
  const [questionsArray, setQuestionsArray] = useState([]);

  const [next, setNext] = useState(0);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  useEffect(() => {
    getVariantSoni();
    getQuestions();
  }, []);
  const getVariantSoni = async () => {
    try {
      const docRef = doc(db, "fanlar", selectedFan); // "algebra" hujjatiga ishora
      const docSnap = await getDoc(docRef); // Hujjatni olish

      if (docSnap.exists()) {
        const data = docSnap.data(); // Hujjat ma'lumotlari
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
      const matematikaDocRef = doc(db, "fanlar", "Matematika");
      const questionsCollectionRef = collection(
        matematikaDocRef,
        "questions",
      );

      // Ma'lumotlarni yig'ish uchun bo'sh massiv
      let questionsArray = [];
      // Kolleksiyadan hujjatlarni olish
      const querySnapshot = await getDocs(questionsCollectionRef);

      querySnapshot.forEach((doc) => {
        // Har bir hujjatni massivga qo'shish
        questionsArray.push({ id: doc.id, ...doc.data() });
      });

      console.log(questionsArray); // To'liq massivni ko'rsatish
      setQuestionsArray(questionsArray);
      setFormLoading(false); // Agar massivni qaytarish kerak bo'lsa
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  return (
    <div className='h-full w-full flex flex-col items-center justify-center px-5'>
      <div className='max-w-[600px] flex flex-col items-center mb-20 py-3 w-full rounded-xl border'>
        {formLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <h2 className='text-[30px]'>Quiz boshlandi!!!</h2>

            <div className=' w-full font-bold px-10 text-[23px] pt-10'>
              {" "}
              {next + 1}) Savol: {questionsArray[next]?.savol}
            </div>
            <Form
              layout='vertical'
              className='w-full px-5 pt-8'
              // form={form}
              // onFinish={onFinish} // onFinish form submit bo'lganda chaqiriladi
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
                      (variant, index) => {
                        return (
                          <Radio
                            className='text-[18px] w-full border py-[6px] rounded-xl mb-2 px-5 font-semibold'
                            value={index}
                          >
                            {variant}
                          </Radio>
                        );
                      },
                    )}
                  </Space>
                </Radio.Group>
              </Form.Item>

              <Form.Item className='flex gap-3'>
                <Button
                  // loading={loading}
                  className='mr-3'
                  type='primary'
                  htmlType='submit'
                >
                  Yuklash
                </Button>
                <Link
                  // onClick={() => {
                  //   setSubject("");
                  //   setQuestion(false);
                  // }}
                  to={"/"}
                >
                  <Button htmlType='button'>Bosh sahifa</Button>
                </Link>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
      <hr className='w-full' />
      <div className='max-w-[1220px] w-full '>
        <div className='flex gap-10 py-4 text-lg'>
          <div className=''>
            To'g'ri javob : <span className='font-bold'>2</span>{" "}
          </div>
          <div className=''>
            Noto'g'ri javob : <span className='font-bold'>3</span>{" "}
          </div>
        </div>
        <div className=' flex gap-3'>
          {questionsArray?.map((qu, index) => {
            return (
              <div
                className={`h-12 w-12 flex items-center justify-center border rounded-[50%]`}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StartStep2;
