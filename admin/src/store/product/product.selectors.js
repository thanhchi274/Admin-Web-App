import { createSelector } from "reselect";
import _ from "lodash";
const selectShop = (state) => state.product;
let min =100;
let max =1000
export const selectFilter = state => state.filter
export const test = state=>state.product.paginationItem
export const selectSearchData = createSelector([selectShop], product=>product.searchData)
export const selectPaginationValue = createSelector([selectShop], product=>product.paginationItem )
export const selectSingleProduct = createSelector([selectShop],product=>product.singleProduct)
export const selectProductComment =createSelector([selectSingleProduct], product=>product[0].comment)
export const selectRelatedProduct= createSelector([selectShop],product=>product.relatedProduct)
export const selectProductRelatedTag = createSelector([selectSingleProduct],product=> product?_.head(product[0].tags):null)
export const selectData = createSelector([selectShop], (product) => product.data);
export const selectDataIsMapping = createSelector([selectData], (data) =>
  data
    ? Object.keys(data[0]).map((item, key) => {
      return data[0][item];
    })
    : null
);
export const selectDataTopCollection = createSelector(
  [selectDataIsMapping],
  (topCollections) =>
    topCollections ? _.filter(topCollections, { category: "women" }) : null
);
export const selectIsDataFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
export const getBestSeller = createSelector(
  [selectDataIsMapping],
  (bestSellerProduct) =>
    bestSellerProduct ? _.filter(bestSellerProduct, { sale: true }) : null
);
// export const getRelatedItems = createSelector(selectDataIsMapping,
//   (products) => products ?
//   _.find(products,item=>{
//     const relatedItems =_.find(item.tags,(value)=>{
//      value ===selectProductRelatedTag
//    })
//    return relatedItems
//   }):null)
export const getTrendingTagCollection = (products, type, tag) => {
  const items = products.filter(product => {
      return product.category === type && product.tags.includes(tag);
  })
  return items.slice(0,8)
}


// Get Trending Collection
export const getTrendingCollection = (products, type) => {
  const items = products.filter(product => {
      return product.category === type;
  })
  return items.slice(0,8)
}

// Get TOP Collection
export const getTopCollection = products => {
  const items = products.filter(product => {
      return product.rating > 4;
  })
  return items.slice(0,8)
}
export const getNewProduct = createSelector(
  [selectDataIsMapping],
  (newProduct) => (newProduct ? _.filter(newProduct, { new: true }) : null)
);
export const getBrands = createSelector([selectDataIsMapping], products =>
 products?_.uniq(_.flatten(_.map(products,"tags")))
 :null
)
export const getColors = createSelector([selectDataIsMapping], products => products ?
  _.uniq(_.flatten(_.map(products,"colors"))):null
    )
export const getMensWear = createSelector([selectDataIsMapping], (product) =>
  product ? _.filter(product, { category: "men" }) : null
);
export const getWomensWear = createSelector([selectDataIsMapping], (product) =>
  product ? _.filter(product, { category: "women" }) : null
);
export const getMinMaxPrice =createSelector([selectDataIsMapping], products => products?
  products.map((product, index) => {
    let v = product.price;
    min = v < min ? v : min;
    max = v > max ? v : max;
    return { min: min, max: max }
  })
:null)
export const getVisibleproducts = createSelector(selectDataIsMapping, selectFilter,
  (data, filterProduct) =>
    (data && filterProduct) ?
      data.filter(item => {
        let brandMatch;
        let colorMatch;
        const { brand, color, value } = filterProduct
        _.isEmpty(brand)===false?(item.tags ? (brandMatch = item.tags.some((tag) => brand.includes(`${tag}`))) : (brandMatch = false)):brandMatch =true;
        (_.isEmpty(color)===false&& item.colors) ? (colorMatch = item.colors.includes(color)) : (colorMatch = true)
        const startPriceMatch =typeof value.min !== "number" || value.min <= item.price;
        const endPriceMatch =typeof value.max !== "number" || item.price <= value.max;
        return brandMatch&&colorMatch  && startPriceMatch && endPriceMatch
      })
        .sort((product1, product2) => {
          const { sortBy } = filterProduct
          if (sortBy === "HighToLow") {
            return product2.price < product1.price ? -1 : 1;
          } else if (sortBy === "LowToHigh") {
            return product2.price > product1.price ? -1 : 1;
          } else if (sortBy === "Newest") {
            return product2._id < product1._id ? -1 : 1;
          } else if (sortBy === "AscOrder") {
            return product1.name.localeCompare(product2.name);
          } else if (sortBy === "DescOrder") {
            return product2.name.localeCompare(product1.name);
          } else {
            return product2._id > product1._id ? -1 : 1;
          }
        })
      : null
)
export const getFeatureImages=(category) => createSelector([selectDataIsMapping],products=>products?
  products.filter(product => {return product.category === category}):null
)
export const selectCurrency = createSelector([selectShop],shop=>shop.symbol)
export const selectIsDataLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.data
);
