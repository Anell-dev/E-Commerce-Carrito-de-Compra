const textoCantidad = document.querySelector(".cantidad");
const btnCloseCart = document.querySelector(".close-cart");
const btnCartNav = document.querySelector(".icon-cart-nav");
const cart = document.querySelector(".shopping-cart-container");
const cartProduct = document.querySelector(".product-in-cart-container");
const template = document.querySelector(".template");
const fragment = document.createDocumentFragment();
const imgSecundarias = document.querySelectorAll(".imgs");
const imgsContainer = document.querySelectorAll(".imgs-container");
const imgPrincipal = document.querySelector("#main-image");
const iconoCantidadEnCarrito = document.querySelector(".count");

const botonCerrar = document.getElementById("cerrarModal");
const modal = document.querySelector(".modal");
const next = document.querySelector(".next");
const prev = document.querySelector(".previous");
const numImg = document.querySelectorAll(".img-container img").length;
const imgcontainer = document.querySelector(".img-container");

let currImg = 1;
let clicked = false;

document.addEventListener("DOMContentLoaded", (e) => {
  for (let i = 0; i < imgSecundarias.length; i++) {
    imgSecundarias[i].setAttribute("data-id", i);
  }

  for (let i = 0; i < imgsContainer.length; i++) {
    imgsContainer[i].setAttribute("data-id", i);
  }

  for (let i = 0; i < imgsModal.length; i++) {
    imgsModal[i].setAttribute("data-id", i);
  }

  for (let i = 0; i < imgsContainerModal.length; i++) {
    imgsContainerModal[i].setAttribute("data-id", i);
  }
});

imgSecundarias.forEach((img) => {
  img.addEventListener("click", (e) => {
    const btnIdSelected = e.target.getAttribute("data-id");

    imgSecundarias.forEach((item) => {
      if (item.dataset.id != btnIdSelected) {
        item.classList.remove("selected-img");
      } else {
        item.classList.add("selected-img");
      }
    });

    imgsContainer.forEach((container) => {
      if (container.dataset.id != btnIdSelected) {
        container.classList.remove("selected-container");
      } else {
        container.classList.add("selected-container");
      }
    });

    if (img.getAttribute("data-id") == 0) {
      imgPrincipal.style.backgroundImage =
        "url('./images/image-product-1.jpg')";
    } else if (img.getAttribute("data-id") == 1) {
      imgPrincipal.style.backgroundImage =
        "url('./images/image-product-2.jpg')";
    } else if (img.getAttribute("data-id") == 2) {
      imgPrincipal.style.backgroundImage =
        "url('./images/image-product-3.jpg')";
    } else if (img.getAttribute("data-id") == 3) {
      imgPrincipal.style.backgroundImage =
        "url('./images/image-product-4.jpg')";
    }
  });
});

let carritoObjeto = [
  {
    titulo: "Fall Limited Edition Sneakers",
    cant: 0,
    total: 0,
  },
];

document.addEventListener("click", (e) => {
  if (e.target.matches(".btn-add-to-cart")) {
    if (textoCantidad.textContent != 0) {
      pintarCarrito();
      clicked = true;
    }
  }

  if (e.target.matches(".suma")) {
    sumarAlCarrito();
  }

  if (e.target.matches(".resta")) {
    restarAlCarrito();
  }
});

const pintarCarrito = () => {
  cartProduct.textContent = "";
  iconoCantidadEnCarrito.classList.remove("hide");

  carritoObjeto.forEach((product) => {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".amount-of-products").textContent = product.cant;
    clone.querySelector(".price-total").textContent = numberToCurrency(
      product.total
    );
    fragment.appendChild(clone);
  });
  cartProduct.appendChild(fragment);
};

const sumarAlCarrito = (a) => {
  carritoObjeto.forEach((product) => {
    product.cant++;
    product.total += 125;
    textoCantidad.textContent = product.cant;
    iconoCantidadEnCarrito.textContent = product.cant;

    if (clicked == true) {
      const textCantidadInCart = document.querySelector(".amount-of-products");
      textCantidadInCart.textContent = product.cant;
      const textTotalInCat = document.querySelector(".price-total");
      textTotalInCat.textContent = numberToCurrency(product.total);
    }
  });
};

const restarAlCarrito = () => {
  carritoObjeto.forEach((product) => {
    if (textoCantidad.textContent != 0) {
      product.cant--;
      product.total -= 125;
      textoCantidad.textContent = product.cant;
      iconoCantidadEnCarrito.textContent = product.cant;
    }
    if (textoCantidad.textContent == 0) {
      textoCantidad.textContent = product.cant;
      cartProduct.textContent = "";
      iconoCantidadEnCarrito.classList.add("hide");
      clicked = false;
    }
    if (clicked == true) {
      const textCantidadInCart = document.querySelector(".amount-of-products");
      textCantidadInCart.textContent = product.cant;
      const textTotalInCat = document.querySelector(".price-total");
      textTotalInCat.textContent = numberToCurrency(product.total);
    }
  });
};

btnCartNav.addEventListener("click", (e) => {
  btnCartNav.classList.toggle("cart-open");
  cart.classList.toggle("hide");
});

btnCloseCart.addEventListener("click", (e) => {
  cart.classList.add("hide");
  btnCartNav.classList.remove("cart-open");
});

const numberToCurrency = (n) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
};

imgPrincipal.addEventListener("click", (e) => {
  abrirModal();
});

botonCerrar.addEventListener("click", (e) => {
  cerrarModal();
});

const imgsContainerModal = document.querySelectorAll(".imgs-container-modal");
const imgsModal = document.querySelectorAll(".imgs-modal");

next.addEventListener("click", () => {
  if (currImg < numImg) {
    imgsModal[currImg].classList.add("selected-img-modal");
    imgsContainerModal[currImg].classList.add("selected-container-modal");
    imgsModal[currImg - 1].classList.remove("selected-img-modal");
    imgsContainerModal[currImg - 1].classList.remove(
      "selected-container-modal"
    );
  } else {
    imgsModal[0].classList.add("selected-img-modal");
    imgsContainerModal[0].classList.add("selected-container-modal");
    imgsModal[imgsModal.length - 1].classList.remove("selected-img-modal");
    imgsContainerModal[imgsContainerModal.length - 1].classList.remove(
      "selected-container-modal"
    );
  }
  currImg++;

  updateImage();
});

prev.addEventListener("click", () => {
  if (currImg == 1) {
    imgsModal[imgsModal.length - 1].classList.add("selected-img-modal");
    imgsContainerModal[imgsContainerModal.length - 1].classList.add(
      "selected-container-modal"
    );
    imgsModal[currImg - 1].classList.remove("selected-img-modal");
    imgsContainerModal[currImg - 1].classList.remove(
      "selected-container-modal"
    );
  } else {
    imgsModal[currImg - 2].classList.add("selected-img-modal");
    imgsContainerModal[currImg - 2].classList.add("selected-container-modal");
    imgsModal[currImg - 1].classList.remove("selected-img-modal");
    imgsContainerModal[currImg - 1].classList.remove(
      "selected-container-modal"
    );
  }

  currImg--;
  updateImage();
});

function abrirModal() {
  modal.classList.add("revelar");
}

function cerrarModal() {
  modal.classList.remove("revelar");
}

function updateImage() {
  if (currImg > numImg) {
    currImg = 1;
  } else if (currImg < 1) {
    currImg = numImg;
  }
  imgcontainer.style.transform = `translateX(-${(currImg - 1) * 570}px)`;
}

updateImage();
