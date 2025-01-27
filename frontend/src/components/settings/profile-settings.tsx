import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  ProfileSchemaType,
  ProfileSettingSchema,
} from "@/schema/SettingsSchema";
import { useUserStore } from "@/store/useUserStore";
import { updateProfile } from "@/api/axios.updateProfile";
import { toast } from "sonner";

const ProfileForm = () => {
  const { user } = useUserStore();

  const [isPending, startTransition] = useTransition();
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSettingSchema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  }); 

  const onSubmit = (data: ProfileSchemaType) => {
    startTransition(() => {
      try {
        updateProfile(user?._id, data).then((response) => {
          if (response.success) {
            toast.success(response.message);
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
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email:</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>Update Profile</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
