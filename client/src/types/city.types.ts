export type CitySearchResult = {
  type: 'Feature'
  properties: {
    country: string
    country_code: string
    state?: string
    state_code?: string
    county?: string
    city?: string
    municipality?: string
    postcode?: string
    name?: string
    other_names?: Record<string, string>
    datasource?: {
      sourcename: string
      attribution: string
      license: string
      url: string
    }
    lon: number
    lat: number
    population?: number
    result_type: string
    formatted: string
    address_line1?: string
    address_line2?: string
    category?: string
    timezone?: {
      name: string
      offset_STD: string
      offset_STD_seconds: number
      offset_DST: string
      offset_DST_seconds: number
      abbreviation_STD: string
      abbreviation_DST: string
    }
    plus_code?: string
    plus_code_short?: string
    iso3166_2?: string
    rank?: {
      confidence?: number
      confidence_city_level?: number
      match_type?: string
    }
    place_id: string
  }
  geometry: {
    type: 'Point'
    coordinates: [number, number] // [lon, lat]
  }
  bbox?: [number, number, number, number] // [lon1, lat1, lon2, lat2]
}

export type NormalizedSearchResult = {
  placeId: string
  cityName?: string
}

export type CitySearchResponse = {
  type: 'FeatureCollection'
  features: CitySearchResult[]
}
