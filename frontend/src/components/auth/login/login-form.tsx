import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "@/schema/LoginSchema";
import ErrorMessage from "../error-message";
import { useState, useTransition } from "react";
import { axiosLogin } from "@/api/axios.login";
import { useUserStore } from "@/store/useUserStore";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const form = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const onSubmit = (values: LoginSchemaType) => {
    startTransition(() => {
      axiosLogin(values).then((response) => {
        if (!response?.data || response.status !== 200) {
          setError(response?.data.message);
          form.resetField("password");
        } else {
          setUser(response.data.user);
          navigate("/dashboard");
        }
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  id="email"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  id="password"
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              disabled={isPending}
            />
            {errors.email && <ErrorMessage message={errors.email.message!} />}
          </div>
          <div className="space-y-2">
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
        </div> */}

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Login"}
        </Button>
        <ErrorMessage message={error} />
      </form>
    </Form>
  );
};

export default LoginForm;
