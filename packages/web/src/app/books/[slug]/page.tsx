import { supabase } from "~/utils/supabase"
import { Main } from "~/ui"

import Detail from "./Detail"

const BookDetailPage = async ({ params }: { params: { slug: number } }) => {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .match({ id: params.slug })
    .single()

  return (
    <Main className="justify-start">
      <h1 className="text-4xl font-bold">書籍の詳細</h1>
      {data && <Detail book={data} />}
    </Main>
  )
}

export default BookDetailPage
