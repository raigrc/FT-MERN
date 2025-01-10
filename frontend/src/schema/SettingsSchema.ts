import z from "zod";

export const ProfileSettingSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const PrivacySettingSchema = z.object({
  current_password: z.string(),
  new_password: z.string(),
  confirm_password: z.string(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSettingSchema>;
export type PrivacySchemaType = z.infer<typeof PrivacySettingSchema>;
