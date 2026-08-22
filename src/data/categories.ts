export type CategorySlug =
  | 'helmets'
  | 'riding-gear'
  | 'footwear'
  | 'gloves'
  | 'protection'
  | 'exhaust'
  | 'parts-accessories'
  | 'filters'
  | 'disc-guards'
  | 'suspension'
  | 'seats'
  | 'luggage-cases'

export interface Category {
  id: string
  slug: CategorySlug
  name: string
  shortName?: string
  description: string
  featured?: boolean
  children?: readonly Category[]
}

export const categories = [
  {
    id: 'helmets',
    slug: 'helmets',
    name: 'Helmets',
    description:
      'Street, touring and performance helmets built for protection, comfort and everyday riding.',
    featured: true,
  },

  {
    id: 'riding-gear',
    slug: 'riding-gear',
    name: 'Riding Gear',
    description:
      'Premium riding essentials designed for protection, comfort and performance on every ride.',
    featured: true,

    children: [
      {
        id: 'footwear',
        slug: 'footwear',
        name: 'Footwear',
        description:
          'Motorcycle boots and riding shoes engineered for protection, grip and all-day comfort.',
      },
      {
        id: 'gloves',
        slug: 'gloves',
        name: 'Gloves',
        description:
          'Street and performance riding gloves with protection, control and dependable grip.',
      },
      {
        id: 'protection',
        slug: 'protection',
        name: 'Protection',
        description:
          'Protective motorcycle gear designed to add confidence without sacrificing mobility.',
      },
    ],
  },

  {
    id: 'exhaust',
    slug: 'exhaust',
    name: 'Exhaust',
    description:
      'Slip-ons, full systems and exhaust upgrades built for sound, performance and reduced weight.',
    featured: true,
  },

  {
    id: 'parts-accessories',
    slug: 'parts-accessories',
    name: 'Parts & Accessories',
    shortName: 'Parts',
    description:
      'Performance parts and practical upgrades for improving, protecting and personalizing your motorcycle.',

    children: [
      {
        id: 'filters',
        slug: 'filters',
        name: 'Filters',
        description:
          'Air, oil and fuel filtration components for dependable performance and engine protection.',
      },
      {
        id: 'disc-guards',
        slug: 'disc-guards',
        name: 'Disc Guards',
        description:
          'Brake disc protection designed for demanding street, trail and off-road riding.',
      },
      {
        id: 'suspension',
        slug: 'suspension',
        name: 'Suspension',
        description:
          'Suspension components and upgrades for improved control, handling and ride quality.',
      },
      {
        id: 'seats',
        slug: 'seats',
        name: 'Seats',
        description:
          'Replacement and performance motorcycle seats designed for comfort, support and style.',
      },
      {
        id: 'luggage-cases',
        slug: 'luggage-cases',
        name: 'Luggage & Cases',
        shortName: 'Luggage',
        description:
          'Motorcycle luggage and storage solutions for commuting, touring and everyday riding.',
        featured: true,
      },
    ],
  },
] as const satisfies readonly Category[]

export const allCategories: readonly Category[] = categories.flatMap(
  (category) => [
    category,
    ...(category.children ?? []),
  ],
)

export const featuredCategories: readonly Category[] =
  allCategories.filter((category) => category.featured)

export function getCategoryBySlug(
  slug: string,
): Category | undefined {
  return allCategories.find(
    (category) => category.slug === slug,
  )
}

export function getCategoryFilterSlugs(
  slug: string,
): CategorySlug[] {
  const category = getCategoryBySlug(slug)

  if (!category) {
    return []
  }

  return [
    category.slug,
    ...(category.children?.map(
      (child) => child.slug,
    ) ?? []),
  ]
}

export function isCategorySlug(
  value: string,
): value is CategorySlug {
  return allCategories.some(
    (category) => category.slug === value,
  )
}