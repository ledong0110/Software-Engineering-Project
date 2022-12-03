import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './Task.module.scss'
import AddModal from "../../components/Modal/Add/Add";
import EmployeeModal from "../../components/Modal/Employee/Employee";
import EditModal from "../../components/Modal/Edit/Edit";

const allPosts = [
    {
        id: 304,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 305,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 306,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 307,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 308,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 309,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 310,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 311,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 312,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 313,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 314,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    },
    {
        id: 315,
        title: "MCP 1,2,3 District 1",
        assign: [],
        status: "complete",
        date: "10/09/22"
    }
]

// Take Task API by parameter allPosts
function Task(/*{allPosts}*/) {
    // pagination
    const [posts] = useState(allPosts)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    const [modal, setModal] = useState(false)
    const [modalEmployee, setModalEmployee] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    
    //post id to send to Employee modal
    const[pid, setPid] = useState(-1)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)

    const handleClickEmployee = (pid) => {
        setPid(pid)
        setModalEmployee(true)
    }

    const handleClickEdit = (pid = 0) => {
        setPid(pid)
        setModalEdit(true)
    }

    return (
        <div className={clsx(styles.wrapper)}>
            <AddModal modal={modal} setModal={setModal} />
            <EmployeeModal modal={modalEmployee} setModal={setModalEmployee} pid={pid}/>
            <EditModal modal={modalEdit} setModal={setModalEdit} pid={pid} />
            <PageTitle name='Task'/>
            <div className={clsx(styles.buttons)}>
                <div className={clsx(styles.container)}>
                    <button className={clsx(styles.button)}>Assign</button>
                    <button className={clsx(styles.button)} onClick={handleClickEdit}>Edit</button>
                    <button className={clsx(styles.button)}>Delete</button>
                    <input className={clsx(styles.search)} placeholder='Search Tasks' spellCheck={false}/>
                    <button 
                        className={clsx(styles.add)}
                        onClick={() => setModal(true)}
                    >
                        +Add new
                    </button>
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
                                {`${currentPost.assign.length}/5`}
                                {(currentPost.assign.length !== 5)? 
                                    <FontAwesomeIcon 
                                        className={clsx(styles.plus)} 
                                        onClick={() => handleClickEmployee(currentPost.id)} 
                                        icon={faPlus}
                                    /> : <></>}
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