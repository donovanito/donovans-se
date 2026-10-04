-- Tablez: exempeldatabas (SQLite). Ändra fritt - gränssnittet läser strukturen automatiskt.
PRAGMA foreign_keys = ON;

CREATE TABLE customer (
  customer_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  org_nr      TEXT UNIQUE,
  segment     TEXT CHECK (segment IN ('Privat','SME','Corporate')),
  city        TEXT
);

CREATE TABLE dealer (
  dealer_id INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  brand     TEXT,
  city      TEXT
);

CREATE TABLE vehicle (
  vehicle_id INTEGER PRIMARY KEY,
  dealer_id  INTEGER NOT NULL REFERENCES dealer(dealer_id),
  reg_nr     TEXT UNIQUE,
  make       TEXT,
  model      TEXT,
  model_year INTEGER,
  fuel       TEXT,
  list_price INTEGER
);

CREATE TABLE contract (
  contract_id  INTEGER PRIMARY KEY,
  customer_id  INTEGER NOT NULL REFERENCES customer(customer_id),
  vehicle_id   INTEGER NOT NULL REFERENCES vehicle(vehicle_id),
  product      TEXT CHECK (product IN ('Leasing','Avbetalning','AutoPlan')),
  start_date   TEXT,
  term_months  INTEGER,
  monthly_fee  INTEGER,
  status       TEXT
);

CREATE TABLE invoice (
  invoice_id  INTEGER PRIMARY KEY,
  contract_id INTEGER NOT NULL REFERENCES contract(contract_id),
  period      TEXT,
  amount      INTEGER,
  due_date    TEXT
);

CREATE TABLE payment (
  payment_id INTEGER PRIMARY KEY,
  invoice_id INTEGER NOT NULL REFERENCES invoice(invoice_id),
  paid_date  TEXT,
  amount     INTEGER
);

CREATE TABLE service_event (
  event_id    INTEGER PRIMARY KEY,
  contract_id INTEGER NOT NULL REFERENCES contract(contract_id),
  event_date  TEXT,
  kind        TEXT,
  cost        INTEGER
);

INSERT INTO customer VALUES
 (1,'Nordic Bygg AB','556123-4567','SME','Göteborg'),
 (2,'Anna Lindqvist',NULL,'Privat','Malmö'),
 (3,'Svea Logistik AB','556987-1234','Corporate','Stockholm'),
 (4,'Erik Johansson',NULL,'Privat','Uppsala'),
 (5,'Fjord Konsult AB','559012-3456','SME','Örebro'),
 (6,'Kust & Hav Rederi AB','556555-0101','Corporate','Helsingborg');

INSERT INTO dealer VALUES
 (1,'Bil Väst','Volvo','Göteborg'),
 (2,'Skåne Motor','Volkswagen','Malmö'),
 (3,'Nordbil','Toyota','Stockholm');

INSERT INTO vehicle VALUES
 (1,1,'ABC123','Volvo','XC60',2025,'Hybrid',620000),
 (2,1,'ABC124','Volvo','EX40',2025,'El',560000),
 (3,2,'DEF456','Volkswagen','ID.4',2024,'El',520000),
 (4,3,'GHI789','Toyota','Corolla',2025,'Hybrid',310000),
 (5,3,'GHI790','Toyota','Hilux',2024,'Diesel',480000),
 (6,2,'JKL012','Volkswagen','Transporter',2025,'Diesel',450000),
 (7,1,'MNO345','Volvo','V90',2024,'Hybrid',690000),
 (8,3,'PQR678','Toyota','Proace',2025,'El',470000);

INSERT INTO contract VALUES
 (1,1,1,'Leasing','2025-01-01',36,7900,'Aktivt'),
 (2,1,5,'AutoPlan','2024-09-01',48,6400,'Aktivt'),
 (3,2,3,'Avbetalning','2024-06-01',60,5200,'Aktivt'),
 (4,3,6,'AutoPlan','2025-03-01',36,6900,'Aktivt'),
 (5,3,8,'AutoPlan','2025-03-01',36,6700,'Aktivt'),
 (6,4,4,'Leasing','2025-05-01',36,3900,'Aktivt'),
 (7,5,7,'Leasing','2024-02-01',48,9800,'Aktivt'),
 (8,6,2,'Leasing','2023-11-01',36,7600,'Avslutas');

INSERT INTO invoice VALUES
 (1,1,'2025-09',7900,'2025-09-30'),
 (2,1,'2025-10',7900,'2025-10-31'),
 (3,2,'2025-09',6400,'2025-09-30'),
 (4,3,'2025-09',5200,'2025-09-30'),
 (5,4,'2025-09',6900,'2025-09-30'),
 (6,5,'2025-09',6700,'2025-09-30'),
 (7,6,'2025-09',3900,'2025-09-30'),
 (8,7,'2025-09',9800,'2025-09-30'),
 (9,8,'2025-09',7600,'2025-09-30'),
 (10,3,'2025-10',5200,'2025-10-31');

INSERT INTO payment VALUES
 (1,1,'2025-09-28',7900),
 (2,2,'2025-10-29',7900),
 (3,3,'2025-09-30',6400),
 (4,4,'2025-10-04',5200),
 (5,5,'2025-09-29',6900),
 (6,6,'2025-09-29',6700),
 (7,7,'2025-09-26',3900),
 (8,8,'2025-09-30',9800),
 (9,9,'2025-10-02',7600);

INSERT INTO service_event VALUES
 (1,2,'2025-03-14','Service',4200),
 (2,4,'2025-08-20','Däckbyte',3100),
 (3,5,'2025-08-22','Service',2800),
 (4,2,'2025-09-10','Skadereparation',12500),
 (5,7,'2025-06-05','Service',5100);
