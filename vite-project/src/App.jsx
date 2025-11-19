import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import SplashScreen from './components/SplashScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <RouterProvider router={router} />;
}

export default App;
