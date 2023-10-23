import { useContext } from "react";
import AuthContext from "../providers/auth.context";

const SignIn = () => {
  const { user, logIn, logOut } = useContext(AuthContext);

  return user ? (
    <button onClick={() => logOut()}> logout</button>
  ) : (
    <button onClick={() => logIn("", "")}> sign in </button>
  );
};

export default SignIn;
