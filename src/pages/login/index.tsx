import Input from "@/components/Form/Input";

const Login = () => {
  return (
    <div className="bg-white h-screen flex flex-col items-center">
      <Input label="Email" placeholder="Enter your email address" />
      <Input label="Username" placeholder="Enter a unique username" />
      <Input label="Password" placeholder="******" />
    </div>
  );
};
export default Login;
