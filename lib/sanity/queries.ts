export const BOX_CYCLES_QUERY = `
  *[_type == "boxCycle"] | order(shipDate desc) {
    _id,
    title,
    slug,
    quarter,
    theme,
    description,
    image,
    cutoffDate,
    shipDate,
    isAvailable,
    digitalExtras
  }
`

export const CURRENT_BOX_QUERY = `
  *[_type == "boxCycle" && isAvailable == true] | order(shipDate asc) [0] {
    _id,
    title,
    slug,
    quarter,
    theme,
    description,
    image,
    cutoffDate,
    shipDate,
    isAvailable,
    digitalExtras
  }
`

export const FAQS_QUERY = `
  *[_type == "faq"] | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    author,
    content,
    rating,
    image
  }
`

export const PAGE_CONTENT_QUERY = `
  *[_type == "pageContent" && page == $page] {
    _id,
    page,
    section,
    content
  }
`

