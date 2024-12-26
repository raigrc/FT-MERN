import AuthLayout from "@/components/auth/auth-layout";
import LoginFooter from "@/components/auth/login/login-footer";
import LoginForm from "@/components/auth/login/login-form";
import { useAuthStore } from "@/store/useAuthStore";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

const LoginPage = () => {
  const { user } = useUserStore();
  const { token } = useAuthStore();

  useEffect(() => {
    console.log({ user, token });
  }, [user]);

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
