import React, { useState } from "react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    setUser((curr) => {
      return { ...curr, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <section>
      <div>
        <h1>Login Page</h1>
        <form action="">
          <Input
            htmlFor={"email"}
            label={"Email"}
            name={"email"}
            type={"email"}
            id={"email"}
            value={user.email}
            placeholder={"Enter Email"}
            onChange={handleInput}
          />
          <Input
            htmlFor={"password"}
            id={"password"}
            label={"Password"}
            name={"password"}
            type={"password"}
            value={user.password}
            placeholder={"Enter Password"}
            onChange={handleInput}
          />
          <Button text={"Login"} />
        </form>
      </div>
    </section>
  );
};

export default Login;
