import { LoginSchema, LoginSchemaType } from "@/schema/LoginSchema";
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

const SignupForm = () => {
  const form = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });
  const navigate = useNavigate();

  const onSubmit = (values: LoginSchemaType) => {
    signUp(values).then((response) => {
      if (response.success) {
        toast(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
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
                <Input type="email" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </form>
    </Form>
  );
};

export default SignupForm;
