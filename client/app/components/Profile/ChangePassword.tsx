import React, { FC, useEffect, useState } from 'react'
import { styles } from '../../../app/styles/style'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi';
import { updatePassword } from '../../../../server/controllers/user.controller';
import toast from 'react-hot-toast';

type Props = {}

const ChangePassword: FC<Props> = (props) => {
    
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

    const passwordChangeHandler = async (e: any) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Password Do not match!!");
        } else {
            await updatePassword({ oldPassword, newPassword });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("Password Changed Successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorData = error as any;
                toast.error(errorData.data.message);
            }
        }
    }, [isSuccess, error])

    return (

        <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
            <h1 className='block text-[25px] 800px:text-[30px] font-Montserrat text-center text-black dark:text-[#fff] pb-2'>
                Change Password
            </h1>

            <div className='w-full'>
                <form
                    aria-required
                    onSubmit={passwordChangeHandler}
                    className='flex flex-col items-center'
                >
                    <div className='w-[100%] 800px:w-[60%] mt-5'>
                        <label className='block pb-2 text-black dark:text-[#fff]'>
                            Enter Old Password
                        </label>

                        <input
                            aria-label='password Label'
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className='w-[100%] 800px:w-[60%] mt-2'>
                        <label className='block pb-2 text-black dark:text-[#fff]'>
                            Enter New Password
                        </label>

                        <input
                            aria-label='password Label'
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className='w-[100%] 800px:w-[60%] mt-2'>
                        <label className='block pb-2 text-black dark:text-[#fff]'>
                            Confirm Password
                        </label>

                        <input
                            aria-label='password Label'
                            type="password"
                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <input
                            type="submit"
                            value="Update"
                            required
                            className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-xl mt-9 ml-2 cursor-pointer`}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword