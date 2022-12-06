const flattenedList = products => {
 const result = [];
 Object.values(products).forEach(category => result.push(...category));
 result.sort((a, b) => {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
 });
 return result;
};

const searchResult = (products, searchPhrase) => {
 return flattenedList(products).filter(product =>
  product.name.toLowerCase().includes(searchPhrase.toLowerCase())
 );
};

const sorter = (a, b, stateSwitch) => {
 if (a[stateSwitch] && !b[stateSwitch]) return 1;
 if (!a[stateSwitch] && b[stateSwitch]) return -1;
 if (a.name > b.name) return 1;
 if (a.name < b.name) return -1;
 return 0;
};

const allInCart = (products, category) => {
 return products[category].filter(product => !product.inCart).length === 0;
};

const categoriesProvider = (products, variant) => {
 if (variant === "compose") {
  return Object.keys(products);
 }

 if (variant === "shop") {
  return Object.keys(products).sort((a, b) => {
   if (allInCart(products, a) && !allInCart(products, b)) return 1;
   if (!allInCart(products, a) && allInCart(products, b)) return -1;
   if (a > b) return 1;
   if (a < b) return -1;
   return 0;
  });
 }
};

export const productsHandle = {
 searchResult: searchResult,
 flattenedList: flattenedList,
 sorter: sorter,
 categoriesProvider: categoriesProvider,
 allInCart: allInCart,
};
