import {
  PrivacySchemaType,
  PrivacySettingSchema,
} from "@/schema/SettingsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { updatePrivacy } from "@/api/axios.updatePrivacy";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";

const PrivacyForm = () => {
  const { user } = useUserStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<PrivacySchemaType>({
    resolver: zodResolver(PrivacySettingSchema),
  });

  const onSubmit = (data: PrivacySchemaType) => {
    startTransition(() => {
      try {
        updatePrivacy(user?._id, data).then((response) => {
          if (response?.success) {
            form.reset();
            toast.success(response.message);
          } else {
            form.resetField("new_password");
            form.resetField("confirm_password");
          }
        });
      } catch (error) {
        console.error("Error updating profile", error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="current_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="new_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Update Password</Button>
      </form>
    </Form>
  );
};

export default PrivacyForm;
