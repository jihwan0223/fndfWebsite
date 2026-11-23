// 메인 페이지 내용은 전부 projects.js 데이터에서 채움

document.getElementById('projectList').innerHTML = PROJECTS.map((p) => `
  <a class="project" href="project.html?id=${p.id}">
    ${imgSlot(p.id, 'thumb.png', `${p.title} 썸네일`, 'project-thumb')}
    <div class="project-body">
      <h3 class="project-name">${p.title}</h3>
      ${p.award ? `<p class="award">★ ${p.award}</p>` : ''}
      <p class="project-desc">${p.tagline}</p>
      ${tagList(p.tags)}
      <p class="project-more">${p.troubles.length ? `트러블슈팅 ${p.troubles.length}건 · ` : ''}자세히 보기 →</p>
    </div>
  </a>`).join('');

document.getElementById('skillList').innerHTML = PROFILE.skills.map(([g, items]) => `
  <div class="skill-row"><dt>${g}</dt><dd>${chipList(items)}</dd></div>`).join('');

document.getElementById('awardList').innerHTML = PROFILE.awards.map((a) => `
  <li class="history-row">
    <span class="history-date">${a.date}</span>
    <div class="history-body"><h3 class="history-name">${a.name}</h3><p class="history-desc">${a.desc}</p></div>
  </li>`).join('');
