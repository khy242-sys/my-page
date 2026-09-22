// 다크/라이트 모드 (선택 기억)
const themeBtn = document.querySelector("#theme-btn");
function applyTheme(light) {
  document.body.classList.toggle("light", light);
  themeBtn.textContent = light ? "🌙 다크 모드" : "☀️ 라이트 모드";
}
let savedTheme = null;
try { savedTheme = localStorage.getItem("kh-theme"); } catch (e) {}
applyTheme(savedTheme === "light");
themeBtn.addEventListener("click", () => {
  const next = !document.body.classList.contains("light");
  applyTheme(next);
  try { localStorage.setItem("kh-theme", next ? "light" : "dark"); } catch (e) {}
});

// 스크롤하면 떠오르는 효과
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// 국기 이미지 주소
const flagUrl = (code) => `https://flagcdn.com/w160/${code}.png`;
const flags = [
  { code: "jp", name: "일본" }, { code: "hk", name: "홍콩" }, { code: "us", name: "미국" },
  { code: "ca", name: "캐나다" }, { code: "au", name: "호주" }, { code: "nz", name: "뉴질랜드" },
  { code: "sk", name: "슬로바키아" }, { code: "hu", name: "헝가리" }, { code: "cz", name: "체코" },
  { code: "at", name: "오스트리아" }, { code: "es", name: "스페인" }, { code: "pt", name: "포르투갈" },
  { code: "gb-eng", name: "잉글랜드" }, { code: "fr", name: "프랑스" }, { code: "it", name: "이탈리아" },
];
const flagRow = document.querySelector("#flag-row");
flags.forEach((f) => {
  const item = document.createElement("div");
  item.className = "flag-item";
  const img = document.createElement("img");
  img.src = flagUrl(f.code);
  img.alt = `${f.name} 국기`;
  const label = document.createElement("span");
  label.textContent = f.name;
  item.append(img, label);
  flagRow.appendChild(item);
});

// 여행 사진 (파일 순서와 설명은 실제에 맞게 수정하세요)
const travelPhotos = [
  { src: "travel.jpg", caption: "스페인 · 마드리드 왕궁" },
  { src: "travel (2).jpg", caption: "포르투갈 · 포르투" },
  { src: "travel (3).jpg", caption: "포르투갈 · 포르투" },
  { src: "travel (4).jpg", caption: "스페인 · 톨레도" },
  { src: "travel (5).jpg", caption: "스페인 · 톨레도" },
  { src: "travel (6).jpg", caption: "스페인 · 마드리드" },
  { src: "travel (7).jpg", caption: "일본" },
  { src: "travel (8).jpg", caption: "일본 · 삿포로" },
  { src: "travel (9).jpg", caption: "헝가리 · 부다페스트" },
  { src: "travel (10).jpg", caption: "호주 · 시드니" },
];
const travelGrid = document.querySelector("#travel-grid");
travelPhotos.forEach((p, i) => {
  const btn = document.createElement("button");
  if (i % 4 === 0) btn.classList.add("feature");
  const img = document.createElement("img");
  img.src = p.src;
  img.alt = p.caption;
  btn.appendChild(img);
  btn.addEventListener("click", () => openLightbox(travelPhotos, i));
  travelGrid.appendChild(btn);
});

// 라이트박스 (여러 장 넘겨보기)
const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const lightboxCaption = document.querySelector("#lightbox-caption");
let currentList = [];
let currentIndex = 0;

function showLightboxItem() {
  const item = currentList[currentIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.caption || "";
  lightboxCaption.textContent = currentList.length > 1
    ? `${item.caption || ""} (${currentIndex + 1} / ${currentList.length})`
    : (item.caption || "");
}
function openLightbox(list, startIndex) {
  currentList = list;
  currentIndex = startIndex;
  showLightboxItem();
  lightbox.classList.add("open");
}
function closeLightbox() { lightbox.classList.remove("open"); }
document.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
document.querySelector(".lightbox-prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
  showLightboxItem();
});
document.querySelector(".lightbox-next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentList.length;
  showLightboxItem();
});
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") document.querySelector(".lightbox-prev").click();
  if (e.key === "ArrowRight") document.querySelector(".lightbox-next").click();
});

// 팝업 (ATLETI 사진 / IPO 기업 리스트)
const galleries = {
  atleti: {
    type: "photos",
    title: "해외 축구 (ATLETI)",
    photos: [
      "atleti.jpg",
      "atleti (2).jpg",
      "atleti (3).jpeg",
      "atleti (4).jpg",
      "atleti (5).jpeg",
      "atleti (6).jpeg",
      "atleti (7).jpeg",
    ],
  },
  ipo: {
    type: "list",
    title: "상장시킨 기업들",
    groups: [
      { industry: "핀테크", companies: ["카카오페이", "케이뱅크"] },
      { industry: "에너지", companies: ["수산인더스트리", "그리드위즈", "금양그린파워", "산일전기"] },
      { industry: "2차전지", companies: ["필에너지", "이닉스", "피아이이"] },
      { industry: "로봇", companies: ["씨메스"] },
      { industry: "방산", companies: ["엠앤씨솔루션"] },
      { industry: "반도체", companies: ["져스텍", "엠아이티", "레이저쎌"] },
      { industry: "바이오", companies: ["인제니아테라퓨틱스", "아이빔테크놀로지"] },
    ],
  },
};
const modal = document.querySelector("#photo-modal");
const modalTitle = document.querySelector("#modal-title");
const modalGrid = document.querySelector("#modal-grid");
function openGallery(key) {
  const g = galleries[key];
  modalTitle.textContent = g.title;
  modalGrid.innerHTML = "";

  if (g.type === "list") {
    modalGrid.classList.add("list-mode");
    g.groups.forEach((group) => {
      const wrap = document.createElement("div");
      wrap.className = "ipo-group";
      const h4 = document.createElement("h4");
      h4.textContent = group.industry;
      const chips = document.createElement("div");
      chips.className = "ipo-chips";
      group.companies.forEach((name) => {
        const chip = document.createElement("span");
        chip.className = "ipo-chip";
        chip.textContent = name;
        chips.appendChild(chip);
      });
      wrap.append(h4, chips);
      modalGrid.appendChild(wrap);
    });
  } else {
    modalGrid.classList.remove("list-mode");
    const list = g.photos.map((src) => ({ src, caption: g.title }));
    list.forEach((item, i) => {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = `${g.title} 사진 ${i + 1}`;
      img.addEventListener("click", () => { closeModal(); openLightbox(list, i); });
      modalGrid.appendChild(img);
    });
  }

  modal.classList.add("open");
}
function closeModal() { modal.classList.remove("open"); }
document.querySelectorAll(".photo-link[data-gallery]").forEach((el) => {
  el.addEventListener("click", () => openGallery(el.dataset.gallery));
});
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

// 백엔드 API 연동
const API_URL = "https://cloud-computing-personal-project-1.onrender.com";
document.getElementById("api-btn").addEventListener("click", async () => {
  const out = document.getElementById("api-result");
  out.textContent = "불러오는 중... (첫 호출은 30~60초 걸릴 수 있어요)";
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    out.textContent = "호출 성공!\n" + JSON.stringify(data, null, 2);
  } catch (e) {
    out.textContent = "호출 실패: " + e.message;
  }
});