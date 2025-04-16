"use client"

import { useState, useEffect } from "react"

export default function IDCard() {
  const [showFront, setShowFront] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [users, setUsers] = useState<any[]>([])
  const [currentUserIndex, setCurrentUserIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/students')
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        console.log(data);
        
        setUsers(data)
        setUserData(data[0]) // Set first user as default
      } catch (err) {
        console.error('Error fetching data:', err)
      }
    }

    fetchData()
  }, [])

  const toggleSide = () => {
    setShowFront(!showFront)
  }

  const nextUser = () => {
    const nextIndex = (currentUserIndex + 1) % users.length
    setCurrentUserIndex(nextIndex)
    setUserData(users[nextIndex])
  }

  const prevUser = () => {
    const prevIndex = (currentUserIndex - 1 + users.length) % users.length
    setCurrentUserIndex(prevIndex)
    setUserData(users[prevIndex])
  }

  if (!userData || users.length === 0) return (
    <div className="w-[639px] h-[1011px] bg-white rounded-lg shadow-xl overflow-hidden border-4 border-purple-800 flex items-center justify-center">
      <div className="text-purple-700 text-lg">Loading ID card data...</div>
    </div>
  )

  return (
    <div className="flex flex-col items-center">
  
      {/* Navigation buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={prevUser}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={nextUser}
          className="bg-purple-600 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>

      {/* Display current user position */}
      <div className="mb-4 text-purple-800 font-medium">
        User {currentUserIndex + 1} of {users.length}
      </div>

      {/* ID Card */}
      <div className="w-[639px] h-[1011px] bg-white rounded-lg shadow-xl overflow-hidden border-4 border-purple-800">
        {/* ID Card container */}
        <div className="relative w-full h-full">
          {/* Actual ID Card */}
          <div
            className="w-full h-full cursor-pointer"
            onClick={toggleSide}
          >
            {showFront ? (
              // Front side - Simplified design
              <div className="w-full h-full bg-white flex flex-col">
                {/* College header */}
                <div className="bg-purple-800 py-4 px-6 text-white text-center border-b-4 border-yellow-400">
                  <img src="https://keshav.du.ac.in/img/logo.png" alt="" className="-mt-3 h-[120px] m-auto" />
                  <h1 className="text-[36px] font-bold uppercase tracking-wide">KESHAV MAHAVIDYALAYA</h1>
                  <p className="text-[20px] mt-1">NAAC ACCREDITED INSTITUTION-"A"GRADE</p>
                  <p className="text-[18px]">H-4-5, ZONE PITAMPURA, DELHI-34</p>
                  <p>PH.: 011-27018805, TELEFAX: 011-27018806</p>
                  <p className="text-[18px]">(UNIVERSITY OF DELHI)</p>
                </div>

                {/* Card title */}
                <div className="bg-yellow-400 py-2 px-6 text-center">
                  <h2 className="text-[28px] font-bold uppercase tracking-wider text-purple-900">
                    STUDENT IDENTITY CARD
                  </h2>
                </div>

                {/* Main content area */}
                <div className="flex flex-col p-6 flex-grow">
                  {/* Top section - Photo and basic info */}
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Photo */}
                    <div className="w-1/3 ">
                      <div className="border-2 border-purple-600 rounded-md overflow-hidden shadow-md">
                        <img src={userData.studentPhoto} alt="" className="object-center object-cover w-full h-[170px]" />
                      </div>
                    </div>

                    {/* Name and ID */}
                    <div className="pl-4 flex flex-col justify-center">
                      <h1 className="text-[38px] font-bold text-purple-900 uppercase mb-2">{userData.studentName}</h1>

                      <p className="text-[26px] font-semibold text-purple-800 mb-2">B.Sc. (Bachelor of Science)</p>
                      <p className="text-[26px] font-semibold text-purple-800 mb-2">Physical Science with Computer Science</p>


                      <div className="bg-purple-100 inline-block px-6 py-2 rounded-md mb-2">
                        <p className="text-[24px] text-left font-bold text-purple-900">Enrollment No : {userData.enrollmentNumber}</p>
                      </div>
                      <div className="bg-purple-100 inline-block px-6 py-2 rounded-md">
                        <p className="text-[24px] text-left font-bold text-purple-900">Roll No : {userData.collegeRollNumber}</p>
                      </div>
                      <p className="text-[26px] font-semibold text-purple-800 mb-2">
                      </p>

                    </div>
                  </div>

                  {/* Signatures section */}
                  <div className="flex justify-between mt-auto px-4">
                    <div className="text-center w-1/2">
                      <div className="h-12 border-b-2 border-purple-800 w-48 mb-1 mx-auto">
                        <img src="/sign.png" alt="" className="h-[50px]" />

                      </div>
                      <span className="text-sm font-medium text-purple-900">Student Signature</span>
                    </div>
                    <div className="text-center w-1/2">
                      <div className="h-12 border-b-2 border-purple-800 w-48 mb-1 mx-auto">
                        <img src="/" alt="" className="h-[50px]" />

                      </div>
                      <span className="text-sm font-medium text-purple-900">Principal Signature</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-purple-800 py-2 px-6 text-white text-center border-b-4 border-yellow-400">
                  <p className="text-[18px]">
                    {userData.batch}
                  </p>
                </div>


              </div>
            ) : (
              // Back side - Updated design with personal details
              <div className="w-full h-full bg-white flex flex-col border-4 border-purple-800">
                {/* College header */}
                <div className="bg-purple-800 py-5 px-6 gap-1 text-white text-center flex items-center justify-center">
                  <div className="w-14 h-14 bg-white rounded-full border-4 border-yellow-400 overflow-hidden mr-4">
                    <img src="https://keshav.du.ac.in/img/logo.png" alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <h1 className="text-[36px] font-bold uppercase tracking-wide">KESHAV MAHAVIDYALAYA</h1>
                </div>

                {/* QR Code */}
                <div className="flex flex-col items-center justify-center mt-4 mb-2">
                  <div className="border-4 border-purple-600 p-1 bg-white rounded-md shadow-lg">
                    <div className="w-48 h-48 bg-white flex items-center justify-center">
                      <img src={userData.qrCode} alt="qr code" className="h-full w-full" />
                    </div>
                  </div>
                  <p className="text-[18px] mt-3 text-center font-medium text-purple-900">
                    Scan QR for verification
                  </p>
                </div>

                {/* Personal Details Section */}
                <div className="p-6 flex-grow">
                  <h3 className="text-[24px] font-bold text-purple-800">Personal Details</h3>
                  <hr className="mb-4 text-purple-800" />
                  <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-[18px] mb-6">
                    <div className="flex flex-col">
                      <span className="text-purple-600 font-medium">Father's Name</span>
                      <span className="font-bold">{userData.fatherName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-purple-600 font-medium">Mother's Name</span>
                      <span className="font-bold">{userData.motherName}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-purple-600 font-medium">Date of Birth</span>
                      <span className="font-bold">{userData.dob}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-purple-600 font-medium">Blood Group</span>
                      <span className="font-bold">{userData.bloodGroup}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-purple-600 font-medium">Batch</span>
                      <span className="font-bold">{userData.batch}</span>
                    </div>

                  </div>

                  {/* Contact info */}
                  <div className="mb-6">
                    <h3 className="text-[24px] font-bold text-purple-800">Emergency Contact</h3>
                    <hr className="mb-4 text-purple-800" />
                    <div className="flex items-center gap-2 text-[18px] mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <span>{userData.emergencyContact}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[18px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{userData.address}</span>
                    </div>
                  </div>



                  {/* Rules */}
                  <div className="border-t-2 border-b-2 border-purple-200 py-2 mb-4">
                    <ul className="text-[16px] text-purple-900 space-y-2">
                      <li className="font-semibold">• This card is property of <span className="font-bold text-black">KESHAV MAHAVIDYALAYA</span></li>
                      <li>• Must be carried at all times within campus</li>
                      <li>• Not transferable</li>
                      <li>• Loss should be reported immediately</li>
                    </ul>
                  </div>

                  {/* Validity */}
                  <div className="text-center mb-4">
                    <p className="text-[16px]">
                      <span className="font-semibold">Issued on:</span> {userData.issueDate} |
                      <span className="font-semibold"> Valid until:</span> {userData.validityDate}
                    </p>
                  </div>


                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}