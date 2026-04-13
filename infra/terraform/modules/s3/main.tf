resource "aws_s3_bucket" "voicify_assets" {
  bucket = "voicify-assets-${var.environment}"
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }

  tags = {
    Name        = "Voicify Assets"
    Environment = var.environment
  }
}

variable "environment" {
  type    = string
  default = "production"
}
