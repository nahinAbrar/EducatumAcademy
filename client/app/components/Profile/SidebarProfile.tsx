import Image from 'next/image';
import React, { FC } from 'react'
import avatarDefault from "../../../public/assets/avatar.png"
import { RiLockPasswordLine } from 'react-icons/ri';
import { SiCoursera } from 'react-icons/si';
import { AiOutlineLogout } from 'react-icons/ai';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import Link from 'next/link';

type Props = {
    user: any;
    active: number;
    avatar: string | null;
    setActive: (active: number) => void;
    logOutHandler: any;
}

const SidebarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
    return (
        <div className='w-full'>

            {/*First Row*/}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "bg-white dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(1)}>

                <Image
                    src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
                    alt='avatar'
                    width={20}
                    height={20}
                    className='w-[20px] h-[20px] 800px:w-[20px] 800px:h-[20px] cursor-pointer rounded-full'
                />

                <h5 className='hidden pl-2 800px:block font-Montserrat text-black dark:text-white'>
                    My Account
                </h5>

            </div>

            {/*Second Row*/}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "bg-white dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20} fill="#273c75" />
                <h5 className='hidden pl-2 800px:block font-Montserrat text-black dark:text-white'>Change Password</h5>
            </div>

            {/*Third Row*/}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "bg-white dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20} fill="#273c75" />
                <h5 className='hidden pl-2 800px:block font-Montserrat text-black dark:text-white'>My Courses</h5>
            </div>


            {/*ADMIN ONLY Row*/}
            {
                user.role === "admin" && (

                    <Link
                        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "bg-white dark:bg-slate-800" : "bg-transparent"}`}
                        href={"/admin"}
                    >
                        <MdOutlineAdminPanelSettings size={20} fill="#273c75" />
                        <h5 className='hidden pl-2 800px:block font-Montserrat text-black dark:text-white'>Admin Panel</h5>
                    </Link>
                )
            }

            {/*Fourth Row*/}
            <div
                className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "bg-white dark:bg-slate-800" : "bg-transparent"}`}
                onClick={() => logOutHandler()}
            >
                <AiOutlineLogout size={20} fill="#273c75" />
                <h5 className='hidden pl-2 800px:block font-Montserrat text-black dark:text-white'>Log Out</h5>
            </div>

        </div>
    )
}

export default SidebarProfile