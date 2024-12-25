import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schema/LoginSchema";
import ErrorMessage from "../error-message";
import { useState, useTransition } from "react";
import { axiosLogin } from "@/api/axios.login";
import { useUserStore } from "@/store/useUserStore";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: LoginSchemaType) => {
    startTransition(() => {
      axiosLogin(values).then((response) => {
        if (!response?.data) {
          setError("Invalid Email or Password!");
          resetField("password");
        } else {
          setUser(response.data.user);
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            {...register("email")}
            disabled={isPending}
          />
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            {...register("password")}
            disabled={isPending}
          />
          {errors.password && (
            <ErrorMessage message={errors.password.message!} />
          )}
        </div>
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Loading..." : "Login"}
      </Button>
      <ErrorMessage message={error} />
    </form>
  );
};

export default LoginForm;
