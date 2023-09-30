//Toggle Dark Mode
const btnDarkMode = document.querySelector(".btn-toggle-dark-mode input");

btnDarkMode.onclick = function () {
  document.body.classList.toggle("dark-mode-variables");
};

//Slide Show
const slideShow = document.querySelector(".slide-show .list-items");
const slideListItems = document.querySelectorAll(".slide-show .item");
const dots = document.querySelectorAll(".slide-show .dots li");

if (slideShow && slideListItems && dots) {
  let activeSlide = 0;
  let lengthSlide = slideListItems.length - 1;

  let refeshSlide = setInterval(() => {
    activeSlide++;
    reloadSlider();
  }, 5000);

  function reloadSlider() {
    activeSlide = activeSlide > lengthSlide ? 0 : activeSlide;

    let checkLeft = slideListItems[activeSlide].offsetLeft;
    slideShow.style.left = -checkLeft + "px";

    let activeItem = document.querySelector(".slide-show .item.active");
    activeItem.classList.remove("active");

    slideListItems[activeSlide].classList.add("active");

    let activeDot = document.querySelector(".slide-show .dots li.active");
    activeDot.classList.remove("active");

    dots[activeSlide].classList.add("active");

    clearInterval(refeshSlide);
    refeshSlide = setInterval(() => {
      activeSlide++;
      reloadSlider();
    }, 5000);
  }

  dots.forEach((li, key) => {
    li.addEventListener("click", function () {
      activeSlide = key;
      reloadSlider();
    });
  });
}

//Slide Brand
const slideBrand = document.querySelector(".brand .list-brands");
const slideListBrands = document.querySelectorAll(".brand .list-brands .item");
const brandNextPver = document.querySelectorAll(".brand .btn-next-pver .but");

if (slideBrand && slideListBrands && brandNextPver) {
  let activeBrand = 0;
  let lengthBrand = slideListBrands.length - 1;

  brandNextPver[0].onclick = function () {
    activeBrand--;
    slideBrand.prepend(slideListBrands[activeBrand + 1]);
    reloadBrand();
  };

  brandNextPver[1].onclick = function () {
    activeBrand++;
    slideBrand.appendChild(slideListBrands[activeBrand - 1]);
    reloadBrand();
  };

  function reloadBrand() {
    activeBrand =
      activeBrand > lengthBrand
        ? 0
        : activeBrand < 0
        ? lengthBrand
        : activeBrand;

    let checkLeft = slideListBrands[activeBrand].offsetLeft;
    slideBrand.style.left = -259.8 + "px";
  }
}

//While next and pver item

function nextPverItem(btns, listItem, items) {
  const btnsNextPver = document.querySelectorAll(btns);
  const listCard = document.querySelector(listItem);

  if (btnsNextPver && listCard) {
    btnsNextPver[0].onclick = function () {
      let Items = document.querySelectorAll(items);
      listCard.prepend(Items[Items.length - 1]);
    };

    btnsNextPver[1].onclick = function () {
      let Items = document.querySelectorAll(items);
      listCard.appendChild(Items[0]);
    };
  }
}

// home body - categories list card
nextPverItem(
  ".home-body .categories-list-card .btn-next-pver button",
  ".home-body .categories-list-card .list-cards",
  ".home-body .categories-list-card .list-cards .item"
);

// home body - home product
nextPverItem(
  ".home-body .home-product.id1 .btn-next-pver button",
  ".home-body .home-product.id1 .list-products",
  ".home-body .home-product.id1 .list-products .item"
);

nextPverItem(
  ".home-body .home-product.id2 .btn-next-pver button",
  ".home-body .home-product.id2 .list-products",
  ".home-body .home-product.id2 .list-products .item"
);

nextPverItem(
  ".home-body .home-product.id3 .btn-next-pver button",
  ".home-body .home-product.id3 .list-products",
  ".home-body .home-product.id3 .list-products .item"
);

// While scroll web
const header = document.querySelector("header");

document.onscroll = function () {
  if (window.scrollY > 250) {
    header.classList.add("toFixed");
  } else {
    header.classList.remove("toFixed");
  }
};

// Shop page view list product
const shopPageListProducts = document.querySelectorAll(
  ".shop-page .shop-list-products .item"
);

if (shopPageListProducts.length > 0) {
  if (shopPageListProducts.length > 20) {
    shopPageListProducts.forEach((product, index) => {
      if (index + 1 > 20) {
        product.style.display = "none";
      }
    });
  }

  let countTable = shopPageListProducts.length / 20;
  const woocommerceResultCount = document.querySelectorAll(
    ".shop-page .woocommerce-result-count"
  );

  woocommerceResultCount[0].innerHTML = `Showing all ${shopPageListProducts.length} results`;
  if (countTable > 1) {
    woocommerceResultCount[1].innerHTML = `Showing 1-20 of ${shopPageListProducts.length} results`;
  } else {
    woocommerceResultCount[1].innerHTML = `Showing all ${shopPageListProducts.length} results`;
  }

  const woocommerceQuantity = document.querySelector(
    ".shop-page .woocommerce-quantity"
  );
  woocommerceQuantity.innerHTML = `1 of ${Math.ceil(countTable)}`;

  const woocommercePaginationBottom = document.querySelector(
    ".shop-page .woocommerce-pagination-bottom"
  );

  let woocommercePaginationBottomHtml = "";
  for (let index = 0; index < countTable; ) {
    woocommercePaginationBottomHtml += `
      <div class="btn-pagination ${index == 0 ? "active" : ""} border">${
      index + 1
    }</div>
    `;
    index++;
  }
  woocommercePaginationBottom.innerHTML = woocommercePaginationBottomHtml;

  let currentActive = 0;

  const woocommerceBtnNextPver = document.querySelectorAll(
    ".shop-page .woocommerce-pagination .btn-next-pver i"
  );

  const woocommercePaginationBottomBtn = document.querySelectorAll(
    ".shop-page .woocommerce-pagination-bottom .btn-pagination"
  );

  woocommerceBtnNextPver[0].onclick = function () {
    currentActive--;
    if (currentActive < 0) {
      currentActive = Math.ceil(countTable)-1;
    }
    reloadProduct();
  };

  woocommerceBtnNextPver[1].onclick = function () {
    currentActive++;
    if (currentActive > Math.ceil(countTable)-1) {
      currentActive = 0;
    }
    reloadProduct();
  };

  woocommercePaginationBottomBtn.forEach((btn , index) => {
    btn.onclick = function () {
      currentActive = index;
      reloadProduct();
    };
  });

  function reloadProduct() {
    woocommerceQuantity.innerHTML = `${currentActive + 1} of ${Math.ceil(
      countTable
    )}`;

    let woocommercePaginationBottomBtnActive = document.querySelector(
      ".shop-page .woocommerce-pagination-bottom .btn-pagination.active"
    ).classList.remove('active');
    woocommercePaginationBottomBtn[currentActive].classList.add('active');

    shopPageListProducts.forEach((item, index) => {
      item.style.display = "none";
      if (index > currentActive * 20 -1 && index <= currentActive * 20 + 19) {
        item.style.display = "block";
      };
    });
  }
}
