import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFormLoading, setIsGone } from "../store/CreateSlice";
function CreateStep1({setQuestion, setSubject}) {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    fanNomi: "",
    variantlarSoni: "",
    loading: false,
  });
  const { fanNomi, variantlarSoni, loading } = data;
  const options = [{ value: 2 }, { value: 3 }, { value: 4 }];
  const [form] = Form.useForm();
 
  useEffect(()=> {
    dispatch(setFormLoading(false))
  })

  const handleSelect = (value) => {
    setData({ ...data, variantlarSoni: value });
  };
  const handleText = (value) => {
    setData({ ...data, fanNomi: value });
  };

  async function onSubmit(value) {
    setSubject(value.Input)
   
    
    setData({ ...data, loading: true });
    try {
      // Agar hujjat ID avtomatik yaratilishini istasangiz
      const docRef = doc(db, "fanlar", value.Input); // Hujjatga nom sifatida "Input" qiymatini beryapmiz
      await setDoc(docRef, {
        fanNomi: value.Input,
        variantSoni: value.Select,
      });

      // Ma'lumotlarni tozalash
      setData({
        fanNomi: "",
        variantlarSoni: "",
        loading: false,
      });

      // Formani tozalash
      setQuestion(true)
      dispatch(setFormLoading(true))
      form.resetFields();

    } catch (error) {
      console.error("Xatolik ro'y berdi: ", error); // Xatolikni ko'rsatish
      setData({ ...data, loading: false });
    }
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className=' max-w-[600px] flex flex-col items-center mb-20 py-3 w-full border rounded-xl'>
        <h2 className='text-[25px]  '>
          Fan uchun kerakli malumotlar
        </h2>
        <Form
          form={form}
          onFinish={onSubmit}
          layout='vertical'
          className='w-full px-5 pt-8'
        >
          <Form.Item
            label='Fan nomini kiriting '
            name='Input'
            rules={[
              {
                required: true,
                message: "Iltimos fan nomini kiriting ",
              },
            ]}
          >
            <Input onChange={handleText} />
          </Form.Item>

          <Form.Item
            label='Savoldagi variantlar soni '
            name='Select'
            rules={[{ required: true, message: "Iltimos tanlang" }]}
          >
            <Select
              placeholder='birini tanlang  '
              onChange={handleSelect}
              options={options}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type='primary'
              htmlType='submit'
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default CreateStep1;
