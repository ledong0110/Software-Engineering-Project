import clsx from "clsx";
import { useState } from "react";
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './Vehicle.module.scss'

const allPosts = [
    {
        id: 304,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 305,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 306,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 307,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 308,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 309,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 310,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 311,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 312,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 313,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 314,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    },
    {
        id: 315,
        title: "59C-345.45",
        assign: 0,
        status: "complete",
        date: "10/09/22",
        fuel: "50l"
    }
]

function Vehicle() {
    const [posts] = useState(allPosts)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)

    return (
        <>
                <PageTitle name='Vehicle'/>
            <div className={clsx(styles.centering)}>                
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.boardTitle)}>
                    <div className={clsx(styles.content1, styles.flexCenter)}>ID</div>
                    <div className={clsx(styles.content2, styles.flexCenter)}>Biển số xe</div>
                    <div className={clsx(styles.content3, styles.flexCenter)}>Loại xe</div>
                    <div className={clsx(styles.content4, styles.flexCenter)}>Sức chứa</div>
                    <div className={clsx(styles.content5, styles.flexCenter)}>Trọng lượng</div>
                    <div className={clsx(styles.content6, styles.flexCenter)}>Lượng nhiên liệu</div>
                </div>
                <div className={clsx(styles.boardContent)}>
                    {currentPosts.map((currentPost, index) => {
                        return (
                            <div key={index} className={clsx(styles.flexCenter, styles.boardRow)}>
                                <div className={clsx(styles.content1, styles.flexCenter)}>
                                    <input type='checkbox' className={clsx(styles.checkBox)}/>
                                    {currentPost.id}
                                </div>
                                <div className={clsx(styles.content2, styles.flexCenter)}>{currentPost.title}</div>
                                <div className={clsx(styles.content3, styles.flexCenter)}>{`${currentPost.assign}/5`}</div>
                                <div className={clsx(styles.content4, styles.flexCenter)}>{currentPost.status}</div>
                                <div className={clsx(styles.content5, styles.flexCenter)}>{currentPost.date}</div>
                                <div className={clsx(styles.content6, styles.flexCenter)}>{currentPost.fuel}</div>
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