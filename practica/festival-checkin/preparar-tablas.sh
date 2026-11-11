#!/usr/bin/env bash
set -euo pipefail

region=${1:-}
team=${2:-}
action=${3:---plan}

if [[ ! "$region" =~ ^[a-z]{2}(-[a-z]+)+-[0-9]+$ || ! "$team" =~ ^equipo-[0-9]{2}$ ]] ||
   [[ "$action" != --plan && "$action" != --apply ]] || (( $# > 3 )); then
  printf 'Uso: bash preparar-tablas.sh REGION equipo-01 [--plan | --apply]\n' >&2
  exit 2
fi

events="$team-events"
registrations="$team-registrations"
printf 'Región %s\n%s · PK eventId (S)\n%s · PK eventId (S), SK userId (S)\n' \
  "$region" "$events" "$registrations"
printf 'Tablas nuevas con capacidad bajo demanda. Dato inicial: evt-001 · Festival de otoño.\n'

if [[ "$action" == --plan ]]; then
  printf 'Vista previa. Usa --apply para crear o comprobar las tablas.\n'
  exit 0
fi

ddb=(aws dynamodb --region "$region" --no-cli-pager)

ensure_table() {
  local name=$1 sort_key=${2:-} output expected
  local attributes=(AttributeName=eventId,AttributeType=S)
  local keys=(AttributeName=eventId,KeyType=HASH)
  expected=$'eventId\tS'
  if [[ -n "$sort_key" ]]; then
    attributes+=("AttributeName=$sort_key,AttributeType=S")
    keys+=("AttributeName=$sort_key,KeyType=RANGE")
    expected+=$'\nuserId\tS'
  fi

  if ! output=$("${ddb[@]}" describe-table --table-name "$name" 2>&1); then
    if [[ "$output" != *ResourceNotFoundException* ]]; then
      printf '%s\n' "$output" >&2
      return 1
    fi
    if ! output=$("${ddb[@]}" create-table --table-name "$name" \
      --attribute-definitions "${attributes[@]}" --key-schema "${keys[@]}" \
      --billing-mode PAY_PER_REQUEST 2>&1); then
      if [[ "$output" != *ResourceInUseException* ]]; then
        printf '%s\n' "$output" >&2
        return 1
      fi
    fi
  fi

  "${ddb[@]}" wait table-exists --table-name "$name"
  output=$("${ddb[@]}" describe-table --table-name "$name" \
    --query "Table.KeySchema[].[KeyType,AttributeName]" --output text)
  local expected_keys=$'HASH\teventId'
  if [[ -n "$sort_key" ]]; then expected_keys+=$'\nRANGE\tuserId'; fi
  if [[ "$output" != "$expected_keys" ]]; then
    printf 'Las claves de %s no coinciden con el modelo. Revisa la tabla en la consola.\n' "$name" >&2
    return 1
  fi
  output=$("${ddb[@]}" describe-table --table-name "$name" \
    --query "sort_by(Table.AttributeDefinitions,&AttributeName)[].[AttributeName,AttributeType]" --output text)
  if [[ "$output" != "$expected" ]]; then
    printf 'Los atributos de clave de %s no coinciden con el modelo.\n' "$name" >&2
    return 1
  fi
  printf '%s · ACTIVE · claves comprobadas\n' "$name"
}

ensure_table "$events"
ensure_table "$registrations" userId

if ! result=$("${ddb[@]}" put-item --table-name "$events" \
  --item '{"eventId":{"S":"evt-001"},"title":{"S":"Festival de otoño"}}' \
  --condition-expression 'attribute_not_exists(eventId)' 2>&1); then
  if [[ "$result" != *ConditionalCheckFailedException* ]]; then
    printf '%s\n' "$result" >&2
    exit 1
  fi
  printf 'evt-001 ya existe. Se conserva el registro.\n'
fi

"${ddb[@]}" get-item --table-name "$events" --consistent-read \
  --key '{"eventId":{"S":"evt-001"}}' --query Item --output json
