const Button = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-fit cursor-pointer rounded-lg px-[12px] py-[8px] text-center bg-black text-white"
    >
      {children}
    </div>
  );
};

export default Button;
