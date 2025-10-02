import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full py-6 gap-2 text-gray-600 dark:text-gray-600">
      <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
      <span>Loading...</span>
    </div>
  )
}
