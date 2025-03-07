import React, { useState, useEffect } from 'react'
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi'

const DashboardHeader = ({ sidebarOpen, setSidebarOpen }: any) => {
  const [profileDetails, setProfileDetails] = useState<any>([])

  const navigate = useNavigate();

  const getUserDetails = async () => {

    try {
      const getData = await getUserProfile();
      if (getData) {
        setProfileDetails(getData.data)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    getUserDetails()
  }, []);

  const handleProfile = () => {
    navigate('/profile')
  }
  return (
    <header className="flex items-center justify-between w-full px-6 py-4
    bg-white shadow-md" style={{ borderBottom: '3px solid #3D52A0' }}>
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars className='w-6 h-6' />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden lg:block text-right">
          <h4 className="text-gray-700 font-medium">
            {profileDetails.name || "User"}
          </h4>
          <p className="text-gray-500 text-sm">
            {profileDetails.email || "email@example.com"}
          </p>
        </div>
        <img
          src={profileDetails.avatar || 'https://via.placeholder.com/150'}
          alt="Avatars"
          onClick={handleProfile}
          className="w-10 h-10 rounded-full border-2 border-transparent hover:border-[#69B99D] transition-all duration-200 cursor-pointer" />
      </div>
    </header>
  )
}

export default DashboardHeader
