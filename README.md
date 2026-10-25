# 최윤성 포트폴리오

전산·OA·소프트웨어 프로젝트를 소개하는 정적 사이트입니다. HTML·CSS·JavaScript로 구성하며 빌드와 패키지 설치가 필요 없습니다.

## 화면

- 메인: 프로젝트 3개와 건축 작업 링크. 자기소개·학력·자격·인턴·연락처는 사람인 이력서에 두고 이 페이지에서는 제외합니다.
- 프로젝트: 제목·한 줄 설명·기술·상세 링크. 그림·카드·배지·필터를 사용하지 않습니다.
- 상세: 프로젝트 소개, 개요, 주요 기능. 실제 자료가 등록되면 결과 화면과 확인 범위를 표시합니다.
- 건축 작업은 작은 텍스트 링크로 portfolioCAD에 연결합니다.

소개 문구는 사용자가 요청한 완성 시점의 표현입니다. 실제 구현 상태와 다음 작업은 [NEXT_PROJECTS.md](NEXT_PROJECTS.md)에 보존합니다. 현재 개발 프로젝트의 외부 링크는 `portfolioSettings.projectLinks: false`로 비활성화했습니다.

## 수정

| 파일 | 내용 |
| --- | --- |
| `docs/index.html` | 프로젝트 목록 페이지 |
| `docs/data/projects.js` | 프로젝트 데이터와 소개 문구 |
| `docs/js/portfolio.js` | 목록·상세·내비게이션 |
| `docs/css/portfolio.css` | 스타일과 모바일 배치 |
| `docs/projects/detail.html` | 공용 상세 페이지 |

메인의 한 줄 설명은 `portfolioPresentations`의 `summary`, 기술은 `technologies`로 관리합니다. 상세는 같은 항목의 `problem`, `approach`, `features`를 사용합니다. 기존 ID·상세 주소와 숨겨진 작업 데이터는 유지합니다.

실제 실행 자료는 `features`, `architecture`, `verification`, `screenshots`에 추가합니다. 스크린샷은 `{ file, alt, caption }` 형식이며 파일 경로는 docs 기준입니다. 실제 구현 전인 `planned`에서는 결과 자료를 표시하지 않습니다. 작업 관리용 `steps/evidence`는 공개 화면에 표시하지 않습니다.

## 확인·배포

`docs/index.html`을 직접 열거나 정적 서버로 확인합니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

브라우저 검사는 320~1440px의 배치·링크·내비게이션·기존 상세 호환성을 확인합니다. 스크린샷은 Git에서 제외한 `.codex-preview/`에 저장합니다.

GitHub Pages는 main의 /docs를 사용합니다. 자산 버전은 두 HTML 모두 `20261025-5`입니다.

사이트: https://youns1998.github.io/portfolioSW/
