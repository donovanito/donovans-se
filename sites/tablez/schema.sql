-- Tablez: exempeldatabas (SQLite). Ändra fritt - gränssnittet läser strukturen automatiskt.
PRAGMA foreign_keys = ON;

-- Huvudobjekt -------------------------------------------------------------
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
  reg_nr     TEXT UNIQUE,
  make       TEXT,
  model      TEXT,
  model_year INTEGER,
  fuel       TEXT,
  list_price INTEGER
);

-- Historik: vem som sålt / brukat fordonet över tid (valid_to NULL = pågående)
CREATE TABLE vehicle_dealer (
  vehicle_dealer_id INTEGER PRIMARY KEY,
  vehicle_id INTEGER NOT NULL REFERENCES vehicle(vehicle_id),
  dealer_id  INTEGER NOT NULL REFERENCES dealer(dealer_id),
  sold_date  TEXT,
  price      INTEGER
);

CREATE TABLE vehicle_user (
  vehicle_user_id INTEGER PRIMARY KEY,
  vehicle_id  INTEGER NOT NULL REFERENCES vehicle(vehicle_id),
  customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
  valid_from  TEXT,
  valid_to    TEXT
);

CREATE TABLE service_event (
  event_id   INTEGER PRIMARY KEY,
  vehicle_id INTEGER NOT NULL REFERENCES vehicle(vehicle_id),
  event_date TEXT,
  kind       TEXT,
  cost       INTEGER
);

-- Avtal mellan AutoPlan och kund --------------------------------------------
CREATE TABLE contract (
  contract_id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
  product     TEXT CHECK (product IN ('Leasing','Avbetalning','AutoPlan')),
  start_date  TEXT,
  term_months INTEGER,
  monthly_fee INTEGER,
  status      TEXT
);

CREATE TABLE contract_detail (
  detail_id   INTEGER PRIMARY KEY,
  contract_id INTEGER NOT NULL REFERENCES contract(contract_id),
  vehicle_id  INTEGER NOT NULL REFERENCES vehicle(vehicle_id),
  kind        TEXT,
  description TEXT,
  monthly_cost INTEGER
);

-- Fakturering: i första hand mot avtalet, men också mot kunden --------------
CREATE TABLE invoice (
  invoice_id  INTEGER PRIMARY KEY,
  contract_id INTEGER NOT NULL REFERENCES contract(contract_id),
  customer_id INTEGER NOT NULL REFERENCES customer(customer_id),
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

-- Data ------------------------------------------------------------------------
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
 (3,'Nordbil','Toyota','Stockholm'),
 (4,'Begagnatcentrum Öst','Flera märken','Stockholm');

INSERT INTO vehicle VALUES
 (1,'ABC123','Volvo','XC60',2025,'Hybrid',620000),
 (2,'ABC124','Volvo','EX40',2023,'El',560000),
 (3,'DEF456','Volkswagen','ID.4',2022,'El',520000),
 (4,'GHI789','Toyota','Corolla',2025,'Hybrid',310000),
 (5,'GHI790','Toyota','Hilux',2024,'Diesel',480000),
 (6,'JKL012','Volkswagen','Transporter',2025,'Diesel',450000),
 (7,'MNO345','Volvo','V90',2024,'Hybrid',690000),
 (8,'PQR678','Toyota','Proace',2025,'El',470000);

INSERT INTO vehicle_dealer VALUES
 (1,1,1,'2024-12-15',610000),
 (2,2,1,'2023-10-20',555000),
 (3,3,2,'2022-04-12',515000),
 (4,3,4,'2024-05-20',340000),
 (5,4,3,'2025-04-10',305000),
 (6,5,3,'2024-08-15',475000),
 (7,6,2,'2025-02-18',445000),
 (8,7,1,'2024-01-10',685000),
 (9,8,3,'2025-02-25',465000),
 (10,2,4,'2025-10-02',380000);

INSERT INTO vehicle_user VALUES
 (1,1,1,'2025-01-01',NULL),
 (2,2,6,'2023-11-01','2025-09-30'),
 (3,3,5,'2022-05-01','2024-05-31'),
 (4,3,2,'2024-06-01',NULL),
 (5,4,4,'2025-05-01',NULL),
 (6,5,1,'2024-09-01',NULL),
 (7,6,3,'2025-03-01',NULL),
 (8,7,5,'2024-02-01',NULL),
 (9,8,3,'2025-03-01',NULL);

INSERT INTO service_event VALUES
 (1,5,'2025-03-14','Service',4200),
 (2,6,'2025-08-20','Däckbyte',3100),
 (3,8,'2025-08-22','Service',2800),
 (4,5,'2025-09-10','Skadereparation',12500),
 (5,7,'2025-06-05','Service',5100),
 (6,3,'2023-06-12','Service',3900),
 (7,3,'2025-04-02','Service',4100);

INSERT INTO contract VALUES
 (1,1,'Leasing','2025-01-01',36,7900,'Aktivt'),
 (2,1,'AutoPlan','2024-09-01',48,6400,'Aktivt'),
 (3,2,'Avbetalning','2024-06-01',60,5200,'Aktivt'),
 (4,3,'AutoPlan','2025-03-01',36,6900,'Aktivt'),
 (5,3,'AutoPlan','2025-03-01',36,6700,'Aktivt'),
 (6,4,'Leasing','2025-05-01',36,3900,'Aktivt'),
 (7,5,'Leasing','2024-02-01',48,9800,'Aktivt'),
 (8,6,'Leasing','2023-11-01',36,7600,'Avslutad');

INSERT INTO contract_detail VALUES
 (1,1,1,'Försäkring','Helförsäkring',1100),
 (2,1,1,'Service','Serviceavtal 3 år',600),
 (3,2,5,'Försäkring','Helförsäkring',1300),
 (4,2,5,'Service','Serviceavtal 4 år',700),
 (5,2,5,'Däck','Däckpaket sommar/vinter',350),
 (6,4,6,'Försäkring','Flottaförsäkring',1500),
 (7,4,6,'Service','Serviceavtal 3 år',800),
 (8,4,8,'Försäkring','Flottaförsäkring',1400),
 (9,5,8,'Service','Serviceavtal 3 år',750),
 (10,6,4,'Försäkring','Helförsäkring',700),
 (11,7,7,'Service','Serviceavtal 4 år',900),
 (12,8,2,'Försäkring','Helförsäkring',1000);

INSERT INTO invoice VALUES
 (1,1,1,'2025-09',7900,'2025-09-30'),
 (2,1,1,'2025-10',7900,'2025-10-31'),
 (3,2,1,'2025-09',6400,'2025-09-30'),
 (4,3,2,'2025-09',5200,'2025-09-30'),
 (5,4,3,'2025-09',6900,'2025-09-30'),
 (6,5,3,'2025-09',6700,'2025-09-30'),
 (7,6,4,'2025-09',3900,'2025-09-30'),
 (8,7,5,'2025-09',9800,'2025-09-30'),
 (9,8,6,'2025-09',7600,'2025-09-30'),
 (10,3,2,'2025-10',5200,'2025-10-31');

INSERT INTO payment VALUES
 (1,1,'2025-09-28',7900),
 (2,2,'2025-10-15',4000),
 (3,2,'2025-10-29',3900),
 (4,3,'2025-09-30',6400),
 (5,4,'2025-10-04',5200),
 (6,5,'2025-09-29',6900),
 (7,6,'2025-09-29',6700),
 (8,7,'2025-09-26',3900),
 (9,8,'2025-09-30',9800),
 (10,9,'2025-10-02',7600);
