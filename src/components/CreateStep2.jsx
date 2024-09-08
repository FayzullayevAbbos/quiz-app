import { Form, Input, Button, Select, Spin, message } from "antd";
import { collection, doc, getDoc, setDoc } from "firebase/firestore"; // Firestore funksiyalarini import qilish
import { db } from "../firebase"; // Firebase konfiguratsiyasi
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormLoading } from "../store/CreateSlice";

function CreateStep2({ setQuestion, subject, setSubject }) {
  const [form] = Form.useForm(); // AntD form instance
  const formLoading = useSelector((state) => state.formLoading);
  const [loading,  setLoading] = useState(false)
  const dispatch = useDispatch()
  const [variantSoni, setVariantSoni] = useState(0); // Variantlar soni
  const options = Array.from({ length: variantSoni }).map(
    (_, index) => ({
      label: `Variant ${index + 1}`,
      value: index, // Variant nomlari (variant_0, variant_1 ...)
    }),
  );

  
  useEffect(() => {
    getVariantSoni();
  }, []);
  const getVariantSoni = async () => {
    try {
      const docRef = doc(db, "fanlar", subject); // "algebra" hujjatiga ishora
      const docSnap = await getDoc(docRef); // Hujjatni olish

      if (docSnap.exists()) {
        const data = docSnap.data(); // Hujjat ma'lumotlari
        setVariantSoni(data.variantSoni);
        dispatch(setFormLoading(false))
         // variantSoni ni chiqarish
      } else {
        console.log("Bunday hujjat mavjud emas!");
      }
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  const onFinish = async (values) => {
    setLoading(true)
    try {
      const docRef = doc(db, "fanlar", subject);
      const questionsCollectionRef = collection(docRef, "questions");
      const questionDocRef = doc(questionsCollectionRef);

      await setDoc(questionDocRef, {
        savol: values.question,
        variantlar: options.map(
          (option, index) => values[`variant_${index}`],
        ),
        togriVariant: values.Select,
      });

      
      setLoading(false)
      message.info("Qo'shildi")
      form.resetFields();
    } catch (error) {
      setLoading(false)
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='max-w-[600px] flex flex-col items-center mb-20 py-3 w-full rounded-xl border'>
        {formLoading ? (
          <Spin size='large' />
        ) : (
          <>
            <h2 className='text-[25px]'>
              Fan uchun kerakli ma'lumotlar
            </h2>
            <Form
              layout='vertical'
              className='w-full px-5 pt-8'
              form={form}
              onFinish={onFinish} // onFinish form submit bo'lganda chaqiriladi
            >
              <Form.Item
                label='Savolni kiriting'
                name='question'
                rules={[
                  {
                    required: true,
                    message: "Iltimos savolni kiriting",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <hr />
              <p className='p-3 font-bold text-[18px] w-full text-center'>
                Variantlarni kiriting
              </p>

              {Array.from({ length: variantSoni }).map((_, index) => (
                <Form.Item
                  key={index}
                  label={`Variant ${index + 1}`}
                  name={`variant_${index}`}
                  rules={[
                    {
                      required: true,
                      message: "Iltimos variantni kiriting",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              ))}
              <Form.Item
                label="To'g'ri variant tanla"
                name='Select'
                rules={[
                  { required: true, message: "Iltimos tanlang" },
                ]}
              >
                <Select
                  placeholder='Birini tanlang'
                  options={options}
                />
              </Form.Item>
              <Form.Item className='flex gap-3'>
                <Button
                loading={loading}
                  className='mr-3'
                  type='primary'
                  htmlType='submit'
                >
                  Yuklash
                </Button>
                <Link
                  onClick={() => {
                    setSubject("");
                    setQuestion(false);
                  }}
                  to={"/"}
                >
                  <Button htmlType='button'>Bosh sahifa</Button>
                </Link>
              </Form.Item>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default CreateStep2;
