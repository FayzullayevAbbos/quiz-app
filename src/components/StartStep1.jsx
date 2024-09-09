import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firebase Firestore instance
import { useEffect, useState } from "react";
import { Button, Spin } from "antd";
import { Link } from "react-router-dom";
function StartStep1({handleCheck}) {
  const [fanlar, setFanlar] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllFanlar = async () => {
    setLoading(true);
    try {
      const fanlarCollectionRef = collection(db, "fanlar");  
      const querySnapshot = await getDocs(fanlarCollectionRef);  

      const fanlar = querySnapshot.docs.map((doc) => ({
        id: doc.id,  
        ...doc.data(), 
      }));
      setFanlar(fanlar);
      setLoading(false);
     
    } catch (error) {
      setLoading(false);
      console.error("Xatolik ro'y berdi:", error);
    }
  };

  useEffect(() => {
    getAllFanlar();
  }, []);

  return (
    <div className='w-full flex items-center  flex-col  h-full'>
      <h2 className='text-[30px] py-10'>
        {" "}
        {loading
          ? "Fan tanlang!"
          : fanlar.length
          ? "Fan tanlang!"
          : "Fan qo'shing"}
      </h2>
      {loading ? (
        <Spin size='large' />
      ) : fanlar.length ? (
        <div className='w-full rounded-xl grid grid-cols-3 gap-10 items-center max-w-[1220px] mx-auto px-10 py-10 border'>
          {fanlar?.map((fan, index) => {
            return (
              <div
                key={index}
                onClick={()=> handleCheck(fan.fanNomi)}
                className=' font-bold cursor-pointer transition  duration-200 rounded-md  ease-in-out hover:shadow-md mx-auto w-[250px] text-center py-10 border'
              >
                {fan.id}
              </div>
            );
          })}
        </div>
      ) : (
        <Link to={"/create"}>
          <Button size="large" type="primary">Qo'shish</Button>
        </Link>
      )}
    </div>
  );
}

export default StartStep1;
