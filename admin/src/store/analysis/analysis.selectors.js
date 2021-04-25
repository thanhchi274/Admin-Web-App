import { createSelector } from "reselect";
import _ from "lodash";
const selectShop = (state) => state.analysis;
let min =100;
let max =1000
export const selectFilter = state => state.filter
export const test = state=>state.shop.paginationItem
export const selectSearchData = createSelector([selectShop], shop=>shop.searchData)
export const selectPaginationValue = createSelector([selectShop], shop=>shop.paginationItem )
export const selectSingleProduct = createSelector([selectShop],shop=>shop.singleProduct)
export const selectProductComment =createSelector([selectSingleProduct], product=>product[0].comment)
export const selectRelatedProduct= createSelector([selectShop],shop=>shop.relatedProduct)
export const selectProductRelatedTag = createSelector([selectSingleProduct],product=> product?_.head(product[0].tags):null)
export const selectData = createSelector([selectShop], (shop) => shop.data);
export const selectTotalMoneyAndSales = createSelector([selectData], shop=>shop? shop.totalMoneyAndSales:null)
export const selectTotalProductQuantity =createSelector([selectTotalMoneyAndSales], shop=>shop?shop[0].TotalQuantity:null)
export const selectTotalProductAverage =createSelector([selectTotalMoneyAndSales], shop=>shop?shop[0].AverageValue:null)
export const selectTransactionThisMonth =createSelector([selectTotalMoneyAndSales], shop=>shop?shop[0].filterTransactionMonthly:null)
export const selectFilterTransactionMonthly =createSelector([selectData], shop=>shop?shop.filterTransactionMonthly:null)
export const selectFilterTransactionPreviousMonth=createSelector([selectData], shop=>shop?shop.filterTransactionPreviousMonth:null)
export const selectTotalSalesPreviousMonth =createSelector([selectData], shop=>shop?shop.totalPreviousMonth:null)
export const selectTotalSalesThisMonth =createSelector([selectData], shop=>shop?shop.totalThisMonth:null)
export const selectDataTopCollection = createSelector(
  [selectData],
  (topCollections) =>
    topCollections ? _.filter(topCollections, { category: "women" }) : null
);
export const selectIsDataFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);
export const getBestSeller = createSelector(
  [selectData],
  (bestSellerProduct) =>
    bestSellerProduct ? _.filter(bestSellerProduct, { sale: true }) : null
);
export const getRelatedItems = createSelector(selectData,
  (products) => products ?
  _.find(products,item=>{
    const relatedItems =_.find(item.tags,(value)=>{
   return  value ===selectProductRelatedTag
   })
   return relatedItems
  }):null)
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
  [selectData],
  (newProduct) => (newProduct ? _.filter(newProduct, { new: true }) : null)
);
export const getBrands = createSelector([selectData], products =>
 products?_.uniq(_.flatten(_.map(products,"tags")))
 :null
)
export const getColors = createSelector([selectData], products => products ?
  _.uniq(_.flatten(_.map(products,"colors"))):null
    )
export const getMensWear = createSelector([selectData], (product) =>
  product ? _.filter(product, { category: "men" }) : null
);
export const getWomensWear = createSelector([selectData], (product) =>
  product ? _.filter(product, { category: "women" }) : null
);
export const getMinMaxPrice =createSelector([selectData], products => products?
  products.map((product, index) => {
    let v = product.price;
    min = v < min ? v : min;
    max = v > max ? v : max;
    return { min: min, max: max }
  })
:null)
export const getVisibleproducts = createSelector(selectData, selectFilter,
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
export const getFeatureImages=(category) => createSelector([selectData],products=>products?
  products.filter(product => {return product.category === category}):null
)
export const selectCurrency = createSelector([selectShop],shop=>shop.symbol)
export const selectIsDataLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.data
);
