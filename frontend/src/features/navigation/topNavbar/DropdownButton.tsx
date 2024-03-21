import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AvatarImg from "@/features/navigation/topNavbar/AvatarImg";
import { useLogoutMutation } from "@/graphql/mutations/generated/Logout";
import { useProfileQuery } from "@/graphql/queries/generated/GetProfile";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DropdownNav() {
  const { data: CurrentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });
  const [logout] = useLogoutMutation();
  const router = useRouter();

  return (
    <>
      {!CurrentUser ? (
        <Button>
          <Link href="/authentication">Log in</Link>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex">
            <Button variant="link" className="p-0">
              <AvatarImg avatar={CurrentUser.profile.avatar} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  router.push("/settings/page");
                }}
              >
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await logout();
                client.resetStore();
                router.push("/");
              }}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
