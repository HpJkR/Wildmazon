import SigninForm from "./SigninForm/SigninForm";
import LoginForm from "./LoginForm/LoginForm";
import { useState } from "react";

export default function AuthenticationPage() {
    const [toggleConnect, setToggleConnect] = useState(false)
  return (
    <>
        <h1 className="my-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Connection
        </h1>
        <div className="flex justify-center items-center">
          {
            toggleConnect ?<SigninForm handleLoginAccount={()=>setToggleConnect(false)}/>:<LoginForm handleSignUpAccount={()=>setToggleConnect(true)}/>
          }
        </div>
    </>
  );
}
