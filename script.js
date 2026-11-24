// 메인 페이지 내용은 전부 projects.js 데이터에서 채움

document.getElementById('projectList').innerHTML = PROJECTS.map((p) => `
  <a class="project" href="project.html?id=${p.id}">
    ${imgSlot(p.id, 'thumb.png', `${p.title} 썸네일`, 'project-thumb')}
    <div class="project-body">
      <h3 class="project-name">${p.title}</h3>
      ${p.award ? `<p class="award">★ ${p.award}</p>` : ''}
      <p class="project-headline">${em(p.headline)}</p>
      <p class="project-desc">${p.tagline}</p>
      ${tagList(p.tags)}
      <p class="project-more">${p.troubles.length ? `트러블슈팅 ${p.troubles.length}건 · ` : ''}자세히 보기 →</p>
    </div>
  </a>`).join('');

document.getElementById('skillList').innerHTML = PROFILE.skills.map(([g, items]) => `
  <div class="skill-tile">
    <dt>${skillIcon(g)}${g}</dt>
    <dd>${chipList(items)}</dd>
  </div>`).join('');

document.getElementById('historyList').innerHTML = PROFILE.history.map(([title, items]) => `
  <div class="cv-group">
    <h2 class="cv-title">${title}</h2>
    <ol class="history">${items.map(historyRow).join('')}</ol>
  </div>`).join('');

// ===== 움직임: GSAP + ScrollTrigger(스크롤 연출), Lenis(부드러운 스크롤) =====
// CDN을 못 불러오거나 '동작 줄이기'를 켠 사람은 연출 없이 처음부터 다 보임
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.clearScrollMemory('manual'); // ScrollTrigger도 보던 자리를 기억해 되돌리므로 끔 (새로고침 = 맨 위)
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    const ease = 'power3.out';

    // 부드러운 스크롤 - GSAP 시계로 돌려서 ScrollTrigger와 프레임을 맞춤
    let lenis = null;
    const raf = (t) => lenis.raf(t * 1000);
    if (window.Lenis) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }
    const onAnchor = (e) => {
      const a = e.target.closest('a[href^="#"]');
      const target = a && document.querySelector(a.getAttribute('href'));
      if (!lenis || !target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 }); // 위쪽 고정 메뉴 높이만큼
    };
    document.addEventListener('click', onAnchor);

    // 첫 화면: 사진 → 직함 → 인사 → 소개 순서로 올라옴
    gsap.from(['.profile-photo', '.hero-role', '.hero-title', '.hero-sub', '.about-text', '.intro-contact'],
      { y: 28, opacity: 0, duration: 0.9, ease, stagger: 0.08 });

    // 이력 카드, 기술 스택 카드, 섹션 제목: 화면에 들어올 때
    gsap.utils.toArray('.cv-group, .skills-card, .section-title').forEach((el) => {
      gsap.from(el, { y: 36, opacity: 0, duration: 0.9, ease, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });

    // 프로젝트: 화면에 들어온 카드부터 위에서 하나씩. 썸네일은 왼쪽에서 펼쳐짐
    gsap.set('.project', { y: 48, opacity: 0 });
    ScrollTrigger.batch('.project', {
      start: 'top 88%',
      once: true,
      onEnter: (cards) => {
        gsap.to(cards, { y: 0, opacity: 1, duration: 0.9, ease, stagger: 0.15, clearProps: 'transform' });
        gsap.fromTo(cards.map((c) => c.querySelector('.project-thumb')),
          { clipPath: 'inset(0 100% 0 0 round 6px)' },
          { clipPath: 'inset(0 0% 0 0 round 6px)', duration: 1.1, ease: 'power4.inOut', stagger: 0.15, delay: 0.1, clearProps: 'clipPath' });
      },
    });

    // 설정이 바뀌어 연출을 끌 때 정리
    return () => {
      document.removeEventListener('click', onAnchor);
      if (lenis) { gsap.ticker.remove(raf); lenis.destroy(); }
    };
  });
}
