import { useContext } from "react";
import AuthContext from "../providers/auth.context";

const SignIn = () => {
  const { user, signInWithGoogle, logOut } = useContext(AuthContext);

  return user ? (
    <button onClick={() => logOut()}> logout</button>
  ) : (
    <button onClick={() => signInWithGoogle()}> sign in with google</button>
  );
};

export default SignIn;
