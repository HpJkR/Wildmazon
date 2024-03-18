import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import TableBasket from "./component/TableBasket"





export default function ToggleBasket() {



  return (
    <Sheet >
      <SheetTrigger>
        <Button variant="outline">
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Panier
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Mon panier</SheetTitle>
          <SheetDescription>
            <TableBasket />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}
