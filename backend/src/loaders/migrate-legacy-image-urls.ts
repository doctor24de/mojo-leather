import { updateProductsWorkflow } from "@medusajs/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

const LEGACY_IMAGE_ORIGINS = [
  "https://mojo-api.doktor24.xyz",
  "http://mojo-api.doktor24.xyz",
]

function migrateImageUrl(url: string | null | undefined, backendUrl: string) {
  if (!url) return url

  const legacyOrigin = LEGACY_IMAGE_ORIGINS.find((origin) => url.startsWith(`${origin}/`))
  return legacyOrigin ? `${backendUrl}${url.slice(legacyOrigin.length)}` : url
}

export default async function migrateLegacyImageUrls({ container }: { container: any }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const backendUrl = (process.env.MEDUSA_BACKEND_URL || "http://localhost:9000").replace(/\/$/, "")

  try {
    const { data: products } = await query.graph({
      entity: "product",
      fields: ["id", "thumbnail", "images.id", "images.url"],
      pagination: { take: 1000 },
    })

    let migrated = 0

    for (const product of products) {
      const thumbnail = migrateImageUrl(product.thumbnail, backendUrl)
      const images = (product.images || []).map((image: { id: string; url: string }) => ({
        id: image.id,
        url: migrateImageUrl(image.url, backendUrl) as string,
      }))
      const imageChanged = images.some(
        (image: { id: string; url: string }, index: number) => image.url !== product.images[index].url
      )

      if (thumbnail === product.thumbnail && !imageChanged) continue

      await updateProductsWorkflow(container).run({
        input: {
          selector: { id: product.id },
          update: {
            thumbnail,
            images,
          },
        },
      })
      migrated += 1
    }

    if (migrated) logger.info(`Migrated image URLs for ${migrated} product(s) to ${backendUrl}`)
  } catch (error) {
    logger.error(
      `Could not migrate legacy product image URLs: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
