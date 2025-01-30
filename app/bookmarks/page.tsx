"use client"

import { useQuery } from '@tanstack/react-query'
// import { useState, useEffect } from "react"
import { Heading, Text } from "@chakra-ui/react"

import { Bookmark } from "@/components/bookmark"
// import { BookmarkType } from "./schema"
// import { orm } from "./db"
import { BookmarkType } from "./schema"

export default function Bookmarks() {
  /*
    NOTA. Esta es una forma de consumir datos desde un server component pero no es recomendable usarlo en producción.
    const bookmarksResponse = await fetch("http://localhost:3000/bookmarks/api")
    const bookmarks = (await bookmarksResponse.json()) as { data: BookmarkType[] };*/

  /*
  Nota. Esta es una forma de consumir datos desde un server component usando un ORM,se suele ocupar en prod pero no es muy común.
  const bookmarks = await orm.query.bookmarks.findMany({
    limit: 10,
    with: {
      author: true,
    },
  })*/

    /*
  Nota. Forma de consumir datos desde un client component con la tipica useEffect
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([])
  const [status, setStatus] = useState<'idle'|'loading'|'error'|'success'>('idle')

  useEffect(() => {
    setStatus('loading')
    fetch("/bookmarks/api", {
      next: { tags: ["bookmarks"] },
    })
      .then((response) => response.json())
      .then(({ data }) => {
        setBookmarks(data)
        setStatus('success')
      })
  }, [])*/

  const {data: bookmarks, status } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      return fetch("/bookmarks/api", {
        next: { tags: ["bookmarks"] },
      })
        .then((response) => response.json())
        .then(({ data }) => {
          return data as BookmarkType[]
        })
    }
  })

  console.log({ status })

  return (
    <main className="mt-12">
      <header className="">
        <Heading size="lg" className="mb-1">
          Marcadores
        </Heading>
        <Text>
          Estrategías de consumo de datos desde el servidor y el cliente
        </Text>
      </header>

      <ul className="text-lg mt-10">
        {bookmarks?.map((bookmark) => (
          <li className="border-b-2 py-4 px-6 my-2" key={bookmark.id}>
            <Bookmark {...bookmark} />
            {/* <div className="my-1 text-gray-600 text-xs ml-7">
              Creado por {bookmark.author?.name || "Anónimo"}
            </div> */}
          </li>
        ))}
      </ul>
    </main>
  )
}
