# mathplat-fe 프론트엔드 로드맵

## 완료된 작업

### Phase 1: 프로젝트 기반 (완료)
- [x] Next.js 14 App Router + TypeScript 프로젝트 생성
- [x] shadcn/ui 초기화 (10개 컴포넌트)
- [x] FSD 2.0 디렉토리 구조 설정
- [x] Shared layer: Axios 클라이언트 (interceptors, 401 자동 리프레시), API 타입, TanStack Query 설정
- [x] Auth feature: Zustand persist store, dev login/signup API, JWT 유틸, LoginForm, SignupForm, GoogleLoginButton, AuthGuard
- [x] User entity: 타입 정의, useProfile/useMyStats 쿼리, UserAvatar

### Phase 2: 레이아웃 + 대시보드 (완료)
- [x] Header 위젯 (로고, 유저 드롭다운 메뉴)
- [x] Sidebar 위젯 (5개 네비게이션, 모바일 Sheet)
- [x] Dashboard 페이지 (통계 카드 4개: XP, 레벨, 스트릭, 풀이 수)
- [x] 라우팅: /, /login, /signup, /callback, /dashboard, 404
- [x] 백엔드 OAuth 콜백 → 프론트엔드 리디렉트 수정

---

## 남은 작업

### Phase 3: 교육과정 (Curriculum) 페이지
**우선순위: 높음** | **예상 범위: 10~15개 파일**

- [ ] `entities/curriculum/` — Curriculum, Chapter, Section, Topic, LearningObjective 타입 정의
- [ ] `entities/curriculum/api/` — TanStack Query 훅 (CRUD 17개 엔드포인트 커버)
- [ ] `features/curriculum/` — 교육과정 트리 네비게이션, 검색/필터
- [ ] `widgets/curriculum-tree/` — 5계층 트리 뷰 (접기/펼치기)
- [ ] `views/curriculum/` — 교육과정 목록, 상세 페이지
- [ ] `app/(main)/curriculum/` — 라우트 설정 (목록, [id] 상세)
- [ ] shadcn 추가: `accordion`, `breadcrumb`, `collapsible`

### Phase 4: 문제풀이 (Problems) 페이지
**우선순위: 높음** | **예상 범위: 15~20개 파일**

- [ ] `entities/problem/` — Problem 타입 (5가지 문제 유형: 객관식, 주관식, OX, 빈칸, 서술형)
- [ ] `entities/problem/api/` — 문제 목록 (필터/페이지네이션), 문제 상세
- [ ] `features/problem-solve/` — 문제 풀이 UI (유형별 입력 컴포넌트)
- [ ] `features/problem-filter/` — 난이도, 유형, 교육과정 필터
- [ ] `widgets/problem-list/` — 문제 카드 목록, 페이지네이션
- [ ] `widgets/problem-solver/` — 문제 풀이 화면 (문제 + 입력 + 제출)
- [ ] `views/problems/` — 문제 목록, 문제 풀이 페이지
- [ ] `app/(main)/problems/` — 라우트 (목록, [id] 풀이)
- [ ] shadcn 추가: `radio-group`, `checkbox`, `textarea`, `pagination`, `select`

### Phase 5: 답안 제출 & 채점 (Attempt)
**우선순위: 높음** | **예상 범위: 8~12개 파일**

- [ ] `entities/attempt/` — UserProblemAttempt 타입
- [ ] `features/attempt/` — 답안 제출 API, 채점 결과 표시
- [ ] `features/attempt/api/` — submitAnswer, getAttemptHistory
- [ ] `widgets/attempt-result/` — 정답/오답 피드백 UI (애니메이션)
- [ ] `widgets/attempt-history/` — 시도 이력 테이블
- [ ] 실시간 통계 갱신 (제출 후 대시보드 stats 자동 갱신)

### Phase 6: 학습 진도 (Progress) 페이지
**우선순위: 중간** | **예상 범위: 8~10개 파일**

- [ ] `entities/progress/` — UserProgress 타입, 숙달도 레벨
- [ ] `entities/progress/api/` — 진도 조회 쿼리
- [ ] `widgets/progress-chart/` — 토픽별 진도 차트 (바 차트 또는 히트맵)
- [ ] `widgets/mastery-badge/` — 숙달도 뱃지 (beginner → master)
- [ ] `views/progress/` — 학습 진도 대시보드
- [ ] `app/(main)/progress/` — 라우트
- [ ] shadcn 추가: `progress` (프로그레스 바)
- [ ] 차트 라이브러리 도입 검토: `recharts` or `@nivo`

### Phase 7: 업적 (Achievements) 페이지
**우선순위: 중간** | **예상 범위: 6~8개 파일**

- [ ] `entities/achievement/` — Achievement, UserAchievement 타입
- [ ] `entities/achievement/api/` — 전체 업적, 내 업적 쿼리
- [ ] `widgets/achievement-grid/` — 업적 그리드 (달성/미달성)
- [ ] `widgets/level-progress/` — 레벨 진행 바, XP 표시
- [ ] `views/achievements/` — 업적 페이지
- [ ] `app/(main)/achievements/` — 라우트

### Phase 8: 실시간 기능 (Socket.io)
**우선순위: 낮음** | **예상 범위: 5~8개 파일**

- [ ] `shared/api/socket.ts` — Socket.io 클라이언트 설정
- [ ] `features/realtime/` — 실시간 알림, 실시간 통계 갱신
- [ ] 문제 풀이 중 실시간 피드백
- [ ] 접속 사용자 표시 (선택)

### Phase 9: UX 개선 & 테마
**우선순위: 낮음**

- [ ] 다크 모드 지원 (next-themes 이미 설치됨)
- [ ] 로딩 스켈레톤 개선
- [ ] 에러 바운더리 (error.tsx)
- [ ] 토스트 알림 통합 (sonner)
- [ ] 페이지 전환 애니메이션
- [ ] 접근성(a11y) 개선
- [ ] SEO 메타데이터

### Phase 10: 테스트 & 배포
**우선순위: 중간 (Phase 3~5 이후)**

- [ ] Jest + React Testing Library 설정
- [ ] 주요 컴포넌트 단위 테스트
- [ ] Playwright E2E 테스트 (로그인 → 대시보드 → 문제풀이 플로우)
- [ ] CI/CD 파이프라인 (GitHub Actions)
- [ ] 프로덕션 빌드 최적화
- [ ] Vercel/Docker 배포 설정

---

## 추천 구현 순서

```
Phase 3 (교육과정) → Phase 4 (문제풀이) → Phase 5 (답안 채점)
         ↓                                        ↓
Phase 6 (학습 진도) ←────────────────────────────┘
         ↓
Phase 7 (업적) → Phase 8 (실시간) → Phase 9 (UX) → Phase 10 (테스트)
```

Phase 3~5가 핵심 학습 루프(교육과정 탐색 → 문제 풀기 → 채점)를 완성하므로 최우선.

---

## 백엔드 API 매핑 참고

| 프론트엔드 Phase | 백엔드 모듈 | 주요 엔드포인트 |
|-----------------|------------|----------------|
| Phase 2 (완료) | Auth, User, Achievement | /auth/dev/*, /users/me, /stats/me |
| Phase 3 | Curriculum | /curriculums, /chapters, /sections, /topics, /learning-objectives (17개) |
| Phase 4 | Problem | /problems (CRUD, 필터, 통계) |
| Phase 5 | Attempt | /attempts (제출, 이력, 통계) |
| Phase 6 | Progress | /progress (토픽별 진도) |
| Phase 7 | Achievement | /achievements, /achievements/me |
| Phase 8 | Socket | WebSocket events |
