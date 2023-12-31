export const InputBox: React.FC<any> = (props) => {
  return (
    <input
      className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    />
  )
}

export const Textarea: React.FC<any> = ({ text, ...attributes }) => {
  return (
    <textarea
      rows={4}
      className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...attributes}
    ></textarea>
  )
}
