'use client';
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '@/store/userSlice';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RootLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { userData } = useSelector((state) => state.user);

    useEffect(() => {
        if (!userData) {
            dispatch(getUserData());
        }
        setIsClient(true);
    }, [userData, dispatch]);

    useEffect(() => {
        if (userData && userData.role !== "Admin") {
            toast.error("Unauthorized access");
            navigate.replace('/home');
        }
    }, [userData, navigate]);

    if (!isClient) return <div>Loading...</div>;

    if (!userData) {
        return <div className='w-full min-h-screen text-center'>Not Authorized</div>;
    }
    return (
        <div className="w-full flex flex-row">
            <div className="w-[250px] min-h-screen flex flex-col pt-5 bg-blue-500 shadow-lg">
                <aside className="h-[100%] flex flex-col items-center justify-start space-y-10 px-4 py-5">
                    <div className="text-white text-2xl font-bold mb-8">Admin Panel</div>
                    <ul className="flex flex-col gap-6 w-full">
                        <li className="w-full hover:bg-blue-700 transition duration-300 rounded-md">
                            <Link href={"/v1/admin"} className="block text-white py-3 px-6">Admin Dashboard</Link>
                        </li>
                        <li className="w-full hover:bg-blue-700 transition duration-300 rounded-md">
                            <Link href={"/v1/admin/component/movie"} className="block text-white py-3 px-6">Movie Dashboard</Link>
                        </li>
                        <li className="w-full hover:bg-blue-700 transition duration-300 rounded-md">
                            <Link href={"/v1/admin/component/shows"} className="block text-white py-3 px-6">Show Dashboard</Link>
                        </li>
                        <li className="w-full hover:bg-blue-700 transition duration-300 rounded-md">
                            <Link href={"/v1/admin/component/theatre"} className="block text-white py-3 px-6">Theatre Dashboard</Link>
                        </li>
                    </ul>
                </aside>
            </div>
            <main className="w-full min-h-screen bg-gray-100 ">
                {children}
            </main>
        </div>
    );
}
