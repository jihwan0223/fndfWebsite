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
    meta: {
      기간: '2026.09 ~ 2026.10 (약 1개월)',
      인원: '3명',
      역할: '미니게임 4종 개발 (물건 분류 · 큐브 깎기 · 순서 기억 · 모양 맞추기), UI 통일, 사운드',
      플랫폼: '모바일 (Android)',
    },
    flow: [
      { src: '01.png', caption: '게임 선택', desc: '10종 인지 훈련 중 원하는 게임 선택' },
      { src: '02.png', caption: '큐브 깎기', desc: '보여준 모양을 기억해 같은 모양으로 깎기' },
      { src: '03.png', caption: '결과 화면', desc: '라운드별 O/X와 점수, 다음 난이도 반영' },
    ],
    arch: {
      rows: [
        ['메뉴', [['MainMenuController', 'UI Toolkit 메뉴 · 게임 선택 · 설정 · 크레딧'], ['SafeAreaApplier', '노치 · 세이프 에어리어 대응']]],
        ['미니게임', [['DifficultyGameController', '추상 클래스 · 공통 난이도 조절'], ['물건 분류 · 큐브 깎기', 'ItemSort · CubeCarve · Cube3DView', true], ['순서 기억 · 모양 맞추기', 'Matrix · RotateGrid', true], ['그 외 6종', '팀원 담당']]],
        ['공통 UI', [['커스텀 VisualElement', 'CircularProgress · ShapeGridView'], ['TrialResultsView', '라운드별 결과 화면'], ['ResultMessage', '하트 대신 문장 피드백', true]]],
        ['데이터 · 사운드', [['SaveManager', 'JSON 저장 · 불러오기'], ['SoundManager', '배경음 · 정답 · 오답 · 클릭 효과음']]],
      ],
      points: [
        ['추상 클래스로 10종 통일', '모든 미니게임이 DifficultyGameController를 상속해 난이도 저장 · 조절 방식을 공유. 새 게임은 규칙만 구현하면 됨.'],
        ['게임마다 씬 분리', '메뉴에서 씬 이름으로 진입하고, 나가기를 누르면 결과를 보여준 뒤 메뉴로 복귀 (트러블슈팅 2).'],
        ['UI Toolkit 커스텀 요소', '진행 원형 · 도형 격자를 VisualElement로 만들어 여러 게임에서 재사용.'],
      ],
    },
    troubles: [
      {
        title: '큐브 테두리 선 굵기가 들쭉날쭉한 문제',
        problem: '큐브 깎기 게임에서 조각 경계선이 위치마다 굵기가 다르고, 정면 모서리에서는 선이 끊겨 보였다. 시니어가 조각을 구분하기 어려웠다.',
        cause: '조각 사이에 틈을 두고, 조각보다 살짝 큰 검정 껍데기를 뒤집어 그리는 외곽선 방식이라 시점에 따라 틈 두께가 달라지고, 시야와 겹치는 모서리에서 정밀도 문제가 생김.',
        solution: '조각을 틈 없이 붙이고, 각 면 가장자리에 직접 테두리를 그리는 전용 셰이더로 교체. 외곽선용 껍데기 오브젝트와 전용 조명을 제거.',
        result: '어느 위치에서도 같은 굵기의 선 — 조각당 렌더링 오브젝트가 2개에서 1개로 감소.',
        img: 'trouble-1.png',
      },
      {
        title: '나가기를 눌러도 결과가 안 나오고 게임이 다시 시작됨',
        problem: '게임 도중 나가기를 누르면 결과 화면 없이 빠져나가거나, 잠시 뒤 다음 라운드가 저절로 시작됐다.',
        cause: '나가기가 바로 메뉴로 이동만 했고, 이미 예약돼 있던 라운드 전환 콜백이 그대로 실행됨.',
        solution: '나가기 시 타이머와 입력을 멈추고 지금까지 기록으로 결과 화면을 표시. 결과가 뜬 뒤에는 예약 콜백이 라운드를 다시 시작하지 못하게 종료 상태 플래그로 차단. 같은 문제가 있던 3개 게임에 공통 적용.',
        result: '언제 나가도 그때까지의 결과를 확인 가능.',
        img: 'trouble-2.png',
      },
      {
        title: '손떨림으로 조각이 여러 개 지워지는 문제',
        problem: '시니어 사용자는 화면을 길게 누르거나 손이 떨려, 의도하지 않은 조각까지 지워지는 일이 잦았다.',
        cause: '누르는 순간 바로 지워지고, 동시·연속 입력을 그대로 받음.',
        solution: '누른 뒤 손을 뗄 때 지워지도록 변경. 동시 입력과 0.3초 안의 연속 입력은 무시. 틀려도 맞게 지운 비율만큼 부분 점수를 주고, 연속 2라운드 성적에 따라 조각 수를 자동 조절.',
        result: '오입력 감소 — 실수해도 좌절하지 않고 이어서 플레이 가능.',
        img: 'trouble-3.png',
      },
    ],
  },
  {
    id: 'breakthewaxworld',
    title: 'Break The Wax World',
    tagline: '왁스로 뒤덮인 오브젝트를 부수며 성장하는 도파민 클리커 게임.',
    tags: ['Unity', 'C#', 'Feel'],
    github: 'https://github.com/jihwan0223/BreakTheWaxWorrld',
    meta: { 기간: '2026.08 ~ 2026.11 (커밋 184개)', 인원: '1명 (개인 프로젝트)', 역할: '기획 · 프로그래밍 전체', 플랫폼: 'PC' },
    flow: [
      { src: '01.png', caption: '왁스 부수기', desc: '클릭으로 왁스를 깨고 파편을 모아 재화 획득' },
      { src: '02.png', caption: '업그레이드 트리', desc: '재화로 공격력·자동 수집·구역 해금 강화' },
      { src: '03.png', caption: '환생 · 별조각 트리', desc: '환생으로 얻은 별조각으로 영구 강화를 찍어 다음 회차를 더 빠르게' },
    ],
    arch: {
      rows: [
        ['입력', [['Click', '클릭 · 자동 클릭, 데미지 · 보상 계산'], ['Health', '체력 · 부서짐 단계 · 피격 연출'], ['SpriteColliderSync', '볼록 껍질 콜라이더 재계산']]],
        ['보상', [['DebrisPool', 'Stack 풀 · 50조각 초과분 병합'], ['AutoSweeper', '바닥 파편 자동 수집'], ['CurrencyManager', '조각 · 결정 · 별조각 재화']]],
        ['진행', [['UpgradeManager', '업그레이드 트리 · 환생 배율'], ['ObjectManager · WeaponManager', '오브젝트 도감 · 무기 장착'], ['ZoneManager', '구역 해금 · 보스']]],
        ['저장 · UI', [['SaveManager', '이벤트 구독 → 디바운스 JSON 저장'], ['UI', '업그레이드 트리 · 사이드 패널 · 튜토리얼']]],
      ],
      points: [
        ['싱글턴 매니저 + C# 이벤트', '매니저는 값이 바뀌면 이벤트(Action)만 발행. UI와 저장은 구독만 하므로 매니저가 UI를 몰라도 됨.'],
        ['저장은 디바운스로 한 번만', 'SaveManager가 모든 매니저 이벤트를 구독하고, 변경이 몰려도 1초 뒤 한 번만 기록. 실시간 타이머라 일시정지 중에도 저장.'],
        ['보상 계산은 한 곳에서', '기본 보상 × 업그레이드 배율 + 무기 · 오브젝트 보너스를 Click에서 계산하고, 파편으로 떨굴지 즉시 지급할지만 나눔.'],
      ],
    },
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
        title: '부서진 오브젝트의 틈으로 클릭이 빠지는 문제',
        problem: '체력이 줄어 오브젝트가 여러 조각으로 갈라지면, 조각 사이 틈을 클릭했을 때 타격이 들어가지 않았다.',
        cause: '스프라이트의 물리 윤곽을 그대로 콜라이더로 쓰면 덩어리 사이가 빈 공간으로 남음.',
        solution: '스프라이트가 바뀔 때만 콜라이더를 다시 계산. 윤곽이 여러 개면 모든 점을 모아 볼록 껍질(Convex Hull) 하나로 합치고 가장자리 여백을 추가. 계산용 리스트는 재사용해 매번 메모리를 새로 잡지 않음.',
        result: '부서진 단계와 상관없이 오브젝트 어디를 눌러도 타격 판정.',
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
    id: 'catchmind',
    title: 'CatchMind',
    tagline: '웹캠 손 인식으로 그림을 그리고 맞히는 온라인 멀티플레이 그림 퀴즈 게임.',
    intent: '마우스 대신 손가락으로 허공에 그림을 그리며 친구들과 함께 노는 그림 퀴즈.',
    tags: ['Unity', 'C#', 'Photon Fusion', 'Photon Voice', 'MediaPipe 손 인식', 'Plastic SCM'],
    meta: {
      기간: '2026.11 ~ 진행 중',
      인원: '4명',
      역할: '캐치마인드 전체 — 멀티플레이 (로비 · 방 · 게임 진행), 손 그리기, 음성 채팅, 웹캠 선택 (팀 내 최다 커밋)',
      플랫폼: 'PC',
    },
    flow: [
      { src: '01.png', caption: '로비', desc: '방 목록 · 방 만들기 · 비밀번호 · 빠른 입장' },
      { src: '02.png', caption: '손으로 그리기', desc: '검지를 펴면 그리고, 손바닥을 펴고 있으면 전체 지우기' },
      { src: '03.png', caption: '정답 맞히기', desc: '채팅으로 정답 입력 — 빨리 맞힐수록 높은 점수' },
    ],
    arch: {
      rows: [
        ['입력', [['MediaPipe 손 인식', 'HandLandmarkerRunner · HandGestureDetector (팀원)'], ['CatchMindPen', '검지 = 펜, 손바닥 유지 = 지우기, 마우스 겸용', true], ['웹캠 선택', '실패하면 원래 웹캠으로 복구', true]]],
        ['그림', [['CatchMindBoard', '점 묶음(byte[]) → 텍스처, 실행 취소 · 다시 실행', true], ['획 기록', '모두가 보관 · 늦게 들어온 사람에게 재전송', true]]],
        ['네트워크', [['CatchMindLauncher', '로비 · 방 목록 · 방 만들기 · 빠른 입장 · 비밀번호', true], ['CatchMindGame', '방장 권한으로 진행 · 정답 판정 · 점수', true], ['CatchMindVoice', 'Photon Voice 음성 채팅', true]]],
        ['UI', [['CatchMindUI', '1920×1080 기준 IMGUI, 화면 크기에 맞춰 확대', true]]],
      ],
      points: [
        ['방장 권한 구조 (Shared 모드)', '방장이 상태 권한을 갖고 판 진행 · 정답 판정을 맡음. 점수 · 출제 순서 · 맞힌 사람은 [Networked] 변수로 모두에게 동기화.'],
        ['그림은 압축한 점 묶음으로', '점 하나를 x · y ushort 4바이트로 묶어 RPC로 전송. 펜 떼기 · 지우기 · 브러시 변경도 같은 형식의 명령으로 보냄.'],
        ['손 인식 끊김 보정', '손 인식이 잠깐 끊겨도 정해진 시간 동안은 획을 이어 그려 선이 툭툭 끊기지 않음.'],
      ],
    },
    troubles: [
      {
        title: '게임 중 방장이 나가면 게임이 멈추는 문제',
        problem: '방장이 게임 도중 나가면 진행 중이던 판이 끝나버리고, 맞힌 사람 기록이 사라지거나 게임이 멈췄다.',
        cause: '권한은 다음 방장에게 넘어가지만, 제시어 · 맞힌 순서 · 획 기록을 옛 방장만 갖고 있어서 새 방장은 판을 이어갈 정보가 없었음.',
        solution: '맞힌 순서는 [Networked] 리스트로 바꿔 모두가 공유하고, 획 기록도 모든 클라이언트가 보관. 새 방장은 출제자에게 RPC로 제시어를 다시 받아오고, 3초 안에 못 받으면 그 판만 종료. 연결이 끊기면 로비로 돌아가 다시 접속.',
        result: '방장이 바뀌어도 진행 중이던 판이 그대로 이어짐.',
        img: 'trouble-1.png',
      },
      {
        title: '웹캠 변경 버튼을 연타하면 손 인식이 멈추는 문제',
        problem: '웹캠을 빠르게 여러 번 바꾸거나 켜지지 않는 웹캠을 고르면 손 인식이 완전히 멈췄다.',
        cause: '바꾸는 도중에 또 바꾸기가 들어오고, 켜지지 않는 웹캠은 손 인식 모듈이 2000프레임 뒤 예외를 던지며 멈춤.',
        solution: '바꾸는 동안 버튼을 잠그고, 코루틴으로 실제 영상이 들어오는지(텍스처 크기) 확인. 3초 안에 안 켜지면 예외가 나기 전에 원래 웹캠으로 되돌리고, 실패한 웹캠은 다음부터 건너뜀.',
        result: '어떤 웹캠을 골라도 손 인식이 멈추지 않음.',
        img: 'trouble-2.png',
      },
      {
        title: '로비에서 방 목록이 안 보이는 문제',
        problem: '방을 만들어도 다른 사람의 로비 방 목록에는 아무것도 나타나지 않았다.',
        cause: '네트워크 러너를 만든 뒤에 붙인 이벤트 컴포넌트는 콜백 대상으로 자동 등록되지 않아, 방 목록 갱신 이벤트를 받지 못함.',
        solution: '컴포넌트를 붙인 직후 AddCallbacks로 직접 등록.',
        result: '로비에 들어가자마자 방 목록이 실시간으로 갱신됨.',
        img: 'trouble-3.png',
      },
    ],
  },
  {
    id: 'gamblegame',
    title: 'Gamble Game',
    tagline: '블랙잭에 AI를 연동해 상황별 다양한 대사를 출력하는 카드 게임.',
    tags: ['Unity', 'C#', 'LLM API', '한/영'],
    github: 'https://github.com/jihwan0223/gamblegame',
    meta: { 기간: '2026.03 ~ 2026.06 (커밋 64개)', 인원: '1명 (개인 프로젝트)', 역할: '기획 · 프로그래밍 전체', 플랫폼: 'PC' },
    flow: [
      { src: '01.png', caption: '베팅', desc: '판돈을 걸고 라운드 시작' },
      { src: '02.png', caption: '블랙잭 진행', desc: '히트·스탠드로 21에 가깝게' },
      { src: '03.png', caption: 'AI 딜러 대사', desc: '결과에 맞춰 AI가 매번 다른 대사 생성' },
    ],
    arch: {
      rows: [
        ['씬', [['MainScene', '로비 · 설정 · 언어 전환'], ['GameScene', '블랙잭 라운드'], ['UpgradeScene', '스킬 트리'], ['WorkScene', '알바로 돈 벌기']]],
        ['게임 흐름', [['GameController', '히트 · 스테이 입력'], ['GameManager', '라운드 시작 · 종료 · 다음 판'], ['DeckManager', '덱 생성 · 셔플']]],
        ['판정 · 대사', [['PlayerHand ×2', '플레이어 · 딜러 패와 점수'], ['DealerAI', '딜러 행동 · 승패 확정'], ['GroqAI', '결과 코드 → 대사 요청']]],
        ['경제 · 저장', [['BettingManager', '베팅 · 배당 지급'], ['UpgradeManager', '스킬 트리 효과'], ['DataManager', '변경 즉시 JSON 저장']]],
      ],
      points: [
        ['판정은 코드, 대사는 AI', 'DealerAI가 승패를 확정하고 GroqAI에는 점수와 결과 코드만 전달. LLM은 대사만 만들어 결과와 대사가 어긋나지 않음.'],
        ['비동기 요청과 실패 대비', '코루틴 + UnityWebRequest로 게임을 멈추지 않고 요청. 실패하면 기본 대사로 대체.'],
        ['돈이 바뀌면 바로 저장', '베팅 확정 · 승리 · 패배 · 무승부 모든 지점에서 DataManager로 즉시 저장.'],
      ],
    },
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
  {
    id: 'towerrior',
    title: 'Towerrior',
    tagline: '웨이브마다 몰려오는 적을 타워 배치와 업그레이드로 막아내는 모바일 타워 디펜스 게임.',
    tags: ['Unity', 'C#', '모바일', '오브젝트 풀링', 'Plastic SCM'],
    meta: {
      기간: '2026.06.29 ~ 2026.07.09 (11일)',
      인원: '4명',
      역할: '적 · 웨이브 · 타워 전투 시스템, 타워 업그레이드 · 버프, 보스, 맵 3 · 4 제작, 카메라 조작 (팀 내 최다 커밋)',
      플랫폼: '모바일 (Android)',
    },
    flow: [
      { src: '01.png', caption: '타워 배치', desc: '구매 패널에서 타워를 골라 맵에 설치' },
      { src: '02.png', caption: '웨이브 방어', desc: '웨이브마다 늘어나는 적을 업그레이드로 막기' },
      { src: '03.png', caption: '보스 등장', desc: '등장 연출과 함께 나타나는 보스 처치' },
    ],
    arch: {
      rows: [
        ['코어', [['GameManager', '골드 · 체력 · 웨이브 상태'], ['StageManager', '스테이지 진행'], ['GridManager · Grid', '타워 배치 칸', true], ['CameraRigController', '드래그 · 줌 카메라', true]]],
        ['적', [['EnemySpawner', '웨이브 스폰 · 클리어 보상', true], ['EnemyPool', '타입별 오브젝트 풀'], ['Enemy', '경로 이동 · 피격 · 처치', true], ['Boss', 'Enemy 상속 · 보스 전용 처리', true]]],
        ['타워', [['TowerSpawner', '배치 · 판매 · 환불'], ['TowerManager · TowerSelectUI', '타워 선택', true], ['Tower', '추상 클래스 · Default · Buff · Gold · Slow', true], ['TowerUpgrade', '추상 클래스 · 타워별 업그레이드', true]]],
        ['UI · 기타', [['HUD', '골드 · 웨이브 · 보스 경고'], ['Save · Settings', '진행 저장 · 설정'], ['Loading', '씬 로딩 · 팁']]],
      ],
      points: [
        ['상속으로 타워 · 적 확장', 'Tower와 TowerUpgrade를 추상 클래스로 두고 4종 타워가 각각 상속. 보스도 Enemy를 상속해 이동 · 피격 로직을 재사용.'],
        ['적은 오브젝트 풀로 재사용', '생성 · 파괴 대신 타입별 풀에서 꺼내 쓰고 처치되면 반납. 그래서 타깃 검사에 활성 여부 확인이 필요했음 (트러블슈팅 1).'],
        ['상태는 GameManager 한 곳에서', '골드 · 체력 · 웨이브는 GameManager만 바꾸고, 적 · 타워는 AddGold · TakeDamage만 호출.'],
      ],
    },
    troubles: [
      {
        title: '빌드에서만 총알이 엉뚱한 적을 쫓아가는 문제',
        problem: '에디터에서는 정상인데, 빌드에서는 총알이 이미 처치된 적을 계속 쫓거나 화면 다른 곳의 적에게 날아갔다.',
        cause: '적을 오브젝트 풀로 재사용해서, 처치된 적은 파괴되지 않고 비활성화만 됨. null 검사로는 비활성 적을 걸러내지 못해, 재사용된 적을 계속 타깃으로 잡음.',
        solution: '타깃이 null이거나 비활성 상태면 즉시 타깃을 해제하도록 조건 추가.',
        result: '풀링된 적이 재사용돼도 총알이 정확한 대상만 추적.',
        img: 'trouble-1.png',
      },
      {
        title: '버프 타워를 없애도 버프가 남는 문제',
        problem: '버프 타워를 팔거나 파괴해도 주변 타워의 공격력 증가와 깜빡임 효과가 계속 유지됐다.',
        cause: '버프를 줄 때만 처리하고, 누구에게 줬는지 기록하지 않아 해제할 방법이 없었음.',
        solution: '버프를 준 타워 목록을 기록하고, 버프 타워가 비활성화될 때 목록의 타워에서 버프와 효과를 한 번에 해제. 조준이 필요 없는 타워는 회전 로직에서 분리.',
        result: '타워 구성을 바꿔도 능력치가 정확하게 유지 — 밸런스 붕괴 방지.',
        img: 'trouble-2.png',
      },
      {
        title: '적이 길을 벗어나 대각선으로 이동하는 문제',
        problem: '맵을 추가하자 적이 생성되자마자 길을 무시하고 첫 지점까지 대각선으로 가로질렀다.',
        cause: '스폰 위치를 맵마다 따로 지정해서 경로 시작점과 어긋남. 경로가 없는 맵에서는 오류도 발생.',
        solution: '일반 적과 보스 모두 경로의 첫 지점에서 생성되도록 통일하고, 경로가 비어 있을 때를 대비한 예외 처리 추가.',
        result: '맵을 새로 만들어도 스폰 위치를 따로 맞출 필요 없이 경로대로 이동.',
        img: 'trouble-3.png',
      },
    ],
  },
  {
    id: 'writinggrandfather',
    title: 'Writing Grandfather',
    tagline: '노인과 아이들을 위한 모바일 글쓰기 연습 게임.',
    intent: '종이에 글을 쓰는 것보다 재미있게 글쓰기를 연습할 수 있도록.',
    tags: ['Unity', 'C#', 'UI Toolkit', 'OpenAI API', 'Firebase', 'Cloud Functions'],
    github: 'https://github.com/WritingGrandfather/WritingGrandfather',
    meta: {
      기간: '2026.07.12 ~ 2026.07.14 (3일)',
      인원: '6명',
      역할: 'AI 글씨 피드백 (OpenAI), Firebase 로그인 · 저장, 랭킹 화면, API 키 보호 프록시, 빌드',
      플랫폼: '모바일',
    },
    flow: [
      { src: '01.png', caption: '정밀 쓰기', desc: '본보기 글자를 따라 쓰면 모양 · 획순을 채점' },
      { src: '02.png', caption: 'AI 피드백', desc: 'AI가 글씨를 보고 어린이 · 성인에 맞춘 말투로 피드백' },
      { src: '03.png', caption: '도전 모드', desc: '떨어지는 단어가 바닥에 닿기 전에 써서 막기' },
    ],
    arch: {
      rows: [
        ['화면', [['LoginController', '로그인 · 게스트 입장', true], ['Lobby · ModSelect', '연령 설정 · 모드 선택'], ['정밀 쓰기 · 도전 모드', 'PreciseWritingUI · FallingWritingSession'], ['RankingScreenController', '랭킹 화면', true]]],
        ['판정', [['StrokeCapture · DrawLine', '획 좌표 수집'], ['TemplateSimilarityEvaluator', '본보기 글자와 모양 비교'], ['StrokeOrderValidator', '획순 검사']]],
        ['AI 피드백', [['WritingFeedbackController', '채점 결과로 피드백 요청 · 표시', true], ['OpenAIHandwritingEvaluator', '획 좌표 JSON → AI 피드백, 연령별 말투', true], ['Cloud Functions 프록시', 'OpenAI 키는 서버에만 보관', true]]],
        ['계정 · 데이터', [['AuthManager', 'Firebase 인증 · 자동 로그인', true], ['SaveManager · UserProfile', 'Firestore 저장 · 프로필', true], ['RankingManager', '점수 · 순위']]],
      ],
      points: [
        ['평가기를 추상 클래스로', 'HandwritingEvaluator 아래 Mock · OpenAI · Template 평가기를 두어 교체 가능. API 없이도 Mock으로 테스트.'],
        ['AI가 실패해도 게임은 계속', '프록시 · 네트워크 오류가 나면 기본 점수와 안내 문구로 통과 처리 (FailOpen) — 글쓰기 흐름이 멈추지 않음.'],
        ['연령별 피드백', '로비에서 고른 어린이 · 성인 설정에 따라 AI 말투를 바꿈 — 어린이는 쉬운 말과 칭찬 위주.'],
      ],
    },
    troubles: [
      {
        title: '본보기대로 정확히 써도 틀렸다고 채점되는 문제',
        problem: '화면에 보이는 본보기 글자에 맞춰 정확히 써도 "본보기에서 벗어남"으로 감점되거나, 비슷한 다른 글자로 오판됐다.',
        cause: '채점기가 화면 본보기(UI Toolkit 라벨)가 아니라 자체 기본 크기 · 위치로 본보기를 정렬해 채점함. 또 비슷한 글자 판정 기준(4점)이 너무 낮아 손 떨림 정도의 점수 차이에도 다른 글자로 판정.',
        solution: '화면 본보기 라벨의 실제 표시 비율을 채점기에 동기화하는 SyncGhostLabelScale 추가. 비슷한 글자 판정 기준은 14점으로 올림.',
        result: '화면에 보이는 본보기와 채점 기준이 같아져 오채점 제거.',
        img: 'trouble-1.png',
      },
      {
        title: '빌드한 앱에 OpenAI API 키가 그대로 들어가는 문제',
        problem: 'AI 피드백을 위해 앱이 OpenAI에 직접 요청하면서, 빌드 파일 안에 실제 API 키가 포함됐다.',
        cause: '클라이언트가 키를 들고 직접 호출하는 구조 — 빌드를 뜯으면 누구나 키를 꺼내 쓸 수 있음.',
        solution: 'Firebase Cloud Functions 프록시를 만들어 OpenAI 키는 Secret Manager에만 보관. 앱은 프록시 전용 비밀값만 보내고, 서버가 검증한 뒤 대신 요청. 키 설정 파일은 .gitignore로 저장소에서 제외.',
        result: '앱이나 저장소가 유출돼도 OpenAI 키는 안전 — 프록시 비밀값만 바꾸면 즉시 차단.',
        img: 'trouble-2.png',
      },
      {
        title: '앱을 다시 켤 때마다 로그인해야 하는 문제',
        problem: '로그인해 둔 상태인데도 앱을 완전히 껐다 켜면 매번 로그인 화면으로 돌아갔다.',
        cause: '앱을 처음 켤 때 Firebase 초기화에 몇 초 이상 걸리는데, 5초만 기다리고 로그인 안 됨으로 처리함.',
        solution: '초기화 대기 시간을 20초로 늘려 콜드 스타트에서도 저장된 로그인 상태를 확인한 뒤 화면을 결정.',
        result: '한 번 로그인하면 앱을 다시 켜도 바로 로비로 진입.',
        img: 'trouble-3.png',
      },
    ],
  },
];

// 프로필 — 메인 페이지 Skills/History 섹션과 PDF 첫 장이 여기서 읽음
const PROFILE = {
  name: '정지환',
  role: '게임 개발자',
  tagline: '플레이어가 기억할 순간을 만드는 게임 개발자.',
  email: 'jihwan5580@gmail.com',
  github: 'https://github.com/jihwan0223',
  skills: [
    ['엔진', ['Unity 2D / 3D', 'UI Toolkit', 'uGUI', 'IMGUI', 'Cinemachine', 'Input System', 'Feel (MMFeedbacks)']],
    ['언어', ['C#']],
    ['데이터', ['JSON 세이브 / 로드', '이벤트 기반 자동 저장', '세이브 폴더 마이그레이션']],
    ['최적화', ['오브젝트 풀링', '라이트 베이킹', '파편 병합', 'GC 할당 최소화']],
    ['네트워크', ['Photon Fusion', 'Photon Voice', 'RPC · 네트워크 변수 동기화']],
    ['AI', ['LLM API 연동', '프롬프트 설계', 'UnityWebRequest', 'MediaPipe 손 인식 연동', 'MCP (Unity MCP)']],
    ['서버', ['Firebase Auth', 'Firestore', 'Cloud Functions (API 키 프록시)']],
    ['플랫폼', ['PC', '모바일', '세이프 에어리어 대응']],
    ['툴', ['Git', 'GitHub', 'Plastic SCM', 'VS Code']],
  ],
  // 이력: [제목, 항목들]. todo: true 인 항목은 흐리게 보이는 자리표시 — 실제 내용으로 바꾸고 todo를 지우면 됨
  history: [
    ['경력 · 학력', [
      { date: '20XX.03 ~ 현재', name: 'OO대학교 OO학과', desc: '재학 / 졸업 예정 등', todo: true },
    ]],
    ['산학 프로젝트', [
      { date: '20XX', name: '프로젝트 이름', desc: '함께한 기업 · 맡은 역할', todo: true },
    ]],
    ['대외활동', [
      { date: '2026', name: '시니어 인지기능 향상 해커톤 — 우수상', desc: '(주)에이아이씨유 주최 · 출품작 Senior Party' },
    ]],
  ],
};

// 이력 한 항목 (메인 페이지 타임라인)
const historyRow = (h) => `
  <li class="history-row${h.todo ? ' history-todo' : ''}">
    <span class="history-date">${h.date}</span>
    <div class="history-body"><h3 class="history-name">${h.name}</h3><p class="history-desc">${h.desc}</p></div>
  </li>`;

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
          ${imgSlot('profile', 'photo.jpg', `${PROFILE.name} 사진`, 'pg-photo')}
          <p class="pg-kicker">${PROFILE.role}</p>
          <h1 class="pg-name">${PROFILE.name}</h1>
          <p class="pg-lead">${PROFILE.tagline}</p>
          <dl class="pg-contact">
            <div><dt>이메일</dt><dd>${PROFILE.email}</dd></div>
            <div><dt>깃허브</dt><dd>${PROFILE.github.replace('https://', '')}</dd></div>
          </dl>
        </div>
        <div class="pg-col">
          <h2 class="pg-h">기술 스택</h2>
          <dl class="pg-skills">${PROFILE.skills.map(([g, items]) => `<div><dt>${g}</dt><dd>${chipList(items)}</dd></div>`).join('')}</dl>
        </div>
        <div class="pg-col">
          ${PROFILE.history.map(([title, items]) => `
            <h2 class="pg-h">${title}</h2>
            ${items.map((a) => `<div class="pg-award${a.todo ? ' history-todo' : ''}"><p class="accent">${a.date}</p><p class="pg-award-name">${a.name}</p><p class="dim">${a.desc}</p></div>`).join('')}`).join('')}
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
            ${p.intent ? `<p class="pg-intent"><b>기획 의도</b> ${p.intent}</p>` : ''}
            ${tagList(p.tags)}
            ${meta ? `<dl class="pg-meta">${meta}</dl>` : ''}
            ${p.github ? `<p class="pg-link"><a href="${p.github}" target="_blank" rel="noopener">${p.github.replace('https://', '')}</a></p>` : ''}
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

    if (p.arch) deck.push({
      project: p,
      label: `${p.title} · 아키텍처`,
      body: `
        <h2 class="pg-h">아키텍처</h2>
        <div class="pg-arch">
          <div class="arch">${p.arch.rows.map(([label, boxes]) => `
            <div class="arch-row">
              <p class="arch-label">${label}</p>
              <div class="arch-boxes">${boxes.map(([name, desc, mine]) => `
                <div class="arch-box${mine ? ' mine' : ''}"><b>${name.replace(/([a-z])([A-Z])/g, '$1<wbr>$2')}</b><span>${desc}</span></div>`).join('')}
              </div>
            </div>`).join('')}
            ${p.arch.rows.some(([, b]) => b.some((x) => x[2])) ? '<p class="arch-legend"><i></i>직접 구현</p>' : ''}
          </div>
          <ol class="arch-points">${p.arch.points.map(([t, d]) => `<li><b>${t}</b>${d}</li>`).join('')}</ol>
        </div>`,
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
