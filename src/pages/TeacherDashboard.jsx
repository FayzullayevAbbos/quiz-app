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
    // Parse the date string
    const date = new Date(dateString);

    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = Math.floor((dateString.seconds % 3600) / 60);

    // Determine AM/PM
    const amPm = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes to be two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Return formatted time
    return `${hours}:${formattedMinutes} ${amPm}`;
  }

  // Configure the table columns
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
    <Navbar/>
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>
        Foydalanuvchilar Testlari
      </h1>
      <Table dataSource={solvedTests} columns={columns} rowKey='id' />
    </div>
    </>
  );
};

export default TeacherDashboard;
