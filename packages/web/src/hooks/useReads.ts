import { Database } from "@/shared/src/models/schema"
import { useState, useEffect } from "react"
import fetchData from "~/hooks/useDatabase"
import { supabase } from "~/utils/supabase"

export const useReadsData = (
  book: Database["public"]["Tables"]["books"]["Row"]
) => {
  const [reads, setReads] = useState<
    Database["public"]["Tables"]["reads"]["Row"][]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData({
      table: "reads",
      state: reads,
      setter: setReads,
    }).then((supabase) => {
      supabase
        .from("reads")
        .select()
        .order("id", { ascending: true })
        .eq("book", book.id)
        .then(({ data }) => {
          setLoading(false)
          if (!data) return
          setReads(data)
        })
    })
  }, [])

  // const getTotalPages = () => {
  //   return reads.reduce((acc, read) => acc + read.pages, 0)
  // }

  const getReadTime = ({
    read,
  }: {
    read: Database["public"]["Tables"]["reads"]["Row"]
  }) => {
    if (read.start_at == null || read.end_at == null) return 0
    const start_at = new Date(read.start_at)
    const end_at = new Date(read.end_at)
    const diff = end_at.getTime() - start_at.getTime()
    const seconds = diff / 1000
    const minutes = seconds / 60
    const hours = minutes / 60
    return hours
  }

  const getTotalReadTime = () => {
    const totalHours = reads
      .filter((item) => item.book === book.id && item.state === "read")
      .reduce((acc, read) => acc + getReadTime({ read }), 0)
    return Math.floor(totalHours)
  }

  return { reads, loading, getReadTime, getTotalReadTime }
}

export const isReading = (
  reads: Database["public"]["Tables"]["reads"]["Row"][]
) => reads.some((read) => read.end_at === null)

export const insertBreak = async (
  book: Database["public"]["Tables"]["books"]["Row"],
  reads: Database["public"]["Tables"]["reads"]["Row"][]
) => {
  const doingRecord = reads.find((read) => read.end_at === null)
  if (doingRecord != null) return
  const startAt = new Date()
  await supabase.from("reads").insert({
    book: book.id,
    state: "break",
    start_at: startAt.toISOString(),
  })
}

export const stopBreak = async (
  reads: Database["public"]["Tables"]["reads"]["Row"][]
) => {
  const endAt = new Date()
  const breakRecord = reads.find(
    (read) => read.state === "break" && read.end_at === null
  )
  if (breakRecord == null) return
  await supabase.from("reads").update({ end_at: endAt.toISOString() }).match({
    id: breakRecord.id,
  })
}

export const insertRead = async (
  book: Database["public"]["Tables"]["books"]["Row"],
  reads: Database["public"]["Tables"]["reads"]["Row"][]
) => {
  const doingRecord = reads.find((read) => read.end_at === null)
  if (doingRecord != null) return
  const startAt = new Date()
  await supabase.from("reads").insert({
    book: book.id,
    state: "read",
    start_at: startAt.toISOString(),
  })
}

export const stopRead = async (
  reads: Database["public"]["Tables"]["reads"]["Row"][]
) => {
  const endAt = new Date()
  const readingRecord = reads.find(
    (read) => read.state === "read" && read.end_at === null
  )
  if (readingRecord == null) return
  await supabase.from("reads").update({ end_at: endAt.toISOString() }).match({
    id: readingRecord.id,
  })
}
