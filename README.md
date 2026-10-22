# 최윤성 · Software Portfolio

C#·WPF 도구와 Python 자동화 작업을 소개하는 소프트웨어 중심 포트폴리오입니다. [portfolioCAD](https://github.com/youns1998/portfolioCAD)의 디자인을 이어받고, 콘텐츠의 중심을 개발 약 80%·건축 배경 약 20%로 나눴습니다.

현재 구현한 프로젝트는 CAD Productivity Palette, Revit BIM Inspector, Drawing File Organizer 세 가지입니다. 각 카드에서 기능과 확인 범위를 읽고 실제 GitHub README로 이동할 수 있습니다. 상세 페이지에는 구현 범위와 확인 결과도 유지합니다.

Spring 백엔드와 GIS 공간 데이터 작업은 **기획·구현 전**입니다. 결과물 수에 포함하지 않고, 링크 없는 준비 중 카드로 자리를 남겼습니다. 실제 개발 범위와 데이터는 아직 결정하지 않았습니다. [다음 작업 기준](NEXT_PROJECTS.md)을 참고하세요.

건축 작업 두 개는 보조 목록으로 소개하고 [건축 포트폴리오](https://youns1998.github.io/portfolioCAD/)의 상세로 연결합니다. 건축 PDF는 이 저장소에 복제하지 않습니다.

## 실행 및 검증

`docs/index.html`을 열거나, 정적 서버의 루트를 `docs/`로 지정합니다. 프레임워크·패키지 설치·빌드가 필요하지 않습니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

브라우저 검증은 설치된 Chrome 또는 Edge를 사용해 320~1440px 화면, 준비 중 상태, 프로젝트 링크, 이미지, 메뉴와 개발 상세를 확인합니다. `.codex-preview/`에 생성하는 스크린샷과 브라우저 프로필은 Git에서 제외합니다. 공개 사이트에서도 `-BaseUrl https://youns1998.github.io/portfolioSW/`로 검사할 수 있습니다.

## 콘텐츠 및 배포

- `docs/index.html`: 개발 중심 소개와 노출 순서.
- `docs/data/projects.js`: 실제 작업 `portfolioProjects`와 예정 작업 `portfolioPlannedProjects`를 분리합니다.
- `docs/css/portfolio.css`, `docs/js/portfolio.js`: CAD와 공유한 시각 언어와 동작.
- `docs/projects/detail.html`: 실제 개발 작업의 상세 화면.
- [PORTFOLIO_SPLIT.md](PORTFOLIO_SPLIT.md): 두 사이트의 역할과 유지 관리 기준.

GitHub Pages 설정은 `Deploy from a branch` → `main` → `/docs`입니다. 공개 주소는 `https://youns1998.github.io/portfolioSW/`이며 Pages 배포가 성공한 후 사용할 수 있습니다.

프로젝트의 `verification`은 기존 저장소에서 확인된 범위를 기록합니다. 샘플 검사·API 빌드와 실제 AutoCAD/Revit 내부 실행을 구분하며, 이미지의 SVG는 설명용 그래픽입니다.
