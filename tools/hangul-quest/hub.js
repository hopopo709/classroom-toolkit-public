/* Official Hangul Quest shortcut. DOM-only; no network, storage or user data. */
(function () {
  "use strict";
  const info = {name:"훈민정음 탐험대",category:"학습 게임",description:"초등학생을 위한 세종대왕·훈민정음 8문제 이야기 탐험 게임.",href:"./tools/hangul-quest/index.html"};
  const home=document.getElementById("home-grid"),all=document.getElementById("all-tools-grid");
  const card=() => {
    const article=document.createElement("article");article.className="tool-card card-peach";article.dataset.hangulQuest="true";
    const head=document.createElement("div");head.className="tool-card-head";
    const type=document.createElement("span");type.className="tool-type";type.textContent="TOOL 04 · BUILT-IN";
    const icon=document.createElement("span");icon.className="tool-card-symbol";icon.textContent="가";head.append(type,icon);
    const copy=document.createElement("div");copy.className="tool-card-copy";
    const name=document.createElement("h3");name.textContent=info.name;
    const desc=document.createElement("p");desc.textContent=info.description;copy.append(name,desc);
    const bottom=document.createElement("div");bottom.className="tool-card-bottom";
    const link=document.createElement("a");link.className="open-tool";link.href=info.href;link.textContent="탐험 시작하기";
    const arrow=document.createElement("a");arrow.className="round-arrow";arrow.href=info.href;arrow.textContent="↗";arrow.setAttribute("aria-label","훈민정음 탐험대 열기");bottom.append(link,arrow);
    article.append(head,copy,bottom);return article;
  };
  let pending=false;
  function sync(){
    pending=false;
    const query=(document.getElementById("tool-search")?.value||"").trim().toLocaleLowerCase("ko");
    if(home&&!home.querySelector("[data-hangul-quest]")){
      const add=home.querySelector(".add-card");home.insertBefore(card(),add);
    }
    if(all){
      const shouldShow=!query||[info.name,info.category,info.description].join(" ").toLocaleLowerCase("ko").includes(query);
      if(shouldShow&&!all.querySelector("[data-hangul-quest]")){
        const add=all.querySelector(".add-card");all.insertBefore(card(),add);
      }
      if(!shouldShow){all.querySelector("[data-hangul-quest]")?.remove();}
      const empty=document.getElementById("no-results");if(shouldShow)empty?.classList.add("hidden");
      const count=document.getElementById("tool-count");if(count){const n=Number((count.textContent.match(/\d+/)||[])[0]);if(Number.isFinite(n)&&n>0&&!count.dataset.hangulCounted){count.textContent="전체 "+(n+1)+"개";count.dataset.hangulCounted="yes";}}
    }
  }
  function schedule(){if(!pending){pending=true;queueMicrotask(sync);}}
  if(home)new MutationObserver(schedule).observe(home,{childList:true});
  if(all)new MutationObserver(schedule).observe(all,{childList:true});
  document.getElementById("tool-search")?.addEventListener("input",schedule);
  sync();
})();