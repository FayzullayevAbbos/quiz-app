import { Form, Input, Button, Select } from "antd";
import { doc, setDoc } from "firebase/firestore"; // Firestore funksiyalarini import qilish
import { db } from "../firebase"; // Firebase konfiguratsiyasi
import { Link } from "react-router-dom";

function CreateStep2({ setQuestion , subject , setSubject }) {
  const [form] = Form.useForm(); // AntD form instance

  const variantSoni = 4; // Variantlar soni
  const options = Array.from({ length: variantSoni }).map(
    (_, index) => ({
      label: `Variant ${index + 1}`,
      value: `variant_${index}`, // Variant nomlari (variant_0, variant_1 ...)
    }),
  );

console.log(subject);

  const onFinish = async (values) => {
    try {
      // Savol va variantlarni Firestore'ga yozish
      const docRef = doc(db, "fanlar", subject); // "algebra" hujjatiga savol qo'shamiz
      
      const questionsCollectionRef = collection(docRef, values.question);
      
      
      await setDoc(questionsCollectionRef, {
        savol: values.question,
        variantlar: options.map(
          (option, index) => values[`variant_${index}`],
        ),
        togriVariant: values.Select,
      });
      setSubject('')
      console.log("Savol muvaffaqiyatli qo'shildi!");
      form.resetFields(); // Formani tozalash
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='max-w-[600px] flex flex-col items-center mb-20 py-3 w-full border'>
        <h2 className='text-[25px]'>Fan uchun kerakli ma'lumotlar</h2>
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
            rules={[{ required: true, message: "Iltimos tanlang" }]}
          >
            <Select placeholder='Birini tanlang' options={options} />
          </Form.Item>
          <Form.Item className='flex gap-3'>
            <Button className='mr-3' type='primary' htmlType='submit'>
              Yuklash
            </Button>
            <Link onClick={() => setQuestion(false)} to={"/"}>
              <Button htmlType='button'>Bosh sahifa</Button>
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CreateStep2;
