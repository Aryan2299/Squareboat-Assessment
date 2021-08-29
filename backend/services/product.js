exports.getQuantity = (productIds) => {
  const productQuantities = {};
  productIds.map((productId) => {
    if (productQuantities[productId]) {
      productQuantities[productId] += 1;
    } else {
      productQuantities[productId] = 1;
    }
  });

  return productQuantities;
};
