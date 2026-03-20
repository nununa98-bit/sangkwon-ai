# 상권 AI 분석 리포트 — Vercel 배포 가이드

## 📁 파일 구조
```
vercel-project/
├── index.html        ← 프론트엔드 앱
├── api/
│   └── proxy.js      ← 공공API 프록시 (CORS 해결)
└── vercel.json       ← Vercel 설정
```

## 🚀 배포 방법 (5분)

### 1단계 — GitHub에 올리기
1. https://github.com 접속 → 로그인
2. 우상단 `+` → `New repository`
3. Repository name: `sangkwon-ai` 입력 → `Create repository`
4. 아래 명령어 실행 (터미널/CMD):
```bash
cd vercel-project 폴더 경로
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/내아이디/sangkwon-ai.git
git push -u origin main
```

### 2단계 — Vercel 배포
1. https://vercel.com 접속 → GitHub으로 로그인
2. `Add New Project` 클릭
3. 방금 만든 `sangkwon-ai` 저장소 선택 → `Import`
4. 설정 건드리지 말고 `Deploy` 클릭
5. 완료! → `https://sangkwon-ai.vercel.app` 주소 생성

### 3단계 — 팀원과 공유
생성된 URL을 팀원에게 전달하면 끝!
`https://sangkwon-ai-xxxxx.vercel.app`

## ✅ 배포 후 동작
- 공공API CORS 완전 해결
- Gemini API 키는 각자 입력 (보안상 코드에 내장 안함 권장)
- 팀원 누구나 브라우저에서 바로 사용 가능
