export type ProductAvailability =
  | 'in-stock'
  | 'low-stock'
  | 'out-of-stock'
  | 'pre-order'

export interface ProductImage {
  src: string
  alt: string
}

export interface VehicleCompatibility {
  make: string
  model: string
  years?: number[]
  yearFrom?: number
  yearTo?: number
}

export interface ProductSpecification {
  label: string
  value: string
}

export interface Product {
  id: string
  slug: string

  name: string
  brand: string
  category: string
  subcategory?: string

  shortDescription: string
  description: string

  price: number
  compareAtPrice?: number

  sku?: string

  images: ProductImage[]

  availability: ProductAvailability
  stock?: number

  featured?: boolean
  newArrival?: boolean
  bestSeller?: boolean

  specifications?: ProductSpecification[]
  compatibility?: VehicleCompatibility[]

  tags?: string[]
}