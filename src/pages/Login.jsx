import { Button, Form, Input, message } from "antd";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, googleProvider } from "../firebase";
import { useEffect, useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  console.log(userRole);

  const startLoading = () => {
    setLoading(true); 
    console.log(1);
    // Loadingni true qilamiz
    setTimeout(() => {
      console.log(3);
      
      setLoading(false); // 3 soniyadan keyin loading false bo'ladi
    }, 3000); 
  };


  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        if (userData.role) {
          message.info("Login successful!");
          navigate("/");
        } else {
          message.warning("Ro'l ma'lumotlari mavjud emas!");
          navigate("/role-selection");
        }
      } else {
        message.error("Foydalanuvchi ma'lumotlari topilmadi.");
      }
    } catch (error) {
      console.error("Login failed", error);
      message.error("Login failed! Please try again.");
    } finally {

    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(
          userRef,
          {
            email: user.email,
            displayName: user.displayName,
            role: "",
          },
          { merge: true },
        );

        startLoading()
        navigate("/role-selection");
      } else {
        const userData = userDoc.data();
        if (userData.role) {
          navigate("/");
        } else {
          startLoading()
          navigate("/role-selection");
        }
      }
    } catch (error) {
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  return (
    <>
      <Navbar />
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
                {
                  required: true,
                  message: "Please input your email!",
                },
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
