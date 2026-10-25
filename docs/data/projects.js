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
    context: "개인 개발 프로젝트",
    description: "객체 편집과 반복 명령, 도면 점검을 한곳에 모은 AutoCAD 플러그인입니다.",
    explanation: "36개 Quick Tool과 검토 대상 이동 기능을 제공하며, 점검 근거를 CSV·JSON 보고서로 저장합니다.",
    visual: {
      caption: "AUTOCAD / C# · WPF",
      title: "CAD TOOLS",
      items: ["선택 객체", "Quick Tools", "도면 점검"]
    },
    tools: ["C#", ".NET 10", "WPF", "AutoCAD .NET API"],
    scope: "객체별 작업 · Quick Tools · 도면 점검 · 보고서 출력",
    verification: "독립 검사 22개 통과. AutoCAD 2027 엔진에서 메인 DLL 로딩과 CSV·JSON 출력을 확인했습니다.",
    highlights: [
      "선택 객체의 속성 확인·편집",
      "36개 Quick Tool과 최근·자주 사용한 도구",
      "도면 점검과 대상 객체 선택·이동"
    ],
    url: "https://github.com/youns1998/cad-productivity-palette",
    documents: []
  }
];

// Main web and spatial-data projects. Array names preserve the existing renderer contract.
window.portfolioPlannedProjects = [
  { id: "spring-backend", area: "SPRING / WEB SERVICE", title: "사업·업무 관리",
    description: "사업 현황과 업무 처리 이력을 관리하는 Spring 웹 애플리케이션입니다.",
    explanation: "조회·편집 권한을 분리하고, 상태 변경과 조치 메모, 동시 수정 충돌 처리, CSV 인계를 구현했습니다.",
    tools: ["Java", "Spring Boot", "Spring Security", "JPA"],
    scope: "사업 CRUD · 업무 상태 전이 · 처리 이력 · CSV",
    verification: "Java 테스트 32개와 실제 브라우저 검사 13개 통과.",
    repositoryUrl: "https://github.com/youns1998/portfolioSPR" },
  { id: "gis-spatial", area: "GIS / SPATIAL DATABASE", title: "시설 점검 GIS",
    description: "시설 상태와 점검일, 지원 거점까지의 거리로 점검 우선순위를 분석합니다.",
    explanation: "가상 시설 36개의 판정 근거를 지도에 표시하고, CSV·GeoPackage·QGIS 프로젝트와 PostGIS 분석 SQL을 생성합니다.",
    tools: ["Python", "PostgreSQL", "PostGIS", "QGIS"],
    scope: "공간 분석 · 우선순위 지도 · GIS 파일 생성 · DB 대조",
    verification: "Python 테스트 21개, 브라우저 검사 10개 통과. 실제 PostGIS에서 36개 시설의 판정이 일치했습니다.",
    repositoryUrl: "https://github.com/youns1998/portfolioGIS" }
];

// Keep the current publication preferences and rendering metadata. Project copy above
// started from 2202306; project descriptions now reflect the implemented repositories.
window.portfolioSettings = { projectLinks: true, contentBaseline: "2202306" };
window.portfolioStatuses = {
  planned: { label: "준비 중" },
  "in-progress": { label: "개발 중" },
  completed: { label: "구현 완료" }
};
window.portfolioProjects.forEach((project) => {
  if (project.kind !== "architecture") project.status = "completed";
});
window.portfolioPlannedProjects.forEach((project) => { project.status = "completed"; });
window.portfolioFeaturedProjects = window.portfolioPlannedProjects;
