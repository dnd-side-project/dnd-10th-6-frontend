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
            className="flex-1 rounded-none bg-brand-600 px-4 py-[14px] text-but2-sb text-white duration-150 hover:bg-green-500 active:bg-green-400"
          >
            확인
          </Close>,
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
          className="max-w-[min(540px,80dvw)]"
          footer={
            <DialogFooter
              className={cn(
                footer.divider &&
                  'divide-x-[1px] divide-line-regular border-t-[1px] border-t-line-regular ',
              )}
            >
              {[...(footer?.item ?? [])].map((ele) => ele)}
            </DialogFooter>
          }
        >
          <DialogHeader>
            <DialogTitle className="text-center text-but2-sb ">
              {title}
              <DialogDescription
                className="mt-2 text-center text-b2-kr-m text-font-gray-04"
                style={{ whiteSpaceCollapse: 'preserve-breaks' }}
              >
                {description}
              </DialogDescription>
            </DialogTitle>
            {children}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  },
)

Modal.displayName = 'Modal'
export default Modal
