import Layout from "@/components/layout";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/pages/settings/components/sidebar-nav";
import Image from "next/image";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings/page",
  },
  {
    title: "Appearance",
    href: "/settings/appearance/page",
  },
  {
    title: "Notifications",
    href: "/settings/notifications/page",
  },
  {
    title: "Display",
    href: "/settings/display/page",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({
  children,
}: Readonly<SettingsLayoutProps>) {
  return (
    <Layout pageTitle="Settings">
      <h1 className="my-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Settings
      </h1>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 pb-16 md:block">
        <div className="space-y-0.5">
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
