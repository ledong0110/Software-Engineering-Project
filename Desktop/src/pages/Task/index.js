import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './Task.module.scss'

const allPosts = [
    {
        id: 304,
        title: "MCP 1,2,3 District 1",
        assign: 5,
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

// Take Task API by parameter allPosts
function Task(/*{allPosts}*/) {
    const [posts] = useState(allPosts)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)
    //const [display, setDisplay] = useState('none')

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.modal)}>
                <div className={clsx(styles.modalHeader)}>
                    <div className={clsx(styles.modalName)}>Tạo nhiệm vụ mới</div>
                </div>
            </div>
            <PageTitle name='Task'/>
            <div className={clsx(styles.buttons)}>
                <div className={clsx(styles.container)}>
                    <button className={clsx(styles.button)}>Assign</button>
                    <button className={clsx(styles.button)}>Edit</button>
                    <button className={clsx(styles.button)}>Delete</button>
                    <input className={clsx(styles.search)} placeholder='Search Tasks' spellCheck={false}/>
                    <button className={clsx(styles.add)}>+Add new</button>
                </div>
            </div>
            <div className={clsx(styles.boardTitle)}>
                <div className={clsx(styles.content1, styles.flexCenter)}>ID</div>
                <div className={clsx(styles.content2, styles.flexCenter)}>Title</div>
                <div className={clsx(styles.content3, styles.flexCenter)}>Assigned to</div>
                <div className={clsx(styles.content4, styles.flexCenter)}>Status</div>
                <div className={clsx(styles.content5, styles.flexCenter)}>Date</div>
            </div>
            <div className={clsx(styles.boardContent)}>
                {currentPosts.map((currentPost) => {
                    return (
                        <div key={currentPost.id} className={clsx(styles.flexCenter, styles.boardRow)}>
                            <div className={clsx(styles.content1, styles.flexCenter)}>
                                <input type='checkbox' className={clsx(styles.checkBox)}/>
                                {currentPost.id}
                            </div>
                            <div className={clsx(styles.content2, styles.flexCenter)}>{currentPost.title}</div>
                            <div className={clsx(styles.content3, styles.flexCenter)}>
                                {`${currentPost.assign}/5`}
                                {(currentPost.assign !== 5)? <FontAwesomeIcon className={clsx(styles.plus)} icon={faPlus}/> : <></>}
                            </div>
                            <div className={clsx(styles.content4, styles.flexCenter)}>{currentPost.status}</div>
                            <div className={clsx(styles.content5, styles.flexCenter)}>{currentPost.date}</div>
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
    )
}

export default Task;