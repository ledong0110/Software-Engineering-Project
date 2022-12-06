import clsx from "clsx";
import { useEffect, useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './Vehicle.module.scss'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faUser as faUserLight } from "@fortawesome/free-regular-svg-icons";
// const allPosts = [
//     {
//         id: 304,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 305,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 306,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 307,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 308,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 309,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 310,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 311,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 312,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 313,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 314,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     },
//     {
//         id: 315,
//         title: "59C-345.45",
//         assign: 0,
//         status: "complete",
//         date: "10/09/22",
//         fuel: "50l"
//     }
// ] 

function Vehicle() {
    const [posts, setVehicle] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)
    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
  
        const getAllVehicle = async () => {
            try {
                const response = await axiosPrivate.post(`/task/get-all-vehicle`, 
                {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setVehicle(response.data)
              
                // isMounted && setUsers(response.data.user_list)
            } catch (err) {
                console.log(err)
                navigate('/', { state: { from: location }, replace: true})
            }
        }
        if (!posts?.length) 
            getAllVehicle()
  
        return () => {
            
            isMounted = false
            controller.abort()
        }
    }, [])
    return (
        <>
                <PageTitle name='Vehicle'/>
            <div className={clsx(styles.centering)}>                
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.boardTitle)}>
                    <div className={clsx(styles.content1, styles.flexCenter)}>ID</div>
                    <div className={clsx(styles.content2, styles.flexCenter)}>Biển số xe</div>
                    <div className={clsx(styles.content3, styles.flexCenter)}>Loại xe</div>
                    <div className={clsx(styles.content4, styles.flexCenter)}>Sức chứa (m^3)</div>
                    <div className={clsx(styles.content5, styles.flexCenter)}>Trọng lượng (kg)</div>
                    <div className={clsx(styles.content6, styles.flexCenter)}>Lượng nhiên liệu (lít)</div>
                    <div className={clsx(styles.content6, styles.flexCenter)}>Đang sử dụng</div>
                </div>
                <div className={clsx(styles.boardContent)}>
                    {currentPosts.map((currentPost, index) => {
                        return (
                            <div key={index} className={clsx(styles.flexCenter, styles.boardRow)}>
                                <div className={clsx(styles.content1, styles.flexCenter)}>
                                    
                                    {currentPost.id}
                                </div>
                                <div className={clsx(styles.content2, styles.flexCenter)}>{currentPost.license}</div>
                                <div className={clsx(styles.content3, styles.flexCenter)}>{currentPost.name}</div>
                                <div className={clsx(styles.content4, styles.flexCenter)}>{currentPost.capacity}</div>
                                <div className={clsx(styles.content5, styles.flexCenter)}>{currentPost.mass}</div>
                                <div className={clsx(styles.content6, styles.flexCenter)}>{currentPost.fuel}</div>
                                <div className={clsx(styles.content6, styles.flexCenter)}>{currentPost.occupy === 1 ? <FontAwesomeIcon icon={faUser}/>
                                                                                                                    : <FontAwesomeIcon icon={faUserLight}/>}</div>
                            </div>
                        )
                    })}
                </div>
                <PageNumber
                    postPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                />
            </div>
            </div>
        </>
    )
}

export default Vehicle;