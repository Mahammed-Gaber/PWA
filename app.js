import { openDB } from "https://cdn.jsdelivr.net/npm/idb@8/+esm";

// async function useDb() {


async function addProduct() {
  const dbpromise = await openDB("simp-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("pros")) {
        db.createObjectStore("pros", { keyPath: "name" });
      }
    },
  });
  var allPros = [
    {
      id: 1,
      name: "pro 1",
      price: 1000,
    },
    {
      id: 2,
      name: "pro 2",
      price: 2000,
    },
    {
      id: 3,
      name: "pro 3",
      price: 3000,
    },
  ];
  var tx = dbpromise.transaction("pros", "readwrite");
  for (let i = 0; i < allPros.length; i++) {
    Promise.all([tx.store.add(allPros[i])]);
  }
}

async function getProduct() {
  const dbpromise = await openDB("simp-db", 1);
  var myProduct = await dbpromise.get("pros", "pro 1");
  console.dir(myProduct);
}

async function getAllProduct() {
  const dbpromise = await openDB("simp-db", 1);
  var allProducts = await dbpromise.getAll("pros");
  for (let i = 0; i < allProducts.length; i++) {
    document.write(
      `${allProducts[i].id} ==> ${allProducts[i].name} ==>${allProducts[i].price} <br>`
    );
  }
  console.dir(allProducts);
}

// edit
async function updateProduct() {
  const dbpromise = await openDB("simp-db", 1);
  var Product = {
    name: "pro 1 new",
    price: 5000,
  };
  var tx = dbpromise.transaction("pros", "readwrite");
  var updatedPro = await tx.store.get("pro 1");
  console.log(updatedPro);
  Object.assign(updatedPro, Product);
  await tx.store.put(updatedPro);
}

async function deleteProduct() {
  const dbpromise = await openDB("simp-db", 1);
  var tx = dbpromise.transaction("pros", "readwrite");
  await tx.store.delete('pro 1');
  await console.log(`delete success`)
}
// ====================
// async function updateProduct(name, updatedData) {
//   const dbpromise = await openDB("simp-db", 1);
//   var tx = dbpromise.transaction("products", "readwrite");
//   var product = await tx.store.get(name);
//   console.dir(product);
//   if (product) {
//     Object.assign(product, updatedData);
//     await tx.store.put(product);
//   }
// }

// -----------
window.addProduct = addProduct;
window.getProduct = getProduct;
window.getAllProduct = getAllProduct;
window.updateProduct = updateProduct;
window.deleteProduct = deleteProduct;
