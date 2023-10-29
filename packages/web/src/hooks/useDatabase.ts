import React from "react"
import { supabase, realtimeListener } from "~/utils/supabase"
import { Database } from "@/shared/src/models/schema"

const fetchRealtimeData = async ({
  table,
  state,
  setter,
}: {
  table: keyof Database["public"]["Tables"]
  state: any
  setter: React.Dispatch<React.SetStateAction<any>>
}) => {
  realtimeListener({
    table,
    onInsert: (payload) => {
      if (state.find((item: { id: any }) => item.id === payload.new.id)) return
      setter((prev: any) => [...prev, payload.new])
    },
    onUpdate: (payload) => {
      setter((prev: any[]) =>
        prev.map((item: { id: any }) => {
          if (item.id === payload.new.id) {
            return payload.new
          }
          return item
        })
      )
    },
    onDelete: (payload) => {
      setter((prev: any[]) =>
        prev.filter((item: { id: any }) => item.id !== payload.old.id)
      )
    },
  })

  return supabase
}

export default fetchRealtimeData
