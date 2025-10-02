import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { apiGet, apiPost } from '../../components/common/utils/axios'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface UserFormData {
  id?: number
  role_name: string
}

interface FormModalProps {
  isOpen: boolean
  dataId: number | null
  onClose: () => void
  onSuccess: () => void
}

export default function Form({
  isOpen,
  dataId,
  onClose,
  onSuccess,
}: FormModalProps) {
  const isEdit = !!dataId

  const [formData, setFormData] = useState<UserFormData>({
    id: undefined,
    role_name: '',
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen && isEdit && dataId) {
      fetchUser()
    } else if (isOpen && !isEdit) {
      // Reset form for create
      resetForm()
    }
  }, [isOpen, dataId])

  const resetForm = () => {
    setFormData({
      role_name: '',
    })
    setErrors({})
  }

  const fetchUser = async () => {
    try {
      setLoading(false)
      const res = await apiGet(`settings/roles/${dataId}`)
      const datas = res.data.data
      setFormData({
        id: datas.id,
        role_name: datas.role_name,
      })
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.role_name.trim()) {
      newErrors.name = 'Role Name is required'
    }

    if (!isEdit) {
      if (!formData.role_name.trim()) {
        newErrors.name = 'Role Name is required'
      }
    } else {
      // Validation for edit mode (password optional)
      if (!formData.role_name.trim()) {
        newErrors.name = 'Role Name is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)

      // Prepare data to send
      const dataToSend = { ...formData }

      if (isEdit) {
        await apiPost(`settings/roles/store/`, dataToSend)
      } else {
        await apiPost('settings/roles/store', dataToSend)
      }

      toast.success(
        isEdit ? 'Data berhasil diperbarui' : 'Data berhasil disimpan'
      )

      onSuccess()
      onClose()
      resetForm()
    } catch (error: any) {
      console.error('Failed to save data', error)
      const message =
        error.response?.data?.message || 'Gagal menyimpan data. Coba lagi.'
      toast.error(message)

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      onClose()
      resetForm()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-white/[0.05]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/[0.05]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Data' : 'Create New Data'}
            </h2>

            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {/* hidden input untuk id kalau edit */}
            {isEdit && <input type="hidden" name="id" value={formData.id} />}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="role_name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Roles Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="role_name"
                  name="role_name"
                  value={formData.role_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.role_name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Enter full role name"
                />
                {errors.role_name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.role_name}
                  </p>
                )}
              </div>
            </div>
            {/* Footer */}
            <div className="flex gap-3 justify-end mt-6 pt-6 border-t border-gray-200 dark:border-white/[0.05]">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-white/[0.05] border border-gray-300 dark:border-white/[0.1] hover:bg-gray-50 dark:hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                    Loading...
                  </span>
                ) : isEdit ? (
                  'Update Data'
                ) : (
                  'Create Data'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
