import React, { FC, useEffect, useState } from 'react'
import UserAnalytics from '../Analytics/UserAnalytics'
import { BiBorderLeft } from 'react-icons/bi'
import { PiUsersFourLight } from 'react-icons/pi'
import { Box, CircularProgress } from '@mui/material'
import OrderAnalytics from '../Analytics/OrderAnalytics'
import AllInvoices from '../Order/AllInvoices'
import { useGetOrderAnalyticsQuery, useGetUserAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'

type Props = {
    open?: boolean
    value?: number
}

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
    return (
        <Box sx={{ position: "relative", display: "inline-flex" }}>

            <CircularProgress
                variant='determinate'
                value={value}
                size={45}
                color={value && value > 99 ? "info" : "error"}
                thickness={4}
                style={{ zIndex: open ? -1 : 1 }}
            />

            <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}>

            </Box>

        </Box>
    )
}

const DashboardWidgets: FC<Props> = ({ open }: Props) => {

    const [orderComparePercentage, setOrderComparePercentage] = useState<any>()
    const [userComparePercentage, setUserComparePercentage] = useState<any>()

    const { data: userData, isLoading: userDLoading } = useGetUserAnalyticsQuery({})
    const { data: orderData, isLoading: orderDLoading } = useGetOrderAnalyticsQuery({})


    useEffect(() => {
        if (userDLoading && orderDLoading) {
            return
        } else {
            if (userData && orderData) {
                const userDataL2M = userData.users.last12Months.slice(-2)
                const orderDataL2M = orderData.orders.last12Months.slice(-2)

                if (userDataL2M.length === 2 && orderDataL2M.length === 2) {
                    const usersCurrentMonth = userDataL2M[1].count
                    const usersPrevMonth = userDataL2M[0].count

                    const ordersCurrentMonth = orderDataL2M[1].count
                    const ordersPrevMonth = orderDataL2M[0].count

                    const usersPercentChange = usersPrevMonth !== 0 ?
                        ((usersCurrentMonth - usersPrevMonth) / usersPrevMonth * 100) : 100
                    const ordersPercentChange = ordersPrevMonth !== 0 ?
                        ((ordersCurrentMonth - ordersPrevMonth) / ordersPrevMonth * 100) : 100

                    setUserComparePercentage({
                        currentMonth: usersCurrentMonth,
                        previousMonth: usersPrevMonth,
                        percentChange: usersPercentChange,
                    })

                    setOrderComparePercentage({
                        currentMonth: ordersCurrentMonth,
                        previousMonth: ordersPrevMonth,
                        percentChange: ordersPercentChange,
                    })
                }
            }
        }
    }, [userDLoading, orderDLoading, orderData, userData])


    return (

        <div className='mt-[30px] min-h-screen'>
            {/*User*/}
            <div className='grid grid-cols-[75%,25%]'>

                <div className='p-8'>
                    <UserAnalytics isDashboard={true} />
                </div>

                <div className='pt-[80px] pr-8'>
                    <div className='w-full dark:bg-[#111C43] rounded-sm shadow'>
                        <div className='flex items-center p-5 justify-between'>
                            <div>
                                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                <h5 className='pt-2 font-Montserrat dark:text-[#fff] text-black text-[20px]'>
                                    {orderComparePercentage?.currentMonth}
                                </h5>
                                <h5 className='py-2 font-Montserrat dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    Sales Obtained
                                </h5>
                            </div>
                            <div>
                                <CircularProgressWithLabel value={
                                    orderComparePercentage?.percentChange > 0
                                        ? 100
                                        : 1} open={open} />
                                <h5 className='dark:text-[#45CBA0] text-[#000] text-center pt-4'>
                                    {orderComparePercentage?.percentChange > 0
                                        ? '+' + orderComparePercentage?.percentChange.toFixed(2)
                                        : orderComparePercentage?.percentChange.toFixed(2)} %
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className='w-full dark:bg-[#111C43] rounded-sm shadow'>
                        <div className='flex items-center p-5 justify-between'>
                            <div className=''>
                                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                                <h5 className='pt-2 font-Montserrat dark:text-[#fff] text-black text-[20px]'>
                                    {userComparePercentage?.currentMonth}
                                </h5>
                                <h5 className='py-2 font-Montserrat dark:text-[#45CBA0] text-black text-[20px] font-[400]'>
                                    New Users
                                </h5>
                            </div>
                            <div>
                                <CircularProgressWithLabel value={
                                    userComparePercentage?.percentChange > 0
                                        ? 100
                                        : 10
                                } open={open} />
                                <h5 className='dark:text-[#45CBA0] text-[#000] text-center pt-4'>
                                    {userComparePercentage?.percentChange > 0
                                        ? '+' + userComparePercentage?.percentChange.toFixed(2)
                                        : userComparePercentage?.percentChange.toFixed(2)} %
                                </h5>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/*Order*/}
            <div className='grid grid-cols-[65%,35%] mt-[-20px]'>
                <div className='dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto'>
                    <OrderAnalytics isDashboard={true} />
                </div>

                <div className='p-5'>
                    <h5 className='dark:text-[#fff] text-black text-[20px] font-[400] font-Montserrat pb-3'>
                        Recent Transactions
                    </h5>
                    <AllInvoices isDashBoard={true} />
                </div>
            </div>
        </div>


    )
}

export default DashboardWidgets