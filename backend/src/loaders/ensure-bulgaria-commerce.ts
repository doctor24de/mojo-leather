import { Modules } from "@medusajs/framework/utils"

export default async function ensureBulgariaCommerce({ container }: { container: any }) {
  const logger = container.resolve("logger")

  try {
    const regionService = container.resolve(Modules.REGION)
    const regions = await regionService.listRegions({}, { relations: ["countries"], take: 100 })
    const euroRegion = regions.find((region: any) => region.currency_code?.toLowerCase() === "eur")

    if (euroRegion && !euroRegion.countries?.some((country: any) => country.iso_2 === "bg")) {
      await regionService.updateRegions(euroRegion.id, {
        countries: [...euroRegion.countries.map((country: any) => country.iso_2), "bg"],
      })
      logger.info("Added Bulgaria to the EUR commerce region")
    }

    const fulfillmentService = container.resolve(Modules.FULFILLMENT)
    const serviceZones = await fulfillmentService.listServiceZones({}, { relations: ["geo_zones"], take: 100 })
    for (const zone of serviceZones) {
      const isEuropeanZone = zone.geo_zones?.some((geo: any) => ["de", "dk", "fr", "es", "it", "se", "gb"].includes(geo.country_code))
      const hasBulgaria = zone.geo_zones?.some((geo: any) => geo.country_code === "bg")
      if (isEuropeanZone && !hasBulgaria) {
        await fulfillmentService.createGeoZones({ type: "country", country_code: "bg", service_zone_id: zone.id })
        logger.info(`Added Bulgaria to fulfillment service zone ${zone.name}`)
      }
    }

    const taxService = container.resolve(Modules.TAX)
    const bulgarianTaxRegions = await taxService.listTaxRegions({ country_code: "bg" }, { take: 1 })
    if (!bulgarianTaxRegions.length) {
      await taxService.createTaxRegions({ country_code: "bg", provider_id: "tp_system" })
      logger.info("Created the Bulgarian tax region")
    }
  } catch (error) {
    logger.error(`Could not ensure Bulgarian commerce configuration: ${error instanceof Error ? error.message : String(error)}`)
  }
}
