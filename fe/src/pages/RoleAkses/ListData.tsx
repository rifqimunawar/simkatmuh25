import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { apiGet } from '../../components/common/utils/axios'
import Form from './Form'
import Loading from '../../components/loading/Loading'

interface DataRoleAkses {
  id: number
  role_name: string

  deleted_at: string | null
  created_at: string
  updated_at: string
}

export default function ListDataRoleAkses() {
  const [data, setData] = useState<DataRoleAkses[]>([])
  const [loading, setLoading] = useState(true)

  // Form modal state
  const [formModal, setFormModal] = useState({
    isOpen: false,
    dataId: null as number | null,
  })

  useEffect(() => {
    fetchDataRoleAkses()
  }, [])

  const fetchDataRoleAkses = async () => {
    try {
      setLoading(true)
      const res = await apiGet('settings/roles/index')
      setData(res.data.data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (dataId: number) => {
    setFormModal({
      isOpen: true,
      dataId: dataId,
    })
  }

  const handleFormClose = () => {
    setFormModal({
      isOpen: false,
      dataId: null,
    })
  }

  const handleFormSuccess = () => {
    fetchDataRoleAkses()
  }

  if (loading) return <Loading />

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Hak Akses
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  No
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  {' '}
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.length === 0 ? (
                <TableRow>
                  <td
                    colSpan={5}
                    className="text-gray-500 text-theme-sm dark:text-gray-400 px-5 py-4 sm:px-6 text-center"
                  >
                    No data available
                  </td>
                </TableRow>
              ) : (
                data.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400 px-5 py-4 sm:px-6 text-start">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400 px-5 py-4 sm:px-6 text-start">
                      {item.role_name}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          onClick={() => handleEdit(item.id)}
                          title="Edit Data"
                        >
                          <FaEye size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Form Modal */}
      <Form
        isOpen={formModal.isOpen}
        dataId={formModal.dataId}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
      />
    </div>
  )
}
