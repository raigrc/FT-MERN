import AuthLayout from "@/components/auth/auth-layout";
import LoginFooter from "@/components/auth/login/login-footer";
import LoginForm from "@/components/auth/login/login-form";

const LoginPage = () => {
  return (
    <>
      <AuthLayout
        title="Welcome Back"
        description="track your finances with ease."
        footer={<LoginFooter />}
      >
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
