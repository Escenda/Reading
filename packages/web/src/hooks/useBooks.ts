import { Database } from "@/shared/src/models/schema"
import { useState, useEffect } from "react"
import fetchData from "~/hooks/useDatabase"

export const useBooksData = () => {
  const [books, setBooks] = useState<
    Database["public"]["Tables"]["books"]["Row"][]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData({
      table: "books",
      state: books,
      setter: setBooks,
    }).then((supabase) => {
      supabase
        .from("books")
        .select()
        // .eq("user", (await supabase.auth.getUser()).data.user?.id as string)
        .order("id", { ascending: true })
        .then(({ data }) => {
          setLoading(false)
          if (!data) return
          setBooks(data)
        })
    })
  }, [])

  return { books, loading }
}
