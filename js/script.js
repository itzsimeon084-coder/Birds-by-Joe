/* =========================================================
  BIRDS BY JOE
  MAIN JAVASCRIPT
  ========================================================= */
/* =========================================================
  1. MOBILE NAVIGATION
  ========================================================= */
const mobileMenuButton = document.getElementById("mobileMenuButton");
const navigationList = document.querySelector(".navigation-list");
if (mobileMenuButton && navigationList) {
   mobileMenuButton.addEventListener("click", function () {
       navigationList.classList.toggle("active");
       const isOpen =
           navigationList.classList.contains("active");
       mobileMenuButton.setAttribute(
           "aria-expanded",
           isOpen
       );
   });
}
/* =========================================================
  2. MOBILE DROPDOWN MENUS
  ========================================================= */
const dropdowns =
   document.querySelectorAll(".dropdown");
dropdowns.forEach(function (dropdown) {
   const dropdownLink =
       dropdown.querySelector("a");
   if (!dropdownLink) {
       return;
   }
   dropdownLink.addEventListener("click", function (event) {
       if (window.innerWidth <= 700) {
           event.preventDefault();
           dropdown.classList.toggle("open");
       }
   });
});
/* =========================================================
  3. CLOSE MOBILE MENU WHEN LINK IS SELECTED
  ========================================================= */
const navigationLinks =
   document.querySelectorAll(".navigation-list a");
navigationLinks.forEach(function (link) {
   link.addEventListener("click", function () {
       if (window.innerWidth <= 700) {
           const parentDropdown =
               link.closest(".dropdown");
           /*
            * Keep dropdown open when its main link
            * is being used to open the submenu.
            */
           if (!parentDropdown) {
               navigationList?.classList.remove("active");
           } else if (
               link !== parentDropdown.querySelector("a")
           ) {
               navigationList?.classList.remove("active");
           }
       }
   });
});
/* =========================================================
  4. WEBSITE SEARCH DATABASE
  =========================================================
  The search can find:
  - Pages
  - Bird species
  - Individual bird varieties
  - Products/categories
  - Important website information
  The URL includes ?search=...
  so the destination page can automatically
  find and scroll to the matching content.
  ========================================================= */
const searchPages = [
   /* ---------- MAIN PAGES ---------- */
   {
       name: "Home",
       url: "index.html",
       keywords:
           "home birds by joe hand raised baby parrots"
   },
   {
       name: "About Us",
       url: "about.html",
       keywords:
           "about birds by joe company family"
   },
   {
       name: "Available Babies",
       url: "available-babies.html",
       keywords:
           "available babies baby parrots birds for sale babies"
   },
   {
       name: "Cage Information",
       url: "cage-info.html",
       keywords:
           "cage cages bird cage cage information"
   },
   {
       name: "Contact Us",
       url: "contact.html",
       keywords:
           "contact us contact phone email address location"
   },
   {
       name: "Our Birds",
       url: "our-birds.html",
       keywords:
           "our birds bird species parrots birds"
   },
   {
       name: "Reviews",
       url: "reviews.html",
       keywords:
           "reviews testimonials customers"
   },
   {
       name: "Shop Online",
       url: "shop.html",
       keywords:
           "shop online store products food seeds toys perches stands vitamins minerals"
   },
   {
       name: "Terms & Conditions",
       url: "terms.html",
       keywords:
           "terms conditions policy"
   },
   /* ---------- BIRD SPECIES PAGES ---------- */
   {
       name: "Macaws",
       url: "macaws.html",
       keywords:
           "macaw macaws blue gold blue and gold catalina greenwing green wing hahns hahn harlequin hyacinth military red fronted scarlet severe yellow collared"
   },
   {
       name: "Cockatoos",
       url: "cockatoos.html",
       keywords:
           "cockatoo cockatoos bare eyed sulphur crested sulphur umbrella goffin"
   },
   {
       name: "Conures",
       url: "conures.html",
       keywords:
           "conure conures sun jenday nanday green cheek green-cheek peach fronted maroon bellied"
   },
   {
       name: "African Grey",
       url: "african-grey.html",
       keywords:
           "african grey african greys timneh congo african grey parrot"
   },
   {
       name: "Amazons",
       url: "amazons.html",
       keywords:
           "amazon amazons blue cheeked blue-cheeked blue fronted blue-fronted yellow headed yellow-headed yellow nape yellow-nape mealy orange winged"
   },
   {
       name: "Budgies",
       url: "budgies.html",
       keywords:
           "budgie budgies budgerigar english budgies rainbow budgie parakeet"
   },
   {
       name: "Caiques",
       url: "caiques.html",
       keywords:
           "caique caiques white bellied white-bellied black headed black-headed"
   },
   {
       name: "Cockatiels",
       url: "cockatiels.html",
       keywords:
           "cockatiel cockatiels white faced white-faced lutino albino"
   },
   {
       name: "Finches",
       url: "finches.html",
       keywords:
           "finch finches gouldian zebra european goldfinch society owl strawberry"
   },
   {
       name: "Parrotlets",
       url: "parrotlets.html",
       keywords:
           "parrotlet parrotlets"
   },
   {
       name: "Others",
       url: "others.html",
       keywords:
           "other birds cockatiels budgies caiques finches"
   }
];
/* =========================================================
  5. SEARCH ELEMENTS
  ========================================================= */
const searchForm =
   document.getElementById("searchForm");
const searchInput =
   document.getElementById("searchInput");
const searchResults =
   document.getElementById("searchResults");
/* =========================================================
  6. NORMALIZE SEARCH TEXT
  ========================================================= */
function normalizeText(text) {
   return text
       .toLowerCase()
       .replace(/[-_]/g, " ")
       .replace(/\s+/g, " ")
       .trim();
}
/* =========================================================
  7. SEARCH MATCHING
  ========================================================= */
function searchMatches(page, query) {
   const normalizedQuery =
       normalizeText(query);
   const searchableText =
       normalizeText(
           page.name + " " + page.keywords
       );
   return searchableText.includes(normalizedQuery);
}
/* =========================================================
  8. CREATE SEARCH URL
  ========================================================= */
function createSearchURL(page, query) {
   return (
       page.url +
       "?search=" +
       encodeURIComponent(query)
   );
}
/* =========================================================
  9. DISPLAY SEARCH RESULTS
  ========================================================= */
function displaySearchResults(results, query) {
   if (!searchResults) {
       return;
   }
   searchResults.innerHTML = "";
   if (results.length === 0) {
       searchResults.innerHTML = `
           <div class="search-no-results">
               No results found for
               "<strong>${escapeHTML(query)}</strong>"
           </div>
       `;
       searchResults.classList.add("show");
       return;
   }
   /*
    * Show a maximum of 8 results.
    */
   const limitedResults =
       results.slice(0, 8);
   limitedResults.forEach(function (page) {
       const result =
           document.createElement("a");
       result.className =
           "search-result-item";
       result.href =
           createSearchURL(page, query);
       result.innerHTML = `
           <strong>${escapeHTML(page.name)}</strong>
           <span>View matching information</span>
       `;
       searchResults.appendChild(result);
   });
   searchResults.classList.add("show");
}
/* =========================================================
  10. SEARCH WHILE TYPING
  ========================================================= */
if (searchInput && searchResults) {
   searchInput.addEventListener(
       "input",
       function () {
           const query =
               searchInput.value.trim();
           if (query === "") {
               searchResults.innerHTML = "";
               searchResults.classList.remove("show");
               return;
           }
           const results =
               searchPages.filter(function (page) {
                   return searchMatches(page, query);
               });
           displaySearchResults(
               results,
               query
           );
       }
   );
}
/* =========================================================
  11. SEARCH BUTTON
  ========================================================= */
if (searchForm && searchInput) {
   searchForm.addEventListener(
       "submit",
       function (event) {
           event.preventDefault();
           const query =
               searchInput.value.trim();
           if (query === "") {
               return;
           }
           const results =
               searchPages.filter(function (page) {
                   return searchMatches(page, query);
               });
           if (results.length > 0) {
               /*
                * Open the best matching page.
                * The ?search= parameter allows the
                * destination page to locate the
                * exact matching section.
                */
               window.location.href =
                   createSearchURL(
                       results[0],
                       query
                   );
           } else {
               displaySearchResults(
                   [],
                   query
               );
           }
       }
   );
}
/* =========================================================
  12. FIND EXACT CONTENT ON DESTINATION PAGE
  ========================================================= */
function findSearchTarget(query) {
   if (!query) {
       return;
   }
   const normalizedQuery =
       normalizeText(query);
   /*
    * Elements that are most likely to represent
    * a section or item.
    */
   const preferredElements =
       document.querySelectorAll(
           "h1, h2, h3, h4, h5, h6, article, section, .card, .product, .bird-card"
       );
   let bestMatch = null;
   let bestScore = 0;
   preferredElements.forEach(function (element) {
       const text =
           normalizeText(element.textContent);
       if (!text) {
           return;
       }
       /*
        * Exact phrase match gets the highest score.
        */
       if (text.includes(normalizedQuery)) {
           let score = 100;
           /*
            * Headings get an additional advantage.
            */
           if (/^H[1-6]$/.test(element.tagName)) {
               score += 50;
           }
           if (score > bestScore) {
               bestScore = score;
               bestMatch = element;
           }
           return;
       }
       /*
        * If the complete phrase isn't found,
        * compare individual search words.
        */
       const words =
           normalizedQuery
               .split(" ")
               .filter(function (word) {
                   return word.length > 2;
               });
       if (words.length === 0) {
           return;
       }
       let matchedWords = 0;
       words.forEach(function (word) {
           if (text.includes(word)) {
               matchedWords++;
           }
       });
       const score =
           matchedWords / words.length * 100;
       if (score > bestScore && score >= 50) {
           bestScore = score;
           bestMatch = element;
       }
   });
   if (bestMatch) {
       /*
        * Give the browser a moment to finish loading
        * the page before scrolling.
        */
       setTimeout(function () {
           bestMatch.scrollIntoView({
               behavior: "smooth",
               block: "center"
           });
           /*
            * Temporarily highlight the matching section.
            */
           bestMatch.classList.add(
               "search-highlight"
           );
           setTimeout(function () {
               bestMatch.classList.remove(
                   "search-highlight"
               );
           }, 3000);
       }, 300);
   }
}
/* =========================================================
  13. READ SEARCH FROM URL
  ========================================================= */
function handleDestinationSearch() {
   const urlParams =
       new URLSearchParams(
           window.location.search
       );
   const searchQuery =
       urlParams.get("search");
   if (searchQuery) {
       findSearchTarget(searchQuery);
   }
}
if (
   document.readyState === "loading"
) {
   document.addEventListener(
       "DOMContentLoaded",
       handleDestinationSearch
   );
} else {
   handleDestinationSearch();
}
/* =========================================================
  14. CLOSE SEARCH RESULTS WHEN CLICKING OUTSIDE
  ========================================================= */
document.addEventListener(
   "click",
   function (event) {
       if (
           searchResults &&
           searchForm &&
           !searchForm.contains(event.target)
       ) {
           searchResults.classList.remove(
               "show"
           );
       }
   }
);
/* =========================================================
  15. ESCAPE KEY
  ========================================================= */
document.addEventListener(
   "keydown",
   function (event) {
       if (event.key === "Escape") {
           if (searchResults) {
               searchResults.classList.remove(
                   "show"
               );
           }
           if (navigationList) {
               navigationList.classList.remove(
                   "active"
               );
           }
       }
   }
);
/* =========================================================
  16. CONTACT FORM
  ========================================================= */
const contactForm =
   document.getElementById("contactForm");
const contactSuccess =
   document.getElementById("contactSuccess");
if (contactForm) {
   contactForm.addEventListener(
       "submit",
       function (event) {
           event.preventDefault();
           if (contactSuccess) {
               contactSuccess.hidden = false;
               contactSuccess.textContent =
                   "Your message has been prepared successfully.";
           }
           contactForm.reset();
       }
   );
}
/* =========================================================
  17. NEWSLETTER FORM
  ========================================================= */
const newsletterForm =
   document.getElementById("newsletterForm");
if (newsletterForm) {
   newsletterForm.addEventListener(
       "submit",
       function (event) {
           event.preventDefault();
           alert(
               "Thank you for subscribing!"
           );
           newsletterForm.reset();
       }
   );
}
/* =========================================================
  18. ESCAPE HTML
  ========================================================= */
function escapeHTML(value) {
   return String(value)
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;")
       .replace(/'/g, "&#039;");
}
/* =========================================================
  19. RESPONSIVE MENU RESET
  ========================================================= */
window.addEventListener(
   "resize",
   function () {
       if (
           window.innerWidth > 700 &&
           navigationList
       ) {
           navigationList.classList.remove(
               "active"
           );
       }
       dropdowns.forEach(function (dropdown) {
           if (window.innerWidth > 700) {
               dropdown.classList.remove(
                   "open"
               );
           }
       });
   }
);
/* =========================================================
  20. JAVASCRIPT TEST
  ========================================================= */
console.log(
   "Birds by Joe script loaded successfully!"
);