import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ForwardedRef, forwardRef } from 'react'

interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    React.ComponentPropsWithoutRef<typeof DialogTrigger> {
  children: React.ReactNode
  title?: string
  description?: string
  trigger: React.ReactNode
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, title, description, trigger }, ref) => {
    return (
      <Dialog>
        <DialogTrigger asChild ref={ref as ForwardedRef<HTMLButtonElement>}>
          {trigger}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
            {children}
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
)

Modal.displayName = 'Modal'
export default Modal
