import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { toast } from "sonner";
import { LoginSchema, LoginSchemaType } from "@/schema/AuthSchema";
import LoadingState from "@/components/shared/loading";

const LoginForm = () => {
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const form = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const onSubmit = (values: LoginSchemaType) => {
    setError("");
    startTransition(() => {
      axiosLogin(values).then((response) => {
        if (response.success) {
          setUser(response?.data.user);
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          console.log(response);

          setError(response?.message);
          form.resetField("password");
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
        <ErrorMessage message={error} />

        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <LoadingState>Logging in...</LoadingState>
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
