/* Software portfolio work. Architecture examples and Revit BIM are excluded. */
window.portfolioProjects = [
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

// Keep the current publication preferences and rendering metadata. Project copy above
// is restored from 2202306, the parent of the first commit on 2026-10-25.
window.portfolioSettings = { projectLinks: false, contentBaseline: "2202306" };
window.portfolioStatuses = {
  planned: { label: "준비 중" },
  "in-progress": { label: "개발 중" },
  completed: { label: "구현 완료" }
};
window.portfolioProjects.forEach((project) => {
  if (project.kind !== "architecture") project.status = project.id === "cad-productivity-palette" ? "completed" : "in-progress";
});
window.portfolioPlannedProjects.forEach((project) => { project.status = "planned"; });
window.portfolioFeaturedProjects = window.portfolioPlannedProjects;
