import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider} from "../firebase";
import { useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      message.info("Login successful!");
      navigate('/')
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      // Foydalanuvchi ma'lumotlarini saqlash
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) {
        // Agar foydalanuvchi hali bazada mavjud bo'lmasa, saqlash
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          role: "" // Rol bo'sh qoldiriladi, foydalanuvchi rolni tanlaganida yangilanadi
        }, { merge: true });
  
        setLoading(false)
        // Foydalanuvchini rol tanlash sahifasiga yo'naltirish
        navigate('/role-selection');
      } else {
        // Agar foydalanuvchi ro'li mavjud bo'lsa, boshqa sahifaga yo'naltirish
        const userData = userDoc.data();
        if (userData.role) {
          // Agar ro'l mavjud bo'lsa, bosh sahifaga yo'naltirish yoki boshqa kerakli sahifaga
          setLoading(false)
          navigate('/');
        } else {
          setLoading(false)
          // Rol ma'lumotlari hali mavjud bo'lmasa, ro'l tanlash sahifasiga yo'naltirish
          navigate('/role-selection');
        }
      }
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='h-screen flex justify-center items-center'>
      <div className='max-w-md w-full bg-white p-8 rounded-xl shadow-md'>
        <h2 className='text-2xl font-semibold text-center mb-6'>
          Login
        </h2>
        <Form name='login' onFinish={onFinish} layout='vertical'>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: "Please input your email!" },
            ]}
          >
            <Input type='email' placeholder='Email' />
          </Form.Item>

          <Form.Item
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder='Password' />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              loading={loading}
              className='w-full'
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className='flex justify-center mb-4'>
          <span>or</span>
        </div>

        <Button
          onClick={handleGoogleLogin}
          icon={<GoogleOutlined />}
          className='w-full bg-red-500 text-white hover:bg-red-600'
        >
          Continue with Google
        </Button>
      </div>
    </div>
    </>
  );
}

export default Login;
