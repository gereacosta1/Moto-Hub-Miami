export type CategorySlug =
  | 'performance-parts'
  | 'engine'
  | 'intake'
  | 'exhaust'
  | 'handling'
  | 'suspension'
  | 'brakes'
  | 'wheels-tires'
  | 'styling'
  | 'exterior'
  | 'interior'
  | 'maintenance-accessories'
  | 'maintenance'
  | 'electronics'
  | 'accessories'

export interface Category {
  id: string
  slug: CategorySlug
  name: string
  shortName?: string
  description: string
  featured?: boolean
  children?: readonly Category[]
}

export const categories: readonly Category[] = [
  {
    id: 'performance-parts',
    slug: 'performance-parts',
    name: 'Performance Parts',
    shortName: 'Performance',
    description:
      'Performance upgrades engineered to improve power, response and the overall driving experience.',
    featured: true,

    children: [
      {
        id: 'engine',
        slug: 'engine',
        name: 'Engine',
        description:
          'Engine components and performance upgrades designed to increase reliability, response and power.',
      },
      {
        id: 'intake',
        slug: 'intake',
        name: 'Intake',
        description:
          'Performance intake systems, filters and airflow upgrades designed to improve engine breathing and response.',
      },
      {
        id: 'exhaust',
        slug: 'exhaust',
        name: 'Exhaust',
        description:
          'Performance exhaust systems and components built for improved flow, sound and reduced restriction.',
      },
    ],
  },

  {
    id: 'handling',
    slug: 'handling',
    name: 'Handling',
    description:
      'Suspension, braking and chassis upgrades designed to improve control, stability and driving dynamics.',
    featured: true,

    children: [
      {
        id: 'suspension',
        slug: 'suspension',
        name: 'Suspension',
        description:
          'Coilovers, springs, shocks and suspension components for improved handling, stance and ride quality.',
      },
      {
        id: 'brakes',
        slug: 'brakes',
        name: 'Brakes',
        description:
          'Performance brake components designed to improve stopping power, consistency and pedal response.',
      },
      {
        id: 'wheels-tires',
        slug: 'wheels-tires',
        name: 'Wheels & Tires',
        shortName: 'Wheels',
        description:
          'Performance wheel and tire solutions designed for improved grip, fitment and vehicle appearance.',
      },
    ],
  },

  {
    id: 'styling',
    slug: 'styling',
    name: 'Styling',
    description:
      'Exterior and interior upgrades designed to give your European vehicle a more distinctive appearance.',
    featured: true,

    children: [
      {
        id: 'exterior',
        slug: 'exterior',
        name: 'Exterior',
        description:
          'Exterior styling and aerodynamic upgrades including spoilers, splitters, diffusers and body components.',
      },
      {
        id: 'interior',
        slug: 'interior',
        name: 'Interior',
        description:
          'Interior upgrades and accessories designed to improve style, comfort and the driver experience.',
      },
    ],
  },

  {
    id: 'maintenance-accessories',
    slug: 'maintenance-accessories',
    name: 'Maintenance & Accessories',
    shortName: 'Accessories',
    description:
      'Maintenance components, electronics and accessories for keeping your vehicle performing at its best.',
    featured: true,

    children: [
      {
        id: 'maintenance',
        slug: 'maintenance',
        name: 'Maintenance',
        description:
          'Filters, service components and replacement parts for dependable maintenance and long-term performance.',
      },
      {
        id: 'electronics',
        slug: 'electronics',
        name: 'Electronics',
        description:
          'Electronic upgrades, sensors and performance technology for modern European vehicles.',
      },
      {
        id: 'accessories',
        slug: 'accessories',
        name: 'Accessories',
        description:
          'Practical and performance-focused accessories for personalizing and upgrading your vehicle.',
      },
    ],
  },
]

export const allCategories: readonly Category[] =
  categories.flatMap((category) => [
    category,
    ...(category.children ?? []),
  ])

export const featuredCategories: readonly Category[] =
  allCategories.filter(
    (category) => category.featured,
  )

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