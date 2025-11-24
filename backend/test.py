from backend.config import settings

print(settings.DB_PASSWORD)  # Sẽ in giá trị từ .env hoặc ""
print(settings.sqlalchemy_database_uri)