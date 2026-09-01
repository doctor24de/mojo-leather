"use client"

import { useState } from "react"

export default function EditorialImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  return (
    <img
      src={failed ? "/furia/editorial/placeholder.svg" : src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  )
}
