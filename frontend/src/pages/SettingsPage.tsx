import PrivacyForm from "@/components/settings/privacy-settings";
import ProfileForm from "@/components/settings/profile-settings";
import {
  PrivateContent,
  PrivateHeader,
  PrivateLayout,
  PrivateTitle,
} from "@/components/shared/private-layout";
import React from "react";

const SettingsPage = () => {
  return (
    <PrivateLayout>
      <PrivateHeader>
        <PrivateTitle>Settings</PrivateTitle>
      </PrivateHeader>
      <PrivateContent className="space-y-10">
        <ProfileForm />
        <PrivacyForm />
      </PrivateContent>
    </PrivateLayout>
  );
};

export default SettingsPage;
