import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp } from "@/api/axios.signUp";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { SignupSchema, SignupSchemaType } from "@/schema/AuthSchema";
import { useState, useTransition } from "react";
import ErrorMessage from "../error-message";
import LoadingState from "@/components/shared/loading";

const SignupForm = () => {
  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (values: SignupSchemaType) => {
    setError("");
    startTransition(() => {
      signUp(values).then((response) => {
        if (response.success) {
          toast(response.message);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } else {
          setError(response.message);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="ex: Juan Dela Cruz"
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  disabled={isPending}
                  {...field}
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
                <Input type="password" disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorMessage message={error} />
        <Button type="submit" className="w-full">
          {isPending ? (
            <>
              <LoadingState>Signing in...</LoadingState>
            </>
          ) : (
            "Sign up"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
