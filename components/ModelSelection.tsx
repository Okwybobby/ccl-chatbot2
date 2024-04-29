'use client'
import useSWR from "swr";
// import Select from "react-select/creatable/dist/react-select-creatable.cjs";
import Select from "react-select";


const fetchModels = () => fetch("/api/getEngines").then((res) => res.json())
function ModelSelection() {
  const {data: models, isLoading } = useSWR("models", fetchModels)
  const {data: model, mutate: setModel } = useSWR("model", {

    // fallbackData: 'const model = "gpt-3.5-turbo"'
    fallbackData: "gpt-3.5-turbo"
  })
  

  return (
    <div>
      <Select 
      className="mt-2"
      options={models?.modelOptions}
      defaultValue={model}
      placeholder={model}
      isSearchable
      isLoading={isLoading}
      menuPosition="fixed"
      classNames={{
        control: (state) => "bg-[#434654] border-[#434654]",
      }}
      onChange={(e) => setModel(e.value)}
      />
    </div>
  )
}

export default ModelSelection