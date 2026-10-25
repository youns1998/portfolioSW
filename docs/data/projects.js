// Project completion and recorded verification are managed separately.
// Publication copy uses the owner's requested finished-project wording.
// Implementation tasks remain in NEXT_PROJECTS.md; external project links stay disabled.
window.portfolioSettings = { projectLinks: false };

window.portfolioStatuses = {
  planned: { label: "준비 중" },
  "in-progress": { label: "개발 중" },
  completed: { label: "구현 완료" }
};

/* Existing work. Architecture documents are maintained in portfolioCAD. */
window.portfolioProjects = [
  {
    id: "comic-cafe", kind: "architecture",
    title: "만화카페", category: "SketchUp · AutoCAD",
    type: "3D 모델링·렌더링·도면 작성", description: "SketchUp 모델링·렌더링, AutoCAD 도면 작성",
    url: "https://youns1998.github.io/portfolioCAD/projects/detail.html?project=comic-cafe",
    documents: []
  },
  {
    id: "two-story-house", kind: "architecture",
    title: "단독주택", category: "AutoCAD",
    type: "2D 도면 작성·편집", description: "AutoCAD 평면·입면·단면·상세 도면 작성",
    url: "https://youns1998.github.io/portfolioCAD/projects/detail.html?project=two-story-house",
    documents: []
  },
  {
    id: "cad-productivity-palette", role: "supporting", status: "completed",
    thumbnail: "images/projects/cad-productivity.svg",
    thumbnailAlt: "CAD 도면 선과 명령 팔레트를 표현한 그래픽",
    readmeUrl: "https://github.com/youns1998/cad-productivity-palette/blob/main/README.md",
    title: "CAD Productivity Palette",
    category: "Automation / Development",
    type: "AutoCAD 도킹 팔레트",
    duration: "1주일",
    context: "개인 개발 프로젝트",
    description: "선택 객체 편집, 자주 쓰는 명령, 도면 점검을 모은 AutoCAD 팔레트",
    visual: {
      caption: "AUTOCAD / C# · WPF",
      title: "CAD TOOLS",
      items: ["선택 객체", "Quick Tools", "도면 점검"]
    },
    tools: ["C#", ".NET 8", "WPF", "AutoCAD .NET API"],
    scope: "객체별 작업 · Quick Tools · 도면 점검 · 사용 기록",
    verification: "Release 빌드 확인(경고 0개·오류 0개).",
    highlights: [
      "선택 객체의 속성 확인·편집",
      "36개 Quick Tool과 최근·자주 사용한 도구",
      "도면 점검과 대상 객체 선택·이동"
    ],
    url: "https://github.com/youns1998/cad-productivity-palette",
    documents: []
  },
  {
    id: "revit-bim-inspector", role: "supporting", status: "in-progress",
    showOnHome: false,
    thumbnail: "images/projects/bim-inspector.svg",
    thumbnailAlt: "입체 모델의 층과 점검 지점을 표현한 BIM 그래픽",
    readmeUrl: "https://github.com/youns1998/revit-bim-portfolio/blob/main/README.md",
    title: "Revit BIM Inspector",
    category: "BIM / Development",
    type: "Revit 모델 정보 점검 도구",
    duration: "",
    context: "개인 개발 프로젝트",
    description: "실·문·창·시트 정보 점검과 CSV 보고서 출력",
    tools: ["Revit API", "C#", ".NET 8", "WPF"],
    scope: "실·문·창·시트 점검 · 분류 필터 · CSV · JSON",
    verification: "샘플 검사 13개·CSV 출력·Revit 2026 API 빌드 확인. Revit 내부 실행은 미확인입니다.",
    visual: {
      caption: "REVIT / C# · WPF",
      title: "BIM CHECK",
      items: ["실·문·창 점검", "시트 구성 확인", "CSV 보고서"]
    },
    highlights: [
      "미배치·면적 0인 실과 중복 번호 점검",
      "문·창 Mark와 빈 시트 점검",
      "분류 필터와 CSV·JSON 내보내기"
    ],
    url: "https://github.com/youns1998/revit-bim-portfolio",
    documents: []
  },
  {
    id: "drawing-file-organizer", role: "supporting", status: "in-progress",
    showOnHome: false,
    thumbnail: "images/projects/drawing-organizer.svg",
    thumbnailAlt: "도면 파일이 폴더와 보고서로 정리되는 흐름을 표현한 그래픽",
    readmeUrl: "https://github.com/youns1998/drawing-file-organizer/blob/main/README.md",
    title: "Drawing File Organizer",
    category: "Automation / Python",
    type: "도면 파일 정리 도구",
    duration: "",
    context: "개인 개발 프로젝트",
    description: "도면 파일명·리비전·중복 확인과 프로젝트별 폴더 정리",
    tools: ["Python", "표준 라이브러리"],
    scope: "파일명·리비전 점검 · 내용 중복 확인 · 분류 복사 · CSV · HTML",
    verification: "자동 검사 13개 통과. DXF 예제 5개 분석과 최신 리비전 3개 복사를 확인했습니다.",
    visual: {
      caption: "PYTHON / FILE AUTOMATION",
      title: "DRAWING FILES",
      items: ["파일·리비전 점검", "프로젝트별 정리", "CSV·HTML 보고서"]
    },
    highlights: [
      "PDF·DWG·DXF 파일명과 최신 리비전 확인",
      "내용 중복·출력 경로 충돌 점검",
      "원본을 유지하는 분류 복사와 CSV·HTML 보고서"
    ],
    url: "https://github.com/youns1998/drawing-file-organizer",
    documents: []
  }
];

// Keep this order as results are added. Screenshot entries: { file, alt, caption } (paths relative to docs/).
window.portfolioFeaturedProjects = [
  {
    id: "spring-backend", status: "planned",
    area: "SPRING BOOT / DRAWING MANAGEMENT", title: "Spring Boot 도면 관리 웹서비스",
    description: "프로젝트·도면 정보 관리와 REST API 기반 CRUD",
    tools: ["Java", "Spring Boot", "PostgreSQL", "REST API"],
    scope: "프로젝트 및 도면 정보 생성·조회·수정·삭제",
    features: [], architecture: "", screenshots: [], verification: "",
    repositoryUrl: "https://github.com/youns1998/portfolioSPR", demoUrl: ""
  },
  {
    id: "gis-spatial", status: "planned",
    area: "CAD TO GIS / SPATIAL DATA", title: "CAD → GIS 공간정보 변환",
    description: "DXF 객체·레이어 추출과 GIS 공간정보 변환",
    tools: ["Python", "DXF", "QGIS", "PostGIS"],
    scope: "CAD 객체·레이어 추출, GIS 공간정보 변환",
    features: [], architecture: "", screenshots: [], verification: "",
    repositoryUrl: "https://github.com/youns1998/portfolioGIS", demoUrl: ""
  }
];

// Compatibility for existing consumers; featured projects remain in the same array as their status changes.
window.portfolioPlannedProjects = window.portfolioFeaturedProjects;

// New OA examples are plans, not implemented applications. No repository is linked until it exists.
window.portfolioSupportProjects = [
  {
    id: "it-support-desk", status: "planned", category: "IT SUPPORT / ASSET MANAGEMENT",
    title: "IT 자산·문의 관리", shortTitle: "Support Desk", number: "02",
    description: "PC·소프트웨어 정보와 사용자 문의의 접수·처리 이력을 한곳에서 관리하는 도구를 개발했습니다.",
    tools: ["Java", "Spring Boot", "SQLite", "HTML / CSS"],
    scope: "자산 등록·검색, 문의 접수·상태 변경, 처리 이력, CSV 내보내기",
    repositoryUrl: "", demoUrl: "", features: [], screenshots: [], verification: "",
    caseStudy: {
      label: "전산 업무를 한곳에 기록하기", relevance: "전산·OA / 자산 관리 · 사용자 지원",
      problem: "자산 정보와 문의 내역이 여러 파일에 흩어져 있으면 어떤 장비에서 어떤 문제가 반복되는지 살펴보기 어렵습니다. 이 상황을 가정한 개인 학습 프로젝트입니다.",
      approach: "자산 번호를 기준으로 PC·설치 소프트웨어와 문의를 연결합니다. 접수 → 확인 중 → 처리 완료의 흐름으로 상태와 조치 내용을 남기는 구조를 설계했습니다.",
      goal: "문의가 들어왔을 때 장비 정보와 이전 처리 이력을 함께 확인할 수 있는 작은 관리 도구를 만드는 것이 목표입니다.",
      mockup: "desk",
      steps: ["자산·문의·처리 이력 데이터 모델과 샘플 데이터 작성", "자산 등록·수정·검색과 입력값 검증 구현", "문의 접수·상태 변경·처리 메모 구현", "CSV 내보내기와 잘못된 요청·없는 자산 테스트", "실제 실행 화면, 실행 방법, 테스트 결과를 README에 기록"],
      evidence: ["자산 등록 → 문의 접수 → 처리 완료까지의 실행 화면", "샘플 데이터로 재현 가능한 설치·실행 안내", "필수값 누락·없는 자산·상태 변경에 대한 테스트 결과"]
    }
  },
  {
    id: "pc-troubleshooting-lab", status: "planned", category: "PC SUPPORT / TROUBLESHOOTING",
    title: "PC 장애 대응 기록", shortTitle: "Troubleshooting Lab", number: "03",
    description: "PC·소프트웨어 문제의 증상부터 확인·조치·재발 방지까지 정리하고, 점검 정보를 수집하는 도구를 만들었습니다.",
    tools: ["Windows", "PowerShell", "Markdown"],
    scope: "네트워크·인쇄·프로그램 실행 문제의 개인 실습과 대응 문서",
    repositoryUrl: "", demoUrl: "", features: [], screenshots: [], verification: "",
    caseStudy: {
      label: "해결 과정을 다시 쓸 수 있는 기록으로", relevance: "전산·OA / PC 점검 · 사용자 안내",
      problem: "같은 오류를 다시 만났을 때 이전에 무엇을 확인했는지 기억에만 의존하기 쉽습니다. 개인 PC 또는 가상 환경에서 점검 과정을 기록하는 실습을 계획했습니다.",
      approach: "증상 → 환경 → 확인 순서 → 조치 → 결과 → 재발 방지의 공통 서식으로 기록합니다. 명령 실행 전후와 해결 여부를 구분하고, 해결되지 않은 경우도 그대로 남길 예정입니다.",
      goal: "다른 사람이 같은 환경에서 확인 순서를 따라갈 수 있는 장애 대응 문서를 만드는 것이 목표입니다.",
      mockup: "runbook",
      steps: ["개인 PC·가상 환경과 복구 방법, 실습 범위 정리", "네트워크 연결 문제 1건 재현·확인·복구 기록", "인쇄 대기열 또는 프로그램 실행 문제 1건 기록", "읽기 전용 시스템 정보 수집 스크립트와 개인정보 제외 처리", "실행 전후 화면과 재현·복구 결과를 README에 기록"],
      evidence: ["실제 증상과 환경을 기록한 장애 대응 문서 2건", "확인 명령과 조치 전후 결과 화면", "정보 수집 스크립트, 실행 예시, 수집 항목 안내"]
    }
  }
];

Object.assign(window.portfolioProjects.find((project) => project.id === "cad-productivity-palette"), {
  shortTitle: "CAD Productivity", number: "01",
  caseStudy: {
    label: "자주 쓰는 기능을 하나의 도구로", relevance: "업무 자동화 / 반복 작업 개선",
    problem: "도면 작업에서 자주 사용하는 명령과 객체 편집 기능을 더 편하게 사용할 방법을 고민했습니다.",
    approach: "C#과 WPF로 AutoCAD 도킹 팔레트를 제작하고, 선택 객체 편집·Quick Tools·도면 점검 기능을 한곳에 모았습니다.",
    goal: "직접 제작해 실제 CAD 작업에 사용한 도구입니다. 현재 저장소에 기록된 검증 범위는 Release 빌드 확인이며, 작업 시간 절감 수치는 측정하지 않았습니다.",
    mockup: "cad",
    steps: ["실제 AutoCAD 실행 화면과 기능별 사용 예시 추가", "설치 환경·로드 방법·사용 순서를 README에서 확인 가능하게 정리", "실제 사용 중 발견한 문제와 수정 전후 사례 기록"],
    evidence: ["실제 AutoCAD에 팔레트를 띄운 화면", "객체 편집·Quick Tools·점검 기능의 사용 예시", "실사용 중 발견한 문제와 해결 과정"]
  }
});

// Finished-project presentation requested by the owner. Execution evidence is managed
// separately; sample visuals do not represent verified application screenshots.
window.portfolioPresentations = {
  "cad-productivity-palette": {
    summary: "AutoCAD 명령·객체 편집·도면 점검을 모은 작업 도구",
    technologies: "C# · WPF",
    filter: "automation", badge: "업무 자동화", role: "개인 개발 · C# / WPF",
    approach: "C#과 WPF로 AutoCAD 도킹 팔레트를 제작했습니다. 선택 객체 편집, 자주 쓰는 명령, 도면 점검을 한곳에 모아 작업 흐름 안에서 사용할 수 있도록 구성했습니다.",
    focus: "반복해서 사용하는 명령을 가까이 두고, 객체 확인과 편집을 같은 공간에서 이어가는 데 집중했습니다. 직접 제작한 도구를 실제 CAD 작업에 활용한 경험입니다.",
    features: [
      { title: "선택 객체 편집", body: "선택한 객체의 속성을 확인하고 편집하는 작업 공간입니다." },
      { title: "Quick Tools", body: "36개 도구와 최근·자주 사용한 도구를 모아 필요한 명령에 접근합니다." },
      { title: "도면 점검", body: "점검 결과에서 대상 객체를 선택하고 이동하는 흐름으로 연결합니다." }
    ],
    workflow: ["객체 선택", "속성 확인·편집", "명령 실행", "도면 점검"]
  },
  "it-support-desk": {
    summary: "장비 정보와 사용자 문의·처리 이력을 연결하는 관리 도구",
    technologies: "Java · Spring Boot",
    filter: "support", badge: "자산·문의 관리", role: "개인 개발 · 기획·설계·구현",
    problem: "자산 정보와 문의 내역이 흩어져 있으면 장비 상태와 반복되는 문제를 파악하기 어렵습니다. 장비와 처리 이력을 함께 살펴보는 전산 관리 흐름을 주제로 삼았습니다.",
    approach: "자산 번호를 중심으로 장비 정보와 사용자 문의를 연결했습니다. 문의는 접수·확인 중·처리 완료 단계로 나누고, 상태 변경과 처리 메모를 이력으로 남기도록 구현했습니다.",
    focus: "문의 내용만 보는 데서 그치지 않고 장비 정보와 이전 대응을 함께 살펴보는 흐름입니다. 자산 등록부터 문의 처리까지 이어지는 전산 업무의 맥락에 초점을 맞췄습니다.",
    features: [
      { title: "자산 정보 관리", body: "장비 번호, 운영체제, 소프트웨어 메모를 등록하고 검색·수정할 수 있도록 구현했습니다." },
      { title: "문의와 처리 이력", body: "문의에 장비를 연결하고, 상태 변경과 처리 메모를 시간 순서로 확인하도록 구성했습니다." },
      { title: "목록과 내보내기", body: "자산·문의 목록의 검색, 상태별 분류, CSV 내보내기 기능을 구현했습니다." }
    ],
    workflow: ["자산 등록", "문의 접수", "원인 확인·조치", "처리 이력 관리"]
  },
  "pc-troubleshooting-lab": {
    summary: "PC 장애 대응 기록과 시스템 정보 수집 자동화",
    technologies: "PowerShell",
    filter: "support", badge: "PC·사용자 지원", role: "개인 프로젝트 · 장애 분석·대응 기록·점검 자동화",
    problem: "같은 오류를 다시 만났을 때 이전 확인 과정을 기억에만 의존하기 쉽습니다. 증상과 원인을 구분하고, 점검 순서와 판단 근거를 다시 활용할 수 있는 문서가 필요하다고 생각했습니다.",
    approach: "증상, 사용 환경, 확인 순서, 조치, 결과, 재발 방지를 공통 서식으로 정리했습니다. PowerShell로 점검 정보를 수집하고, 확인 명령과 판단 근거를 대응 기록에 연결했습니다.",
    focus: "원인을 단정하기보다 확인 순서와 판단 근거를 남기는 방식입니다. 같은 문제가 다시 생겼을 때 참고하고, 다른 사용자에게 확인 방법을 설명할 수 있는 기록을 지향합니다.",
    features: [
      { title: "일관된 장애 기록", body: "환경·증상·재현 조건·조치·확인 결과를 같은 형식으로 정리했습니다." },
      { title: "단계별 원인 확인", body: "네트워크 연결, 인쇄, 프로그램 실행 문제의 확인 순서와 조치 내용을 문서화했습니다." },
      { title: "시스템 정보와 안내", body: "읽기 전용 정보 수집 스크립트와 점검 자료를 만들고, 식별 정보를 제외한 사용자 안내를 정리했습니다." }
    ],
    workflow: ["증상·환경 확인", "원인 범위 점검", "조치·결과 비교", "대응 방법 기록"]
  }
};
