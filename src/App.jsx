import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css'
import Navbar from './Navbar';



function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [confirm, setConfirm] = useState({
    isconfirm: false,
    idd: null,
  });

  // getting the data from LS if any of is stored initially
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    console.log(todoString);
    if (todoString) {
      let todos_from_LS = JSON.parse(localStorage.getItem("todos"));
      settodos(todos_from_LS);
    }
  }, []);
  

  // adding to local storage
  function storeLS() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // handling the task entery on bar
  function changehandle(e) {
    settodo(e.target.value);
    storeLS();
  }

  // adding the task
  function addhandle() {
    if(todo!="") {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("");
    storeLS();
    }
  }

  //handling checkbox
  function handleCheckbox(e, id) {
    console.log(id);
    let index = todos.findIndex(item => {
      return item.id === id
    });


    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    console.log(todos[index]);
    storeLS();
  }


  //ensuring the delete
  function ensure(e, id) {
    console.log("ensure");
    setConfirm(prevConfirm => ({
       isconfirm: true,
       idd: id
    }));
  }
  function yes() {
    setConfirm(prevConfirm => ({
      ...prevConfirm,
      isconfirm: false, 
    }));
    deletehandle(confirm.idd);
  }
  function no() {
    setConfirm(prevConfirm => ({
      ...prevConfirm,
      isconfirm: false, 
    }));
  }
  // handling delete
  function deletehandle(id) {
    setConfirm(prevConfirm => ({
      ...prevConfirm,
      idd: null, 
    }))

    const updatedTodos = todos.filter(item => item.id !== id);
    settodos(updatedTodos);
    storeLS();
  }

  // handling edit
  function edithandle(e, id) {
    deletehandle(id);

    let t = todos.filter(item => item.id === id);
    settodo(t[0].todo);
    storeLS();
  }

  return (
    <>
      <Navbar className='text-black'/>
      {/* main */}
      <div className='w-[500px] bg-amber-50 min-h-[400px] h-auto mt-10 mx-auto  p-3 rounded flex flex-col justify-center items-center'>
        {/* heading */}
        <div className='flex mx-auto items-center justify-center gap-2'>
          <h1 className='font-semibold  text-xl '>ToDo List</h1>
          <span className="material-symbols-outlined">
            contract_edit
          </span>
        </div>

        {/* add bar */}
        <div className="w-[85%] h-[49px] mt-3 text-center border border-gray-300 rounded-[10px] mx-auto flex">
          <input value={todo} onChange={changehandle}
            className="w-[87%] p-2 outline-none h-full rounded-[10px] bg-slate-100"
            type="text"
            placeholder="Enter task"
          />
          <button onClick={addhandle}
            className="w-[13%] h-full rounded-r-[10px] bg-blue-400 flex justify-center items-center">
            <span className="material-symbols-outlined text-white">
              add
            </span>
          </button>
        </div>


        {/* list */}
        <div className=' h-[90%] w-[100%] mt-4'>
          {
            todos ?
              todos.map((item) => {
                return (
                  <div key={item.id}
                    className='bg-amber-100 w-[95%] h-[45px] mt-3  border border-gray-300 rounded mx-auto p-2 flex gap-3'>
                    <input type="checkbox" onChange={(e) => { handleCheckbox(e, item.id) }} name="" id="" />
                    <div className='w-[76%] flex flex-wrap '>
                      <div className={`${item.isCompleted ? "line-through" : ""} 
                      overflow-hidden 
                      whitespace-nowrap 
                      text-ellipsis`}>
                        {item.todo}
                      </div>
                    </div>
                    <button onClick={(e) => { edithandle(e, item.id) }}
                      className='bg-blue-400 text-white w-[7%] h-[90%] text-xs rounded'>
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </button>
                    <button onClick={(e) => { ensure(e, item.id)}}
                      className='text-white w-[7%] h-[90%] text-xs bg-blue-400 rounded'>
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                )
              }) : <div>Nothing</div>
          }
        </div>
      </div>
      {confirm.isconfirm && <div className='confirm_box'>
        <p>Are you sure to delete the task?</p>
        <div className='flex gap-4 '>
        <button className='bg-blue-400 text-lg font-normal  rounded w-[65px] h-[46px]' onClick={yes}>Yes</button>
        <button className='bg-blue-400  text-lg font-normal rounded w-[65px] h-[46px]' onClick={no}>No</button>
        </div>
      </div>}
    </>
  )
}

export default App
