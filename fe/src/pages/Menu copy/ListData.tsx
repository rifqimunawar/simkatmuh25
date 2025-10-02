import { useEffect, useState } from 'react'
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { apiGet } from '../../components/common/utils/axios'
import Delete from './Delete'
import Form from './Form'
import Loading from '../../components/loading/Loading'

interface DataMenu {
  id: number
  title: string
  path: string
  url: string

  deleted_at: string | null
  created_at: string
  updated_at: string
}

export default function ListDataMenu() {
  const [data, setData] = useState<DataMenu[]>([])
  const [loading, setLoading] = useState(true)

  // Form modal state
  const [formModal, setFormModal] = useState({
    isOpen: false,
    dataId: null as number | null,
  })

  // Delete modal state
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    dataId: null as number | null,
    dataName: '',
  })

  useEffect(() => {
    fetchDataMenu()
  }, [])

  const fetchDataMenu = async () => {
    try {
      setLoading(true)
      const res = await apiGet('settings/menu/index')
      setData(res.data.data)
    } catch (error) {
      console.error('Failed to fetch data', error)
    } finally {
      setLoading(false)
    }
  }

  // Form Modal Handlers
  const handleCreate = () => {
    setFormModal({
      isOpen: true,
      dataId: null,
    })
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
    fetchDataMenu() // Refresh the user list
  }

  // Delete Modal Handlers
  const handleDeleteClick = (data: DataMenu) => {
    setDeleteModal({
      isOpen: true,
      dataId: data.id,
      dataName: data.title,
    })
  }

  const handleDeleteClose = () => {
    setDeleteModal({
      isOpen: false,
      dataId: null,
      dataName: '',
    })
  }

  const handleDeleteSuccess = () => {
    fetchDataMenu() // Refresh the user list
  }

  if (loading) return <Loading />

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Data Menu
        </h3>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          <FiPlus size={18} />
          Add Data
        </button>
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
                  Menu Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Path
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Url
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
                      {item.title || '-'}
                    </TableCell>
                    <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400 px-5 py-4 sm:px-6 text-start">
                      {item.path || '-'}
                    </TableCell>
                    <TableCell className="text-gray-500 text-theme-sm dark:text-gray-400 px-5 py-4 sm:px-6 text-start">
                      {item.url || '-'}
                    </TableCell>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      <div className="flex gap-3">
                        <button
                          className="text-blue-500 hover:text-blue-700 transition-colors"
                          onClick={() => handleEdit(item.id)}
                          title="Edit Data"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 transition-colors"
                          onClick={() => handleDeleteClick(item)}
                          title="Delete Data"
                        >
                          <FiTrash2 size={18} />
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

      {/* Delete Modal */}
      <Delete
        isOpen={deleteModal.isOpen}
        dataId={deleteModal.dataId}
        dataName={deleteModal.dataName}
        onClose={handleDeleteClose}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  )
}
