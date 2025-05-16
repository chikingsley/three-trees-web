# Square Node.js SDK

## Overview

The Square Node.js library supports Square APIs in a language-idiomatic way that reduces complexity without sacrificing API functionality.

**Latest SDK Version:** 42.1.0

Each SDK version is tied to a specific Square API version. As features are added, Square releases a new Square API version and a new SDK version. To use new features, you must update the SDK version in your application.

> **Important:** Version `40.0.0` of the Node.js SDK represents a full rewrite of the SDK, with a number of breaking changes, including client construction and parameter names. When upgrading from version `39.1.0` or earlier, read the migration guide to learn what to update and how to use the new SDK and the legacy version side by side.

## Installation

Install the latest version with your choice of package manager:

```bash
npm install square
```

## Quickstart

Learn how to quickly set up and test the Square Node.js SDK.

### Prepare for the Quickstart

Before you begin, you need:

1. A Square account and an application
2. A Sandbox access token from the Developer Console
3. Node.js version 10 or later

### Create a project

Create a new directory for your project:

```bash
mkdir quickstart
cd ./quickstart
```

Create a simple project definition file:

```bash
npm init --yes
```

Install the Square Node.js SDK:

```bash
npm install square
```

### Write code

Create a file named `quickstart.js` with the following content:

```javascript
const { SquareClient, SquareEnvironment, SquareError } = require("square");
require('dotenv').config()

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
  environment: SquareEnvironment.Sandbox,
});

async function getLocations() {
  try {
    let listLocationsResponse = await client.locations.list();

    let locations = listLocationsResponse.locations;

    locations.forEach(function (location) {
      console.log(
        location.id + ": " +
        location.name + ", " +
        location.address.addressLine1 + ", " +
        location.address.locality
      );
    });
  } catch (error) {
    if (error instanceof SquareError) {
      error.errors.forEach(function (e) {
        console.log(e.category);
        console.log(e.code);
        console.log(e.detail);
      });
    } else {
      console.log("Unexpected error occurred: ", error);
    }
  }
};

getLocations();
```

### Set your Square credentials

The code reads your Square Sandbox access token from the `SQUARE_ACCESS_TOKEN` environment variable:

**Linux or macOS:**

```bash
export SQUARE_ACCESS_TOKEN=yourSandboxAccessToken
```

**Windows: PowerShell:**

```powershell
Set-item -Path Env:SQUARE_ACCESS_TOKEN -Value yourSandboxAccessToken
```

**Windows: Command shell:**

```bash
set SQUARE_ACCESS_TOKEN=yourSandboxAccessToken
```

### Run the application

```bash
node quickstart.js
```

You should see at least one location (Square creates one location when you create a Square account).

## Common API Patterns

### Pagination

Square API pagination support lets you split a full query result set into pages:

```javascript
import { SquareClient, SquareError } from "square";
const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN
});

async function listCustomers() {
  const limit = 10;

  try {
    let customerPager = await client.customers.list({
      limit,
      sortField: "DEFAULT",
      sortOrder: "DESC"
    });
    for await (const customer of customerPager) {
      console.log("customer: ID: " + customer.id,
        "Version: " + customer.version + ",",
        "Given name: " + customer.givenName + ",",
        "Family name: " + customer.familyName);
    }
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Error occurred: " + error.message);
    } else {
      console.error("Unexpected error occurred: ", error);
    }
  }
}
```

### Idempotency key

Most Square APIs that modify data require you to provide an idempotency key that uniquely identifies the request:

```javascript
import { SquareClient, SquareError } from "square";
import { randomUUID } from 'crypto';

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
});

async function createOrder() {
  try {
    const idempotencyKey = randomUUID();
    const locationId = getLocationId();
    const order = await client.orders.create({
      idempotencyKey: idempotencyKey,
      order: {
        locationId: locationId,
        lineItems: [
          {
            name: "New Item",
            quantity: "1",
            basePriceMoney: {
              amount: BigInt(100),
              currency: "USD",
            },
          },
        ],
      },
    });
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Error occurred: " + error.message);
    } else {
      console.error("Unexpected error occurred: ", error);
    }
  }
}
```

### Optimistic concurrency and object versioning

Some Square API resources support versioning. This enables optimistic concurrency:

```javascript
import { SquareClient, SquareError } from "square";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN,
});

async function updateCustomer() {
  try {
    let updateCustomerResponse = await client.customers.update(
      {
        customerId: "GZ48C4P2CWVXV7F7K2ZH795RSG",
        givenName: "Fred",
        familyName: "Jones",
        version: BigInt(11)
      }
    );
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Error occurred: " + error.message);
    } else {
      console.error("Unexpected error occurred: ", error);
    }
  }
}
```

### Clear API object fields

For update operations that support sparse updates, you can clear a field by setting its value to null:

```javascript
import { SquareClient, SquareError } from "square";

const client = new SquareClient({
  token: process.env.SQUARE_ACCESS_TOKEN
});

async function updateLocation() {
  try {
    let updateLocationResponse = await client.locations.update({
      locationId: 'M8AKAD8160XGR',
      location: {
        twitterUsername: null,
        websiteUrl: 'https://developer.squareup.com',
      },
    });

    console.log(updateLocationResponse.location);
  } catch (error) {
    if (error instanceof SquareError) {
      console.error("Error occurred: " + error.message);
    } else {
      console.error("Unexpected error occurred: ", error);
    }
  }
};
```

For `updateOrder` requests, you must add the `X-Clear-Null: true` HTTP header:

```javascript
await client.orders.update(
  {
    orderId: "K1BZGPD0QB7ER26AFXFYKBG9K0",
    idempotencyKey: idempotencyKey,
    order: {
      locationId: locationId,
      referenceId: null
    },
  },
  {
    headers: {
      "X-Clear-Null": "true"
    }
  }
);
```
