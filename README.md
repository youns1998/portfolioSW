# 최윤성 · IT Support & Software Portfolio

전산·OA·IT 사용자 지원 직무를 위한 정적 포트폴리오입니다. 이 저장소는 제출용 완성본 구성을 기준으로 소개 페이지와 프로젝트 상세를 관리합니다. 실제 전산 도구는 별도 저장소에서 구현합니다.

## 현재 화면

- 소개: 이력서 기반 지원 방향, 학력, 정보처리기사, 프로필.
- 프로젝트: CAD Productivity Palette(구현 완료), IT 자산·문의 관리(설계 예시), PC 장애 대응 기록(설계 예시).
- 전체/업무 자동화/전산·OA 분야 필터와 각 프로젝트의 상세 페이지.
- 상세: 프로젝트 배경, 구성 방식, 업무 관점, 핵심 구성 3개, 업무 흐름 4단계. 미완성 체크리스트와 빈 자료 영역은 공개 화면에서 제외합니다.
- 기존 Spring Boot·GIS는 데이터와 상세 주소를 보존하고 메인에서는 제외합니다.
- 경험·역량: 전공, 학생 인턴, 개발 활용 기술과 학습 범위.
- 기존 건축 포트폴리오 연결과 연락처.

사이트 소개 문구는 사용자 요청에 따라 프로젝트가 완성된 시점의 표현을 사용합니다. 이 문구 변경은 실제 프로그램 구현이나 검증 완료를 뜻하지 않으며, 실제 진행 상태와 남은 작업은 데이터와 NEXT_PROJECTS.md에서 관리합니다. 공개 화면은 진행 상태 대신 프로젝트 주제를 표시하고, 이미지는 기능 구성 일러스트 또는 샘플 데이터로 구분합니다. `portfolioSettings.projectLinks: false`로 개발 프로젝트의 저장소·README·데모 링크를 모두 비활성화했습니다. 개인 GitHub와 연락처, 건축 포트폴리오 링크는 유지합니다. Revit·파일 정리 도구의 기존 데이터와 상세 주소는 보존하며 메인 비노출 상태를 유지합니다.

## 실행

프레임워크·패키지 설치·빌드는 필요 없습니다. `docs/index.html`을 브라우저에서 직접 열거나 정적 서버로 확인합니다. GitHub Pages 하위 경로에 대응하는 상대 주소를 사용합니다.

```powershell
powershell -ExecutionPolicy Bypass -File scripts/validate.ps1
powershell -ExecutionPolicy Bypass -File scripts/test-browser.ps1
```

브라우저 검사는 설치된 Chrome/Edge에서 320~1440px의 반응형, 필터, 내비게이션, 상세 링크, 완성본 구성, 기존 상세 호환성과 데이터 갱신을 확인합니다. 스크린샷은 Git에서 제외한 `.codex-preview/`에 저장합니다. 외부 저장소의 프로그램 동작이나 공개 사이트 배포 여부는 이 검사로 확인하지 않습니다.

## 파일

| 파일 | 역할 |
| --- | --- |
| `docs/index.html` | 소개·경험·역량·연락처 |
| `docs/data/projects.js` | 기존 작업, 학습 계획, 신규 OA 예시와 상세 콘텐츠 |
| `docs/js/portfolio.js` | 프로젝트·상세 렌더링과 필터·내비게이션 |
| `docs/css/portfolio.css` | 반응형 스타일과 기존 문서·영상 스타일 |
| `docs/projects/detail.html` | 공용 상세 페이지 |
| `NEXT_PROJECTS.md` | 새 저장소에서 구현할 명세와 완료 기준 |
| `IMPLEMENTATION_PROMPT.md` | 다음 구현 작업에 붙여 넣을 프롬프트 |

## 실제 결과를 채울 때

1. [다음 구현 안내](NEXT_PROJECTS.md)에 따라 별도 저장소에서 작업합니다.
2. 실제 실행 화면·README·테스트 결과를 확보합니다.
3. `docs/data/projects.js`에서 해당 프로젝트의 `status`를 `in-progress` 또는 검증 후 `completed`로 변경합니다.
4. 실제 기술에 맞춰 `tools`, `description`, `scope`, `caseStudy`를 수정하고 존재하는 `repositoryUrl`, `demoUrl`만 추가합니다.
5. `features`, `architecture`, `verification`, `screenshots`에 실제 자료를 넣습니다. 준비 중(`planned`)에서는 결과·데모가 숨겨집니다.
6. `portfolioPresentations`의 프로젝트 배경·접근·핵심 구성·업무 흐름을 실제 결과에 맞춰 갱신합니다. `caseStudy.steps/evidence`는 작업 관리용 데이터이며 공개 페이지에서는 렌더링하지 않습니다.
7. 새 프로젝트를 추가할 때는 `portfolioSupportProjects`에 항목을 추가하고 `portfolioPresentations`에 같은 ID의 소개·분야·핵심 구성·업무 흐름을 등록합니다. 렌더러 변경 없이 메인과 상세에 반영됩니다.

스크린샷 형식은 `{ file: "images/projects/실제파일.png", alt: "화면 설명", caption: "실행 환경과 확인 내용" }`이며 경로는 `docs/` 기준입니다. 화면 일러스트는 실제 결과를 추가한 후에도 구성 예시로 표시됩니다. 실제 결과는 별도의 ‘실제 결과 화면’ 영역에 표시됩니다.

## 배포

기존 GitHub Pages 주소: https://youns1998.github.io/portfolioSW/

기존 배포 설정은 `main`의 `/docs`입니다. 사용자 요청에 따라 변경 사항을 main에 커밋하고 origin으로 푸시합니다. 자산 버전은 두 HTML 모두 `20261025-3`입니다.
