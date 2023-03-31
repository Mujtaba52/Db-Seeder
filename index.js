const { Client } = require("pg");
const { faker } = require("@faker-js/faker");

const TOTAL_COUNT = 5000
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 9999,
});

const Reebok = {
  id: faker.datatype.uuid(),
  created_on: new Date("2023-03-29T12:00:00-04:00"),
  updated_on: new Date("2023-03-29T12:00:00-04:00"),
  name: "Reebok",
};

async function getAllWarehouseOrders() {
  const data = await client.query("SELECT * FROM warehouse_orders");
  return data.rows;
}
async function insertIntoUsers(){
  await client.query(`INSERT INTO public.users 
  (id, created_on, updated_on, display_name, email, wallet_address, auth0_user_id, user_role) VALUES
  ('40274552-c1d0-44f8-b3dc-67df7f11c457', NOW(), NOW(), 'mynatest1', NULL, '', 'auth0|633383fc165891ae29f9cdd5', 'user'),
  ('dbac9eff-2c7f-45ba-a824-72553b809fca', NOW(), NOW(), 'mynatest2', NULL, '', 'auth0|63347190f8b2e67056d49a14', 'user'),
  ('a3f533e6-2ec6-42dd-a51b-0b7bffdc0705', NOW(), NOW(), 'mynatest3', NULL, '', 'auth0|633471bf66b1cf78d073f5cf', 'user'),
  ('41f02702-7073-4f2d-9d78-f97bf513ea8a', NOW(), NOW(), 'mynatest4', NULL, '', 'auth0|633471eb3bfe0939db88407f', 'user'),
  ('ec812b10-960f-4961-8f19-57972dab332b', NOW(), NOW(), 'mynaadmin1', NULL, '', 'auth0|633472153f650861f557376f', 'admin'),
  ('63545fe8-9b60-4eb5-b4ea-120f23568ff1', NOW(), NOW(), 'mynaadmin2', NULL, '', 'auth0|633472379c263ed09882ed81', 'admin')
    ON CONFLICT (id) DO NOTHING;`)
    console.log("insertIntoContact_informations")
}
async function insertIntoContact_informations(){
  await client.query(`INSERT INTO public.contact_informations (id,created_on,updated_on,first_name,last_name,company_name,address1,address2,city,state,zip_postal_code,country,phone_number,email_address,user_id) VALUES
  ('9d1e9725-1856-47fb-94e0-cc49fff68e36','2023-03-01 13:21:48.776214','2023-03-01 13:21:48.776214','Fake','Buyer','','979 N. Summerhouse Drive','','Campbell','CA','95008','USA','789-012-3456','fake.buyer@example.com','dbac9eff-2c7f-45ba-a824-72553b809fca'),
  ('7fb8b412-f5fa-4d0c-bba9-afb46315ca8e','2023-03-01 13:21:50.670975','2023-03-01 13:21:50.670975','Fake','Seller','','8827 East Leatherwood Street','','Cordova','TN','38016','USA','123-456-7890','fake.seller@example.com','40274552-c1d0-44f8-b3dc-67df7f11c457'),
  ('d3e50672-72a9-4f3f-a51e-562263690a6a','2023-03-01 13:28:19.413272','2023-03-01 13:28:19.413272','Myna','Warehouse','','4000 East Highway 6','','Spanish Fork','UT','84660','USA','345-678-9012','mynaadmin1@example.com','ec812b10-960f-4961-8f19-57972dab332b')
 ON CONFLICT (id) DO NOTHING;`)
 console.log("insertIntoUsers")

}


async function Get100Items() {
  const data = await client.query("SELECT * FROM items LIMIT 10");
  return data.rows;
}

async function  GetBrand(name) {
  const data = await client.query(
    `SELECT * FROM brands WHERE name = '${name}'`
  );
  return data.rows;
}
async function  GetAssests() {
  const data = await client.query(
    `SELECT * FROM assets`
  );
  return data.rows;
}
async function  GetVariants() {
  const data = await client.query(
    `SELECT * FROM variants`
  );
  return data.rows;
}
async function  GetItems() {
  const data = await client.query(
    `SELECT * FROM items`
  );
  return data.rows;
}

async function createBrand(brand) {
  try {
    const data = await client.query(
      `INSERT INTO brands ("id", "created_on", "updated_on", "name") VALUES ($1, $2, $3, $4)`,
      [brand.id, brand.created_on, brand.updated_on, brand.name]
    );

  } catch (error) {
    console.log(error);
  }
}

async function createAsset(asset) {
  try {
    const data = await client.query(
      `INSERT INTO assets ("id", "created_on", "updated_on", "sku", "name", "brand_id", "retail_price", "release_date", "description") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        asset.id,
        asset.created_on,
        asset.updated_on,
        asset.sku,
        asset.name,
        asset.brand_id,
        asset.retail_price,
        asset.release_date,
        asset.description,
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

async function createVariant(variant) {
  try {
    const data = await client.query(
      `INSERT INTO variants ("id", "created_on", "updated_on", "warehouse_product_id", "asset_id") VALUES ($1, $2, $3, $4, $5)`,
      [
        variant.id,
        variant.created_on,
        variant.updated_on,
        variant.warehouse_product_id,
        variant.asset_id,
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

async function createItems(item) {
  try {
    const data = await client.query(
      `INSERT INTO items ("id", "created_on", "updated_on", "variant_id", "token_id", "chain_id", "contract_address", "warehouse_sku", "instant_buy_price", "status") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [
        item.id,
        item.created_on,
        item.updated_on,
        item.variant_id,
        item.token_id,
        item.chain_id,
        item.contract_address,
        item.warehouse_sku,
        item.instant_buy_price,
        item.status,
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

async function createWarehouseOrders(item) {
  try {
    const data = await client.query(
      `INSERT INTO warehouse_orders ("id", "created_on", "updated_on", "direction", "warehouse_shipment_id", "from_address_id", "to_address_id", "item_id", "shipment_status")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [
        item.id,
        item.created_on,
        item.updated_on,
        item.direction,
        item.warehouse_shipment_id,
        item.from_address_id,
        item.to_address_id,
        item.item_id,
        item.shipment_status,
      ]
    );
  } catch (error) {
    console.log(error);
  }
}

async function createData() {
  try {
    await createBrand(Reebok);
    const brand = await GetBrand("Reebok");

    for (let index = 0; index < TOTAL_COUNT; index++) {
      let asset = {
        id: faker.datatype.uuid(),
        created_on: new Date(Date.now()),
        updated_on: new Date(Date.now()),
        sku: faker.random.alphaNumeric(8),
        name: faker.music.songName(),
        brand_id: brand[0].id,
        retail_price: faker.datatype.bigInt({
          max: 9999999,
          min: 1000000,
        }),
        release_date: new Date(Date.now()),
        description: faker.lorem.sentence(),
      };

      await createAsset(asset);
    }
    console.log("Assets Created");
    
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function InsertIntoVariantsTable() {
  try {
    const assets = await GetAssests();

    for (let index = 0; index < TOTAL_COUNT; index++) {
      let variant = {
        id: faker.datatype.uuid(),
        created_on: new Date(Date.now()),
        updated_on: new Date(Date.now()),
        warehouse_product_id:faker.datatype.bigInt({
          max: 9999999,
          min: 1,
        }) ,
        asset_id:  assets[index].id,
      };

      await createVariant(variant);
    }
    console.log("Variants Created");
    
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function InsertIntoItemsTable() {
  try {
    const variant = await GetVariants();

    for (let index = 0; index < TOTAL_COUNT; index++) {
      let item = {
        id: faker.datatype.uuid(),
        created_on: new Date(Date.now()),
        updated_on: new Date(Date.now()),
        variant_id:variant[index].id,
        token_id:faker.datatype.bigInt({
          max: 87312685893025946753974474498683197982182819688934105477873324365906914050048,
          min: 18731268589302594675397447449868319798218281968893410547787332436590691405004,
        }) ,
        chain_id: 5,
        contract_address:null,
        warehouse_sku:faker.random.alphaNumeric(8),
        instant_buy_price: faker.datatype.bigInt({
          max: 9999999,
          min: 5555555,
        }) ,
        status: "shipped",
      };

      await createItems(item);
    }
    console.log("Items Created");
    
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function InsertIntoIWareHouseOrderTable() {
  try {
    const items = await GetItems();

    for (let index = 0; index < TOTAL_COUNT; index++) {
      let warehouse_order = {
        id: faker.datatype.uuid(),
        created_on: new Date(Date.now()),
        updated_on: new Date(Date.now()),
       direction:faker.helpers.arrayElement(['inbound','outbound']),
       warehouse_shipment_id:faker.datatype.bigInt({
        max: 9999999,
        min: 5555555,
      }) ,
       from_address_id:"9d1e9725-1856-47fb-94e0-cc49fff68e36",
       to_address_id:"9d1e9725-1856-47fb-94e0-cc49fff68e36",
       item_id:items[index].id,
       shipment_status:"shipped"
      };

      await createWarehouseOrders(warehouse_order);
    }
    console.log("Warehouse orders Created");
    
  } catch (error) {
    console.log("Error: ", error);
  }
}
async function main() {
  try {
    await client.connect();
    await insertIntoUsers()
    await insertIntoContact_informations()
    await createData();
    await InsertIntoVariantsTable();
    await InsertIntoItemsTable();
    await InsertIntoIWareHouseOrderTable();

  } catch (error) {
    console.log(error);
  }
}

main();
