"use client"

import { useState } from "react"
import { supabase } from "~/utils/supabase"

import { InputBox, Textarea } from "~/ui"

const AddBookForm = () => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formValues, setFormValues] = useState({
    title: "書籍のタイトル",
    description: "書籍の説明",
  })

  const handleFormSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess(false)

    const { data, error } = await supabase.from("books").insert([formValues])

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-8 py-8">
      <div className="space-y-1">
        <label htmlFor="title">Title</label>
        <InputBox
          type="text"
          name="title"
          id="title"
          placeholder="書籍のタイトル"
          value={formValues.title}
          onChange={(e: any) =>
            setFormValues({ ...formValues, title: e.target.value })
          }
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="description">Description</label>
        <Textarea
          name="description"
          id="description"
          placeholder="書籍の説明"
          value={formValues.description}
          onChange={(e: any) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 mt-8 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        onClick={handleFormSubmit}
      >
        Add Book
      </button>
    </div>
  )
}

export default AddBookForm
