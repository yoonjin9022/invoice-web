#!/usr/bin/env bash
# Notification 훅: Claude가 권한을 요청하거나 알림을 보낼 때 Slack으로 전달

# ──────────────────────────────────────────
# 1. 환경변수 로드
# ──────────────────────────────────────────
ENV_FILE="${CLAUDE_PROJECT_DIR}/.env.local"

if [ -f "$ENV_FILE" ]; then
  # source 대신 while read로 안전하게 파싱 (코드 실행 방지)
  while IFS='=' read -r key value; do
    # 주석(#)과 빈 줄 건너뜀
    [[ "$key" =~ ^[[:space:]]*# ]] && continue
    [[ -z "$key" ]] && continue
    # 앞뒤 공백 제거
    key="${key// /}"
    # 값의 앞뒤 따옴표 제거
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
  HOOK_EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // "Notification"')
  MESSAGE=$(echo "$INPUT" | jq -r '.message // "알림이 도착했습니다"')
  TITLE=$(echo "$INPUT" | jq -r '.title // "Claude 알림"')
  NOTIF_TYPE=$(echo "$INPUT" | jq -r '.notification_type // ""')
  SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // ""')
else
  # python3 fallback
  HOOK_EVENT=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('hook_event_name','Notification'))" 2>/dev/null || echo "Notification")
  MESSAGE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('message','알림이 도착했습니다'))" 2>/dev/null || echo "알림이 도착했습니다")
  TITLE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('title','Claude 알림'))" 2>/dev/null || echo "Claude 알림")
  NOTIF_TYPE=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('notification_type',''))" 2>/dev/null || echo "")
  SESSION_ID=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('session_id',''))" 2>/dev/null || echo "")
fi

# ──────────────────────────────────────────
# 4. Slack 메시지 구성 (모바일 친화적)
# ──────────────────────────────────────────
case "$NOTIF_TYPE" in
  permission_prompt)
    EMOJI=":lock:"
    COLOR="#FF6B35"
    HEADER="Claude가 권한을 요청합니다"
    ;;
  *)
    EMOJI=":bell:"
    COLOR="#36a64f"
    HEADER="Claude 알림"
    ;;
esac

PROJECT_NAME=$(basename "${CLAUDE_PROJECT_DIR:-$(pwd)}")

# Slack Block Kit 페이로드
PAYLOAD=$(printf '{
  "attachments": [
    {
      "color": "%s",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "%s %s",
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
              "text": "*유형*\n%s"
            }
          ]
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*제목*: %s\n*내용*: %s"
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
}' "$COLOR" "$EMOJI" "$HEADER" "$PROJECT_NAME" "${NOTIF_TYPE:-일반 알림}" "$TITLE" "$MESSAGE" "${SESSION_ID:-N/A}")

# ──────────────────────────────────────────
# 5. Slack 전송 (에러 무시, 항상 exit 0)
# ──────────────────────────────────────────
curl -s -o /dev/null \
  -X POST \
  -H 'Content-Type: application/json' \
  -d "$PAYLOAD" \
  "$SLACK_WEBHOOK_URL" || true

exit 0
