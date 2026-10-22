# 최윤성 · Software Portfolio

Spring CRUD와 GIS 공간 데이터 작업을 주력으로 준비하는 소프트웨어 포트폴리오입니다. [portfolioCAD](https://github.com/youns1998/portfolioCAD)의 디자인을 이어받고, AutoCAD 도면 작성·SketchUp 모델링과 시각화 경험을 보조 자료로 함께 소개합니다.

주력 프로젝트의 노출 순서는 **Spring CRUD → GIS 공간 데이터**입니다. 각각 독립된 저장소로 구성하며, GIS 저장소는 QGIS 도구 활용과 PostgreSQL·PostGIS 데이터베이스 작업을 함께 다룹니다. 현재 준비 중으로 표시하고, 완료된 결과물로 소개하지 않습니다. [주력 프로젝트 준비 기준](NEXT_PROJECTS.md)을 참고하세요.

주력 카드의 저장소 링크는 Spring CRUD의 [portfolioSPR](https://github.com/youns1998/portfolioSPR), GIS의 [portfolioGIS](https://github.com/youns1998/portfolioGIS)로 연결합니다.

기존 CAD Productivity Palette, Revit BIM Inspector, Drawing File Organizer는 주력 프로젝트 아래의 작은 보조 목록으로 소개합니다. 실제 GitHub README 링크와 확인 범위를 유지하며, 상세 페이지에서 구현 내용을 확인할 수 있습니다.

시각화 작업 두 개는 사용 도구와 작업 경험을 중심으로 보조 목록에 소개합니다. 전체 도면과 렌더링은 [건축 포트폴리오](https://youns1998.github.io/portfolioCAD/)의 상세로 연결하고, 별도의 큰 건축 포트폴리오 안내 영역은 두지 않습니다. 건축 PDF는 이 저장소에 복제하지 않습니다.

## 실행 및 검증

`docs/index.html`을 열거나, 정적 서버의 루트를 `docs/`로 지정합니다. 프레임워크·패키지 설치·빌드가 필요하지 않습니다.

VS Code에서 이 폴더를 열고 `docs/index.html`을 Live Server의 Open with Live Server / Go Live로 확인합니다. 저장소 루트가 서버 루트여도 상대 경로를 사용하므로 `/docs/index.html`에서 정상 동작합니다. 공개 사이트는 [GitHub Pages](https://youns1998.github.io/portfolioSW/)에서 확인할 수 있습니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

브라우저 검증은 설치된 Chrome 또는 Edge를 사용해 320~1440px 화면, 준비 중 상태, 프로젝트 링크, 이미지, 메뉴와 개발 상세를 확인합니다. `.codex-preview/`에 생성하는 스크린샷과 브라우저 프로필은 Git에서 제외합니다. 공개 사이트에서도 `-BaseUrl https://youns1998.github.io/portfolioSW/`로 검사할 수 있습니다.

## 콘텐츠 및 배포

- `docs/index.html`: 개발 중심 소개와 노출 순서.
- `docs/data/projects.js`: 기존 작업 `portfolioProjects`와 준비 중인 주력 작업 `portfolioPlannedProjects`를 분리합니다. 새 저장소 주소는 각 주력 작업의 `repositoryUrl`에 넣으면 카드에 링크가 표시됩니다.
- `docs/css/portfolio.css`, `docs/js/portfolio.js`: CAD와 공유한 시각 언어와 동작.
- `docs/projects/detail.html`: 실제 개발 작업의 상세 화면.
- [PORTFOLIO_SPLIT.md](PORTFOLIO_SPLIT.md): 두 사이트의 역할과 유지 관리 기준.

GitHub Pages 설정은 `Deploy from a branch` → `main` → `/docs`입니다. 공개 주소는 `https://youns1998.github.io/portfolioSW/`이며 수정 사항은 `main`에 푸시한 뒤 Pages 배포가 완료되면 반영됩니다.

프로젝트의 `verification`은 기존 저장소에서 확인된 범위를 기록합니다. 샘플 검사·API 빌드와 실제 AutoCAD/Revit 내부 실행을 구분하며, 이미지의 SVG는 설명용 그래픽입니다.
