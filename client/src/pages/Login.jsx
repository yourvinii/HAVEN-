import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = ()=>{
    setUser
  }

  return (
    <section>
      <div>
        <h1>Login Page</h1>
        <form action="">
          <Input
            label={"Email"}
            name={"email"}
            type={"text"}
            placeholder={"Enter Email"}
          />
          <Input
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Enter Password"}
          />
          <Button text={"Login"} />
        </form>
      </div>
    </section>
  );
};

export default Login;
