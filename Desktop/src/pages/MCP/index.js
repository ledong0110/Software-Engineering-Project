import clsx from "clsx";
import { useEffect, useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './MCP.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBatteryEmpty, faBatteryFull, faBatteryHalf } from "@fortawesome/free-solid-svg-icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";


const allPosts = [
    {
        id: 304,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 305,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 306,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 307,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 308,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 309,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 310,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 311,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 312,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 313,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 314,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 315,
        title: "MCP 1,2,3 District 1",
        assign: 0,
        status: "complete",
        date: "10/09/22"
    }
]
function MCP() {
    const [posts, setPosts] = useState([])
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
  
        const getAllMCP = async () => {
            try {
                const response = await axiosPrivate.post(`/task/get-all-mcp`, 
                {
                    signal: controller.signal
                })
                console.log(response.data)
                isMounted && setPosts(response.data)
              
                // isMounted && setUsers(response.data.user_list)
            } catch (err) {
                console.log(err)
                navigate('/', { state: { from: location }, replace: true})
            }
        }
        if (!posts?.length) 
            getAllMCP()
  
        return () => {
            
            isMounted = false
            controller.abort()
        }
    }, [])
    return (
        <>
            <PageTitle className={clsx(styles.margin)} name='MCPs'/>
            <div className={clsx(styles.centering)}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.boardTitle)}>
                    <div className={clsx(styles.content1, styles.flexCenter)}>ID</div>
                    <div className={clsx(styles.content2, styles.flexCenter)}>Vị trí</div>
                    <div className={clsx(styles.content3, styles.flexCenter)}>Độ đầy hiện tại</div>
                </div>
                <div className={clsx(styles.boardContent)}>
                    {posts && currentPosts.map((currentPost) => {
                        return (
                            <div key={currentPost.id} className={clsx(styles.flexCenter, styles.boardRow)}>
                                <div className={clsx(styles.content1, styles.flexCenter)}>
                                    <input type='checkbox' className={clsx(styles.checkBox)}/>
                                    {currentPost.id}
                                </div>
                                <div className={clsx(styles.content2, styles.flexCenter)}>
                                    <a href={"https://www.google.com/maps/search/?api=1&query=" + currentPost.latitude +"%2c" + currentPost.longtitude} target="_blank">{currentPost.latitude}, {currentPost.longtitude}</a> 
                                </div>
                                <div className={clsx(styles.content3, styles.flexCenter)}>{currentPost.status === 0
                                        ? <FontAwesomeIcon icon={faBatteryEmpty} />
                                        : currentPost.status === 1
                                                ? <FontAwesomeIcon icon={faBatteryHalf} />
                                                : <FontAwesomeIcon icon={faBatteryFull} />}</div>
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

export default MCP;