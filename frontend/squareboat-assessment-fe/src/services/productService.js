export const addQuantitiesToProducts = (obj, arr) => {
  Object.keys(obj).map((objKey) => {
    arr.find((element, index) => {
      if (element._id === objKey) {
        arr[index].quantity = obj[objKey];
      }
    });
  });

  return arr;
};
