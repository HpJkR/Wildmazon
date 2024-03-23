import { Separator } from "@/components/ui/separator";
import SettingsLayout from "@/pages/settings/layout";
import { ProfilTabs } from "./profil/profil-info-tabs";

export default function SettingsProfilePage() {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            You can change here your personal informations.
          </p>
        </div>
        <Separator />
        <ProfilTabs />
      </div>
    </SettingsLayout>
  );
}
