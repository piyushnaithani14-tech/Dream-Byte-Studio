#!/usr/bin/env bash
# ========================================================
# Dream Byte Studio - Automated Google Cloud Run Deployment
# ========================================================

set -e

PROJECT_ID=${1:-"dreambyte-studio-$RANDOM"}
REGION=${2:-"asia-south2"} # Delhi (lowest latency for Dehradun, Uttarakhand)

echo "🚀 Initializing Google Cloud Deployment for Dream Byte Studio..."
echo "Target Project ID: $PROJECT_ID"
echo "Target Region: $REGION (Delhi / North India)"

# 1. Check gcloud CLI
if ! command -v gcloud &> /dev/null; then
    echo "❌ Google Cloud SDK ('gcloud') is not installed."
    echo "Install gcloud from https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# 2. Login verification
echo "🔑 Verifying Google Cloud Authentication..."
gcloud auth list

# 3. Create GCP Project
echo "📦 Creating Google Cloud Project '$PROJECT_ID'..."
gcloud projects create "$PROJECT_ID" --name="Dream Byte Studio" || echo "Using existing project..."

# 4. Set project as active
gcloud config set project "$PROJECT_ID"

# 5. Link Billing
echo "💳 Checking Google Cloud Billing Accounts..."
BILLING_ACCOUNT=$(gcloud billing accounts list --format="value(name)" | head -n 1 || true)
if [ -n "$BILLING_ACCOUNT" ]; then
    echo "Linking billing account: $BILLING_ACCOUNT to project $PROJECT_ID..."
    gcloud billing projects link "$PROJECT_ID" --billing-account="$BILLING_ACCOUNT" || true
fi

# 6. Enable Essential GCP APIs
echo "⚙️ Enabling Cloud Run, Cloud Build, and Artifact Registry APIs..."
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 7. Create Artifact Registry
echo "📦 Configuring Artifact Registry repository 'dreambyte-repo'..."
gcloud artifacts repositories create dreambyte-repo \
    --repository-format=docker \
    --location="$REGION" \
    --description="Docker repository for Dream Byte Studio" \
    --quiet || true

# 8. Deploy directly to Cloud Run using Cloud Build
echo "🚀 Building container image and deploying to Cloud Run ($REGION)..."
gcloud builds submit --config cloudbuild.yaml

# 9. Output URL
SERVICE_URL=$(gcloud run services describe dreambyte-studio --region="$REGION" --format="value(status.url)")
echo "========================================================"
echo "🎉 DEPLOYMENT COMPLETE!"
echo "Live Cloud Run URL: $SERVICE_URL"
echo "Custom Domain: Map $SERVICE_URL to dreambytestudio.in in Cloud Run Custom Domains"
echo "========================================================"
