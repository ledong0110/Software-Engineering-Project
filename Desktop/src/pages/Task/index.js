import clsx from "clsx";
import { useEffect,  useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBatteryFull, faPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PageTitle from "../../components/Layout/PageTitle";
import PageNumber from "../../components/Layout/PageNumber";
import styles from './Task.module.scss'
import AddModal from "../../components/Modal/Add/Add";
import EmployeeModal from "../../components/Modal/Employee/Employee";
import EditModal from "../../components/Modal/Edit/Edit";
import VehicleModal from "../../components/Modal/Vehicle/Vehicle";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
// const allPosts = [
//     {
//         id: 1,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 305,
//         title: "MCPP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 306,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 307,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 308,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 309,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 310,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 311,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 312,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 313,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 314,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     },
//     {
//         id: 315,
//         title: "MCP 1,2,3 District 1",
//         assign: [],
//         status: "complete",
//         date: "10/09/22"
//     }
// ]

// Take Task API by parameter allPosts
function Task(/*{allPosts}*/) {
    // pagination
    const [posts, setPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(10)

    const [modal, setModal] = useState(false)
    const [modalEmployee, setModalEmployee] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalVehicle, setModalVehicle] = useState(false)
    const [worker, setWorker] = useState([])
    //post id to send to Employee modal
    const [pid, setPid] = useState(-1)
    
    //selected tasks to delete or edit
    const[taskType, setTaskType] = useState("")
    const[selected, setSelected] = useState([])
    const [search, setSearch] = useState('')
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const [number, setNumber] = useState()

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber  => setCurrentPage(pageNumber)

    
    useEffect(() => {
            let isMounted = true
            const controller = new AbortController()
      
            const getAllTask = async () => {
                try {
                    const response = await axiosPrivate.post(`/task/get-all-task`, 
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
                getAllTask()
      
            return () => {
                
                isMounted = false
                controller.abort()
            }
        }, [])

    const filterTask = () => {
        return (
            posts.filter(post => {
                if (search.length !== 0) {
                    return post.title.includes(search)
                }
                else return null
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let dt = filterTask()
        console.log(dt)
        if (dt.length > 0)
            setPosts(dt)
        
    }

    const handleCheck = (MCP) => {
        if (selected.includes(MCP)) {
          if (selected.length === 1) setSelected([])
          else {
            const index = selected.indexOf(MCP)
            let newSelected = [...selected]
            newSelected.splice(index, 1)
            setSelected(newSelected)
            
          }
        }
        else {
          setSelected([...selected, MCP])
          
        }
      }

    const handleClick = (pid, type, task_type="", number=0, worker=[]) => {
        if (type === 'edit') {
            if (selected.length !== 1) alert('must choose 1 task')
            else {
                setPid(selected)
                setModalEdit(true)
            }
        }
        else {
            setPid(pid)
            setNumber(number)
            setTaskType(task_type)
            setWorker(worker)
            if (type === 'employee') setModalEmployee(true)
            else setModalVehicle(true)
        }
    }

    const handleDelete = () => {

    }

    return (
        <>
            <AddModal modal={modal} setModal={setModal} />
            <EmployeeModal modal={modalEmployee} setModal={setModalEmployee} pid={pid} taskType={taskType} Number={number} worker={worker}/>
            <EditModal modal={modalEdit} setModal={setModalEdit} pid={pid} />
            <VehicleModal modal={modalVehicle} setModal={setModalVehicle} pid={pid} />
            <PageTitle name='Task'/>
            <div className={clsx(styles.centering)}>
            <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.buttons)}>
                <div className={clsx(styles.container)}>
                    {/* <button className={clsx(styles.button)}>Assign</button> */}
                    <button className={clsx(styles.button)} onClick={() => handleClick(selected, 'edit')}>Edit</button>
                    <button className={clsx(styles.button)} onClick={handleDelete}>Delete</button>
                    <input 
                        className={clsx(styles.search)} 
                        style={{marginRight: '0'}}
                        placeholder='Search Tasks' 
                        spellCheck={false}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className={clsx(styles.searchButton)} onClick={handleSubmit}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>
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
                <div className={clsx(styles.content6, styles.flexCenter)}>Vehicle</div>
                <div className={clsx(styles.content3, styles.flexCenter)}>Assigned to</div>
                <div className={clsx(styles.content4, styles.flexCenter)}>Status</div>
                <div className={clsx(styles.content5, styles.flexCenter)}>Date</div>
            </div>
            <div className={clsx(styles.boardContent)}>
                {posts && currentPosts.map((currentPost) => {
                    return (
                        <div key={currentPost.id} className={clsx(styles.flexCenter, styles.boardRow)}>
                            <div className={clsx(styles.content1, styles.flexCenter)}>
                                <input 
                                    type='checkbox' 
                                    className={clsx(styles.checkBox)} 
                                    onClick={() => handleCheck(currentPost.id)}
                                />
                                {currentPost.id}
                            </div>
                            <div className={clsx(styles.content2, styles.flexCenter)}>{currentPost.title}</div>
                            <div className={clsx(styles.content6, styles.flexCenter)}>
                                <FontAwesomeIcon 
                                    style={{cursor: 'pointer'}}
                                    onClick={() => handleClick(currentPost.id, 'vehicle')} 
                                    icon={faPlus}
                                />
                            </div>
                            <div className={clsx(styles.content3, styles.flexCenter)}>
                                {(currentPost.worker ? currentPost.worker?.length : 0 )+"/" + currentPost.number}
                                {(currentPost.worker?.length !== 5)? 
                                    <FontAwesomeIcon 
                                        className={clsx(styles.plus)} 
                                        onClick={() => handleClick(currentPost.id,'employee', currentPost.type, currentPost.number, currentPost.worker)} 
                                        icon={faPlus}
                                    /> : <FontAwesomeIcon 
                                    className={clsx(styles.plus)} 
                                     icon={faBatteryFull}
                                />}
                            </div>
                            <div className={clsx(styles.content4, styles.flexCenter)}>{currentPost.state}</div>
                            <div className={clsx(styles.content5, styles.flexCenter)}>{dayjs(currentPost.time).format("DD/MM/YYYY")}</div>
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

export default Task;