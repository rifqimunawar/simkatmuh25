import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router'
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from '../icons'
import { useSidebar } from '../context/SidebarContext'
import SidebarWidget from './SidebarWidget'
import { FiTool } from 'react-icons/fi'
import { apiGet } from '../components/common/utils/axios'

// Tipe dari API
interface ApiMenu {
  id: number
  title: string
  href: string // ← PERBAIKI: dari 'url' ke 'href'
  path: string | null
  icon: string | null
  children: ApiMenu[]
}

// Tipe NavItem lokal
interface NavItem {
  icon?: React.ReactNode
  name: string
  path?: string
  subItems?: NavItem[]
  pro?: boolean
  new?: boolean
}

// Mapping icon names ke komponen icon
const icons = {
  BoxCubeIcon: BoxCubeIcon,
  CalenderIcon: CalenderIcon,
  GridIcon: GridIcon,
  ListIcon: ListIcon,
  PageIcon: PageIcon,
  PieChartIcon: PieChartIcon,
  PlugInIcon: PlugInIcon,
  TableIcon: TableIcon,
  UserCircleIcon: UserCircleIcon,
  FiTool: FiTool,
}

// Mapping API menu → NavItem
function mapMenuToNav(menu: ApiMenu): NavItem {
  const Icon =
    menu.icon && menu.icon !== '-'
      ? icons[menu.icon as keyof typeof icons] ?? null
      : null

  // Cek apakah memiliki children yang valid
  const hasChildren = menu.children && menu.children.length > 0

  return {
    name: menu.title,
    // Jika tidak ada children, gunakan href sebagai path
    path: !hasChildren ? menu.href : undefined,
    icon: Icon ? <Icon /> : undefined,
    // Hanya set subItems jika benar-benar ada children
    subItems: hasChildren ? menu.children.map(mapMenuToNav) : undefined,
  }
}

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: 'Charts',
    subItems: [],
  },
]

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar()
  const location = useLocation()

  // State menu
  const [navItems, setNavItems] = useState<NavItem[]>([])
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: 'main' | 'others'
    index: number
  } | null>(null)
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({})
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Fetch data menu dari API
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await apiGet('/global/get_menu')
        const data: ApiMenu[] = res.data
        const mapped = data.map(mapMenuToNav)
        setNavItems(mapped)
        console.log('Mapped menu:', mapped) // untuk debug
      } catch (err) {
        console.error('Failed to fetch menu', err)
      }
    }
    fetchMenu()
  }, [])

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  )

  useEffect(() => {
    let submenuMatched = false
    ;['main', 'others'].forEach((menuType) => {
      const items = menuType === 'main' ? navItems : othersItems
      items.forEach((nav, index) => {
        if (nav.subItems && nav.subItems.length > 0) {
          nav.subItems.forEach((subItem) => {
            if (subItem.path && isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as 'main' | 'others',
                index,
              })
              submenuMatched = true
            }
          })
        }
      })
    })

    if (!submenuMatched) {
      setOpenSubmenu(null)
    }
  }, [location, isActive, navItems])

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }))
      }
    }
  }, [openSubmenu])

  const handleSubmenuToggle = (index: number, menuType: 'main' | 'others') => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null
      }
      return { type: menuType, index }
    })
  }

  const renderMenuItems = (items: NavItem[], menuType: 'main' | 'others') => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => {
        // Cek apakah benar-benar punya submenu
        const hasSubItems = nav.subItems && nav.subItems.length > 0

        return (
          <li key={`${menuType}-${nav.name}-${index}`}>
            {hasSubItems ? (
              // Render sebagai button dengan submenu
              <>
                <button
                  onClick={() => handleSubmenuToggle(index, menuType)}
                  className={`menu-item group ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? 'menu-item-active'
                      : 'menu-item-inactive'
                  } cursor-pointer ${
                    !isExpanded && !isHovered
                      ? 'lg:justify-center'
                      : 'lg:justify-start'
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive'
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <ChevronDownIcon
                      className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? 'rotate-180 text-brand-500'
                          : ''
                      }`}
                    />
                  )}
                </button>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <div
                    ref={(el) => {
                      subMenuRefs.current[`${menuType}-${index}`] = el
                    }}
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      height:
                        openSubmenu?.type === menuType &&
                        openSubmenu?.index === index
                          ? `${subMenuHeight[`${menuType}-${index}`]}px`
                          : '0px',
                    }}
                  >
                    <ul className="mt-2 space-y-1 ml-9">
                      {nav.subItems!.map((subItem, subIndex) => (
                        <li key={`${subItem.name}-${subIndex}`}>
                          <Link
                            to={subItem.path || '#'}
                            className={`menu-dropdown-item ${
                              subItem.path && isActive(subItem.path)
                                ? 'menu-dropdown-item-active'
                                : 'menu-dropdown-item-inactive'
                            }`}
                          >
                            {subItem.name}
                            <span className="flex items-center gap-1 ml-auto">
                              {subItem.new && (
                                <span
                                  className={`ml-auto ${
                                    subItem.path && isActive(subItem.path)
                                      ? 'menu-dropdown-badge-active'
                                      : 'menu-dropdown-badge-inactive'
                                  } menu-dropdown-badge`}
                                >
                                  new
                                </span>
                              )}
                              {subItem.pro && (
                                <span
                                  className={`ml-auto ${
                                    subItem.path && isActive(subItem.path)
                                      ? 'menu-dropdown-badge-active'
                                      : 'menu-dropdown-badge-inactive'
                                  } menu-dropdown-badge`}
                                >
                                  pro
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              // Render sebagai link biasa (tidak ada submenu)
              nav.path && (
                <Link
                  to={nav.path}
                  className={`menu-item group ${
                    isActive(nav.path)
                      ? 'menu-item-active'
                      : 'menu-item-inactive'
                  }`}
                >
                  <span
                    className={`menu-item-icon-size ${
                      isActive(nav.path)
                        ? 'menu-item-icon-active'
                        : 'menu-item-icon-inactive'
                    }`}
                  >
                    {nav.icon}
                  </span>
                  {(isExpanded || isHovered || isMobileOpen) && (
                    <span className="menu-item-text">{nav.name}</span>
                  )}
                </Link>
              )
            )}
          </li>
        )
      })}
    </ul>
  )

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? 'w-[290px]'
            : isHovered
            ? 'w-[290px]'
            : 'w-[90px]'
        }
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ''
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, 'main')}
            </div>
            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? 'lg:justify-center'
                    : 'justify-start'
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  ''
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {/* {renderMenuItems(othersItems, 'others')} */}
            </div>
          </div>
        </nav>
        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  )
}

export default AppSidebar
