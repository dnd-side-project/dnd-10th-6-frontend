import toast from 'react-hot-toast'

export const toastError = () => {
  return toast.error(
    (t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className="mr-auto text-start text-body3-bold text-white"
      >
        서버에 문제가 생겼어요
      </div>
    ),
    {
      style: {
        backgroundColor: '#313131',
        width: '90%',
        padding: '16px 12px',
      },
      className: 'error-toast',
    },
  )
}
