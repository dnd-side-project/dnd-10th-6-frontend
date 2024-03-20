import { useState } from 'react'
import { Drawer, DrawerContent } from '../ui/drawer'

const BottomSheet = () => {
  const [bottomSheet, setBottomSheet] = useState({
    isOpen: false,
  })

  return (
    <Drawer
      open={bottomSheet.isOpen}
      onOpenChange={(open) =>
        setBottomSheet((prev) => ({
          ...prev,
          isOpen: open,
        }))
      }
    >
      <DrawerContent>
        <div className="p-5 flex flex-col space-y-8">
          <h1 className="text-mainTitle2-bold text-text-main-black11">
            GRRREW Team
          </h1>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default BottomSheet
