import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import { Box, Toolbar } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React, { FC, useEffect, useState } from 'react'
import Loader from '../../Loader/Loader'
import { format } from 'timeago.js'
import { useGetAllOrdersQuery } from '@/redux/features/orders/ordersApi'
import { useGetAllUserQuery } from '@/redux/features/user/userApi'
import { AiOutlineMail } from 'react-icons/ai'


type Props = {
    isDashBoard?: boolean
}

const AllInvoices = ({ isDashBoard }: Props) => {

    const { theme, setTheme } = useTheme();
    const { isLoading, data } = useGetAllOrdersQuery({});
    const { data: userData } = useGetAllUserQuery({});
    const { data: coursesData } = useGetAllCoursesQuery({});

    const [orderData, setOrderData] = useState<any>([])

    useEffect(() => {
        if (data) {
            const temp = data.orders.map((item: any) => {
                const user = userData?.users.find(
                    (user: any) => user._id === item.userId
                )
                const course = coursesData?.courses.find(
                    (course: any) => course._id === item.courseId
                )
                return {
                    ...item,
                    userName: user?.name,
                    userEmail: user?.email,
                    title: course?.name,
                    price: "$" + course?.price,
                }
            })
            setOrderData(temp)
        }
    }, [data, userData, coursesData])

    const columns: any = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "userName", headerName: "Name", flex: isDashBoard ? .6 : .5 },
        ...(isDashBoard
            ? [] : [
                { field: "userEmail", headerName: "Email", flex: 1 },
                { field: "title", headerName: "CourseTitle", flex: 1 },
            ]
        ),
        { field: "price", headerName: "Price", flex: 0.5 },
        ...(isDashBoard)
            ? [
                { field: "created_at", headerName: "Created At", flex: 0.5 },
            ] :
            [
                {
                    field: " ",
                    headerName: "Email",
                    flex: 0.2,
                    renderCell: (params: any) => {
                        return (
                            <a href={`mailto:${params.row.userEmail}`}>
                                <AiOutlineMail
                                    className='dark:text-white text-black'
                                    size={20}
                                />
                            </a>
                        )
                    }
                }
            ]
    ]

    
    const rows: any = [
        {
            id: "122132",
            userName: "Nahin",
            userEmail: "asmnahin21@gmail.com",
            title: "Next JS Course",
            price: "6500",
            created_at: "3 days ago",
        },
        {
            id: "122133",
            userName: "Amina",
            userEmail: "amina.khan@example.com",
            title: "React JS Course",
            price: "7500",
            created_at: "1 week ago",
        },
        {
            id: "122134",
            userName: "Siddharth",
            userEmail: "sid.mehta@example.com",
            title: "Angular Course",
            price: "6000",
            created_at: "5 days ago",
        },
        {
            id: "122135",
            userName: "Priya",
            userEmail: "priya.verma@example.com",
            title: "Vue JS Course",
            price: "5500",
            created_at: "2 days ago",
        },
        {
            id: "122136",
            userName: "Rahul",
            userEmail: "rahul.singh@example.com",
            title: "Node JS Course",
            price: "8000",
            created_at: "3 weeks ago",
        },
        {
            id: "122137",
            userName: "Meera",
            userEmail: "meera.shah@example.com",
            title: "Express JS Course",
            price: "7000",
            created_at: "4 days ago",
        },
        {
            id: "122138",
            userName: "Ali",
            userEmail: "ali.ahmed@example.com",
            title: "JavaScript Basics",
            price: "4500",
            created_at: "6 days ago",
        },
        {
            id: "122139",
            userName: "Nina",
            userEmail: "nina.patel@example.com",
            title: "TypeScript Essentials",
            price: "5000",
            created_at: "1 day ago",
        },
        {
            id: "122140",
            userName: "Rohan",
            userEmail: "rohan.kumar@example.com",
            title: "React Native Course",
            price: "7200",
            created_at: "2 weeks ago",
        },
        {
            id: "122141",
            userName: "Fatima",
            userEmail: "fatima.begum@example.com",
            title: "Redux Advanced",
            price: "6700",
            created_at: "10 days ago",
        }
    ];
    
    orderData &&
        orderData.forEach((item: any) => {
            rows.push({
                id: item._id,
                userName: item.userName,
                userEmail: item.userEmail,
                title: item.title,
                price: item.price,
                created_at: format(item.createdAt),
            })
        })



    return (
        <div className={!isDashBoard ? 'mt-[120px]' : 'mt-0'}>
            {isLoading ? (<Loader />) :
                (
                    <Box m={isDashBoard ? "0" : "40px"}>
                        <Box
                            m={isDashBoard ? "0" : "40px 0 0 0"}
                            height={isDashBoard ? "35vh" : "90vh"}
                            overflow={"hidden"}
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom:
                                        theme === "dark" ?
                                            "1px solid #ffffff30!important"
                                            : "1px solid #ccc!important"
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeader": {
                                    borderBottom: "none",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-VirtualScroller": {
                                    color: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC"
                                },
                                "& .MuiCheckbox-root": {
                                    color: theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                                },
                                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                    color: `#fff !important`,
                                },
                            }}
                        >

                            <DataGrid 
                            checkboxSelection={isDashBoard? false:true}
                            rows={rows}
                            columns={columns}
                            components={isDashBoard?{}:{Toolbar:GridToolbar}}
                            />

                        </Box>

                    </Box>
                )

            }
        </div>
    )
}

export default AllInvoices