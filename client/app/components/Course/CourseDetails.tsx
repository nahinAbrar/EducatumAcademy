import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import CourseContentList from './CourseContentList'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../payment/CheckoutForm'
import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import Image from 'next/image'
import { RiVerifiedBadgeFill } from 'react-icons/ri'

type Props = {
    data: any
    clientSecret: string
    stripePromise: any
    setRoute: any
    setOpen: any
}

const CourseDetails = ({ data, clientSecret, stripePromise, setRoute, setOpen: openAuthModal }: Props) => {
    const { data: userData } = useLoadUserQuery(undefined, {})

    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<any>("")

    const discountPercentage = ((data?.estimatedPrice - data.price) / (data?.estimatedPrice) * 100)
    const discountPercentagePrice = discountPercentage.toFixed(0)

    useEffect(() => {
        setUser(userData?.user)
    }, [userData])

    const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id)
    const handleOrder = (e: any) => {
        if (user) {
            setOpen(true)
        } else {
            setRoute("Login")
            openAuthModal(true)
        }
    }


    return (
        <div>
            <div className='w-[90%] 800px:w-[90%] m-auto py-5'>

                <div className='w-full flex flex-col-reverse 800px:flex-row'>

                    {/*LEFT*/}
                    <div className='w-full 800px:w-[65%] 800px:pr-5'>

                        <h1 className='text-[25px] font-Montserrat font-[600] text-black dark:text-white'>
                            {data.name}
                        </h1>

                        <div className='flex items-center justify-between pt-3'>
                            <div className='flex items-center'>

                                <Ratings rating={data.ratings} />
                                <h5 className='text-black dark:text-white'>
                                    {data.reviews?.length} Reviews
                                </h5>
                            </div>

                            <h5 className='text-black dark:text-white'>
                                {data.purchased} Students
                            </h5>

                        </div>
                        <br />

                        <h1 className='text-black dark:text-white text-[25px] font-Montserrat font-[600]'>
                            What you will learn from this course?
                        </h1>

                        <div>
                            {data.benefits?.map((item: any, index: number) => (
                                <div className='w-full flex 800px:items-center py-2'
                                    key={index}>
                                    <div className='w-[15px] mr-1'>
                                        <IoCheckmarkDoneOutline size={20} className='text-black dark:text-white' />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>

                        <h1 className='text-black dark:text-white text-[25px] font-Montserrat font-[600]'>
                            What are the prerequisites for starting this course?
                        </h1>
                        {data.prerequisites?.map((item: any, index: number) => (
                            <div className='w-full flex 800px:items-center py-2'
                                key={index}>
                                <div className='w-[15px] mr-1'>
                                    <IoCheckmarkDoneOutline size={20} className='text-black dark:text-white' />
                                </div>
                                <p className='pl-2 text-black dark:text-white'>
                                    {item.title}
                                </p>
                            </div>
                        ))}
                        <br />
                        <br />
                        <div>

                            <h1 className='text-black dark:text-white text-[25px] font-Montserrat font-[600]'>
                                Course Overview
                            </h1>

                            {/*Course Content List -- Hardest Part*/}
                            <CourseContentList
                                data={data?.courseData}
                                isDemo={true}
                            />

                        </div>
                        <br />
                        <br />
                        {/*Course Content*/}
                        <div className='w-full'>

                            <h1 className='text-black dark:text-white text-[25px] font-Montserrat font-[600]'>
                                Course Details
                            </h1>
                            <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                                {data.description}
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className='w-full'>
                            <div className='800px:flex items-center'>
                                <Ratings rating={data?.ratings} />
                                <div className='mb-2 800px:mb-[unset]' />
                                <h5 className='text-[25px] font-Montserrat text-black dark:text-white'>
                                    {Number.isInteger(data?.ratings) ? data?.ratings.toFixed(1) :
                                        data?.ratings.toFixed(2)}{" "}
                                    Course Rating || {data?.reviews?.length} Reviews
                                </h5>
                            </div>
                            <br />
                            {(data?.reviews && [...data.reviews].reverse()).map((item: any, index: number) => (
                                <div className='w-full pb-4' key={index}>
                                    <div className='flex'>
                                        <Image
                                            src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/dvrsqx37x/image/upload/v1724142586/avatars/ocok4wwjwicc4pacsnqi.png"}
                                            width={50}
                                            height={50}
                                            alt="avatar pic"
                                            className='w-[50px] h-[50px] rounded-full'
                                        />
                                        <div className='hidden 800px:block pl-2'>
                                            <div className='flex items-center'>

                                                <h5 className='text-[18px] text-black dark:text-white pr-2'>
                                                    {item.user.name}
                                                </h5>
                                                <Ratings rating={item.rating} />
                                            </div>
                                            <p className='text-black dark:text-white'>{item.comment}</p>
                                            <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                {format(item.createdAt)}
                                            </small>
                                        </div>
                                        <div className='pl-2 flex 800px:hidden items-center'>
                                            <h5 className='text-[18px] text-black dark:text-white pr-2'>
                                                {item.user.name}
                                            </h5>
                                            <Ratings rating={item.rating} />
                                        </div>
                                    </div>
                                    {item.commentReplies.map((item: any, index: number) => (
                                        <div className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'>
                                            <div>
                                                <Image
                                                    src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/dvrsqx37x/image/upload/v1724142586/avatars/ocok4wwjwicc4pacsnqi.png"}
                                                    width={50}
                                                    height={50}
                                                    alt="avatar pic"
                                                    className='w-[50px] h-[50px] rounded-full'
                                                />
                                            </div>
                                            <div className='pl-2 w-[80%]'>
                                                <div className="flex items-center gap-1">
                                                    <h5 className='text=[20px]'>{item.user.name}</h5>
                                                    {item.user.role === "admin" && <RiVerifiedBadgeFill className='text-[#0984e3] text-[18px]' />}
                                                </div>
                                                <p>{item.comment}</p>
                                                <small className='text-slate-600 dark:text-gray-200'>
                                                    {format(item.createdAt)} .
                                                </small>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>


                    </div>

                    {/*RIGHT*/}
                    <div className='w-full 800px:w-[35%] relative'>
                        <div className='sticky top-[100px] left-0 z-50 w-full'>
                            <CoursePlayer
                                videoUrl={data?.demoUrl}
                                title={data?.title}
                            />
                            <div className='flex items-center'>
                                <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                                    {data.price === 0 ? "Free" : data.price + "$"}
                                </h1>

                                <h5 className='pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                                    {data.estimatedPrice}$
                                </h5>

                                <h4 className='pl-5 pt-4 text-[22px] text-black dark:text-white'>
                                    {discountPercentagePrice}% Off
                                </h4>
                            </div>
                            <div className='flex items-center'>
                                {isPurchased ? (
                                    <Link
                                        className={`${styles.button} !w-[180px] my-3 font-sans cursor-pointer !bg-[crimson] text-white`}
                                        href={`/course-access/${data._id}`}
                                    >
                                        Enter to Course
                                    </Link>
                                ) : (
                                    <div className={`${styles.button} !w-[180px] my-3 font-sans cursor-pointer !bg-[crimson] text-white`}
                                        onClick={handleOrder}>
                                        Buy Now {data.price}$
                                    </div>
                                )

                                }
                            </div>
                            <br />
                            <p className='pb-1 text-black dark:text-white font-Montserrat'>* Source Code Included</p>
                            <p className='pb-1 text-black dark:text-white font-Montserrat'>* Lifetime Access</p>
                            <p className='pb-3 800px:pb-1 text-black dark:text-white font-Montserrat'>* Premium Support</p>
                        </div>
                    </div>
                </div>



            </div>

            <>
                {open && (
                    <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
                        <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
                            <div className='w-full flex justify-end'>
                                <IoCloseOutline
                                    size={40}
                                    className='text-black dark:text-blue-300 cursor-pointer'
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                            <div className="w-full">
                                {stripePromise && clientSecret && (
                                    <Elements stripe={stripePromise}
                                        options={{ clientSecret }}
                                    >
                                        <CheckoutForm setOpen={setOpen} data={data} user={user} />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </div>
                )

                }
            </>
        </div>
    )
}

export default CourseDetails