const newsHeading = document.getElementById("latest-news-heading");
const tabs = document.querySelectorAll(".tab");
const tags = document.querySelectorAll(".tag");
const tabContents = document.querySelectorAll(".news-card");
const hashtags = document.querySelectorAll(".hashtag");

const mainPost = document.querySelector(".main-post");
const popularCard = document.querySelectorAll(".popular-card");

window.addEventListener("load", () => {
  mainPost.style.transform = "translateX(0)";
  popularCard[0].style.transform = "translateX(0)";
  popularCard[1].style.transform = "translateX(0)";
});

// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Set active tab based on URL parameter
window.addEventListener("DOMContentLoaded", () => {
  const tabParam = getUrlParameter("tab");
  if (tabParam) {
    const activeTab = Array.from(tabs).find(
      (tab) => tab.dataset.tab === tabParam
    );
    if (activeTab) {
      document.querySelector(".tabs").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      activeTab.click();
    }
  }

  const hashtagParam = getUrlParameter("hashtag");
  if (hashtagParam) {
    if (window.location.pathname.includes("/vn/")) {
      newsHeading.textContent = `Bài viết liên quan: #${hashtagParam}`;
    } else {
      newsHeading.textContent = `Related Articles: #${hashtagParam}`;
    }

    const relatedHashtag = Array.from(hashtags).find(
      (hashtag) => hashtag.dataset.tag === hashtagParam
    );
    if (relatedHashtag) {
      document.querySelector(".tabs").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      relatedHashtag.click();
    }
  } else {
    if (window.location.pathname.includes("/vn/")) {
      newsHeading.textContent = `Tin mới nhất`;
    } else {
      newsHeading.textContent = `Lastest News`;
    }
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    // Update the URL parameter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", tab.dataset.tab);
    newUrl.searchParams.delete("hashtag");
    window.history.pushState({}, "", newUrl);

    if (window.location.pathname.includes("/vn/")) {
      newsHeading.textContent = `Tin mới nhất`;
    } else if (window.location.pathname.includes("/kr/")) {
      newsHeading.textContent = `Lastest News`;
    }

    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the clicked tab and corresponding content
    tab.classList.add("active");
    if (tab.dataset.tab === "tabAll") {
      tabContents.forEach((content) => content.classList.add("active"));
    } else {
      tabContents.forEach((content) => content.classList.remove("active"));
      document
        .querySelectorAll("." + tab.dataset.tab)
        .forEach((content) => content.classList.add("active"));
    }
  });
});

tags.forEach((tag) => {
  tag.addEventListener("click", () => {
    // Remove active class from all tabs and contents
    tabs.forEach((t) => t.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    //
    tabs.forEach((tab) => {
      if (tab.dataset.tab === tag.dataset.tab) {
        tab.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        tab.classList.add("active");
        if (tab.dataset.tab === "tabAll") {
          tabContents.forEach((content) => content.classList.add("active"));
        } else {
          tabContents.forEach((content) => content.classList.remove("active"));
          document
            .querySelectorAll("." + tab.dataset.tab)
            .forEach((content) => content.classList.add("active"));
        }
      }
    });
  });
});

hashtags.forEach((hashtag) => {
  hashtag.addEventListener("click", () => {
    const tag = hashtag.dataset.tag;
    // Update the URL parameter
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("hashtag", tag);
    newUrl.searchParams.delete("tab");
    window.history.pushState({}, "", newUrl);

    if (window.location.pathname.includes("/vn/")) {
      newsHeading.textContent = `Bài viết liên quan: #${tag}`;
    } else if (window.location.pathname.includes("/kr/")) {
      newsHeading.textContent = `Related Articles: #${tag}`;
    }

    // Scroll to the tabs section
    document.querySelector(".tabs").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Remove active class from all contents
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to the news cards containing the related hashtag
    tabContents.forEach((content) => {
      if (content.querySelector(`.hashtag[data-tag='${tag}']`)) {
        content.classList.add("active");
      }
    });
  });
});
