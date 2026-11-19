
const books = [
  {
    title: "অপেক্ষার ওপারে তুমি",
    chapters: [
      {
        title: "প্রথম অধ্যায়",
        content: `একটি নতুন সকাল।

শহরের ব্যস্ততার মাঝেও কিছু মানুষ নীরবে নিজের গল্প বয়ে বেড়ায়।

তাদের জীবনে থাকে কিছু স্মৃতি, কিছু প্রশ্ন এবং কিছু অপেক্ষা।

এই গল্পও তেমনই একটি গল্প।`
      },
      {
        title: "দ্বিতীয় অধ্যায়",
        content: `সময় কখনো কারো জন্য থেমে থাকে না।

তবুও কিছু মুহূর্ত মানুষের মনে চিরকাল থেকে যায়।

সেই মুহূর্তগুলোর গল্পই এবার শুরু হবে।`
      }
    ]
  }
];

let pageFlip = null;
let currentChapter = 0;

function createPages() {
  const container = document.getElementById("flipbook");
  container.innerHTML = "";

  const pages = [];

  // প্রচ্ছদ
  pages.push({
    title: "অপেক্ষার ওপারে তুমি",
    content: "একটি বাংলা উপন্যাস\n\nB SOHAG PUBLICATION"
  });

  books[0].chapters.forEach(chapter => {
    pages.push({
      title: chapter.title,
      content: chapter.content
    });
  });

  // শেষ পৃষ্ঠা
  pages.push({
    title: "সমাপ্তি",
    content: "পড়ার জন্য ধন্যবাদ।\n\nB SOHAG"
  });

  pages.forEach((page, index) => {
    const div = document.createElement("div");
    div.className = "page";

    const content = document.createElement("div");
    content.className = "page-content";

    const heading = document.createElement("h2");
    heading.textContent = page.title;

    const paragraph = document.createElement("p");
    paragraph.textContent = page.content;

    content.appendChild(heading);
    content.appendChild(paragraph);
    div.appendChild(content);

    container.appendChild(div);
  });

  return pages;
}

function openStory() {
  document.getElementById("library").classList.add("hidden");
  document.getElementById("reader").classList.remove("hidden");

  const container = document.getElementById("flipbook");

  if (pageFlip) {
    pageFlip.destroy();
    pageFlip = null;
  }

  container.innerHTML = "";

  createPages();

  if (!window.St || !window.St.PageFlip) {
    alert("PageFlip লাইব্রেরি লোড হয়নি। ইন্টারনেট সংযোগ পরীক্ষা করো।");
    return;
  }

  const isMobile = window.innerWidth < 650;

  pageFlip = new St.PageFlip(container, {
    width: isMobile ? 260 : 400,
    height: isMobile ? 370 : 550,
    size: "stretch",
    minWidth: 250,
    maxWidth: 800,
    minHeight: 350,
    maxHeight: 1100,
    drawShadow: true,
    flippingTime: 900,
    usePortrait: true,
    startPage: 0,
    autoSize: true,
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false
  });

  pageFlip.loadFromHTML(
    Array.from(container.querySelectorAll(".page"))
  );

  pageFlip.on("flip", updatePageNumber);

  updatePageNumber();
}

function updatePageNumber() {
  if (!pageFlip) return;

  const current = pageFlip.getCurrentPageIndex();
  const total = pageFlip.getPageCount();

  document.getElementById("chapterNumber").textContent =
    `${current + 1} / ${total}`;
}

function nextChapter() {
  if (pageFlip) {
    pageFlip.flipNext();
  }
}

function previousChapter() {
  if (pageFlip) {
    pageFlip.flipPrev();
  }
}

function closeStory() {
  if (pageFlip) {
    pageFlip.destroy();
    pageFlip = null;
  }

  document.getElementById("reader").classList.add("hidden");
  document.getElementById("library").classList.remove("hidden");
}

