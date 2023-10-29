import Link from "next/link"

const Pages = [
  { name: "ホーム", path: "/" },
  { name: "書籍一覧", path: "/books" },
  { name: "書籍を追加", path: "/books/new" },
  { name: "読書中の書籍", path: "/books/reading" },
  { name: "このサイトについて", path: "/about" },
]

export const NavigationBar = () => {
  return (
    <header className="flex items-center justify-between min-h-[10vh] w-full p-6 px-16 bg-slate-900">
      <p className="text-2xl font-bold text-white-800 text-center">
        読書時間測れる君
      </p>
      <div className="flex justify-end space-x-4">
        {Pages.map((page) => (
          <Link
            key={page.name}
            href={page.path}
            className="text-white-800 hover:text-gray-300"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </header>
  )
}
