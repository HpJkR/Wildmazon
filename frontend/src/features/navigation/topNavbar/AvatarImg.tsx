import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AvatarImg(props: AvatarImgProp) {

  let avatarImg = "https://github.com/shadcn.png"
  return (
    <Avatar>
      <AvatarImage src={props.avatar || avatarImg} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export interface AvatarImgProp {
  avatar: string;
}
