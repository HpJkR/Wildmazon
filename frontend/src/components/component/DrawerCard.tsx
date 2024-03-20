import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

export default function DrawerCard({
  setQuantity,
  setSelectedQuantity,
}: {
  setQuantity: React.Dispatch<React.SetStateAction<string>>;
  setSelectedQuantity: React.Dispatch<React.SetStateAction<string>>; // Définir le type de la prop
}) {
  const [goal, setGoal] = React.useState(1);

  React.useEffect(() => {
    setQuantity(String(goal));
  }, [goal, setQuantity]);

  function onClick(adjustment: number) {
    setGoal(Math.max(0, Math.min(100, goal + adjustment)));
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Quantity</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Select a quantity</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-1)}
                disabled={goal <= 0}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Diminuer</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(1)}
                disabled={goal >= 100}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Augmenter</span>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedQuantity(String(goal));
                }}
              >
                Confirm
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
