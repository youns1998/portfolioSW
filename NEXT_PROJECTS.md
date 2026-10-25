# 다음 저장소에서 구현할 내용

2026-10-25 기준. 공개 페이지는 완성본 구성을 사용하며 이 문서의 할 일과 미등록 자료는 공개 화면에 표시하지 않습니다. 이번 portfolioSW의 역할은 완성된 소개 화면과 실제 포트폴리오를 채워 넣을 틀입니다. 신규 OA 프로그램은 아직 구현하지 않았습니다. 아래 저장소 이름은 제안이며 생성된 저장소 주소가 아닙니다.

## 권장 순서

1. 기존 CAD 도구의 실제 실행 화면과 문제 해결 사례를 보완합니다.
2. `it-support-desk`를 구현해 자산 관리와 사용자 문의 처리 흐름을 보여 줍니다.
3. `pc-troubleshooting-lab`에서 실제 개인 실습 2건과 재현 가능한 기록을 만듭니다.

프로젝트 개수보다 직접 실행할 수 있는 결과와 설명이 중요합니다. Spring·GIS는 추가 개발 학습 계획으로 유지해도 됩니다.

## 1. CAD Productivity Palette — 기존 자료 보완

상세: `docs/projects/detail.html?project=cad-productivity-palette`

기존 저장소와 완료 상태를 유지합니다. 실제 AutoCAD 실행 화면, 설치·로드 방법, 사용 중 발견한 문제 한 가지와 수정 내용을 원본 README에 추가하세요. 이번 페이지의 녹색 도면 그림은 기능 구성 일러스트입니다. 실제 캡처로 취급하지 않습니다. 측정하지 않은 생산성 수치는 쓰지 않습니다.

## 2. IT 자산·문의 관리 — 첫 번째 구현 권장

상세: `docs/projects/detail.html?project=it-support-desk`

제안 저장소: `it-support-desk`. 목표는 가상 사무실의 장비와 문의를 연결하는 로컬 실행용 개인 프로젝트입니다. 현재 화면의 PC-DEMO 번호와 문의는 모두 가상의 예시입니다.

### 최소 구현 범위

| 대상 | 필드 |
| --- | --- |
| 자산 | id, 고유 자산 번호, 장비명, 종류, 운영체제, 설치 소프트웨어 메모 |
| 문의 | id, 연결 자산 id, 제목, 증상, 상태, 생성·수정 시각 |
| 처리 이력 | id, 문의 id, 이전·다음 상태, 처리 메모, 기록 시각 |

상태는 `접수 → 확인 중 → 처리 완료`로 둡니다. 허용되지 않은 상태 변경은 거절하고, 존재하지 않는 자산을 연결하지 못하게 합니다. 문의가 연결된 자산은 삭제를 거절하는 정책으로 시작합니다. 자산 번호 중복·필수값 누락·없는 자산을 검증합니다.

| 화면 | 완료할 동작 |
| --- | --- |
| 자산 목록 | 등록, 수정, 검색, 상세, 삭제 제한 안내 |
| 문의 목록 | 접수, 상태 필터, 상세 연결 |
| 문의 상세 | 연결 장비, 상태 변경, 처리 메모와 이력 조회 |
| 내보내기 | 자산·문의 CSV 다운로드, 한글과 쉼표 처리 |

기술 제안: Java / Spring Boot / SQLite / HTML·CSS. SQLite 연동 라이브러리 등 실제 선택에 따라 변경할 수 있으며, 구현 결과에 맞춰 포트폴리오 기술 목록을 수정합니다. 업무용 인증·사내 배포까지 늘리지 않고 가상 데이터와 로컬 실행에 집중합니다.

API 초안:

```text
GET/POST       /api/assets
GET/PATCH/DELETE /api/assets/{id}
GET/POST       /api/tickets
GET            /api/tickets/{id}
PATCH          /api/tickets/{id}/status
GET            /api/tickets/{id}/history
GET            /api/exports/assets.csv
GET            /api/exports/tickets.csv
```

### 완료 기준

- 새 환경에서 README만 보고 실행할 수 있습니다. 실제 요구 JDK 버전과 실행 명령을 적습니다.
- 가상 자산 5개와 문의 5개 이상의 샘플 데이터를 제공합니다.
- `자산 등록 → 문의 접수 → 확인 중 → 메모 작성 → 처리 완료 → 이력 확인` 흐름이 실제로 동작합니다.
- 중복 자산 번호, 필수값 누락, 없는 자산 연결, 잘못된 상태 변경, CSV 한글·쉼표를 검증하고 결과를 남깁니다.
- 목록·상세·처리 이력의 실제 스크린샷, 데이터 구조, 오류 처리 사례 한 가지를 README에 남깁니다.
- 실제 회사 사용이나 처리 시간 개선을 확인하지 않았다면 그런 성과를 쓰지 않습니다.

## 3. PC 장애 대응 기록 — 실습과 문서 중심

상세: `docs/projects/detail.html?project=pc-troubleshooting-lab`

제안 저장소: `pc-troubleshooting-lab`. 개인 PC 또는 복구 가능한 가상 환경에서 실제로 확인한 것만 기록합니다.

```text
README.md
cases/
  01-network.md
  02-print-or-application.md
scripts/
  Collect-SystemInfo.ps1
examples/
  sanitized-report.txt
images/
  실제_실습_화면.png
```

각 사례의 공통 서식:

```markdown
# 사례 제목
## 환경과 증상
## 재현 조건과 복구 방법
## 확인한 순서와 판단 근거
## 적용한 조치
## 조치 전후 결과
## 해결 여부와 남은 한계
## 재발 방지 또는 사용자 안내
```

권장 사례는 네트워크 연결 문제 1건, 인쇄 대기열 또는 프로그램 실행 문제 1건입니다. 실제로 재현하지 않은 증상이나 추측한 원인을 해결 사례로 쓰지 않습니다. 화면에 표시한 `Get-NetIPConfiguration`은 점검 명령의 예시이며 실행 결과가 아닙니다.

정보 수집 스크립트는 읽기 전용으로 운영체제·메모리·디스크 등 필요한 항목만 수집합니다. 공개 예제에서 사용자명·호스트명·IP·MAC·시리얼 등 식별 정보를 제외하거나 치환합니다. 자동 복구·레지스트리 변경 기능은 최소 범위에 포함하지 않습니다.

완료 기준: 다른 사람이 문서의 확인 순서를 따라갈 수 있는 실제 사례 2건, 조치 전후 근거, 수집 스크립트와 익명화된 출력 예시, 실행·테스트 안내를 갖춥니다.

## portfolioSW에 결과 연결하기

`docs/data/projects.js`의 `portfolioSupportProjects` 항목을 수정합니다.

| 필드 | 실제 구현 후 넣을 내용 |
| --- | --- |
| `status` | 시작 시 `in-progress`, 최소 범위 구현·확인 후 `completed` |
| `repositoryUrl` | 실제 생성한 저장소 URL |
| `demoUrl` | 공개 실행 환경이 실제 있을 때만 입력 |
| `tools`, `scope`, `description` | 실제 사용 기술·구현 범위 |
| `caseStudy.problem/approach/goal` | 실제 경험과 결과, 남은 제한 |
| `features` | 확인한 기능 목록 |
| `architecture` | 실제 데이터 흐름·구성 설명 |
| `verification` | 수행한 테스트와 확인하지 못한 부분 |
| `screenshots` | `{ file, alt, caption }` 배열, 경로는 docs 기준 |
| `caseStudy.steps` | 아직 끝나지 않은 항목만 유지, 모두 완료 시 `[]` |
| `caseStudy.evidence` | 아직 등록하지 않은 자료만 유지, 모두 등록 시 `[]` |

`planned`에서는 결과·데모를 숨깁니다. 빈 자료에 가짜 결과나 테스트 통과 문구를 넣지 않습니다. `caseStudy.mockup`은 구성 예시 표시용이며 실제 스크린샷은 별도 결과 영역에 표시됩니다. 완성본 소개 문구와 핵심 구성·업무 흐름은 `portfolioPresentations`에서 관리합니다. `steps/evidence`는 작업 관리용으로 보존하며 공개 상세에 표시하지 않습니다.

기존 Spring·GIS 프로젝트, Revit·파일 정리 도구와 건축 링크의 ID·저장소·상태 기록은 보존합니다. 별도 저장소에서 이번 사이트를 만들 필요는 없으며 실제 도구나 실습 기록을 구현하면 됩니다.
