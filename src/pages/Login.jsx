import { Button, Form, Input, message } from "antd";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider} from "../firebase";
import { useState } from "react";
import { GoogleOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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
    try {
      await signInWithPopup(auth, googleProvider);
      message.info("Google login successful!");
      navigate('/')
    } catch (error) {
      console.error("Google login failed", error);
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
