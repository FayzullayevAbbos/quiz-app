import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, Form, Select, Typography, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';  

const { Title } = Typography;
const { Option } = Select;

const RoleSelection = () => {
  const { currentUser } = useAuth();
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleSaveRole = async () => {
    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { role: role });
        notification.success({
          message: 'Rol muvaffaqiyatli yangilandi!',
          description: 'Sizning rolingiz muvaffaqiyatli saqlandi.',
        });
        navigate('/');  
      } catch (error) {
        notification.error({
          message: 'Xatolik',
          description: "Ro'lni saqlashda xatolik yuz berdi.",
        });
        console.error("Xatolik ro'y berdi:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <Title level={2} className="text-center mb-4">Rol tanlang</Title>
        <Form layout="vertical">
          <Form.Item label="Rol tanlang">
            <Select
              value={role}
              onChange={handleRoleChange}
              placeholder="Rolni tanlang"
              className="w-full"
            >
              <Option value="student">Student</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={handleSaveRole}
              className="w-full"
            >
              Saqlash
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RoleSelection;
