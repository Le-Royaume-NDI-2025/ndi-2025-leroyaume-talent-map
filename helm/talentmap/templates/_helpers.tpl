{{- define "talentmap.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "talentmap.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s" $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}

{{- define "talentmap.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "talentmap.labels" -}}
helm.sh/chart: {{ include "talentmap.chart" . }}
{{ include "talentmap.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
environment: {{ .Values.environment }}
{{- end }}

{{- define "talentmap.selectorLabels" -}}
app.kubernetes.io/name: {{ include "talentmap.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{- define "talentmap.backend.labels" -}}
{{ include "talentmap.labels" . }}
app: backend
app.kubernetes.io/component: api
{{- end }}

{{- define "talentmap.frontend.labels" -}}
{{ include "talentmap.labels" . }}
app: frontend
app.kubernetes.io/component: web
{{- end }}

{{- define "talentmap.postgres.labels" -}}
{{ include "talentmap.labels" . }}
app: postgres
app.kubernetes.io/component: database
{{- end }}

{{- define "talentmap.namespace" -}}
{{- if eq .Values.environment "development" }}
{{- printf "%s-dev" (include "talentmap.name" .) }}
{{- else }}
{{- include "talentmap.name" . }}
{{- end }}
{{- end }}
