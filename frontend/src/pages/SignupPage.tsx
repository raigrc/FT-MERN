import AuthLayout from "@/components/auth/auth-layout";
import LoginFooter from "@/components/auth/login/login-footer";
import SignupForm from "@/components/auth/signup/signup-form";

const SignupPage = () => {
  return (
    <>
      <AuthLayout
        title="Sign up"
        description="Create an account to get started"
        footer={
          <LoginFooter
            p="Already have an account?"
            title="Login"
            href="/login"
          />
        }
      >
        <SignupForm />
      </AuthLayout>
    </>
  );
};

export default SignupPage;
