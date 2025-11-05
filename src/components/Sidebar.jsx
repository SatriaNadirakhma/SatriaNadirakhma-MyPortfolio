import React from 'react'
import { CSidebar, CSidebarBrand, CSidebarHeader, CSidebarNav, CNavItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  cilCloudDownload,
  cilLayers,
  cilSpeedometer,
  cilHome,
  cilPuzzle,
  cilUser,
  cilSettings,
} from '@coreui/icons'

import '@coreui/coreui/dist/css/coreui.min.css'

export const SidebarFullHeight = () => {
  return (
    <CSidebar className="border-end min-vh-100 d-flex flex-column" narrow>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>CUI</CSidebarBrand>
      </CSidebarHeader>

      <CSidebarNav className="flex-grow d-flex flex-column justify-content-center">
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilHome} />
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} />
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilLayers} />
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilPuzzle} />
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilUser} />
        </CNavItem>
      </CSidebarNav>

      <CSidebarNav className="mt-auto">
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilSettings} />
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  )
}