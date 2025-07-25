import { useState, useEffect, useRef} from "react"
import axios from "axios";
import TailButton from "./components/TailButton"

const baseUrl = "http://localhost:3005/posts";
export default function Rest() {
  const [tdata, setTdata] = useState([]);
  const titleR = useRef();
  const authorR = useRef();

  useEffect(()=>{
    console.log("패치 전:", tdata);
    getDataFetch();
  },[])

  const getDataFetch = async () => {
    
    console.log(baseUrl)

    // const resp = await fetch(baseUrl);
    // const data = await resp.json();
    const {data} = await axios.get(baseUrl); //axios 패치
   
    setTdata(data);
  }

  useEffect(()=>{
     console.log("패치 후:", tdata);
    getDataFetch();
  },[])
  
  const handleInput = async (e) => {
    e.preventDefault();
    let postData = {
       
        "title": titleR.current.value,
        "author": authorR.current.value
  
    }
    const {data} = await axios.post(baseUrl, postData); //axios 추가
    setTdata([data, ...tdata]) //최신정보가 젤 위
    console.log()
  }


  // 포스트맨에서 delete => http://localhost:3005/posts/1 <= id값
                   // 비동기 // 인수 id로 받음
  const handleDelete = async (id) => {
    console.log(id)
    await axios.delete(`${baseUrl}/${id}`); //axios 삭제
    getDataFetch(); //재조회
  }

  return (
    <div className=" w-full flex flex-col">
      <form className="mt-20 w-full justify-center itmes-center">
      
        <label htmlFor="txt1">제목</label>
        <input type="text"
               id="txt1"
               ref={titleR}
               className="border border-gray-300" />
        <label htmlFor="txt2">이름</label>
        <input type="text"
               id="txt2"
               ref={authorR}
               className="border border-gray-300"/>
        <TailButton caption ="입력"
                    color = "blue"
                    onClick={handleInput}
                    className ="flex"/>
      </form>
      <ul className="flex-col">
      {                    // 여러개 요소 돌면, key값 반드시필요
        tdata.map(item => <li key={item.id}>
                              {item.title} ({item.author})
                              <TailButton caption ="삭제"
                                          color = "blue"
                                          onClick={()=>handleDelete(item.id)} //인수: 아이디
                                          className ="flex" />
                           </li>)
      }
      </ul>
    
    </div>
  )
}
