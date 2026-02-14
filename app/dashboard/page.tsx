"use client"
import StartupForm from '@/components/dashboard/StartupForm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = () => {

  const [checkStartupData, setCheckStartupData] = useState(false)
  const [loading, setLoading] = useState(true);


  const getStartupData = async () => {
    const response = await axios.get(
      "/api/startup/get"
    );
    setCheckStartupData(response.data.exists);
    console.log("Startup data exists:", response.data.exists);
    setLoading(false);
  }

  useEffect(() => {
    getStartupData();
  }, []);

  if (loading) {
    return <div  className="flex-1 p-4 items-center justify-center w-full h-screen">
      <p>Loading...</p>
    </div>;
  }


  return (
    <section>
        {
          !checkStartupData ? (
            <StartupForm />
          ) : (
            <div>
              <h2>Startup Data</h2>
              {/* Render the startup data here */}
            </div>
          )  
        }
    </section>
  )
}

export default page
