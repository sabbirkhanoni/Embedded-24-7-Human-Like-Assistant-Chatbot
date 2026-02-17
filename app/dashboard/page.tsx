"use client"
import StartupForm from '@/components/dashboard/StartupForm'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TrophySpin } from 'react-loading-indicators'

const page = () => {

  const [checkStartupData, setCheckStartupData] = useState(false)
  const [loading, setLoading] = useState(true);


  const getStartupData = async () => {
    const response = await axios.get(
      "/api/startup/get"
    );

    setCheckStartupData(response.data.exists);
    setLoading(false);
  }

  useEffect(() => {
    getStartupData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <TrophySpin color="#32cd32" size="medium" text="" textColor="" />
      </div>
    )
  }


  return (
    <section>
        {
          !checkStartupData ? (
            <StartupForm />
          ) : (
            <div>
              
            </div>
          )  
        }
    </section>
  )
}

export default page
