import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { apiGet, apiPost } from '../../components/common/utils/axios'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface MenuFormData {
  id?: number
  title: string
  url: string
  path: string
  icon: string
  caret: number
  is_aktif: number
  parent_id?: number
}
interface DataMenuCbx {
  id?: number
  title: string
  parent_id?: number
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

  const [formData, setFormData] = useState<MenuFormData>({
    id: undefined,
    title: '',
    url: '',
    path: '',
    icon: '',
    caret: 0,
    is_aktif: 0,
    parent_id: undefined,
  })

  const [dataMenuCbx, setDataMenuCbx] = useState<DataMenuCbx[]>([])
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen && isEdit && dataId) {
      fetchData()
      fetchDataMenuCbx()
    } else if (isOpen && !isEdit) {
      resetForm()
      fetchDataMenuCbx()
    }
  }, [isOpen, dataId])

  const resetForm = () => {
    setFormData({
      title: '',
      url: '',
      path: '',
      icon: '',
      caret: 0,
      is_aktif: 0,
      parent_id: undefined,
    })
    setErrors({})
  }

  const fetchData = async () => {
    try {
      setLoading(false)
      const res = await apiGet(`settings/menu/${dataId}`)
      const datas = res.data.data
      setFormData({
        id: datas.id,
        title: datas.title,
        url: datas.url,
        path: datas.path,
        icon: datas.icon,
        caret: datas.caret,
        is_aktif: datas.is_aktif,
        parent_id: datas.parent_id,
      })
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchDataMenuCbx = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`settings/menu/index`)
      const datas: DataMenuCbx[] = res.data.data
      setDataMenuCbx(datas)
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!(formData.title ?? '').trim()) {
      newErrors.title = 'Menu name is required'
    }
    if (!(formData.url ?? '').trim()) {
      newErrors.url = 'Url is required'
    }

    // tambahan validasi sesuai kebutuhan edit / create
    if (isEdit) {
      if (!(formData.title ?? '').trim()) {
        newErrors.title = 'Menu name is required'
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
        await apiPost(`settings/menu/store/`, dataToSend)
      } else {
        await apiPost('settings/menu/store', dataToSend)
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
      <div className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
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
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Nama Menu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.title
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Enter menu name"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Url */}
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Url <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.url
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Full url"
                />
                {errors.url && (
                  <p className="mt-1 text-sm text-red-500">{errors.url}</p>
                )}
              </div>
            </div>

            {/* <div className="space-y-4">
              <div>
                <label
                  htmlFor="path"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Path <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="path"
                  name="path"
                  value={formData.path}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.path
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Full path"
                />
                {errors.path && (
                  <p className="mt-1 text-sm text-red-500">{errors.path}</p>
                )}
              </div>
            </div> */}

            <div className="space-y-4">
              {/* Icon */}
              <div>
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  icon <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.icon
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                  placeholder="Full icon"
                />
                {errors.icon && (
                  <p className="mt-1 text-sm text-red-500">{errors.icon}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Caret */}
              <div>
                <label
                  htmlFor="caret"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Caret <span className="text-red-500">*</span>
                </label>
                <select
                  id="caret"
                  name="caret"
                  value={formData.caret}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.caret
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                >
                  <option
                    value=""
                    className="text-gray-900 dark:text-white bg-gray-600"
                  >
                    -- Pilih --
                  </option>
                  <option
                    value="1"
                    className="text-gray-900 dark:text-white bg-gray-600"
                  >
                    Aktif
                  </option>
                  <option
                    value="0"
                    className="text-gray-900 dark:text-white bg-gray-600"
                  >
                    Tidak Aktif
                  </option>
                </select>
                {errors.caret && (
                  <p className="mt-1 text-sm text-red-500">{errors.caret}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* Is_aktif */}
              <div>
                <label
                  htmlFor="is_aktif"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Is aktif <span className="text-red-500">*</span>
                </label>
                <select
                  id="is_aktif"
                  name="is_aktif"
                  value={formData.is_aktif}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.is_aktif
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                >
                  <option
                    value=""
                    className="text-gray-900 dark:text-white bg-gray-600"
                  >
                    -- Pilih --
                  </option>
                  <option
                    value="1"
                    className=" text-gray-900 dark:text-white bg-gray-600"
                  >
                    Aktif
                  </option>
                  <option
                    value="0"
                    className=" text-gray-900 dark:text-white bg-gray-600"
                  >
                    Tidak Aktif
                  </option>
                </select>
                {errors.is_aktif && (
                  <p className="mt-1 text-sm text-red-500">{errors.is_aktif}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="parent_id"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"
                >
                  Parent Id <span className="text-red-500">*</span>
                </label>
                <select
                  id="parent_id"
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    errors.parent_id
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 dark:border-white/[0.1] focus:ring-blue-500'
                  } bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:outline-none focus:ring-2`}
                >
                  <option
                    value=""
                    className="text-gray-900 dark:text-white bg-gray-600"
                  >
                    -- Pilih --
                  </option>
                  {dataMenuCbx.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className=" text-gray-900 dark:text-white bg-gray-600"
                    >
                      {item.title}
                    </option>
                  ))}
                </select>
                {errors.parent_id && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.parent_id}
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
