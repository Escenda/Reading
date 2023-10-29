"use client"

import { Database } from "@/shared/src/models/schema"
import { supabase } from "~/utils/supabase"
import { useBooksData } from "~/hooks/useBooks"
import { useReadsData } from "~/hooks/useReads"

const BookList = () => {
  const { books, loading } = useBooksData()

  if (loading === false && books.length === 0) {
    return (
      <p>
        まだ本が登録されていません。<a href="/books/new">こちら</a>
        から登録してください。
      </p>
    )
  }

  const handleDelete = async (id: number) => {
    const { data, error } = await supabase
      .from("books")
      .delete()
      .match({ id: id })

    if (error) {
      console.error(error)
    } else {
      console.log(data)
    }
  }

  return (
    <ul className="flex flex-col space-y-20 py-8 overflow-y-scroll max-h-full w-[32.5rem]">
      {books.map((book) => (
        <li key={book.id} className="px-8 space-y-4">
          <h2 className="w-full text-center text-xl">{book.title}</h2>
          <div className="flex justify-between space-x-4">
            <div>
              <p>{book.description}</p>
              <ReadData book={book} />
            </div>
            <div className="flex flex-column justify-center space-x-2">
              <a
                className="bg-gray-500 hover:bg-blue-700 text-white text-center py-2 px-4 rounded h-10 min-w-[4rem]"
                href={`/books/${book.id}`}
              >
                開く
              </a>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white text-center py-2 px-4 rounded h-10 min-w-[4rem]"
                onClick={() => handleDelete(book.id)}
              >
                削除
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

const ReadData: React.FC<{
  book: Database["public"]["Tables"]["books"]["Row"]
}> = ({ book }) => {
  const { reads, loading, getTotalReadTime } = useReadsData(book)

  if (reads == null) return <p>この本はまだ読まれていません</p>

  return (
    <p>
      {
        reads.filter((item) => item.book === book.id && item.state === "read")
          .length
      }
      回読まれました。合計
      {getTotalReadTime()}時間
    </p>
  )
}

export default BookList
