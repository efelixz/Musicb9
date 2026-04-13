resource "aws_db_instance" "voicify_postgres" {
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  db_name              = "voicify_db"
  username             = var.db_username
  password             = var.db_password
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  publicly_accessible  = false

  tags = {
    Name        = "Voicify Postgres RDS"
    Environment = var.environment
  }
}

variable "db_username" { type = string }
variable "db_password" { type = string }
variable "environment" { type = string }
