'use client'
import Image from 'next/image'
import { ModalContext } from '@/context/ModalContext'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const ModalChat = () => {

    const { isOpen, closeModal } = useContext(ModalContext);

    const showModal = {
        display: isOpen ? 'flex' : 'none', // Condicional para mostrar u ocultar
    };
    const [data, setData] = useState({
        _id: "",
        username: "",
        fullname: "",
        age: "",
    });

    const router = useRouter();

    useEffect(() => {
        getUserDetails()
    }, [])


    const getUserDetails = async () => {
        const res = await axios.get('/api/users/userdata')
        setData((prevData) => res.data.data);

    }
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("Salida efectuada")
            router.push("/login")
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    return (<div className="bg-[#B8ECD1] z-50 hidden h-screen pt-6 fixed flex-col justify-between w-[60vw] md:w-[33.5vw] lg:w-[23.5vw]" style={showModal}>
        <div className=" flex items-center justify-between w-full ">
            <div className='flex items-center ml-6'>
                <p className=" text-green-3 mr-2 max-[50%]">{data === undefined ? "User" : data?.username}</p>
                <div className=" bg-[#87CEEB] rounded-full overflow-hidden">
                    <Image src="/images/profile-picture-user-m.png" alt="profile-picture" width={40} height={40} />
                </div>
            </div>
            <div className=' flex justify-end pr-4 py-4' onClick={closeModal} >
                <Image className='cursor-pointer' width={20} height={20} src="/icons/close.png" alt="close" />
            </div>
        </div>
        <div className="flex items-center justify-start w-full pl-6 pb-6 ">
            <div onClick={logout} className="cursor-pointer">
                <Image src="/icons/logout.png" alt="logout" width={30} height={30} />
            </div>
            <p onClick={logout} className="ml-2 cursor-pointer text-green-3">Salir</p>
        </div>
    </div>)

}

export default ModalChat