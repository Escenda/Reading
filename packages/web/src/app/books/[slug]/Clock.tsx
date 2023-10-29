"use client"

import { Database } from "@/shared/src/models/schema"
import { useEffect, useState } from "react"

import { isReading } from "~/hooks/useReads"

const Clock = ({
  reads,
}: {
  reads: Database["public"]["Tables"]["reads"]["Row"][]
}) => {
  const [totalReadingTime, setTotalReadingTime] = useState(0)
  const [totalBreakTime, setTotalBreakTime] = useState(0)

  useEffect(() => {
    const readingRecords = reads.filter((read) => read.state === "read")
    if (readingRecords.length === 0) return

    const _totalReadingTime = readingRecords.reduce((acc, cur) => {
      const startAt = new Date(cur.start_at)
      const endAt = cur.end_at ? new Date(cur.end_at) : startAt
      return acc + endAt.getTime() - startAt.getTime()
    }, 0)

    const readingRecord = readingRecords.find((read) => read.end_at === null)
    if (readingRecord == null) {
      setTotalReadingTime(_totalReadingTime)
      return
    }

    const startAt = new Date(readingRecord.start_at)
    const timer = setInterval(() => {
      const now = new Date()
      setTotalReadingTime(_totalReadingTime + now.getTime() - startAt.getTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [reads])

  useEffect(() => {
    const breakRecords = reads.filter((read) => read.state === "break")
    if (breakRecords.length === 0) return

    const _totalBreakTime = breakRecords.reduce((acc, cur) => {
      const startAt = new Date(cur.start_at)
      const endAt = cur.end_at ? new Date(cur.end_at) : startAt
      return acc + endAt.getTime() - startAt.getTime()
    }, 0)

    const breakRecord = breakRecords.find((read) => read.end_at === null)
    if (breakRecord == null) {
      setTotalBreakTime(_totalBreakTime)
      return
    }

    const startAt = new Date(breakRecord.start_at)
    const timer = setInterval(() => {
      const now = new Date()
      setTotalBreakTime(_totalBreakTime + now.getTime() - startAt.getTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [reads])

  const getFormattedTime = (time: number) => {
    const hour = Math.floor(time / 1000 / 60 / 60)
    const minute = Math.floor((time / 1000 / 60 / 60 - hour) * 60)
    const second = Math.floor(
      ((time / 1000 / 60 / 60 - hour) * 60 - minute) * 60
    )

    const zeroPadding = (num: number) => {
      return num.toString().padStart(2, "0")
    }

    return `${zeroPadding(hour)}:${zeroPadding(minute)}:${zeroPadding(second)}`
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
      <div className="flex flex-col justify-center space-y-8">
        <div className="flex flex-col justify-center">
          <p className="text-[2rem]">読書時間</p>
          <p className="text-[6rem] tabular-nums">
            {getFormattedTime(totalReadingTime)}
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[2rem]">休憩時間</p>
          <p className="text-[6rem] tabular-nums">
            {getFormattedTime(totalBreakTime)}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Clock
