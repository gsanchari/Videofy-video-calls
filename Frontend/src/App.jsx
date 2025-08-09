import React, { useState } from 'react'

import {  Navigate, Routes, Route } from 'react-router'
import { Toaster, toast } from 'react-hot-toast';
import useAuthUser from './hookes/useAuthUser.js';

import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import OnbordingPage from './pages/OnbordingPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import ChatPage from './pages/ChatPage.jsx';

import PageLoader from './components/PageLoader.jsx';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';





const App = () => {

  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // useEffect(() =>{
  //   const getData = async ()=>{
  //     setIsLoading(true);
  //     try {
  //       const data = await fetch("https://jsonplaceholder.typicode.com/todos");
  //       const json = await data.json();
  //       setData(json);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  // }, []);

  // console.log(data); 

  const {isLoading, authUser} = useAuthUser();

  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading){
    return(
      <PageLoader/>
    )
  }

  
  return (
    <div className="h-screen" data-theme={theme}>

      {/* <button onClick={() => setTheme('night')}>update to night</button> */}
    
      <Routes>
        <Route path="/"
          element={ isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }/>

        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />
          }
        />

         <Route path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (<OnbordingPage />) : (<Navigate to="/" />)
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
