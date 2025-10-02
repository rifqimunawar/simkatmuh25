import ComponentCard from '../../components/common/ComponentCard'
import PageBreadcrumb from '../../components/common/PageBreadCrumb'
import PageMeta from '../../components/common/PageMeta'
import ListDataRoleAkses from './ListData'

export default function IndexRoleAkses() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Hak Akses" />
      <div className="space-y-6">
        <ComponentCard>
          <ListDataRoleAkses />
        </ComponentCard>
      </div>
    </>
  )
}
