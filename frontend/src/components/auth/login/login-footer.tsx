import { Link } from "react-router-dom";

const LoginFooter = () => {
  return (
    <>
      <p className="text-sm">
        Don't have an account yet? &nbsp;
        <Link to="/signup" className="font-bold text-primary">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginFooter;
