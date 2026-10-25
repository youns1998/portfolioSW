# 최윤성 포트폴리오

프로젝트와 작업 설명만 표시하는 정적 사이트입니다. 간결한 현재 디자인에, 2026-10-25 첫 커밋(03c6705) 직전 커밋 **2202306**의 프로젝트 내용을 적용합니다.

## 콘텐츠 기준

프로젝트 내용은 2202306을 바탕으로 유지하며, 현재는 Spring CRUD·GIS 공간 데이터·CAD Productivity Palette 세 개만 표시합니다. 각 항목에는 짧은 소개, 부연 설명, 사용 기술을 표시합니다.

표시 순서:

1. Spring CRUD
2. GIS 공간 데이터
3. CAD Productivity Palette

새로 추가했던 IT 자산·문의 관리와 PC 장애 대응 기록은 제거했습니다. 자기소개·학력·자격·인턴·연락처는 사람인 이력서에 두며, 이 페이지에 다시 넣지 않습니다.

각 프로젝트 항목 전체를 클릭하면 GitHub 저장소를 새 탭으로 바로 엽니다. portfolioSPR, portfolioGIS, cad-productivity-palette에 연결하며 `portfolioSettings.projectLinks: true`를 사용합니다. Organizer·만화카페·단독주택 도면·Revit BIM은 SW 목록과 상세에서 제외합니다. 프로젝트 진행 상태와 기존 확인 범위도 구분해 유지합니다.

## 수정

- `docs/index.html`: 프로젝트 목록 구성.
- `docs/data/projects.js`: 복원한 원본 프로젝트 내용과 렌더링 메타데이터.
- `docs/js/portfolio.js`: 목록·공용 상세·문서·영상 렌더링.
- `docs/css/portfolio.css`: 간결한 스타일과 모바일 배치.

메인에서는 Spring·GIS 다음에 기존 개발 도구를 표시합니다. 건축·시각화·BIM 작업은 표시하지 않습니다. 그림·카드 장식·배지·필터는 사용하지 않습니다. 제외한 작업의 기존 상세 주소에는 목록 복귀 안내를 표시합니다. 공용 PDF·영상 코드는 보존합니다.

## 실행·배포

빌드와 패키지 설치 없이 `docs/index.html`을 직접 열거나 정적 서버로 확인합니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

브라우저 검사는 320~1440px의 내용·순서·기술·링크·상세·가로 넘침을 확인합니다. 검사용 스크린샷은 `.codex-preview/`에 저장하며 Git에서 제외합니다.

GitHub Pages는 main의 /docs를 사용합니다. 자산 버전은 두 HTML 모두 `20261025-8`입니다.

사이트: https://youns1998.github.io/portfolioSW/
