# AX 시뮬레이터 Vercel 배포본

## 포함 파일
- `index.html` : 프론트엔드 메인 페이지
- `api/messages.js` : Anthropic API 프록시 엔드포인트
- `vercel.json` : Vercel 설정

## 배포 방법
1. 이 폴더를 GitHub 저장소에 업로드합니다.
2. Vercel에서 해당 저장소를 Import 합니다.
3. Vercel 프로젝트 Settings → Environment Variables 에서 아래 값을 추가합니다.
   - Key: `ANTHROPIC_API_KEY`
   - Value: 본인 Anthropic API 키
4. Redeploy 합니다.

## 동작 방식
- 브라우저는 `/api/messages` 로만 요청합니다.
- 실제 Anthropic API 호출은 서버리스 함수(`api/messages.js`)가 수행합니다.
- 따라서 브라우저에 API 키를 입력하지 않아도 됩니다.

## 로컬 실행
정적 파일만 열지 말고 간단한 서버로 실행하세요.
예시:
```bash
python -m http.server 8000
```
그 후 `http://localhost:8000` 으로 접속하세요.

## 주의
- `ANTHROPIC_API_KEY` 는 절대 `index.html`에 직접 넣지 마세요.
- 배포 후 AI 기능이 안 되면 Vercel 환경변수가 제대로 들어갔는지 먼저 확인하세요.
