import { styles } from '@/app/styles/style'
import CoursePlayer from '@/app/utils/CoursePlayer'
import { useAddNewAnswerMutation, useAddNewQuestionMutation, useAddReviewMutation, useAddReviewReplyAdminMutation } from '@/redux/features/courses/coursesApi'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import { addQuestion, addAnswer } from '../../../../server/controllers/course.controller';
import toast from 'react-hot-toast'
import { format } from 'timeago.js'
import { BiMessage } from 'react-icons/bi'

type Props = {
    data: any
    id: string
    activeVideo: number
    setActiveVideo: (activeVideo: number) => void
    user: any
    refetch: any
}


const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user, refetch }: Props) => {

    const [activeBar, setActiveBar] = useState(0)
    const [question, setQuestion] = useState(" ")
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState(" ")
    const [answer, setAnswer] = useState(" ")
    const [answerId, setAnswerId] = useState("")

    const [addQuestion, { isSuccess: questionSuccess, error: questionError, isLoading: questionLoading }] = useAddNewQuestionMutation()
    const [addAnswer, { isSuccess: answerSuccess, error: answerError, isLoading: answerLoading }] = useAddNewAnswerMutation()
    const [] = useAddReviewMutation()
    const [] = useAddReviewReplyAdminMutation()

    const isReviewExists = data?.reviews?.find(
        (item: any) => item.user._id === user._id
    )

    const handleQuestionSubmit = () => {
        if (question.length === 0) {
            toast.error("Question cannot be empty!")
        } else {
            //console.log({ question, courseId: id, contentId: data[activeVideo]._id })
            addQuestion({ question, courseId: id, contentId: data[activeVideo]._id })
        }
    }

    const handleAnswerSubmit = () => {
        console.log("answer")
    }

    useEffect(() => {

        if (questionSuccess) {
            toast.success("Questions Added Successfully")
            setQuestion("")
            refetch()
        }
        if (questionError) {
            if ("data" in questionError) {
                const erMesg = questionError.data as any
                toast.error(erMesg.data.message)
            }
        }

    }, [questionSuccess, questionError, questionLoading])

    return (
        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
            <CoursePlayer
                title={data[activeVideo]?.title}
                videoUrl={data[activeVideo]?.videoUrl}
            />

            <div className='w-full flex items-center justify-between my-3'>
                <div className={`${styles.button} !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opracity-[0.8]"}`}
                    onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}
                >
                    <AiOutlineArrowLeft
                        className='mr-2'
                    />
                    Prev Lesson
                </div>

                <div className={`${styles.button} !ml-2 !w-[unset] !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opracity-[0.8]"}`}
                    onClick={() => setActiveVideo(data && data.length - 1 === activeVideo ? activeVideo : activeVideo + 1)}
                >
                    Next Lesson
                    <AiOutlineArrowRight
                        className='ml-2'
                    />

                </div>
            </div>

            <h1 className='text-black dark:text-white pt-2 text-[25px] font-[600]'>
                {data[activeVideo].title}
                <br />
            </h1>
            <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded-xl shadow-inner'>
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`text-black dark:text-white 800px:text-[20px] cursor-pointer ${activeBar === index && 'text-red-400 dark:text-teal-400'}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className='text-[18px] whitespace-pre-line mb-3 text-black dark:text-white'>
                    {data[activeVideo]?.description}
                </p>
            )}

            {activeBar === 1 && (
                <div>
                    {data[activeVideo]?.links.map((item: any, index: number) => (
                        <div className='mb-5'>
                            <h2 className='800px:text-[20px] 800px:inline-block text-black dark:text-white'>
                                {item.title && item.title + " :"}
                            </h2>
                            <a href={item.url}
                                className='inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2'>
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {activeBar === 2 && (
                <>
                    <div className='flex w-full'>
                        <Image
                            src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dvrsqx37x/image/upload/v1724142586/avatars/ocok4wwjwicc4pacsnqi.png"}
                            width={50}
                            height={50}
                            alt="avatar pic"
                            className='w-[50px] h-[50px] rounded-full'
                        />

                        <textarea
                            name="questions"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            id="questionArea"
                            cols={40}
                            rows={5}
                            placeholder="Have Confusions?"
                            className='outline-none bg-transparent ml-3 border border-black dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Montserrat text-black dark:text-white resize-none'
                        >

                        </textarea>
                    </div>

                    {/*${isLoading && "cursor-no-drop"}*/}
                    {/*onClick={isLoading ? null : handleCommentSubmit}*/}
                    <div className='w-full flex justify-end'>
                        <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5 ${questionLoading && "cursor-no-drop"}`}
                            onClick={questionLoading ? () => { } : handleQuestionSubmit}
                        >
                            Submit
                        </div>
                    </div>
                    <br />
                    <br />

                    <div className='w-full h-[1px] bg-black dark:bg-[#ffffff3b]'>

                    </div>
                    <div>
                        <CommentReply
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                            user={user}
                            setAnswerId={setAnswerId}

                        />
                    </div>
                </>
            )}

            {activeBar === 3 && (
                <div className='w-full'>
                    <>
                        {!isReviewExists && (
                            <>
                                <div className='flex w-full'>
                                    <Image
                                        src={user.avatar ? user.avatar.url : "https://res.cloudinary.com/dvrsqx37x/image/upload/v1724142586/avatars/ocok4wwjwicc4pacsnqi.png"}
                                        width={50}
                                        height={50}
                                        alt="avatar pic"
                                        className='w-[50px] h-[50px] rounded-full'
                                    />
                                    <div className='w-full'>
                                        <h5 className='pl-3 text-[20px] font-[500] text-black dark:text-white'>
                                            Give a Rating <span className='text-red-400'>*</span>
                                        </h5>
                                        <div className='flex w-full ml-2 pb-3'>
                                            {[1, 2, 3, 4, 5].map((i) =>
                                                rating >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className='mr-1 cursor-pointer'
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        key={i}
                                                        className='mr-1 cursor-pointer'
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                ))
                                            }
                                        </div>
                                        <textarea
                                            name="reviews"
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            id="reviewArea"
                                            cols={40}
                                            rows={5}
                                            placeholder="Write Your Thoughts"
                                            className='outline-none bg-transparent ml-3 border border-[#ffffff57] p-2 rounded w-[90%] 800px:w-full text-[18px] font-Montserrat text-black dark:text-white resize-none'
                                        ></textarea>
                                    </div>
                                </div>


                                {/*${isLoading && "cursor-no-drop"}*/}
                                {/*onClick={isLoading ? null : handleReviewSubmit}*/}
                                <div className='w-full flex justify-end'>
                                    <div className={`${styles.button} !w-[120px] !h-[40px] text-[18px] mt-5`}

                                    >
                                        Submit
                                    </div>
                                </div>
                            </>
                        )

                        }
                    </>
                </div>

            )}
        </div>
    )
}

const CommentReply = ({ data, activeVideo, answer, setAnswer, handleAnswerSubmit, user, setAnswerId }: any) => {
    return (
        <>
            <div className='w-full my-3'>
                {data[activeVideo].questions.map((item: any, index: any) => (
                    <CommentItem
                        key={index}
                        data={data}
                        activeVideo={activeVideo}
                        item={item}
                        answer={answer}
                        setAnswer={setAnswer}
                        handleAnswerSubmit={handleAnswerSubmit}
                    />
                ))

                }
            </div>
        </>
    )
}

const CommentItem = ({ data, activeVideo, item, answer, setAnswer, handleAnswerSubmit }: any) => {
    const [replyActive, setReplyActive] = useState(false)
    return (
        <>
            <div className='my-4'>
                <div className='flex mb-2'>
                    <Image
                        src={item.user.avatar ? item.user.avatar.url : "https://res.cloudinary.com/dvrsqx37x/image/upload/v1724142586/avatars/ocok4wwjwicc4pacsnqi.png"}
                        width={50}
                        height={50}
                        alt="avatar pic"
                        className='w-[50px] h-[50px] rounded-full'
                    />

                    <div className='pl-3 text-black dark:text-white'>
                        <h5 className='text-[20px]'>
                            {item?.user.name}
                        </h5>
                        <p>{item?.question}</p>
                        <small className='text-black dark:text-[#ffffff83]'>{!item.createdAt ? "" : format(item?.createdAt)} .</small>
                    </div>
                </div>

                <div className='w-full flex'>
                    <span
                        className='800px:pl-16 text-slate-800 dark:text-[#ffffff83] cursor-pointer mr-2'
                        onClick={() => setReplyActive(!replyActive)}
                    >
                        {!replyActive ? item.questionReplies.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"}
                    </span>
                    <BiMessage size={20} className='cursor-pointer text-slate-900 dark:text-gray-300' />
                    <span className='pl-1 mt-[-4px] cursor-pointer text-black dark:text-white'>
                        {item.questionReplies.length}
                    </span>

                </div>
                {replyActive && (
                    <>
                        {item.questionReplies.map((item: any) => (
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
                                <div className='pl-2'>
                                    <h5 className='text=[20px]'>{item.user.name}</h5>
                                    <p>{item.comment}</p>
                                    <small className='text-[#ffffff83] dark:text-gray-200'>
                                        {format(item.createdAt)} .
                                    </small>
                                </div>
                            </div>
                        ))}

                        <>
                            <div className='w-full flex relative'>
                                <input
                                    type='text'
                                    placeholder='Enter your reply...'
                                    value={answer}
                                    onChange={(e:any) => setAnswer(e.target.value)}
                                    className='block 800px:ml-12 mt-2 outline-none bg-transparent text-black dark:text-white border-b border-black dark:border-white p-5 w-[95%]'
                                />

                                <button
                                    type='submit'
                                    className='absolute right-0 bottom-1'
                                    onClick={handleAnswerSubmit}
                                >
                                    Reply
                                </button>
                            </div>
                            <br />
                        </>
                    </>

                )}
            </div>
        </>
    )
}

export default CourseContentMedia