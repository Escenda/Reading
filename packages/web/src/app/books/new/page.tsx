import { Main } from "~/ui"
import AddBookForm from "./AddBookForm"

const AddBookPage = () => {
  return (
    <Main>
      <h1 className="text-4xl font-bold">書籍を追加</h1>
      <AddBookForm />
    </Main>
  )
}

export default AddBookPage
