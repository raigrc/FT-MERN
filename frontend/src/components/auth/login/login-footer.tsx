import { Link } from "react-router-dom";

const LoginFooter = ({
  href,
  title,
  p,
}: {
  href: string;
  title: string;
  p: string;
}) => {
  return (
    <>
      <p className="text-sm">
        {p} &nbsp;
        <Link to={href} className="font-bold text-primary">
          {title}
        </Link>
      </p>
    </>
  );
};

export default LoginFooter;
