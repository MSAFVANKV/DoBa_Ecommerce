import { useEffect, useState } from "react";
import "./App.css";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AdminLayout from "./Components/Layout/AdminLayout";
import "./Styles/Home.css";
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './ReduxToolKit/Store'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => setIsLoading(false);
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
  return (
    // <PersistGate loading={null} persistor={persistor}>
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          <Layout />
          {/* <Routes>
        <Route path='/admin' element={<AdminLayout/>}/>
     </Routes> */}
          <AdminLayout />
        </>
      )}
    </>
  );
}

export default App;
