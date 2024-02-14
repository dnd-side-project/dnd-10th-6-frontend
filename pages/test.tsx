import ComboboxDropdown from '@/components/combobox'

const Page = () => {
  return (
    <>
      <div className="">
        <ComboboxDropdown
          options={['Option 1', 'Option 2', 'Option 3']}
          onSelect={(option) => console.log(option)}
        />
      </div>
    </>
  )
}

export default Page
