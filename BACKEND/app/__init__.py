from flask import Flask
from app.bdd import db, coneccion
from sqlalchemy.sql import text
import os
from dotenv import load_dotenv

load_dotenv()

# API Key (no se usa en Licitaciones, pero se mantiene por compatibilidad)
api_key = os.getenv("API_KEY", "default_key_for_development")


def create_app():
    app = Flask(__name__)
    
    # Configuraciones de Flask
    app.config["SECRET_KEY"] = '3zM8c.1Z9>@2_x$!;Y`:3u?5'  # Para sesiones y CSRF
    
    # Configuraciones de Base de Datos
    app.config["SQLALCHEMY_DATABASE_URI"] = coneccion  # SQLite (pruebas) o AWS (producción)
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # Evita warnings de SQLAlchemy

    db.init_app(app)
    
    # Importar modelos para registrarlos en SQLAlchemy
    with app.app_context():
        from app.licitaciones import models

    # Registrar Blueprints de Licitaciones
    from app.licitaciones import register_licitaciones_blueprints
    register_licitaciones_blueprints(app)
    
    # Registrar Blueprints (otros módulos comentados por ahora)
    # app.register_blueprint(colaborador_bp, url_prefix='/colaborador')

    # Manejador de errores para API
    @app.errorhandler(404)
    def pagina_no_encontrada(error):
        return {"error": "Endpoint not found", "message": "Try /api/licitaciones"}, 404
    
    return app

