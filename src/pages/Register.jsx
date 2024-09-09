import React, { useState } from "react";
import { Form, Input, Button, Radio, Spin, message } from "antd";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase"; // Firebase faylingizdagi auth va db ni import qilish
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password, role } = values;
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });

      message.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        message.error(
          "Bu email manzil allaqachon ro'yxatdan o'tgan!",
        );
      } else {
        message.error("Ro'yxatdan o'tishda xatolik yuz berdi!");
      }
      console.error("Ro'yxatdan o'tishda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center h-screen'>
        <div className='max-w-md w-full p-6 border rounded-lg shadow-lg'>
          <h2 className='text-2xl font-bold mb-4'>
            Ro'yxatdan o'tish
          </h2>
          <Form name='register' layout='vertical' onFinish={onFinish}>
            <Form.Item
              name='name'
              label='Ism'
              rules={[
                {
                  required: true,
                  message: "Iltimos, ismingizni kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              rules={[
                {
                  required: true,
                  type: "email",
                  message:
                    "Iltimos, to'g'ri email manzilini kiriting!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='password'
              label='Parol'
              rules={[
                {
                  required: true,
                  message: "Iltimos, parolingizni kiriting!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name='role'
              label='Rol'
              rules={[
                { required: true, message: "Iltimos, rol tanlang!" },
              ]}
            >
              <Radio.Group>
                <Radio value='student'>Student</Radio>
                <Radio value='teacher'>Teacher</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                loading={loading}
              >
                Ro'yxatdan o'tish
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
