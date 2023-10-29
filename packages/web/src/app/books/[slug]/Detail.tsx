"use client"

import { Database } from "@/shared/src/models/schema"
import {
  useReadsData,
  insertRead,
  insertBreak,
  stopRead,
  stopBreak,
  isReading,
} from "~/hooks/useReads"

import Clock from "./Clock"
import { supabase } from "~/utils/supabase"

const Detail = ({
  book,
}: {
  book: Database["public"]["Tables"]["books"]["Row"]
}) => {
  const { reads, loading } = useReadsData(book)

  const handleStart = async () => {
    await stopBreak(reads)
    await insertRead(book, reads)
  }

  const handleBreak = async () => {
    await stopRead(reads)
    await insertBreak(book, reads)
  }

  const handleStop = async () => {
    await stopBreak(reads)
    await stopRead(reads)
  }

  const getDatetimeText = (time: string | null) => {
    if (!time) return null
    const date = new Date(time)

    // 0埋め
    const zeroPadding = (num: number) => {
      return ("0" + num).slice(-2)
    }

    const year = date.getFullYear()
    const month = zeroPadding(date.getMonth() + 1)
    const day = zeroPadding(date.getDate())
    const hour = zeroPadding(date.getHours())
    const minute = zeroPadding(date.getMinutes())
    const second = zeroPadding(date.getSeconds())

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  }

  return (
    <article className="flex flex-col space-y-4 min-w-full h-full text-center px-8">
      <h2 className="w-full text-center text-3xl font-bold">{book.title}</h2>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-between w-2/5 h-full mt-8 space-y-16">
          {/* Clock */}
          <Clock reads={reads} />
          {/* Control */}
          <div className="flex flex-col justify-center space-y-4 mt-8">
            <div className="flex flex-row items-center justify-center space-x-12">
              <div className="flex flex-col justify-center">
                <button
                  className="bg-gray-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded h-10 min-w-[8rem] max-w-[8rem]"
                  onClick={handleStart}
                >
                  開始
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="bg-gray-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded h-10 min-w-[8rem] max-w-[8rem]"
                  onClick={handleBreak}
                >
                  休憩
                </button>
              </div>
              <div className="flex flex-col justify-center">
                <button
                  className="bg-gray-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded h-10 min-w-[8rem] max-w-[8rem]"
                  onClick={handleStop}
                >
                  終了
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <h3 className="text-xl font-bold mt-8 mb-0">書籍の説明</h3>
          <p className="overflow-y-scroll h-[35%] text-left mt-8 mt-4 p-4 text-gray-100 bg-gray-600 rounded-lg border border-gray-300">
            {book.description}
          </p>
          <h3 className="text-xl font-bold mt-8 mb-0">読書記録</h3>
          <ul className="overflow-y-scroll h-[35%] text-center mt-8 mt-4 p-4 text-gray-100 bg-gray-600 rounded-lg border border-gray-300">
            {reads
              .filter((read) => read.state === "read")
              .map((read) => (
                <li key={read.id} className="flex justify-between">
                  <p className="w-[50%] tabular-nums">
                    {getDatetimeText(read.start_at)}
                  </p>
                  <p> ～ </p>
                  <p className="w-[50%] tabular-nums">
                    {getDatetimeText(read.end_at) || "読書中"}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export default Detail
