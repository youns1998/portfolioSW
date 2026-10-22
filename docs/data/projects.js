/* Implemented work only. Architecture documents are maintained in portfolioCAD. */
window.portfolioProjects = [
  {
    id: "comic-cafe", kind: "architecture",
    title: "SketchUp 모델링·렌더링 · 만화카페", category: "Visual Work / SketchUp · AutoCAD",
    type: "3D 모델링·렌더링·도면 작성", description: "SketchUp으로 공간을 모델링하고 렌더링 이미지로 표현했습니다. AutoCAD 도면과 함께 2D·3D 시각 자료를 만든 작업입니다.",
    url: "https://youns1998.github.io/portfolioCAD/projects/detail.html?project=comic-cafe",
    documents: []
  },
  {
    id: "two-story-house", kind: "architecture",
    title: "AutoCAD 2D 도면 작성 · 단독주택", category: "Visual Work / AutoCAD",
    type: "2D 도면 작성·편집", description: "AutoCAD로 평면·입면·단면과 상세 도면을 작성했습니다. 여러 뷰의 정보를 도면으로 표현하고 정리한 경험입니다.",
    url: "https://youns1998.github.io/portfolioCAD/projects/detail.html?project=two-story-house",
    documents: []
  },
  {
    id: "cad-productivity-palette", role: "supporting",
    thumbnail: "images/projects/cad-productivity.svg",
    thumbnailAlt: "CAD 도면 선과 명령 팔레트를 표현한 그래픽",
    readmeUrl: "https://github.com/youns1998/cad-productivity-palette/blob/main/README.md",
    title: "CAD Productivity Palette",
    category: "Automation / Development",
    type: "AutoCAD 도킹 팔레트",
    duration: "1주일",
    context: "개인 개발 프로젝트",
    description: "객체 편집, 자주 쓰는 명령과 도면 점검을 한곳에 모은 AutoCAD 플러그인입니다.",
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
    id: "revit-bim-inspector", role: "supporting",
    thumbnail: "images/projects/bim-inspector.svg",
    thumbnailAlt: "입체 모델의 층과 점검 지점을 표현한 BIM 그래픽",
    readmeUrl: "https://github.com/youns1998/revit-bim-portfolio/blob/main/README.md",
    title: "Revit BIM Inspector",
    category: "BIM / Development",
    type: "Revit 모델 정보 점검 도구",
    duration: "진행 중",
    context: "개인 개발 프로젝트",
    description: "실·문·창·시트 정보를 점검하고 CSV 보고서를 만드는 Revit용 도구입니다.",
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
    id: "drawing-file-organizer", role: "supporting",
    thumbnail: "images/projects/drawing-organizer.svg",
    thumbnailAlt: "도면 파일이 폴더와 보고서로 정리되는 흐름을 표현한 그래픽",
    readmeUrl: "https://github.com/youns1998/drawing-file-organizer/blob/main/README.md",
    title: "Drawing File Organizer",
    category: "Automation / Python",
    type: "도면 파일 정리 도구",
    duration: "진행 중",
    context: "개인 개발 프로젝트",
    description: "도면 파일의 이름·리비전·중복을 확인하고 프로젝트별 폴더로 정리하는 Python 도구입니다.",
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

// Primary projects in preparation; kept separate from implemented work.
window.portfolioPlannedProjects = [
  { id: "spring-backend", area: "SPRING / WEB SERVICE", title: "Spring CRUD",
    description: "Spring 기반 웹 서비스의 데이터 생성·조회·수정·삭제를 구현할 프로젝트입니다. CRUD 흐름과 데이터 처리를 중심으로 준비합니다.",
    tools: ["Spring", "CRUD"],
    scope: "구현 목표 · 데이터 생성 / 조회 / 수정 / 삭제",
    repositoryUrl: "https://github.com/youns1998/portfolioSPR" },
  { id: "gis-spatial", area: "GIS / SPATIAL DATABASE", title: "GIS 공간 데이터",
    description: "QGIS 도구 활용과 PostgreSQL·PostGIS 데이터베이스 작업을 하나의 저장소에 정리할 프로젝트입니다. 공간 데이터의 저장·조회와 지도 시각화를 중심으로 준비합니다.",
    tools: ["QGIS", "PostgreSQL", "PostGIS"],
    scope: "작업 목표 · 공간 데이터 저장 / 조회 / 지도 시각화",
    repositoryUrl: "https://github.com/youns1998/portfolioGIS" }
];
