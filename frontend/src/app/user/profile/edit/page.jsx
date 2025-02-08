'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '@/store/userSlice'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Image from 'next/image'
import { setUserData } from '@/store/userSlice'
import { toast } from 'react-toastify'

function EditProfile() {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.user);
    const navigate = useRouter();
    const fileInputRef = useRef(null); // Reference for file input
    const [name, setName] = useState(userData ? userData.name : "");
    const [phonenumber, setPhoneNumber] = useState(userData?.phonenumber || "");
    const [profilePic, setProfilePic] = useState(userData?.profilePic || "");

    useEffect(() => {
        if (!userData) {
            dispatch(getUserData());
        } else {
            setName(userData?.name);
            setPhoneNumber(userData?.phonenumber || "");
            setProfilePic(userData?.profilePic);
        }
    }, [userData, dispatch]);

    const handleSelectUpdate = () => {
        // Trigger the hidden file input when the image is clicked
        fileInputRef.current.click();
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                const response = await axios.post("http://localhost:4000/auth/uploadProfilePic", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    withCredentials: true
                });

                const result = response.data.userData;
                dispatch(setUserData(result)); 
                setProfilePic(result.profilePic); 

                toast.success("Profile picture updated!");
            } catch (error) {
                toast.error("Error updating profile picture");
            }
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!name || !phonenumber) return;
        const updateInfo = { name, phonenumber, profilePic };
        try {
            const response = await axios.put("http://localhost:4000/auth/updateprofile", updateInfo, { withCredentials: true });
            const result = await response.data.userData;
            dispatch(setUserData(result));
            if (result) {
                navigate.push('/user/profile');
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };

    if (!userData) {
        return <div>Loading...</div>
    }

    return (
        <div className='h-[50rem] w-full bg-gradient-to-b from-blue-500 to-indigo-800 relative flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-white'>Edit Profile</h1>
            <div className='flex flex-col justify-center p-10 w-4/5 md:w-1/2 bg-white bg-opacity-40 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl space-y-6 text-black'>
                {/* Profile picture */}
                <div className="flex justify-center items-center">
                    <Image
                        src={profilePic || '/default-profile-pic.jpg'}
                        height={150}
                        width={150}
                        className="rounded-lg cursor-pointer py-2"
                        alt="profile-picture"
                        onClick={handleSelectUpdate}
                    />
                    {/* Hidden file input for selecting a new picture */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                <form className='flex flex-col gap-5' onSubmit={handleUpdate}>
                    <label htmlFor="name">
                        Name:
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label htmlFor="email">
                        Email:
                        <input type="email" id="email" name="email" value={userData?.email} disabled />
                    </label>
                    <label htmlFor="phonenumber">
                        Phone Number:
                        <input
                            type="number"
                            id="phonenumber"
                            name="phonenumber"
                            value={phonenumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;
