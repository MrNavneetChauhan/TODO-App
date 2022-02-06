import { TodoField } from "./TodoField";
import { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import axios from "axios";
import { Loader} from "./loader"
import "../CSS/TodoField.css"


export const Todo = () => {
  const [todo, setTodo] = useState([]);
  const [page,setpage] = useState(1)
  const [disableOne,setDisableOne] = useState(true)
  const [disabletwo,setDisabletwo] = useState(false)
  const [loading,setLoading] = useState(false)

  const getData = ()=>{
    setLoading(true)
    axios.get(`https://fake-api-project-for-masai.herokuapp.com/tasks/?_page=${page}&_limit=5`).then((res)=>{
      const data = res.data
      const count = res.headers["x-total-count"];
      
    const totalPages = Math.ceil(count/5);

    if(page === totalPages){
      setDisabletwo(true)
    }else{
      setDisabletwo(false)
    }

      setTodo(data)
      setLoading(false)

    })
  }



useEffect(()=>{
getData();
},[page])


  function passText(text) {
    const payload = {
      task_name: text,
      status: false
    };
    if(payload.task_name === ""){
      alert("input is empty")
    }else{
      axios.post("https://fake-api-project-for-masai.herokuapp.com/tasks",payload).then(getData)
    }


  }

  function deleteAnItem(id){
    fetch(`https://fake-api-project-for-masai.herokuapp.com/tasks/${id}`,{
      method:"DELETE"
  }).then(getData)
  }

  function decreasePagination(){
    if(page === 1){
      setpage(1)
    }else{

      setpage(page - 1)
    }

    if(page == 2 ){
      setDisableOne(true)
    }
  }

  function increasePagination(){
    if(page === 1){
      setDisableOne(false)
    }

    

  setpage(page + 1)
  }




  return loading?<Loader/>: (
    <div className="todoApp">
      <h1>Task List</h1>
      <TodoField passText={passText} />
      {todo.map((item)=>{
        return <TodoItem {...item} deleteAnItem={deleteAnItem} />
      })}
      <div className="pagination">
      <button disabled={disableOne} onClick={()=>decreasePagination()} className={disableOne?"disablePrev":"prev"}>Prev</button>
      <button disabled={disabletwo} onClick={()=>increasePagination()} className={disabletwo?"disableNex":"nex"}>Next</button>
      </div>
    </div>
  );
};
