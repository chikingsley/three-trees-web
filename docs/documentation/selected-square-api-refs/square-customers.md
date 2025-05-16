<!-- markdownlint-disable -->

# Customers

## client.customers.list({ ...params }) -> core.Page

### Description 1

Lists customer profiles associated with a Square account.

Under normal operating conditions, newly created or updated customer profiles become available
for the listing operation in well under 30 seconds. Occasionally, propagation of the new or updated
profiles can take closer to one minute or longer, especially during network incidents and outages.

### Usage 1

```typescript
const response = await client.customers.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.customers.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

### Parameters 1

**request:** `Square.ListCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.create({ ...params }) -> Square.CreateCustomerResponse

### Description 2

Creates a new customer for a business.

You must provide at least one of the following values in your request to this
endpoint:

- `given_name`
- `family_name`
- `company_name`
- `email_address`
- `phone_number`
  
  
  
  

### Usage 2

```typescript
await client.customers.create({
    givenName: "Amelia",
    familyName: "Earhart",
    emailAddress: "Amelia.Earhart@example.com",
    address: {
        addressLine1: "500 Electric Ave",
        addressLine2: "Suite 600",
        locality: "New York",
        administrativeDistrictLevel1: "NY",
        postalCode: "10003",
        country: "US",
    },
    phoneNumber: "+1-212-555-4240",
    referenceId: "YOUR_REFERENCE_ID",
    note: "a customer",
});
```

### Parameters 2

**request:** `Square.CreateCustomerRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.batchCreate({ ...params }) -> Square.BulkCreateCustomersResponse

### Description 3

Creates multiple [customer profiles](entity:Customer) for a business.

This endpoint takes a map of individual create requests and returns a map of responses.

You must provide at least one of the following values in each create request:

- `given_name`
- `family_name`
- `company_name`
- `email_address`
- `phone_number`
  
  
  
  

### Usage 3

```typescript
await client.customers.batchCreate({
    customers: {
        "8bb76c4f-e35d-4c5b-90de-1194cd9179f0": {
            givenName: "Amelia",
            familyName: "Earhart",
            emailAddress: "Amelia.Earhart@example.com",
            address: {
                addressLine1: "500 Electric Ave",
                addressLine2: "Suite 600",
                locality: "New York",
                administrativeDistrictLevel1: "NY",
                postalCode: "10003",
                country: "US",
            },
            phoneNumber: "+1-212-555-4240",
            referenceId: "YOUR_REFERENCE_ID",
            note: "a customer",
        },
        "d1689f23-b25d-4932-b2f0-aed00f5e2029": {
            givenName: "Marie",
            familyName: "Curie",
            emailAddress: "Marie.Curie@example.com",
            address: {
                addressLine1: "500 Electric Ave",
                addressLine2: "Suite 601",
                locality: "New York",
                administrativeDistrictLevel1: "NY",
                postalCode: "10003",
                country: "US",
            },
            phoneNumber: "+1-212-444-4240",
            referenceId: "YOUR_REFERENCE_ID",
            note: "another customer",
        },
    },
});
```

### Parameters 3

**request:** `Square.BulkCreateCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.bulkDeleteCustomers({ ...params }) -> Square.BulkDeleteCustomersResponse

### Description 4

Deletes multiple customer profiles.

The endpoint takes a list of customer IDs and returns a map of responses.

### Usage 4

```typescript
await client.customers.bulkDeleteCustomers({
    customerIds: ["8DDA5NZVBZFGAX0V3HPF81HHE0", "N18CPRVXR5214XPBBA6BZQWF3C", "2GYD7WNXF7BJZW1PMGNXZ3Y8M8"],
});
```

### Parameters 4

**request:** `Square.BulkDeleteCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.bulkRetrieveCustomers({ ...params }) -> Square.BulkRetrieveCustomersResponse

### Description 5

Retrieves multiple customer profiles.

This endpoint takes a list of customer IDs and returns a map of responses.

### Usage 5

```typescript
await client.customers.bulkRetrieveCustomers({
    customerIds: ["8DDA5NZVBZFGAX0V3HPF81HHE0", "N18CPRVXR5214XPBBA6BZQWF3C", "2GYD7WNXF7BJZW1PMGNXZ3Y8M8"],
});
```

### Parameters 5

**request:** `Square.BulkRetrieveCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.bulkUpdateCustomers({ ...params }) -> Square.BulkUpdateCustomersResponse

### Description 6

Updates multiple customer profiles.

This endpoint takes a map of individual update requests and returns a map of responses.

### Usage 6

```typescript
await client.customers.bulkUpdateCustomers({
    customers: {
        "8DDA5NZVBZFGAX0V3HPF81HHE0": {
            emailAddress: "New.Amelia.Earhart@example.com",
            note: "updated customer note",
            version: 2,
        },
        N18CPRVXR5214XPBBA6BZQWF3C: {
            givenName: "Marie",
            familyName: "Curie",
            version: 0,
        },
    },
});
```

### Parameters 6

**request:** `Square.BulkUpdateCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.search({ ...params }) -> Square.SearchCustomersResponse

### Description 7

Searches the customer profiles associated with a Square account using one or more supported query filters.

Calling `SearchCustomers` without any explicit query filter returns all
customer profiles ordered alphabetically based on `given_name` and
`family_name`.

Under normal operating conditions, newly created or updated customer profiles become available
for the search operation in well under 30 seconds. Occasionally, propagation of the new or updated
profiles can take closer to one minute or longer, especially during network incidents and outages.

### Usage 7

```typescript
await client.customers.search({
    limit: 2,
    query: {
        filter: {
            creationSource: {
                values: ["THIRD_PARTY"],
                rule: "INCLUDE",
            },
            createdAt: {
                startAt: "2018-01-01T00:00:00-00:00",
                endAt: "2018-02-01T00:00:00-00:00",
            },
            emailAddress: {
                fuzzy: "example.com",
            },
            groupIds: {
                all: ["545AXB44B4XXWMVQ4W8SBT3HHF"],
            },
        },
        sort: {
            field: "CREATED_AT",
            order: "ASC",
        },
    },
});
```

### Parameters 7

**request:** `Square.SearchCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.get({ ...params }) -> Square.GetCustomerResponse

### Description 8

Returns details for a single customer.

### Usage 8

```typescript
await client.customers.get({
    customerId: "customer_id",
});
```

### Parameters 8

**request:** `Square.GetCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.update({ ...params }) -> Square.UpdateCustomerResponse

### Description 9

Updates a customer profile. This endpoint supports sparse updates, so only new or changed fields are required in the request.
To add or update a field, specify the new value. To remove a field, specify `null`.

To update a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.

### Usage 9

```typescript
await client.customers.update({
    customerId: "customer_id",
    emailAddress: "New.Amelia.Earhart@example.com",
    note: "updated customer note",
    version: 2,
});
```

### Parameters 9

**request:** `Square.UpdateCustomerRequest`

**requestOptions:** `Customers.RequestOptions`

## client.customers.delete({ ...params }) -> Square.DeleteCustomerResponse

### Description 10

Deletes a customer profile from a business.

To delete a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.

### Usage 10

```typescript
await client.customers.delete({
    customerId: "customer_id",
});
```

### Parameters 10

**request:** `Square.DeleteCustomersRequest`

**requestOptions:** `Customers.RequestOptions`
