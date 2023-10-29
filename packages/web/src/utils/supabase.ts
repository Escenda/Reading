import { createClient } from "@supabase/supabase-js"
import { Database } from "@/shared/src/models/schema"

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
)

export const realtimeListener = ({
  table,
  onInsert = () => {},
  onUpdate = () => {},
  onDelete = () => {},
}: {
  table: keyof Database["public"]["Tables"]
  onInsert?: (payload: any) => void
  onUpdate?: (payload: any) => void
  onDelete?: (payload: any) => void
}) => {
  try {
    const client = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )

    client
      .channel("supabase_realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
        },
        (payload) => {
          switch (payload.eventType) {
            case "INSERT":
              onInsert(payload)
              break
            case "UPDATE":
              onUpdate(payload)
              break
            case "DELETE":
              onDelete(payload)
              break
          }
        }
      )
      .subscribe()

    return () => client.channel("supabase_realtime").unsubscribe()
  } catch (error) {
    console.log("Realtime error: ", error)
  }
}
