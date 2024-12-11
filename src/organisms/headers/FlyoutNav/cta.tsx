import { FaUserCircle } from 'react-icons/fa'

export const CTAs = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="flex items-center gap-2 rounded-lg border-2 border-white px-4 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-black">
        <FaUserCircle />
        <span>Sign in</span>
      </button>
      <button className="rounded-lg border-2 border-indigo-300 bg-indigo-300 px-4 py-2 font-semibold text-black transition-colors hover:border-indigo-600 hover:bg-indigo-600 hover:text-white">
        Schedule a Demo
      </button>
    </div>
  )
}
