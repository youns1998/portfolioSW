/* Three-project software portfolio. Architecture, BIM, and Organizer are excluded. */
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
    explanation: "선택 객체의 속성 편집, 36개 Quick Tool, 점검 대상 객체로의 이동 기능을 제공합니다.",
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
  }
];

// Primary projects in preparation; kept separate from implemented work.
window.portfolioPlannedProjects = [
  { id: "spring-backend", area: "SPRING / WEB SERVICE", title: "Spring CRUD",
    description: "Spring 기반 웹 서비스에서 데이터 생성·조회·수정·삭제를 다루는 프로젝트입니다.",
    explanation: "CRUD 요청이 데이터 처리로 이어지는 흐름과 기능별 처리 구조를 중심으로 정리합니다.",
    tools: ["Spring", "CRUD"],
    scope: "구현 목표 · 데이터 생성 / 조회 / 수정 / 삭제",
    repositoryUrl: "https://github.com/youns1998/portfolioSPR" },
  { id: "gis-spatial", area: "GIS / SPATIAL DATABASE", title: "GIS 공간 데이터",
    description: "QGIS와 PostgreSQL·PostGIS를 활용한 공간 데이터 프로젝트입니다.",
    explanation: "공간 데이터를 데이터베이스에 저장·조회하고, QGIS에서 지도 위에 시각화하는 과정을 다룹니다.",
    tools: ["QGIS", "PostgreSQL", "PostGIS"],
    scope: "작업 목표 · 공간 데이터 저장 / 조회 / 지도 시각화",
    repositoryUrl: "https://github.com/youns1998/portfolioGIS" }
];

// Keep the current publication preferences and rendering metadata. Project copy above
// is restored from 2202306, the parent of the first commit on 2026-10-25.
window.portfolioSettings = { projectLinks: true, contentBaseline: "2202306" };
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
