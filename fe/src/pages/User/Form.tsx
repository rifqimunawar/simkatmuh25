import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { apiGet, apiPost } from '../../components/common/utils/axios'

interface UserFormData {
  id?: number
  name: string
  username: string
  email: string
  password?: string
  password_confirmation?: string
  role_id?: number | null
}

interface FormModalProps {
  isOpen: boolean
  userId: number | null
  onClose: () => void
  onSuccess: () => void
}

export default function Form({
  isOpen,
  userId,
  onClose,
  onSuccess,
}: FormModalProps) {
  const isEdit = !!userId

  const [formData, setFormData] = useState<UserFormData>({
    id: undefined,
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role_id: null,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen && isEdit && userId) {
      fetchUser()
    } else if (isOpen && !isEdit) {
      // Reset form for create
      resetForm()
    }
  }, [isOpen, userId])

  const resetForm = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      role_id: null,
    })
    setErrors({})
  }

  const fetchUser = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`/user/show/${userId}`)
      const user = res.data.data
      setFormData({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        password: '',
        password_confirmation: '',
        role_id: user.role_id,
      })
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch user', error)
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

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    }
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!isEdit) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (formData.password !== formData.password_confirmation) {
        newErrors.password_confirmation = 'Passwords do not match'
      }
    } else {
      // Validation for edit mode (password optional)
      if (formData.password && formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }
      if (
        formData.password &&
        formData.password !== formData.password_confirmation
      ) {
        newErrors.password_confirmation = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)

      // Prepare data to send
      const dataToSend = { ...formData }

      // Remove password fields if empty in edit mode
      if (isEdit && !dataToSend.password) {
        delete dataToSend.password
        delete dataToSend.password_confirmation
      }

      if (isEdit) {
        await apiPost(`/user/store/`, dataToSend)
      } else {
        await apiPost('/user/store', dataToSend)
      }

      onSuccess()
      onClose()
      resetForm()
    } catch (error: any) {
      console.error('Failed to save user', error)

      // Handle validation errors from API
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
    <div className="fixed inset-0 z-99999 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-white/[0.05]">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/[0.05]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Edit User' : 'Create New User'}
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
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Enter full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.username
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Enter username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Password {!isEdit && <span className="text-red-500">*</span>}
                  {isEdit && (
                    <span className="text-gray-500 text-xs ml-1">
                      (Leave blank to keep current)
                    </span>
                  )}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder={
                    isEdit ? 'Enter new password (optional)' : 'Enter password'
                  }
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Password Confirmation */}
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Confirm Password{' '}
                  {!isEdit && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.password_confirmation
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder={
                    isEdit ? 'Confirm new password' : 'Confirm password'
                  }
                />
                {errors.password_confirmation && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password_confirmation}
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
                {loading ? '....' : isEdit ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
