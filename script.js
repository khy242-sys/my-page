const btn = document.querySelector("#theme-btn");
btn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 국기 이미지 주소 만들기 (code: 나라 코드 소문자 2글자)
const flagUrl = (code) => `https://flagcdn.com/w160/${code}.png`;

// 팝업에 보여줄 내용 (여기만 고치면 됩니다)
const galleries = {
  atleti: {
    title: "해외 축구 (ATLETI)",
    photos: ["atleti_1.jpg", "atleti_2.jpg", "atleti_4.jpg"],
  },
  travel: {
    title: "방문한 나라",
    flags: [
      { code: "jp", name: "일본" },
      { code: "hk", name: "홍콩" },
      { code: "us", name: "미국" },
      { code: "ca", name: "캐나다" },
      { code: "au", name: "호주" },
      { code: "nz", name: "뉴질랜드" },
      { code: "sk", name: "슬로바키아" },
      { code: "hu", name: "헝가리" },
      { code: "cz", name: "체코" },
      { code: "at", name: "오스트리아" },
      { code: "es", name: "스페인" },
      { code: "pt", name: "포르투갈" },
      { code: "gb-eng", name: "잉글랜드" },
      { code: "fr", name: "프랑스" },
      { code: "it", name: "이탈리아" },
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
  modalGrid.classList.toggle("flags", Boolean(g.flags));   // 국기면 격자 배치

  // 사진 갤러리
  (g.photos || []).forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `${g.title} 사진 ${i + 1}`;
    modalGrid.appendChild(img);
  });

  // 국기 갤러리
  (g.flags || []).forEach((f) => {
    const item = document.createElement("div");
    item.className = "flag-item";
    const box = document.createElement("div");
    box.className = "flag-box";
    const img = document.createElement("img");
    img.src = flagUrl(f.code);
    img.alt = `${f.name} 국기`;
    box.appendChild(img);
    const label = document.createElement("span");
    label.textContent = f.name;
    item.append(box, label);
    modalGrid.appendChild(item);
  });

  modal.classList.add("open");
}

function closeModal() {
  modal.classList.remove("open");
}

document.querySelectorAll(".photo-link").forEach((el) => {
  el.addEventListener("click", () => openGallery(el.dataset.gallery));
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();   // 어두운 배경을 누르면 닫기
});
document.querySelector(".modal-close").addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});