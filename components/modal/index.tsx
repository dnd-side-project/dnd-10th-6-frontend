import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/client/utils'
import { Close } from '@radix-ui/react-dialog'
import {
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  useId,
} from 'react'

interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof Dialog>,
    React.ComponentPropsWithoutRef<typeof DialogTrigger> {
  title?: string
  description?: ReactNode
  footer?: {
    item?: ReactNode[]
    divider?: boolean
  }

  trigger: React.ReactNode
}

export const Modal = forwardRef<HTMLDivElement, PropsWithChildren<ModalProps>>(
  (
    {
      children,
      title,
      description,
      trigger,
      footer = {
        divider: true,
        item: [
          <Close
            key="cancel"
            className="flex-1 py-[14px] px-4 text-brand-sub1-blue600 bg-transparent rounded-none active:bg-bg-gray1 duration-150"
          >
            취소
            <span className="sr-only">Close</span>
          </Close>,
          <button
            key="confirm"
            className="flex-1 py-[14px] px-4 text-brand-sub1-blue600 bg-transparent rounded-none active:bg-bg-gray1 duration-150"
          >
            다음
          </button>,
        ],
      },
      ...rest
    },
    ref,
  ) => {
    const id = useId()
    return (
      <Dialog key={id} {...rest}>
        <DialogTrigger asChild ref={ref as ForwardedRef<HTMLButtonElement>}>
          {trigger}
        </DialogTrigger>
        <DialogContent
          className="max-w-[80dvw]"
          footer={
            <DialogFooter
              className={cn(
                footer.divider &&
                  'border-t-line-medium border-t-[1px] divide-x-[1px] divide-line-medium',
              )}
            >
              {[...(footer?.item ?? [])].map((ele) => ele)}
            </DialogFooter>
          }
        >
          <DialogHeader>
            {title && (
              <DialogTitle className="text-center">{title}</DialogTitle>
            )}
            {description && (
              <DialogDescription
                className="mt-2 text-xs leading-[18px] text-[#767676] text-center"
                style={{ whiteSpaceCollapse: 'preserve-breaks' }}
              >
                {description}
              </DialogDescription>
            )}
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  },
)

Modal.displayName = 'Modal'
export default Modal
