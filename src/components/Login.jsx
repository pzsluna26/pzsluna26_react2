import {useRef} from "react"
import { isLogin } from "../atoms/IsLoginAtom";
import { useAtom } from "jotai";

export default function Login() {
  const [login, setLogin] = useAtom(isLogin);

  const emailRef = useRef();
  const pwdRef = useRef();

  const handleLogin = (e) => {
    // form submit 페이지 초기화 방지
    e.preventDefault();
    if (emailRef.current.value == "") {
      alert("이메일을 입력하세요.");
      emailRef.current.focus();
      return;
    }
    if (pwdRef.current.value == "") {
      alert("비밀번호를 입력하세요.");
      pwdRef.current.focus();
      return;
    }

    //current.value => 입력창 값
    if (emailRef.current.value != "pzsluna26@gmail.com"){
      alert("존재하지 않는 아이디 입니다.");
      //입력창 초기화 => 이메일, 비번 둘다 초기화
      emailRef.current.value = "";
      pwdRef.current.value = "";
      emailRef.current.focus();
      return;
    }
    if (pwdRef.current.value != "1234"){
      alert("비밀번호가 일치하지 않습니다.");
      //입력창 초기화 => 비번만 초기화
      pwdRef.current.value = "";
      pwdRef.current.focus();
      return;

    }

    //개발자도구>어플리케이션.로컬스토리지>기록됨
    localStorage.setItem("id", emailRef.current.value);
    setLogin(true);
    
  }

  return (
    <>
    <div className="py-12 flex-1 flex-col justify-center px-6 lg:px-8">
      {/* */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm"> 
          <h2 className="mt-20 text-center text-2xl/9 font-bold tracking-tight text-gray-600">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="flex justify-start block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  // useRef => 입력창에서 읽어옴
                  ref={emailRef}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-start">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  {/* <a href="#" className="font-semibold text-blue-600 hover:text-indigo-500">
                    Forgot password?
                  </a> */}
                </div>
              </div>
              <div className="mt-1">
                <input
                  // useRef => 입력창에서 읽어옴
                  ref={pwdRef}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                //로그인처리
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold
                           text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
                          focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>

          {/* <p className="mt-2 text-center text-sm/6 text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold text-blue-500 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p> */}
        </div>
      </div>
    </>
  )
}
