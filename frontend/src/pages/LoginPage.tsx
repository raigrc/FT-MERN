import AuthLayout from "@/components/auth/auth-layout";
import LoginForm from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <>
      <AuthLayout title="Login" description="Login to your account">
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
