import { Main } from "~/ui"
import BookList from "./BookList"

const BooksPage = () => {
  return (
    <Main>
      <h1 className="text-4xl font-bold">書籍一覧</h1>
      <BookList />
    </Main>
  )
}

export default BooksPage
