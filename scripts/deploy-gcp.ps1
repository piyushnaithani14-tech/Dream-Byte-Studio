# ========================================================
# Dream Byte Studio - Automated Google Cloud Run Deployment
# ========================================================

param (
    [string]$ProjectId = "dreambyte-studio-prod",
    [string]$Region = "asia-south2" # Delhi (lowest latency for Dehradun, Uttarakhand)
)

Write-Host "`n🚀 Initializing Google Cloud Deployment for Dream Byte Studio..." -ForegroundColor Cyan
Write-Host "Target Project ID: $ProjectId" -ForegroundColor Yellow
Write-Host "Target Region: $Region (Delhi / North India)" -ForegroundColor Yellow

# 1. Check if gcloud CLI is installed
if (-not (Get-Command gcloud -ErrorAction SilentlyContinue)) {
    Write-Host "`n❌ Google Cloud SDK ('gcloud') is not found in your PATH." -ForegroundColor Red
    Write-Host "Please install the Google Cloud SDK from: https://cloud.google.com/sdk/docs/install" -ForegroundColor White
    Write-Host "Or authenticate using the Google Cloud Developer plugin in the marketplace." -ForegroundColor White
    exit 1
}

# 2. Login verification
Write-Host "`n🔑 Verifying Google Cloud Authentication..." -ForegroundColor Cyan
gcloud auth list

# 3. Create GCP Project
Write-Host "`n📦 Creating Google Cloud Project '$ProjectId'..." -ForegroundColor Cyan
gcloud projects create $ProjectId --name="Dream Byte Studio"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Using existing or specified project $ProjectId..." -ForegroundColor Yellow
}

# 4. Set project as active
gcloud config set project $ProjectId

# 5. Check & Link Billing
Write-Host "`n💳 Checking Google Cloud Billing Accounts..." -ForegroundColor Cyan
$billingAccounts = gcloud billing accounts list --format="value(name)"
if ($billingAccounts) {
    $firstBilling = ($billingAccounts -split "`n")[0].Trim()
    Write-Host "Linking billing account: $firstBilling to project $ProjectId..." -ForegroundColor Green
    gcloud billing projects link $ProjectId --billing-account=$firstBilling
} else {
    Write-Host "⚠️ No active billing account automatically detected. Please ensure billing is enabled in Google Cloud Console." -ForegroundColor Yellow
}

# 6. Enable Essential GCP APIs
Write-Host "`n⚙️ Enabling Cloud Run, Cloud Build, and Artifact Registry APIs..." -ForegroundColor Cyan
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com

# 7. Create Artifact Registry Repository
Write-Host "`n📦 Configuring Artifact Registry repository 'dreambyte-repo'..." -ForegroundColor Cyan
gcloud artifacts repositories create dreambyte-repo `
    --repository-format=docker `
    --location=$Region `
    --description="Docker repository for Dream Byte Studio" `
    --quiet 2>$null

# 8. Deploy directly to Cloud Run using Cloud Build
Write-Host "`n🚀 Building container image and deploying to Cloud Run ($Region)..." -ForegroundColor Cyan
gcloud builds submit --config cloudbuild.yaml

# 9. Fetch deployed Service URL
$serviceUrl = gcloud run services describe dreambyte-studio --region=$Region --format="value(status.url)"
Write-Host "`n========================================================" -ForegroundColor Green
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "Live Cloud Run URL: $serviceUrl" -ForegroundColor Cyan
Write-Host "Custom Domain Setup: Map $serviceUrl to dreambytestudio.in in Cloud Run Custom Domains" -ForegroundColor White
Write-Host "========================================================`n" -ForegroundColor Green
