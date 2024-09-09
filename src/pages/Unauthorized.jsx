import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Ruxsat berilmagan!</h1>
      <p className="text-lg mb-6">Ushbu sahifaga kirish uchun ruxsat berilmagan.</p>
      <Button type="primary" onClick={handleGoBack}>
        Bosh sahifaga qaytish
      </Button>
    </div>
  );
};

export default Unauthorized;
