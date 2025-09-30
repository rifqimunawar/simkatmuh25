import { useEffect, useState } from 'react'
import Badge from '../../components/ui/badge/Badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { apiGet } from '../../components/common/utils/axios'

interface User {
  id: number
  name: string
  username: string
  role_id: number | null
  img: string | null
  email: string
  email_verified_at: string | null
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export default function Index() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiGet('/user/index')
        setUsers(res.data.data) // sesuaikan dengan struktur response backend kamu
      } catch (error) {
        console.error('Failed to fetch users', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
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
                Full Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Username
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {index + 1}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {user.name}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {user.username}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {user.email}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  {/* Contoh tombol action */}
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
