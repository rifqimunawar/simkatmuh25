import { useState } from 'react'
import { FiAlertTriangle } from 'react-icons/fi'
import { apiDelete } from '../../components/common/utils/axios'

interface DeleteModalProps {
  isOpen: boolean
  userId: number | null
  userName: string
  onClose: () => void
  onSuccess: () => void
}

export default function Delete({
  isOpen,
  userId,
  userName,
  onClose,
  onSuccess,
}: DeleteModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (!userId) return

    try {
      setLoading(true)
      setError('')
      await apiDelete(`/user/destroy/${userId}`)
      onSuccess()
      onClose()
    } catch (err: any) {
      console.error('Failed to delete user', err)
      setError(
        err.response?.data?.message ||
          'Failed to delete user. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-white/[0.05]">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <FiAlertTriangle className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Delete User
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-4">
            <p className="text-gray-700 dark:text-gray-300">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-gray-900 dark:text-white">
                {userName}
              </span>
              ? All data associated with this user will be permanently removed.
            </p>

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 dark:bg-white/[0.02] rounded-b-xl flex gap-3 justify-end border-t border-gray-100 dark:border-white/[0.05]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/[0.05] border border-gray-300 dark:border-white/[0.1] hover:bg-gray-50 dark:hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="px-4 py-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Deleting...' : 'Delete User'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
