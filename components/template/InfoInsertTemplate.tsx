interface InfoInsertTemplateProps {
  children: React.ReactNode
  button?: React.ReactNode
}

const InfoInsertTemplate = ({ children, button }: InfoInsertTemplateProps) => {
  return (
    <>
      <main>{children}</main>
      <section>{button}</section>
    </>
  )
}

export default InfoInsertTemplate
