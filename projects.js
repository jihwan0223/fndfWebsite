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
        ['추상 클래스로 10종 통일', 'DifficultyGameController 상속 — 새 게임은 규칙만 구현'],
        ['게임마다 씬 분리', '메뉴 → 게임 씬 → 결과 → 메뉴'],
        ['UI Toolkit 커스텀 요소', '진행 원형 · 도형 격자를 VisualElement로 재사용'],
      ],
    },
    troubles: [
      {
        title: '큐브 테두리 굵기가 들쭉날쭉',
        problem: '조각 경계선이 위치마다 굵기가 다르고 모서리에서 끊김',
        cause: '조각 사이 틈 + 뒤집은 껍데기로 외곽선을 그리는 방식',
        solution: '틈 없이 붙이고, 면 가장자리에 테두리를 그리는 셰이더로 교체',
        result: '어디서나 같은 굵기 · 조각당 오브젝트 2개 → 1개',
        img: 'trouble-1.png',
      },
      {
        title: '나가도 결과 없이 게임이 재시작',
        problem: '나가면 결과 없이 빠지거나 다음 라운드가 저절로 시작',
        cause: '예약된 라운드 전환 콜백이 그대로 실행',
        solution: '나갈 때 타이머 · 입력 정지 → 결과 표시, 종료 플래그로 콜백 차단',
        result: '언제 나가도 결과 확인 · 3개 게임 공통 적용',
        img: 'trouble-2.png',
      },
      {
        title: '손떨림으로 조각이 여러 개 지워짐',
        problem: '길게 누르거나 손이 떨려 엉뚱한 조각까지 삭제',
        cause: '누르는 즉시 삭제, 연속 입력을 그대로 받음',
        solution: '손 뗄 때 삭제 · 0.3초 안 연속 입력 무시 · 부분 점수',
        result: '오입력 감소 — 실수해도 계속 플레이',
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
      { src: '01.png', caption: '왁스 부수기', desc: '클릭으로 왁스를 깨고 떨어진 파편이 재화' },
      { src: '02.png', caption: '업그레이드 트리', desc: '파편으로 공격력 · 자동 클릭 · 새 오브젝트 해금' },
      { src: '03.png', caption: '보스 도전', desc: '제한 시간 안에 왁스 책상 부수기 — 보호막 오브젝트 등장' },
    ],
    // 플레이 흐름 다음 장: 제목별 이미지 묶음
    gallery: [
      ['맵 5종', [
        { src: 'map-1.png', caption: '책상 위' },
        { src: 'map-2.png', caption: '길거리' },
        { src: 'map-3.png', caption: '회사 앞' },
        { src: 'map-4.png', caption: '바다' },
        { src: 'map-5.png', caption: '우주' },
      ]],
      ['환생', [
        { src: 'rebirth-1.png', caption: '환생 — 업그레이드 노드가 소용돌이로 빨려 들어감' },
        { src: 'rebirth-2.png', caption: '별조각으로 찍는 영구 강화 트리' },
      ]],
    ],
    arch: {
      rows: [
        ['입력', [['Click', '클릭 · 자동 클릭, 데미지 · 보상 계산'], ['Health', '체력 · 부서짐 단계 · 피격 연출'], ['SpriteColliderSync', '볼록 껍질 콜라이더 재계산']]],
        ['보상', [['DebrisPool', 'Stack 풀 · 50조각 초과분 병합'], ['AutoSweeper', '바닥 파편 자동 수집'], ['CurrencyManager', '조각 · 결정 · 별조각 재화']]],
        ['진행', [['UpgradeManager', '업그레이드 트리 · 환생 배율'], ['ObjectManager · WeaponManager', '오브젝트 도감 · 무기 장착'], ['ZoneManager', '구역 해금 · 보스']]],
        ['저장 · UI', [['SaveManager', '이벤트 구독 → 디바운스 JSON 저장'], ['UI', '업그레이드 트리 · 사이드 패널 · 튜토리얼']]],
      ],
      points: [
        ['싱글턴 매니저 + C# 이벤트', '매니저는 이벤트만 발행, UI · 저장은 구독만'],
        ['저장은 디바운스로 한 번만', '변경이 몰려도 1초 뒤 한 번만 JSON 저장'],
        ['보상 계산은 한 곳에서', '기본 보상 × 배율 + 보너스를 Click 한 곳에서 계산'],
      ],
    },
    troubles: [
      {
        title: '파편 수천 개로 프레임 하락',
        problem: '후반 업그레이드로 파편 오브젝트가 폭증',
        cause: '조각마다 생성 · 파괴, 화면 개수 상한 없음',
        solution: 'Stack 오브젝트 풀 + 50개 초과분은 파편 하나에 합침 + 바닥 개수 상한',
        result: '파괴량이 늘어도 오브젝트 수 일정 · 재화 값 보존',
        img: 'trouble-1.png',
      },
      {
        title: '부서진 틈으로 클릭이 빠짐',
        problem: '갈라진 조각 사이를 누르면 타격 안 됨',
        cause: '여러 덩어리 윤곽을 그대로 콜라이더로 사용',
        solution: '윤곽 점을 모아 볼록 껍질 하나 + 여백 · 스프라이트 바뀔 때만 재계산',
        result: '어디를 눌러도 타격',
        img: 'trouble-2.svg',
      },
      {
        title: '큰 숫자 표기 오류',
        problem: '단위 경계에서 표기가 틀리고, 못 사는 가격이 살 수 있어 보임',
        cause: 'Log10 부동소수 오차 + 반올림',
        solution: '정수 나눗셈 + 버림 · 10¹⁸ 이상은 지수 표기',
        result: '경계값도 정확 · 가격 착시 제거',
        img: 'trouble-3.svg',
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
        ['방장 권한 구조 (Shared 모드)', '방장이 진행 · 판정, 점수 · 순서는 [Networked] 동기화'],
        ['그림은 압축한 점 묶음으로', '점 1개 = ushort x · y 4바이트, RPC로 묶어 전송'],
        ['손 인식 끊김 보정', '인식이 잠깐 끊겨도 획을 이어 그림'],
      ],
    },
    troubles: [
      {
        title: '방장이 나가면 게임이 멈춤',
        problem: '방장 이탈 시 판이 끝나거나 멈춤',
        cause: '제시어 · 맞힌 순서 · 획 기록을 옛 방장만 보관',
        solution: '맞힌 순서 [Networked] 공유 · 획 기록 전원 보관 · 새 방장이 RPC로 제시어 재요청',
        result: '방장이 바뀌어도 판이 이어짐',
        img: 'trouble-1.png',
      },
      {
        title: '웹캠 연타 시 손 인식 멈춤',
        problem: '웹캠을 빠르게 바꾸거나 안 켜지는 웹캠을 고르면 멈춤',
        cause: '전환 중 재전환 + 안 켜진 웹캠은 2000프레임 뒤 예외',
        solution: '전환 중 버튼 잠금 · 3초 안에 영상 없으면 원래 웹캠으로 복구',
        result: '어떤 웹캠을 골라도 안 멈춤',
        img: 'trouble-2.png',
      },
      {
        title: '로비에 방 목록이 안 보임',
        problem: '방을 만들어도 남의 로비에 안 보임',
        cause: '러너 생성 후 붙인 컴포넌트는 콜백 자동 등록 안 됨',
        solution: '붙인 직후 AddCallbacks로 직접 등록',
        result: '방 목록 실시간 갱신',
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
        ['판정은 코드, 대사는 AI', '승패는 DealerAI가 확정, LLM은 대사만'],
        ['비동기 요청과 실패 대비', '코루틴 + UnityWebRequest, 실패 시 기본 대사'],
        ['돈이 바뀌면 바로 저장', '베팅 · 승패 시점마다 즉시 JSON 저장'],
      ],
    },
    troubles: [
      {
        title: 'AI가 승패를 틀리게 말함',
        problem: '이긴 판을 졌다고 말함',
        cause: '승패 판정까지 LLM에 맡김',
        solution: '승패는 코드가 확정, AI엔 결과 코드만 전달',
        result: '결과와 대사가 항상 일치',
        img: 'trouble-1.png',
      },
      {
        title: '한국어 대사에 다른 언어가 섞임',
        problem: '중국어 · 일본어가 섞이고 대사가 너무 김',
        cause: '프롬프트의 언어 · 길이 제약이 약함',
        solution: '언어별 시스템 프롬프트 + 결과별 예시 대사 + 글자 수 제한',
        result: '짧고 일관된 한/영 대사',
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
        ['상속으로 타워 · 적 확장', 'Tower · TowerUpgrade 추상 클래스, Boss는 Enemy 상속'],
        ['적은 오브젝트 풀로 재사용', '타입별 풀에서 꺼내고 처치되면 반납'],
        ['상태는 GameManager 한 곳에서', '골드 · 체력 · 웨이브는 GameManager만 변경'],
      ],
    },
    troubles: [
      {
        title: '빌드에서만 총알이 엉뚱한 적을 추적',
        problem: '처치된 적을 계속 쫓음 (빌드에서만)',
        cause: '풀링된 적은 비활성화만 돼서 null 검사를 통과',
        solution: 'null 또는 비활성이면 타깃 해제',
        result: '정확한 대상만 추적',
        img: 'trouble-1.png',
      },
      {
        title: '버프 타워를 없애도 버프가 남음',
        problem: '팔거나 부숴도 주변 타워 버프 · 효과 유지',
        cause: '누구에게 버프를 줬는지 기록 안 함',
        solution: '버프 대상 목록 기록 → 비활성화 시 일괄 해제',
        result: '능력치 정확 · 밸런스 유지',
        img: 'trouble-2.png',
      },
      {
        title: '적이 길을 벗어나 대각선 이동',
        problem: '새 맵에서 적이 길을 무시하고 가로지름',
        cause: '맵마다 스폰 위치를 따로 지정해 경로와 어긋남',
        solution: '경로 첫 지점에서 생성 + 빈 경로 예외 처리',
        result: '새 맵도 경로대로 이동',
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
        ['평가기를 추상 클래스로', 'Mock · OpenAI · Template 평가기 교체 가능'],
        ['AI가 실패해도 게임은 계속', '오류 시 기본 점수로 통과 (FailOpen)'],
        ['연령별 피드백', '어린이 · 성인에 따라 AI 말투 변경'],
      ],
    },
    troubles: [
      {
        title: '본보기대로 써도 오채점',
        problem: '정확히 써도 감점되거나 다른 글자로 판정',
        cause: '채점기가 화면과 다른 크기 · 위치로 정렬 + 비슷한 글자 기준 4점',
        solution: '화면 본보기 비율을 채점기에 동기화 · 기준 4 → 14점',
        result: '화면과 채점 기준 일치',
        img: 'trouble-1.png',
      },
      {
        title: '빌드에 OpenAI 키가 포함됨',
        problem: '앱 파일 안에 실제 API 키가 들어감',
        cause: '앱이 키를 들고 OpenAI를 직접 호출',
        solution: 'Cloud Functions 프록시 · 키는 Secret Manager에만',
        result: '앱이 유출돼도 키 안전',
        img: 'trouble-2.png',
      },
      {
        title: '켤 때마다 다시 로그인',
        problem: '앱을 껐다 켜면 매번 로그인 화면',
        cause: 'Firebase 초기화가 오래 걸리는데 5초만 대기',
        solution: '대기 시간 20초로 늘림',
        result: '다시 켜도 바로 로비',
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

    if (p.gallery) deck.push({
      project: p,
      label: `${p.title} · ${p.gallery.map(([title]) => title).join(' · ')}`,
      body: p.gallery.map(([title, items]) => `
        <h2 class="pg-h">${title}</h2>
        <ol class="pg-gallery" style="--cols: ${items.length}">${items.map((it) => `
          <li>${imgSlot(p.id, it.src, it.caption)}<p class="pg-cap">${it.caption}</p></li>`).join('')}
        </ol>`).join(''),
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
            <div><dt>문제</dt><dd>${t.problem}</dd></div>
            <div><dt>원인</dt><dd>${t.cause}</dd></div>
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
