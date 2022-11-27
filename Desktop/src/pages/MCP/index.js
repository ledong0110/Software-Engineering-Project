import clsx from "clsx";
import { useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './MCP.module.scss'

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
    const [posts] = useState(allPosts)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)

    return (
        <div className={clsx(styles.wrapper)}>
            <PageTitle className={clsx(styles.margin)} name='MCPs'/>
            <div className={clsx(styles.boardTitle)}>
                <div className={clsx(styles.content1, styles.flexCenter)}>ID</div>
                <div className={clsx(styles.content2, styles.flexCenter)}>Vị trí</div>
                <div className={clsx(styles.content3, styles.flexCenter)}>Độ đầy hiện tại</div>
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
                            <div className={clsx(styles.content3, styles.flexCenter)}>{`${currentPost.assign}/5`}</div>
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

export default MCP;