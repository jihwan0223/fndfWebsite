// 포트폴리오 데이터 — 메인 페이지, 프로젝트 상세, PDF가 전부 여기서 읽음.
// 배열 순서 = 화면 순서 (가장 자신 있는 프로젝트를 맨 앞에).
// 이미지는 images/<id>/ 폴더에 넣으면 자동으로 뜸. 없으면 파일명이 적힌 빈칸으로 표시.
const PROJECTS = [
  {
    id: 'seniorparty',
    title: 'Senior Party',
    tagline: '시니어를 위한 인지기능 향상 게임 — 10종의 인지 훈련 미니게임 수록.',
    award: '2026 시니어 인지기능 향상 해커톤 우수상',
    tags: ['Unity', 'C#', 'UI Toolkit', '모바일', 'Plastic SCM'],
    github: 'https://github.com/jihwan0223/SeniorParty',
    meta: { 기간: '', 인원: '', 역할: '', 플랫폼: '모바일' },
    flow: [
      { src: '01.png', caption: '게임 선택', desc: '10종 인지 훈련 중 원하는 게임 선택' },
      { src: '02.png', caption: '큐브 깎기', desc: '보여준 모양을 기억해 같은 모양으로 깎기' },
      { src: '03.png', caption: '결과 화면', desc: '라운드별 O/X와 점수, 다음 난이도 반영' },
    ],
    troubles: [
      {
        title: '저장 중 앱이 꺼지면 세이브가 깨짐',
        problem: '모바일은 저장 도중 앱이 종료되는 일이 잦아, 반쯤 쓰인 save.json 때문에 진행도가 날아갈 수 있었다.',
        cause: '기존 파일을 직접 덮어쓰는 방식이라, 쓰기 도중 종료되면 파일이 손상된 상태로 남음.',
        solution: '임시 파일에 먼저 쓰고 File.Replace로 원자적 교체, 기존 파일은 .bak으로 보관. 로드 실패 시 백업에서 복구. 복구 경로에서 Save()를 다시 부르면 깨진 파일이 백업을 덮어쓰는 2차 버그까지 찾아 분리.',
        result: '저장 중 강제 종료에도 마지막 정상 상태로 복구.',
        img: 'trouble-1.png',
      },
      {
        title: '시니어에게 갑자기 어려워지는 난이도',
        problem: '정답률에 따라 난이도를 단계별로 올리면, 한 판 만에 체감 난이도가 확 뛰어 이탈 위험이 컸다.',
        cause: '정수 단계 난이도는 한 칸만 올라가도 조각 수·노출 시간이 크게 바뀜.',
        solution: '1.00~10.00 연속값 난이도를 공통 부모 클래스로 만들고, 올릴 땐 0.1 / 내릴 땐 0.17로 비대칭 조정. 난이도 구간별로 조각 수·노출 시간·접근 방식을 매 라운드 새로 계산.',
        result: '만점을 계속 받아도 약 45세션에 걸쳐 천천히 상승 — 4개 게임이 같은 규칙 공유.',
        img: 'trouble-2.png',
      },
      {
        title: '노치에 가려지는 UI',
        problem: '노치·펀치홀 기기에서 뒤로 가기 버튼과 결과창이 가려짐.',
        cause: 'UI Toolkit은 y축이 위에서 0, Screen.safeArea는 아래에서 0이라 그대로 쓰면 여백 방향이 뒤집힘. 씬 전환 직후 UI가 몇 프레임 늦게 붙는 문제도 겹침.',
        solution: '스크린 좌표를 패널 좌표로 변환해 배율까지 반영한 여백을 루트에 적용. UI가 준비될 때까지 대기 후 적용하고, 해상도·세이프 에어리어가 바뀔 때만 재계산.',
        result: '기기별 노치와 무관하게 UI가 안전 영역 안에 배치.',
        img: 'trouble-3.png',
      },
    ],
  },
  {
    id: 'breakthewaxworld',
    title: 'Break The Wax World',
    tagline: '왁스로 뒤덮인 오브젝트를 부수며 성장하는 도파민 클리커 게임.',
    tags: ['Unity', 'C#', 'Python', 'Feel'],
    github: 'https://github.com/jihwan0223/Break-The-World',
    meta: { 기간: '', 인원: '', 역할: '', 플랫폼: 'PC' },
    flow: [
      { src: '01.png', caption: '왁스 부수기', desc: '클릭으로 왁스를 깨고 파편을 모아 재화 획득' },
      { src: '02.png', caption: '업그레이드 트리', desc: '재화로 공격력·자동 수집·구역 해금 강화' },
      { src: '03.png', caption: '보스 도전', desc: '구역 끝 보스를 부수고 다음 구역으로' },
    ],
    troubles: [
      {
        title: '파편이 수천 개 쏟아지며 생기는 렉',
        problem: '후반 업그레이드로 한 번에 부수는 양이 늘자, 파편 오브젝트가 폭증해 프레임이 떨어짐.',
        cause: '조각마다 오브젝트를 생성·파괴하고, 화면에 남는 조각 수에 상한이 없었음.',
        solution: 'Stack 기반 오브젝트 풀로 재사용. 한 번에 50조각을 넘으면 남는 값은 파편 하나에 합쳐 담고, 바닥 조각 수는 업그레이드로 늘어나는 상한으로 제한.',
        result: '파괴량이 늘어도 생성되는 오브젝트 수는 일정 — 재화 값은 그대로 보존.',
        img: 'trouble-1.png',
      },
      {
        title: '부서질 때마다 오브젝트가 튀는 현상',
        problem: '체력 단계별 이미지(4단계)로 바뀔 때마다 오브젝트 위치와 크기가 들쭉날쭉하게 보임.',
        cause: '단계가 진행될수록 파편이 사방으로 퍼져 이미지 크기가 커지는데, 이를 기준으로 맞추면 본체가 작아짐.',
        solution: 'Python(Pillow·NumPy) 정렬 툴 제작 — 파편을 제외한 본체 바닥선과 받침 중심을 찾아 캔버스를 맞추고, 크기 차이는 픽셀 리사이즈 대신 PPU로 보정. 결과를 .meta에 자동 반영하는 스크립트까지 연결.',
        result: '신규 오브젝트 추가 시 수작업 없이 스크립트 실행만으로 정렬.',
        img: 'trouble-2.png',
      },
      {
        title: '큰 숫자 표기 오류',
        problem: '1K·1M 같은 단위 경계에서 표기가 틀리고, 살 수 없는 가격이 살 수 있는 것처럼 보임.',
        cause: 'Log10 부동소수 계산이 경계값에서 틀리고, 반올림 때문에 보유 재화가 실제보다 많아 보임.',
        solution: '단위 계산을 정수 나눗셈으로 바꾸고, 반올림 대신 버림 처리. 10^18 이상은 지수 표기로 전환.',
        result: '단위 경계에서도 정확한 표기, 가격 착시 제거.',
        img: 'trouble-3.png',
      },
    ],
  },
  {
    id: 'gamblegame',
    title: 'Gamble Game',
    tagline: '블랙잭에 AI를 연동해 상황별 다양한 대사를 출력하는 카드 게임.',
    tags: ['Unity', 'C#', 'LLM API', '한/영'],
    github: 'https://github.com/jihwan0223/gamblegame_Unity',
    meta: { 기간: '', 인원: '', 역할: '', 플랫폼: 'PC' },
    flow: [
      { src: '01.png', caption: '베팅', desc: '판돈을 걸고 라운드 시작' },
      { src: '02.png', caption: '블랙잭 진행', desc: '히트·스탠드로 21에 가깝게' },
      { src: '03.png', caption: 'AI 딜러 대사', desc: '결과에 맞춰 AI가 매번 다른 대사 생성' },
    ],
    troubles: [
      {
        title: 'AI가 승패를 틀리게 말함',
        problem: '점수만 넘기고 대사를 요청하면, AI가 이긴 판을 졌다고 말하는 등 결과를 잘못 해석함.',
        cause: '승패 판정까지 LLM에게 맡겨, 규칙 계산이 매번 달라짐.',
        solution: '승패(버스트·승리·패배·무승부)는 코드에서 확정하고, AI에는 결과 코드만 전달해 대사 생성만 맡김.',
        result: '게임 결과와 딜러 대사가 항상 일치.',
        img: 'trouble-1.png',
      },
      {
        title: '한국어 대사에 다른 언어가 섞임',
        problem: '한국어 모드에서도 중국어·일본어 문자가 섞이거나 대사가 너무 길게 나옴.',
        cause: '프롬프트에 언어와 길이 제약이 약했음.',
        solution: '언어별 시스템 프롬프트 분리, 결과 유형별 예시 대사(few-shot) 제공, 글자 수 제한과 언어 강제 규칙 추가.',
        result: '한/영 전환에 맞춰 짧고 일관된 톤의 대사 출력.',
        img: 'trouble-2.png',
      },
    ],
  },
];

// 프로필 — 메인 페이지 Skills/History 섹션과 PDF 첫 장이 여기서 읽음
const PROFILE = {
  name: 'JIHWAN',
  role: '게임 개발자',
  tagline: '플레이어가 기억할 순간을 만드는 게임 개발자.',
  email: 'jihwan5580@gmail.com',
  github: 'https://github.com/jihwan0223',
  skills: [
    ['엔진', ['Unity 2D / 3D', 'UI Toolkit', 'uGUI', 'Input System', 'Feel (MMFeedbacks)']],
    ['언어', ['C#', 'Python']],
    ['게임 시스템', ['업그레이드 트리', '환생 · 프레스티지', '재화 경제', '적응형 난이도', '스킬 트리', '튜토리얼', '다국어 (한/영)']],
    ['데이터', ['JSON 세이브 / 로드', '원자적 저장 · 백업 복구', '세이브 마이그레이션']],
    ['최적화', ['오브젝트 풀링', '파편 병합', 'GC 할당 최소화']],
    ['AI', ['LLM API 연동', '프롬프트 설계', 'UnityWebRequest']],
    ['플랫폼', ['PC', '모바일', '세이프 에어리어 대응']],
    ['툴', ['Git', 'GitHub', 'Plastic SCM', 'VS Code', 'Pillow · NumPy 자동화']],
  ],
  awards: [
    { date: '2026', name: '시니어 인지기능 향상 해커톤 — 우수상', desc: '(주)에이아이씨유 주최 · 출품작 Senior Party' },
  ],
};

// 이미지가 없으면 넣어야 할 경로를 적은 빈칸으로 바꿔 보여줌
function imgSlot(id, file, alt, cls = '') {
  const path = `images/${id}/${file}`;
  return `<div class="img-slot ${cls}" data-path="${path}">` +
    `<img src="${path}" alt="${alt}" onerror="this.remove()">` +
    `</div>`;
}

const tagList = (tags) => `<div class="tags">${tags.map((t) => `<span>${t}</span>`).join('')}</div>`;
const chipList = (items) => `<div class="chips">${items.map((t) => `<span>${t}</span>`).join('')}</div>`;

// ===== PDF식 페이지 (한 장에 블록 최대 3개) =====
// 구성: 소개 1장 + 프로젝트마다 [표지, 플레이 흐름, 트러블슈팅 1건당 1장]
function buildDeck() {
  const deck = [{
    project: null,
    label: '프로필',
    body: `
      <div class="pg-cols">
        <div class="pg-col">
          <p class="pg-kicker">${PROFILE.role}</p>
          <h1 class="pg-name">${PROFILE.name}</h1>
          <p class="pg-lead">${PROFILE.tagline}</p>
          <dl class="pg-contact">
            <div><dt>이메일</dt><dd>${PROFILE.email}</dd></div>
            <div><dt>GitHub</dt><dd>${PROFILE.github.replace('https://', '')}</dd></div>
          </dl>
        </div>
        <div class="pg-col">
          <h2 class="pg-h">기술 스택</h2>
          <dl class="pg-skills">${PROFILE.skills.map(([g, items]) => `<div><dt>${g}</dt><dd>${chipList(items)}</dd></div>`).join('')}</dl>
        </div>
        <div class="pg-col">
          <h2 class="pg-h">수상</h2>
          ${PROFILE.awards.map((a) => `<div class="pg-award"><p class="accent">${a.date}</p><p class="pg-award-name">${a.name}</p><p class="dim">${a.desc}</p></div>`).join('')}
          <h2 class="pg-h">프로젝트</h2>
          <ol class="pg-index">${PROJECTS.map((p) => `<li>${p.title}</li>`).join('')}</ol>
        </div>
      </div>`,
  }];

  for (const p of PROJECTS) {
    const meta = Object.entries(p.meta).filter(([, v]) => v)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');

    deck.push({
      project: p,
      label: p.title,
      body: `
        <div class="pg-cover">
          ${imgSlot(p.id, 'thumb.png', `${p.title} 대표 이미지`)}
          <div>
            ${p.award ? `<p class="pg-badge">★ ${p.award}</p>` : ''}
            <h1 class="pg-title">${p.title}</h1>
            <p class="pg-lead">${p.tagline}</p>
            ${tagList(p.tags)}
            ${meta ? `<dl class="pg-meta">${meta}</dl>` : ''}
            <p class="pg-link"><a href="${p.github}" target="_blank" rel="noopener">${p.github.replace('https://', '')}</a></p>
          </div>
        </div>`,
    });

    deck.push({
      project: p,
      label: `${p.title} · 플레이 흐름`,
      body: `
        <h2 class="pg-h">플레이 흐름</h2>
        <ol class="pg-flow">${p.flow.map((f, i) => `
          <li>
            ${imgSlot(p.id, f.src, f.caption)}
            <p class="pg-step"><span class="accent">${String(i + 1).padStart(2, '0')}</span> ${f.caption}</p>
            <p class="dim">${f.desc}</p>
          </li>`).join('')}
        </ol>`,
    });

    p.troubles.forEach((t, i) => deck.push({
      project: p,
      label: `${p.title} · 트러블슈팅 ${i + 1}`,
      body: `
        <h2 class="pg-trouble-title"><span class="accent">#${i + 1}</span> ${t.title}</h2>
        <div class="pg-trouble">
          ${imgSlot(p.id, t.img, `${t.title} 해결 전후`)}
          <dl class="pg-steps">
            <div><dt>문제</dt><dd>${t.problem} ${t.cause}</dd></div>
            <div><dt>해결</dt><dd>${t.solution}</dd></div>
            <div class="pg-result"><dt>결과</dt><dd>${t.result}</dd></div>
          </dl>
        </div>`,
    }));
  }
  return deck;
}

// filter: 특정 프로젝트만 보여줄 때 (페이지 번호는 전체 기준 유지)
function renderDeck(filter) {
  const deck = buildDeck();
  return deck.map((pg, i) => ({ pg, no: i + 1 }))
    .filter(({ pg }) => !filter || filter(pg))
    .map(({ pg, no }) => `
      <section class="page">
        <header class="pg-head"><span>${pg.label}</span><span>${String(no).padStart(2, '0')} / ${deck.length}</span></header>
        <div class="pg-body">${pg.body}</div>
      </section>`).join('');
}
