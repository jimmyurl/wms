import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const WarehouseContext = createContext({})

export function WarehouseProvider({ children }) {
  const { profile } = useAuth()
  const [warehouses, setWarehouses] = useState([])
  const [activeWarehouse, setActiveWarehouse] = useState(null)

  useEffect(() => {
    if (profile?.tenant_id) fetchWarehouses()
  }, [profile])

  async function fetchWarehouses() {
    const { data } = await supabase
      .from('warehouses')
      .select('*')
      .eq('tenant_id', profile.tenant_id)
      .eq('is_active', true)
      .order('name')
    setWarehouses(data || [])
    if (data?.length && !activeWarehouse) {
      setActiveWarehouse(profile.warehouses || data[0])
    }
  }

  return (
    <WarehouseContext.Provider value={{ warehouses, activeWarehouse, setActiveWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  )
}

export const useWarehouse = () => useContext(WarehouseContext)