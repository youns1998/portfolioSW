# 웹 화면 디자인

소개 페이지와 Spring·GIS 웹 화면은 GitHub의 저장소·Issues 화면과 [Primer](https://primer.style/product/primitives/color/)를 참고합니다. 외부 UI 라이브러리나 GitHub 로고는 사용하지 않습니다.

| 요소 | 기준 |
|---|---|
| 본문 | 흰색 `#ffffff`, 기본 글자 `#1f2328` |
| 헤더·표 제목 | 연회색 `#f6f8fa` |
| 구분선 | 회색 `#d1d9e0`, 1px |
| 링크·주요 동작 | 파란색 `#0969da` |
| 선택한 메뉴 | 아래쪽 주황색 선 `#fd8c73` |
| 배치 | 최대 1216px, 작은 화면은 세로 배치 |
| 폰트 | 운영체제 기본 UI 글꼴, 외부 폰트 요청 없음 |

소개 페이지는 세 프로젝트의 저장소 목록입니다. Spring은 목록·입력 폼·업무 이력을, GIS는 지도·필터·판정 근거를 표시합니다. GIS 색상은 우선순위를 구분하며 일반 시설은 파랑, 검토는 주황, 우선 점검은 빨강입니다.

수정 파일:

- 소개: `docs/css/portfolio.css`, `docs/index.html`, `docs/projects/detail.html`
- Spring: `src/main/resources/static/workspace-assets/work.css`, `static/community-assets/app.css`, `templates/workspace/`
- GIS: `src/gis_portfolio/static/report.css`, `templates/report.html`, `report.py`

Spring·GIS 경로는 각 저장소 기준입니다. CAD 팔레트는 이번 웹 디자인 적용 범위에 포함하지 않습니다.
