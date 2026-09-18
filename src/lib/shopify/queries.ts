export const SHOP_QUERY = /* GraphQL */ `
  query FelizziShop {
    shop {
      name
      primaryDomain {
        url
      }
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query FelizziProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          nodes {
            id
            title
            availableForSale
            sku
            price {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;

const CART_FIELDS = /* GraphQL */ `
  id
  checkoutUrl
  totalQuantity
  cost {
    totalAmount {
      amount
      currencyCode
    }
  }
  lines(first: 20) {
    nodes {
      id
      quantity
      merchandise {
        ... on ProductVariant {
          id
          title
          product {
            title
            featuredImage {
              url
              altText
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const CART_CREATE = /* GraphQL */ `
  mutation FelizziCartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_LINES_ADD = /* GraphQL */ `
  mutation FelizziCartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ${CART_FIELDS}
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const CART_QUERY = /* GraphQL */ `
  query FelizziCart($id: ID!) {
    cart(id: $id) {
      ${CART_FIELDS}
    }
  }
`;
