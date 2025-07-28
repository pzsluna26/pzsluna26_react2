import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios";
// 1. item
import { useState, useEffect } from "react";

export default function TodoList() {
  const url =  "http://localhost:3005/todos" ;
  // 2. item
  const [ tdata , setTdata ] = useState([]) ;
 
  // 4. item
  const getData = async () => {
    const { data } = await axios.get(url) ;
    // console.log(data) 
    setTdata(data) ;
  }
  
  // 6. item
  // 6-1. 추가할때         // text, completed 들고와야함 post로 날리게
  const addTodo = async (text, completed) => {
    console.log("Add 추가", text, completed)
    await axios.post(url, {
      text : text,
      completed : completed
    }) ;

    getData();
  }
  // 6-2. 수정할때            //어떤 id로 completed수정할꺼야?
  const onToggle = async (id, completed) => {
    console.log("modify", id, completed)
    const done = completed == "X" ? "O" : "X" ;
    await axios.patch(`${url}/${id}`, { 
      completed : done
    }) ;
    getData();
  }
  // 6-3. 삭제할때
  const onDelete = async (id) => {
    console.log("delete", id)
    await axios.delete(`${url}/${id}`) ;
    getData();
  }

  // 3. item
  useEffect(()=>{
    getData();
  }, []);

  return (
    <div>
      <TodoForm addTodo ={addTodo} />
      {/* 5. item 
          tdata가 있으면 tdata를 돌아서 키를 중심으로 text,completed 들고와서*/}
      {tdata && tdata.map(item => <TodoItem key={item.id}
                                            item={item}
                                            onDelete={onDelete}
                                            onToggle={onToggle}
                                            />) }
    </div>
  )
}