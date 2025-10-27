import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirigir automáticamente al login de usuario
    navigate('/login');
  }, [navigate]);

  return null;
};

export default Index;
