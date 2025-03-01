import { SQLiteDatabase } from "expo-sqlite";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = (await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version")) ?? { user_version: 0 };

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA journal_mode = 'wal';

      CREATE TABLE Producto (
        id INTEGER PRIMARY KEY NOT NULL,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL
      );

      CREATE TABLE materia_prima (
        id INTEGER PRIMARY KEY NOT NULL,
        producto_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        pt REAL NOT NULL,
        cant REAL NOT NULL,
        pu REAL NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
      );

      CREATE TABLE packaging (
        id INTEGER PRIMARY KEY NOT NULL,
        producto_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        pt REAL NOT NULL,
        cant REAL NOT NULL,
        pu REAL NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
      );

      CREATE TABLE mano_obra (
        id INTEGER PRIMARY KEY NOT NULL,
        producto_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        pt REAL NOT NULL,
        cant REAL NOT NULL,
        pu REAL NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
      );

      CREATE TABLE gastos_operativos (
        id INTEGER PRIMARY KEY NOT NULL,
        producto_id INTEGER NOT NULL,
        nombre TEXT NOT NULL,
        pt REAL NOT NULL,
        cant REAL NOT NULL,
        pu REAL NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
      );

      CREATE TABLE CostAnalysis (
        id INTEGER PRIMARY KEY NOT NULL,
        producto_id INTEGER NOT NULL,
        cu REAL NOT NULL,
        utilidad REAL NOT NULL,
        igv REAL NOT NULL,
        FOREIGN KEY (producto_id) REFERENCES Producto(id) ON DELETE CASCADE
      );
    `);

    // Insertar datos de ejemplo
    await db.runAsync(
      "INSERT INTO Producto (nombre, descripcion, precio) VALUES (?, ?, ?)",
      ["Producto 1", "Descripción del producto 1", 100.0]
    );

    // Insertar más materias primas
    await db.runAsync(
      "INSERT INTO materia_prima (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Material 2", 8.0, 3, 2.5]
    );

    await db.runAsync(
      "INSERT INTO materia_prima (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Material 3", 12.0, 1, 12.0]
    );

    // Insertar más packaging
    await db.runAsync(
      "INSERT INTO packaging (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Bolsa", 2.0, 5, 0.5]
    );

    await db.runAsync(
      "INSERT INTO packaging (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Etiqueta", 1.0, 10, 0.2]
    );

    // Insertar más mano de obra
    await db.runAsync(
      "INSERT INTO mano_obra (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Pintura", 20.0, 1, 20.0]
    );

    await db.runAsync(
      "INSERT INTO mano_obra (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Control de calidad", 5.0, 1, 5.0]
    );

    // Insertar más gastos operativos
    await db.runAsync(
      "INSERT INTO gastos_operativos (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Agua", 5.0, 1, 5.0]
    );

    await db.runAsync(
      "INSERT INTO gastos_operativos (producto_id, nombre, pt, cant, pu) VALUES (?, ?, ?, ?, ?)",
      [1, "Mantenimiento", 15.0, 1, 15.0]
    );

    await db.runAsync(
      "INSERT INTO CostAnalysis (producto_id, cu, utilidad, igv) VALUES (?, ?, ?, ?)",
      [1, 75.0, 75.0, 18.0]
    );

    currentDbVersion = 1;
  }

  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
