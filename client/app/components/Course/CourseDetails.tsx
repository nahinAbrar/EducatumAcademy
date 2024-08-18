import Ratings from '@/app/utils/Ratings'
import React from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { useSelector } from 'react-redux'

type Props = {
    data: any
}

const CourseDetails = ({ data }: Props) => {
    const { user } = useSelector((state: any) => state.auth);

    const discountPercentage = ((data?.estimatedPrice - data.price) / (data?.estimatedPrice) * 100)
    const discountPercentagePrice = discountPercentage.toFixed(0)

    const isPurchased = user && user?.courses?.find((item: any) => item._id === data._id)
    const handleOrder = (e: any) => {
        console.log("TAKE THE ORDER BRO!")
    }
    return (
        <div>
            <div className='w-[90%] 800px:w-[90%] m-auto py-5'>
                <div className='w-full flex flex-col-reverse 800px:flex-row'>
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

                            {/*Course Content List*/}

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

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetails