import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from 'axios';
// 1. item
import {useState, useEffect} from "react";

export default function TodoList() {

  const url = "http://localhost:3005/todos";

  // 2. item
  const [tdata, setTdata] =useState([]);

    
  // 4. item
  const getPetchData=async()=>{
    const{data} = await axios.get(url);
    console.log(data)
    setTdata(data); 
  }

  // 6. item
  // 6-1. 추가할때            // text, completed 들고와야함 post로 날리게
  const addTodo = async(text, completed) => {
    console.log("addTodo 추가 :",text, completed)
    await axios.post(url,{
      text : text,
      completed : completed
    });
    getPetchData();
  }

  // 6-2. 수정할때            //어떤 id로 completed수정할꺼야?
  const modifyTodo = async(id, completed) => {
    console.log("modifyTodo 수정:",id,completed)
    const done = completed == "X" ? "O"
                                  : "X";
    await axios.patch(`${url}/${id}`,{
      completed : done
    });
    getPetchData();

  }

  // 6-3. 삭제할때
  const deleteTodo = async(id) => {
    console.log(id)
    await axios.delete(url+`/${id}`)
    getPetchData();
  }
  
  // 3. item
  useEffect(()=>{
    getPetchData();
  },[])

  return (
    <div >
     
      <TodoForm addTodo={addTodo} />
      {/* 5. item 
          tdata가 있으면 tdata를 돌아서 키를 중심으로 text,completed 들고와서*/}
      { tdata && tdata.map(item => <TodoItem key={item.id}
                                             item={item}
                                             onDelete={deleteTodo}
                                             onModify={modifyTodo}
                                            />)}
    </div>
  )
}
