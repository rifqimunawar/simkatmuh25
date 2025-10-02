import { useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi'
import { apiGet, apiPost } from '../../components/common/utils/axios'
import toast from 'react-hot-toast'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface RolesData {
  id?: number
  role_name: string
}

interface MenuData {
  id: number
  title: string
}

interface RoleAksesFormData {
  id?: number
  role_id: number
  menu_id: number
  can_read: number
  can_create: number
  can_update: number
  can_delete: number
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

  const [formData, setFormData] = useState<RolesData>({
    id: undefined,
    role_name: '',
  })

  const [dataMenu, setDataMenu] = useState<MenuData[]>([])
  const [menuPermissions, setMenuPermissions] = useState<
    Record<number, RoleAksesFormData>
  >({})
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (isEdit && dataId) {
        fetchDataRoles()
        fetchDataMenu().then(() => {
          fetchDataRolesAkses()
        })
      } else {
        resetForm()
        fetchDataMenu()
      }
    }
  }, [isOpen, dataId])

  const resetForm = () => {
    setFormData({
      role_name: '',
    })
    setMenuPermissions({})
    setErrors({})
  }

  const fetchDataRoles = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`settings/roles/${dataId}`)
      const datas = res.data.data
      setFormData({
        id: datas.id,
        role_name: datas.role_name,
      })
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch data', error)
      toast.error('Failed to fetch role data')
    } finally {
      setLoading(false)
    }
  }
  const fetchDataRolesAkses = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`settings/roleAksesMenu/${dataId}`)
      const datas = res.data.data

      if (Array.isArray(datas)) {
        const permissions: Record<number, RoleAksesFormData> = {}
        datas.forEach((perm: RoleAksesFormData) => {
          permissions[perm.menu_id] = perm
        })
        setMenuPermissions(permissions)
      }

      setErrors({})
    } catch (error) {
      console.error('Failed to fetch role akses data', error)
      toast.error('Failed to fetch role akses data')
    } finally {
      setLoading(false)
    }
  }

  const fetchDataMenu = async () => {
    try {
      setLoading(true)
      const res = await apiGet(`settings/menu/index`)
      const datas = res.data.data
      setDataMenu(Array.isArray(datas) ? datas : [datas])
      setErrors({})
    } catch (error) {
      console.error('Failed to fetch menu data', error)
      toast.error('Failed to fetch menu data')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePermissionChange = (
    menuId: number,
    field: keyof RoleAksesFormData,
    value: number
  ) => {
    setMenuPermissions((prev) => ({
      ...prev,
      [menuId]: {
        ...prev[menuId],
        menu_id: menuId,
        role_id: formData.id || 0,
        [field]: value,
      } as RoleAksesFormData,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.role_name.trim()) {
      newErrors.role_name = 'Role name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setLoading(true)

      const dataToSend = {
        ...formData,
        permissions: Object.values(menuPermissions),
      }

      await apiPost('settings/roleAksesMenu/store', dataToSend)

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
      console.log(error.response)

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
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-white/[0.05]">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/[0.05]">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEdit ? 'Edit Role Access' : 'Create New Role Access'}
            </h2>

            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
            >
              <FiX size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {isEdit && <input type="hidden" name="id" value={formData.id} />}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Role Name
              </label>
              <input
                type="text"
                name="role_name"
                value={formData.role_name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-white/[0.1] bg-white dark:bg-white/[0.05] text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter role name"
              />
              {errors.role_name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.role_name}
                </p>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/[0.05]">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      Menu Title
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      Read
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      Create
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      Update
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      Delete
                    </th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/[0.1]">
                      All
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dataMenu.map((menu, index) => {
                    const permissions = menuPermissions[menu.id] || {
                      can_read: 0,
                      can_create: 0,
                      can_update: 0,
                      can_delete: 0,
                    }

                    const allChecked =
                      permissions.can_read === 1 &&
                      permissions.can_create === 1 &&
                      permissions.can_update === 1 &&
                      permissions.can_delete === 1

                    return (
                      <tr
                        key={menu.id}
                        className="hover:bg-gray-50 dark:hover:bg-white/[0.02]"
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.1]">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 dark:text-white border border-gray-200 dark:border-white/[0.1]">
                          {menu.title}
                        </td>
                        <td className="px-4 py-3 text-center border border-gray-200 dark:border-white/[0.1]">
                          <input
                            type="checkbox"
                            checked={!!permissions.can_read}
                            onChange={(e) =>
                              handlePermissionChange(
                                menu.id,
                                'can_read',
                                e.target.checked ? 1 : 0
                              )
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border border-gray-200 dark:border-white/[0.1]">
                          <input
                            type="checkbox"
                            checked={!!permissions.can_create}
                            onChange={(e) =>
                              handlePermissionChange(
                                menu.id,
                                'can_create',
                                e.target.checked ? 1 : 0
                              )
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border border-gray-200 dark:border-white/[0.1]">
                          <input
                            type="checkbox"
                            checked={!!permissions.can_update}
                            onChange={(e) =>
                              handlePermissionChange(
                                menu.id,
                                'can_update',
                                e.target.checked ? 1 : 0
                              )
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border border-gray-200 dark:border-white/[0.1]">
                          <input
                            type="checkbox"
                            checked={!!permissions.can_delete}
                            onChange={(e) =>
                              handlePermissionChange(
                                menu.id,
                                'can_delete',
                                e.target.checked ? 1 : 0
                              )
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-4 py-3 text-center border border-gray-200 dark:border-white/[0.1]">
                          <input
                            type="checkbox"
                            checked={allChecked}
                            onChange={(e) => {
                              const value = e.target.checked ? 1 : 0
                              handlePermissionChange(menu.id, 'can_read', value)
                              handlePermissionChange(
                                menu.id,
                                'can_create',
                                value
                              )
                              handlePermissionChange(
                                menu.id,
                                'can_update',
                                value
                              )
                              handlePermissionChange(
                                menu.id,
                                'can_delete',
                                value
                              )
                            }}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

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
