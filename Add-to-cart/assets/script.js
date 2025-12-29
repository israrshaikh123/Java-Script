const defualtProducts = [
  {
    pid: 1001,
    pname: "Scalp Moisturizing Cream",
    color: "black",
    price: "₹29",
    quantity: 10,
    img: "assets/images/product-01-2.webp",
    desc: "A nourishing cream that hydrates and soothes the scalp, promoting healthy hair growth.",
  },
  {
    pid: 1002,
    pname: "Enriched Hand & Body Wash",
    color: "skyblue",
    price: "₹23",
    quantity: 10,
    img: "assets/images/product-03-3.webp",
    desc: "A nourishing cream that hydrates and soothes the scalp, promoting healthy hair growth.",
  },
  {
    pid: 1003,
    pname: "Enriched Hand Wash",
    color: "violet",
    price: "₹25",
    quantity: 10,
    img: "assets/images/product-04-3.webp",
    desc: "A nourishing cream that hydrates and soothes the scalp, promoting healthy hair growth.",
  },
  {
    pid: 1004,
    pname: "Enriched Duo",
    color: "blue",
    price: "₹31",
    quantity: 10,
    img: "assets/images/product-05-1.webp",
    desc: "A nourishing cream that hydrates and soothes the scalp, promoting healthy hair growth.",
  },
];

let product = JSON.parse(localStorage.getItem("products")) || defualtProducts;

function saveData() {
  localStorage.setItem("products", JSON.stringify(product));
}
saveData();

function displayProduct() {
  let html = "";

  product.forEach((p, index) => {
    html += `
        <div class="col-3"> 
            <div class="card" style="width: 18rem;">
                <img src="${p.img}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${p.pname}</h5>
                    <p class="card-text">${p.desc}</p>
                  <div class="d-flex gap-2 mt-3">
    <a href="./product-detail.html?id=${p.pid}" class="btn btn-dark">View Product</a>

    <a href="#" class="btn btn-secondary"  onclick="addToCart(${index})">Add To Cart</a>
</div>

                </div>
            </div>
        </div>

      
        `;
  });

  document.getElementById("product-list").innerHTML = html;
}

displayProduct();

// add products
function addProduct() {
  let pid = document.getElementById("pid").value.trim();
  let pname = document.getElementById("pname").value.trim();
  let color = document.getElementById("color").value.trim();
  let price = "₹" + document.getElementById("price").value.trim();
  let quantity = document.getElementById("quantity").value.trim();
  let img = document.getElementById("img").value.trim();
  let desc = document.getElementById("desc").value.trim();

  // Validation
  if (!pid || !pname || !color || !price || !quantity || !img || !desc) {
    alert("Please fill all fields!");
    return;
  }

  let pro = {
    pid,
    pname,
    color,
    price,
    quantity,
    img,
    desc,
  };

  product.push(pro);
  localStorage.setItem("products", JSON.stringify(product));

  alert("Product Added Successfully!");
  displayProduct();
}

// cart add by click
function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let selectedProduct = product[index];

  if (!selectedProduct) {
    console.log("Product not found");
    return;
  }

  // CONVERT PRICE "$29" → 29
  selectedProduct.price = Number(selectedProduct.price.replace(/₹|\$/g, ""));

  // check if already exists
  let exist = cart.find((item) => item.pid === selectedProduct.pid);

  if (exist) {
    exist.qty++;
  } else {
    cart.push({ ...selectedProduct, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added successfully!");
}

function loadCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let html = "";
  let grandTotal = 0;

  cart.forEach((p, i) => {
    let price = Number(String(p.price).replace("$", ""));
    let total = p.qty * price;

    grandTotal += total;

    html += `
        <tr>
            <td><img src="${p.img}" width="50"></td>

            <td>${p.pname}</td>

            <td>
                <button class="btn btn-dark" onclick="changeQty(${i}, -1)">-</button>
                <span class="mx-2">${p.qty}</span>
                <button class="btn btn-dark" onclick="changeQty(${i}, 1)">+</button>
            </td>

            <td>₹ ${price}</td>

            <td>₹ ${total}</td>

           <td>
    <button class="btn btn-danger btn-sm" onclick="removeItem(${i})">Remove</button>
</td>
        </tr>
        `;
  });

  document.getElementById("cart-body").innerHTML = html;
  document.getElementById("grand-total").innerText = grandTotal;
}

function changeQty(i, val) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart[i].qty += val;

  if (cart[i].qty <= 0) {
    cart.splice(i, 1);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}
function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // confirmation
  let confirmDelete = confirm("Are you sure you want to remove this product?");
  if (!confirmDelete) return; // user canceled, exit function

  cart.splice(i, 1); // delete product
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

loadCart();

// cart end

// view product section
loadViewProducts();

function loadViewProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  let html = "";

  products.forEach((p, i) => {
    html += `
                <tr>
                    <td>${p.pid}</td>
                    <td>${p.pname}</td>
                    <td>${p.price}</td>
                    <td>${p.quantity}</td>

                    <td>
                        <img src="${p.img}" width="50" height="60">
                    </td>

                    <td>${p.color}</td>

                    <td style="width: 350px;">${p.desc}</td>

                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editView(${i})">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button class="btn btn-danger btn-sm" onclick="deleteView(${i})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>`;
  });

  document.getElementById("view-body").innerHTML = html;
}

// edit
function editView(i) {
  localStorage.setItem("editIndex", i);
  window.location.href = "./edit.html";
}

// delete with confirmation
function deleteView(i) {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
  }
}
