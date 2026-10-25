# Software Portfolio

세 프로젝트의 개발 작업공간과 포트폴리오 소개 페이지입니다.

| 프로젝트 | 코드 저장소 | 주력 코드 |
|---|---|---|
| 사업·업무 관리 | [portfolioSPR](https://github.com/youns1998/portfolioSPR) | Spring 요청·업무 규칙·DB |
| 시설 점검 GIS | [portfolioGIS](https://github.com/youns1998/portfolioGIS) | Python 공간 분석·지도·PostGIS |
| CAD Productivity Palette | [cad-productivity-palette](https://github.com/youns1998/cad-productivity-palette) | C# 점검 규칙·AutoCAD·WPF |

## 코드 작업공간

아래처럼 네 저장소를 같은 상위 폴더에 둔 뒤 [SoftwarePortfolio.code-workspace](SoftwarePortfolio.code-workspace)를 VS Code에서 엽니다. 각 저장소의 Git 이력은 독립적으로 유지됩니다.

```text
Projects/
  portfolioSW/                  # 작업공간·소개 페이지
  portfolioSPR/                 # Spring 코드
  portfolioGIS/                 # GIS 코드
  cad-productivity-palette/     # CAD 코드
```

Windows의 `작업 실행` 메뉴에서 `Spring: run/test`, `GIS: run/test`, `CAD: build/test/engine`을 선택합니다. CAD GUI는 빌드 후 AutoCAD에서 `NETLOAD`·`CADTOOLS`로 실행합니다.

Java 21, Python 3.11+, .NET 10 SDK가 필요합니다. CAD 빌드·엔진 검사는 AutoCAD 2027도 필요합니다. 도구 경로는 시스템 PATH 또는 `.dev-tools.example.json`을 복사한 `.dev-tools.json`으로 지정합니다. 로컬 경로 파일은 Git에서 제외합니다.

```powershell
# 터미널에서도 실행 가능
.\scripts\dev.ps1 -Project Spring -Action test
.\scripts\dev.ps1 -Project GIS -Action run
.\scripts\dev.ps1 -Project CAD -Action test
```

## 소개 페이지

- `docs/index.html`: 페이지 구성
- `docs/data/projects.js`: 세 프로젝트 설명·저장소 링크
- `docs/js/portfolio.js`, `docs/css/portfolio.css`: 표시·스타일

페이지는 GitHub 스타일의 3개 프로젝트 목록이며 각 항목은 저장소로 직접 연결합니다. 자기소개와 이력서 내용은 넣지 않습니다. GitHub Pages 배포 경로는 `main /docs`입니다. [화면 디자인 기준](docs/design.md)

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

[공개 페이지](https://youns1998.github.io/portfolioSW/) · [편집 기준](docs/maintenance/IMPLEMENTATION_PROMPT.md)
