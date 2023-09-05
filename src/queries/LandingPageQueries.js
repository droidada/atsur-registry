export const HomepageArtworksQuery = `
    #graphql
    query LandingPageArtworks {
        entry {
            id
            artwork_title
            series_title
            record_type
            description
            artists
                {
                    id
                }
            materials
            mediums
            year_created
            rarity
            mount_type
            frame_type
            current_condition
            height
            width
            depth
            weight
            appraisals {
                id
            }
            appraisal_status
            weight
            primary_image
        }
    }
`;

export const HomepageCategoriesQuery = `
    #graphql
    query HomepageCategories {
        categories {
            id
            category_name
        }
    }
`;

export const HomepageFilteredProductsQuery = `
    #graphql
    query HomepageProducts($categories: [Float]) {
        products(filter: { category: { categories_id: { id: {_in: $categories}} } }) {
            id
            product_name
            price
            slug
            product_image {
                id
            }
            category {
                categories_id {
                    id
                    category_name
                    slug
                }
            }
        }
    }
`;
