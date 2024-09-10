import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // firebase configuration
import { Table } from "antd";
import Navbar from "../components/Navbar";

const TeacherDashboard = () => {
  const [solvedTests, setSolvedTests] = useState([]);

  useEffect(() => {
    fetchSolvedTests();
  }, []);

  const fetchSolvedTests = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "solvedTests"),
      );
      const testResults = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setSolvedTests(testResults);
    } catch (error) {
      console.error("Error fetching solved tests:", error);
    }
  };

  function formatTime(dateString) {
    

    const years = Math.floor(dateString / (3600 * 24 * 365));
    let remainingSeconds = dateString % (3600 * 24 * 365);

    const months = Math.floor(remainingSeconds / (3600 * 24 * 30));
    remainingSeconds = remainingSeconds % (3600 * 24 * 30);

    const days = Math.floor(remainingSeconds / (3600 * 24));
    remainingSeconds = remainingSeconds % (3600 * 24);

    const hours = Math.floor(remainingSeconds / 3600);
    remainingSeconds = remainingSeconds % 3600;
    const amPm = hours + 5 >= 12 ? "PM" : "AM";

    const minutes = Math.floor(remainingSeconds / 60);
 const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const remainingSecondsFinal = remainingSeconds % 60;
     return `${hours + 5}:${formattedMinutes} ${amPm}`;
  }

  const columns = [
    {
      title: "Foydalanuvchi",
      dataIndex: "userName",
      key: "userId",
    },
    {
      title: "Fan nomi",
      dataIndex: "fanName",
      key: "testId",
    },
    {
      title: "To'g'ri javoblar",
      dataIndex: "correctAnswers",
      key: "correctAnswers",
    },
    {
      title: "Jami savollar",
      dataIndex: "totalQuestions",
      key: "totalQuestions",
    },
    {
      title: "Yechilgan vaqt",
      dataIndex: "solvedAt",
      key: "solvedAt",
      render: (timestamp) => formatTime(timestamp),
    },
  ];

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>
          Foydalanuvchilar Testlari
        </h1>
        <Table
          dataSource={solvedTests}
          columns={columns}
          rowKey='id'
        />
      </div>
    </>
  );
};

export default TeacherDashboard;
