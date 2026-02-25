#!/usr/bin/env bash
# Stop 훅: Claude가 작업을 완료했을 때 Slack으로 알림
# 중요: stop_hook_active=true 일 때 반드시 exit 0으로 종료 (무한루프 방지)

# ──────────────────────────────────────────
# 1. 환경변수 로드
# ──────────────────────────────────────────
ENV_FILE="${CLAUDE_PROJECT_DIR}/.env.local"

if [ -f "$ENV_FILE" ]; then
  while IFS='=' read -r key value; do
    [[ "$key" =~ ^[[:space:]]*# ]] && continue
    [[ -z "$key" ]] && continue
    key="${key// /}"
    value="${value%\"}"
    value="${value#\"}"
    value="${value%\'}"
    value="${value#\'}"
    export "$key=$value"
  done < "$ENV_FILE"
fi

# ──────────────────────────────────────────
# 2. SLACK_WEBHOOK_URL 확인
# ──────────────────────────────────────────
if [ -z "${SLACK_WEBHOOK_URL:-}" ] || [[ "$SLACK_WEBHOOK_URL" == *"YOUR/WEBHOOK"* ]]; then
  exit 0
fi

# ──────────────────────────────────────────
# 3. stdin에서 JSON 파싱
# ──────────────────────────────────────────
INPUT=$(cat)

if command -v jq &>/dev/null; then
  STOP_HOOK_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
  LAST_MESSAGE=$(echo "$INPUT" | jq -r '.last_assistant_message // "작업이 완료되었습니다"')
  SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
else
  STOP_HOOK_ACTIVE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(str(d.get('stop_hook_active',False)).lower())" 2>/dev/null || echo "false")
  LAST_MESSAGE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('last_assistant_message','작업이 완료되었습니다'))" 2>/dev/null || echo "작업이 완료되었습니다")
  SESSION_ID=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('session_id',''))" 2>/dev/null || echo "")
fi

# ──────────────────────────────────────────
# 4. 무한루프 방지: stop_hook_active=true 이면 즉시 종료
# ──────────────────────────────────────────
if [ "$STOP_HOOK_ACTIVE" = "true" ]; then
  exit 0
fi

# ──────────────────────────────────────────
# 5. 메시지 요약 (300자 초과 시 자름)
# ──────────────────────────────────────────
MAX_LENGTH=300
if [ ${#LAST_MESSAGE} -gt $MAX_LENGTH ]; then
  LAST_MESSAGE="${LAST_MESSAGE:0:$MAX_LENGTH}..."
fi

PROJECT_NAME=$(basename "${CLAUDE_PROJECT_DIR:-$(pwd)}")
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# ──────────────────────────────────────────
# 6. Slack Block Kit 페이로드 구성
# ──────────────────────────────────────────
PAYLOAD=$(printf '{
  "attachments": [
    {
      "color": "#2ECC71",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": ":white_check_mark: Claude 작업 완료",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*프로젝트*\n%s"
            },
            {
              "type": "mrkdwn",
              "text": "*완료 시각*\n%s"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*마지막 응답 요약*\n%s"
          }
        },
        {
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": "세션 ID: %s"
            }
          ]
        }
      ]
    }
  ]
}' "$PROJECT_NAME" "$TIMESTAMP" "$LAST_MESSAGE" "${SESSION_ID:-N/A}")

# ──────────────────────────────────────────
# 7. Slack 전송 (에러 무시, 항상 exit 0)
# ──────────────────────────────────────────
curl -s -o /dev/null \
  -X POST \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD" \
  "$SLACK_WEBHOOK_URL" || true

exit 0
