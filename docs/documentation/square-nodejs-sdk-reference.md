# Reference

## Mobile

### client.mobile.authorizationCode({ ...params }) -> Square.CreateMobileAuthorizationCodeResponse

```typescript
client.mobile.authorizationCode({ ...params }) -> Square.CreateMobileAuthorizationCodeResponse
```

#### Description (mobile authorization code)

**Note:** This endpoint is used by the deprecated Reader SDK.
Developers should update their integration to use the [Mobile Payments SDK](https://developer.squareup.com/docs/mobile-payments-sdk), which includes its own authorization methods.

Generates code to authorize a mobile application to connect to a Square card reader.

Authorization codes are one-time-use codes and expire 60 minutes after being issued.

The `Authorization` header you provide to this endpoint must have the following format:

```typescript
Authorization: Bearer ACCESS_TOKEN
```

Replace `ACCESS_TOKEN` with a
[valid production authorization credential](https://developer.squareup.com/docs/build-basics/access-tokens).

#### Usage (mobile authorization code)

```typescript
await client.mobile.authorizationCode({
    locationId: "YOUR_LOCATION_ID",
});
```

#### Parameters (mobile authorization code)

**request:** `Square.CreateMobileAuthorizationCodeRequest`

**requestOptions:** `Mobile.RequestOptions`

## OAuth

### client.oAuth.revokeToken({ ...params }) -> Square.RevokeTokenResponse

#### Description (revoke token)

Revokes an access token generated with the OAuth flow.

If an account has more than one OAuth access token for your application, this
endpoint revokes all of them, regardless of which token you specify.

**Important:** The `Authorization` header for this endpoint must have the
following format:

```typescript
Authorization: Client APPLICATION_SECRET
```

Replace `APPLICATION_SECRET` with the application secret on the **OAuth**
page for your application in the Developer Dashboard.

#### Usage (revoke token)

```typescript
await client.oAuth.revokeToken({
    clientId: "CLIENT_ID",
    accessToken: "ACCESS_TOKEN",
});
```

#### Parameters (revoke token)

**request:** `Square.RevokeTokenRequest`

**requestOptions:** `OAuth.RequestOptions`

### client.oAuth.obtainToken({ ...params }) -> Square.ObtainTokenResponse

#### Description (obtain token)

Returns an OAuth access token and refresh token using the `authorization_code`
or `refresh_token` grant type.

When `grant_type` is `authorization_code`:

- With the [code flow](https://developer.squareup.com/docs/oauth-api/overview#code-flow),
  provide `code`, `client_id`, and `client_secret`.
- With the [PKCE flow](https://developer.squareup.com/docs/oauth-api/overview#pkce-flow),
  provide `code`, `client_id`, and `code_verifier`.

When `grant_type` is `refresh_token`:

- With the code flow, provide `refresh_token`, `client_id`, and `client_secret`.
  The response returns the same refresh token provided in the request.
- With the PKCE flow, provide `refresh_token` and `client_id`. The response returns
  a new refresh token.

You can use the `scopes` parameter to limit the set of permissions authorized by the
access token. You can use the `short_lived` parameter to create an access token that
expires in 24 hours.

**Important:** OAuth tokens should be encrypted and stored on a secure server.
Application clients should never interact directly with OAuth tokens.

#### Usage (obtain token)

```typescript
await client.oAuth.obtainToken({
    clientId: "sq0idp-uaPHILoPzWZk3tlJqlML0g",
    clientSecret: "sq0csp-30a-4C_tVOnTh14Piza2BfTPBXyLafLPWSzY1qAjeBfM",
    code: "sq0cgb-l0SBqxs4uwxErTVyYOdemg",
    grantType: "authorization_code",
});
```

#### Parameters (obtain token)

**request:** `Square.ObtainTokenRequest`

**requestOptions:** `OAuth.RequestOptions`

### client.oAuth.retrieveTokenStatus() -> Square.RetrieveTokenStatusResponse

#### Description (retrieve token status)

Returns information about an [OAuth access token](https://developer.squareup.com/docs/build-basics/access-tokens#get-an-oauth-access-token) or an application’s [personal access token](https://developer.squareup.com/docs/build-basics/access-tokens#get-a-personal-access-token).

Add the access token to the Authorization header of the request.

**Important:** The `Authorization` header you provide to this endpoint must have the following format:

```typescript
Authorization: Bearer ACCESS_TOKEN
```

where `ACCESS_TOKEN` is a
[valid production authorization credential](https://developer.squareup.com/docs/build-basics/access-tokens).

If the access token is expired or not a valid access token, the endpoint returns an `UNAUTHORIZED` error.

#### Usage (retrieve token status)

```typescript
await client.oAuth.retrieveTokenStatus();
```

#### Parameters (retrieve token status)

**requestOptions:** `OAuth.RequestOptions`

### client.oAuth.authorize() -> void

#### Usage (authorize)

```typescript
await client.oAuth.authorize();
```

#### Parameters (authorize)

**requestOptions:** `OAuth.RequestOptions`

## V1Transactions

### client.v1Transactions.v1ListOrders({ ...params }) -> Square.V1Order[]

#### Description (v1 list orders)

Provides summary information for a merchant's online store orders.

#### Usage (v1 list orders)

```typescript
await client.v1Transactions.v1ListOrders({
    locationId: "location_id",
});
```

#### Parameters (v1 list orders)

**request:** `Square.V1ListOrdersRequest`

**requestOptions:** `V1Transactions.RequestOptions`

### client.v1Transactions.v1RetrieveOrder({ ...params }) -> Square.V1Order

#### Description (v1 retrieve order)

Provides comprehensive information for a single online store order, including the order's history.

#### Usage (v1 retrieve order)

```typescript
await client.v1Transactions.v1RetrieveOrder({
    locationId: "location_id",
    orderId: "order_id",
});
```

#### Parameters (v1 retrieve order)

**request:** `Square.V1RetrieveOrderRequest`

**requestOptions:** `V1Transactions.RequestOptions`

### client.v1Transactions.v1UpdateOrder({ ...params }) -> Square.V1Order

#### Description (v1 update order)

Updates the details of an online store order. Every update you perform on an order corresponds to one of three actions:

#### Usage (v1 update order)

```typescript
await client.v1Transactions.v1UpdateOrder({
    locationId: "location_id",
    orderId: "order_id",
    action: "COMPLETE",
});
```

#### Parameters (v1 update order)

**request:** `Square.V1UpdateOrderRequest`

**requestOptions:** `V1Transactions.RequestOptions`

## ApplePay

### client.applePay.registerDomain({ ...params }) -> Square.RegisterDomainResponse

#### Description (apple pay register domain)

Activates a domain for use with Apple Pay on the Web and Square. A validation
is performed on this domain by Apple to ensure that it is properly set up as
an Apple Pay enabled domain.

This endpoint provides an easy way for platform developers to bulk activate
Apple Pay on the Web with Square for merchants using their platform.

Note: You will need to host a valid domain verification file on your domain to support Apple Pay. The
current version of this file is always available at [https://app.squareup.com/digital-wallets/apple-pay/apple-developer-merchantid-domain-association](https://app.squareup.com/digital-wallets/apple-pay/apple-developer-merchantid-domain-association),
and should be hosted at `.well_known/apple-developer-merchantid-domain-association` on your
domain. This file is subject to change; we strongly recommend checking for updates regularly and avoiding
long-lived caches that might not keep in sync with the correct file version.

To learn more about the Web Payments SDK and how to add Apple Pay, see [Take an Apple Pay Payment](https://developer.squareup.com/docs/web-payments/apple-pay).

#### Usage (apple pay register domain)

```typescript
await client.applePay.registerDomain({
    domainName: "example.com",
});
```

#### Parameters (apple pay register domain)

**request:** `Square.RegisterDomainRequest`

**requestOptions:** `ApplePay.RequestOptions`

## BankAccounts

### client.bankAccounts.list({ ...params }) -> core.Page

#### Description (bank accounts list)

Returns a list of [BankAccount](entity:BankAccount) objects linked to a Square account.

#### Usage (bank accounts list)

```typescript
const response = await client.bankAccounts.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bankAccounts.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bank accounts list)

**request:** `Square.ListBankAccountsRequest`

**requestOptions:** `BankAccounts.RequestOptions`

### client.bankAccounts.getByV1Id({ ...params }) -> Square.GetBankAccountByV1IdResponse

#### Description (bank accounts get by v1 id)

Returns details of a [BankAccount](entity:BankAccount) identified by V1 bank account ID.

#### Usage (bank accounts get by v1 id)

```typescript
await client.bankAccounts.getByV1Id({
    v1BankAccountId: "v1_bank_account_id",
});
```

#### Parameters (bank accounts get by v1 id)

**request:** `Square.GetByV1IdBankAccountsRequest`

**requestOptions:** `BankAccounts.RequestOptions`

### client.bankAccounts.get({ ...params }) -> Square.GetBankAccountResponse

#### Description (bank accounts get)

Returns details of a [BankAccount](entity:BankAccount)
linked to a Square account.

#### Usage (bank accounts get)

```typescript
await client.bankAccounts.get({
    bankAccountId: "bank_account_id",
});
```

#### Parameters (bank accounts get)

**request:** `Square.GetBankAccountsRequest`

**requestOptions:** `BankAccounts.RequestOptions`

## Bookings

### client.bookings.list({ ...params }) -> core.Page

#### Description (bookings list)

Retrieve a collection of bookings.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings list)

```typescript
const response = await client.bookings.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bookings.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bookings list)

**request:** `Square.ListBookingsRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.create({ ...params }) -> Square.CreateBookingResponse

#### Description (bookings create)

Creates a booking.

The required input must include the following:

- `Booking.location_id`
- `Booking.start_at`
- `Booking.AppointmentSegment.team_member_id`
- `Booking.AppointmentSegment.service_variation_id`
- `Booking.AppointmentSegment.service_variation_version`

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings create)

```typescript
await client.bookings.create({
    booking: {},
});
```

#### Parameters (bookings create)

**request:** `Square.CreateBookingRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.searchAvailability({ ...params }) -> Square.SearchAvailabilityResponse

#### Description (bookings search availability)

Searches for availabilities for booking.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings search availability)

```typescript
await client.bookings.searchAvailability({
    query: {
        filter: {
            startAtRange: {},
        },
    },
});
```

#### Parameters (bookings search availability)

**request:** `Square.SearchAvailabilityRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.bulkRetrieveBookings({ ...params }) -> Square.BulkRetrieveBookingsResponse

#### Description (bookings bulk retrieve bookings)

Bulk-Retrieves a list of bookings by booking IDs.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings bulk retrieve bookings)

```typescript
await client.bookings.bulkRetrieveBookings({
    bookingIds: ["booking_ids"],
});
```

#### Parameters (bookings bulk retrieve bookings)

**request:** `Square.BulkRetrieveBookingsRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.getBusinessProfile() -> Square.GetBusinessBookingProfileResponse

#### Description (bookings get business profile)

Retrieves a seller's booking profile.

#### Usage (bookings get business profile)

```typescript
await client.bookings.getBusinessProfile();
```

#### Parameters (bookings get business profile)

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.retrieveLocationBookingProfile({ ...params }) -> Square.RetrieveLocationBookingProfileResponse

#### Description (bookings retrieve location booking profile)

Retrieves a seller's location booking profile.

#### Usage (bookings retrieve location booking profile)

```typescript
await client.bookings.retrieveLocationBookingProfile({
    locationId: "location_id",
});
```

#### Parameters (bookings retrieve location booking profile)

**request:** `Square.RetrieveLocationBookingProfileRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.bulkRetrieveTeamMemberBookingProfiles({ ...params }) -> Square.BulkRetrieveTeamMemberBookingProfilesResponse

#### Description (bookings bulk retrieve team member booking profiles)

Retrieves one or more team members' booking profiles.

#### Usage (bookings bulk retrieve team member booking profiles)

```typescript
await client.bookings.bulkRetrieveTeamMemberBookingProfiles({
    teamMemberIds: ["team_member_ids"],
});
```

#### Parameters (bookings bulk retrieve team member booking profiles)

**request:** `Square.BulkRetrieveTeamMemberBookingProfilesRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.get({ ...params }) -> Square.GetBookingResponse

#### Description (bookings get)

Retrieves a booking.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings get)

```typescript
await client.bookings.get({
    bookingId: "booking_id",
});
```

#### Parameters (bookings get)

**request:** `Square.GetBookingsRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.update({ ...params }) -> Square.UpdateBookingResponse

#### Description (bookings update)

Updates a booking.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings update)

```typescript
await client.bookings.update({
    bookingId: "booking_id",
    booking: {},
});
```

#### Parameters (bookings update)

**request:** `Square.UpdateBookingRequest`

**requestOptions:** `Bookings.RequestOptions`

### client.bookings.cancel({ ...params }) -> Square.CancelBookingResponse

#### Description (bookings cancel)

Cancels an existing booking.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings cancel)

```typescript
await client.bookings.cancel({
    bookingId: "booking_id",
});
```

#### Parameters (bookings cancel)

**request:** `Square.CancelBookingRequest`

**requestOptions:** `Bookings.RequestOptions`

## Cards

### client.cards.list({ ...params }) -> core.Page

#### Description (cards list)

Retrieves a list of cards owned by the account making the request.
A max of 25 cards will be returned.

#### Usage (cards list)

```typescript
const response = await client.cards.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.cards.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (cards list)

**request:** `Square.ListCardsRequest`

**requestOptions:** `Cards.RequestOptions`

### client.cards.create({ ...params }) -> Square.CreateCardResponse

#### Description (cards create)

Adds a card on file to an existing merchant.

#### Usage (cards create)

```typescript
await client.cards.create({
    idempotencyKey: "4935a656-a929-4792-b97c-8848be85c27c",
    sourceId: "cnon:uIbfJXhXETSP197M3GB",
    card: {
        cardholderName: "Amelia Earhart",
        billingAddress: {
            addressLine1: "500 Electric Ave",
            addressLine2: "Suite 600",
            locality: "New York",
            administrativeDistrictLevel1: "NY",
            postalCode: "10003",
            country: "US",
        },
        customerId: "VDKXEEKPJN48QDG3BGGFAK05P8",
        referenceId: "user-id-1",
    },
});
```

#### Parameters (cards create)

**request:** `Square.CreateCardRequest`

**requestOptions:** `Cards.RequestOptions`

### client.cards.get({ ...params }) -> Square.GetCardResponse

#### Description (cards get)

Retrieves details for a specific Card.

#### Usage (cards get)

```typescript
await client.cards.get({
    cardId: "card_id",
});
```

#### Parameters (cards get)

**request:** `Square.GetCardsRequest`

**requestOptions:** `Cards.RequestOptions`

### client.cards.disable({ ...params }) -> Square.DisableCardResponse

#### Description (cards disable)

Disables the card, preventing any further updates or charges.
Disabling an already disabled card is allowed but has no effect.

#### Usage (cards disable)

```typescript
await client.cards.disable({
    cardId: "card_id",
});
```

#### Parameters (cards disable)

**request:** `Square.DisableCardsRequest`

**requestOptions:** `Cards.RequestOptions`

## Catalog

### client.catalog.batchDelete({ ...params }) -> Square.BatchDeleteCatalogObjectsResponse

#### Description (catalog batch delete)

Deletes a set of [CatalogItem](entity:CatalogItem)s based on the
provided list of target IDs and returns a set of successfully deleted IDs in
the response. Deletion is a cascading event such that all children of the
targeted object are also deleted. For example, deleting a CatalogItem will
also delete all of its [CatalogItemVariation](entity:CatalogItemVariation)
children.

`BatchDeleteCatalogObjects` succeeds even if only a portion of the targeted
IDs can be deleted. The response will only include IDs that were
actually deleted.

To ensure consistency, only one delete request is processed at a time per seller account.
While one (batch or non-batch) delete request is being processed, other (batched and non-batched)
delete requests are rejected with the `429` error code.

#### Usage (catalog batch delete)

```typescript
await client.catalog.batchDelete({
    objectIds: ["W62UWFY35CWMYGVWK6TWJDNI", "AA27W3M2GGTF3H6AVPNB77CK"],
});
```

#### Parameters (catalog batch delete)

**request:** `Square.BatchDeleteCatalogObjectsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.batchGet({ ...params }) -> Square.BatchGetCatalogObjectsResponse

#### Description (catalog batch get)

Returns a set of objects based on the provided ID.
Each [CatalogItem](entity:CatalogItem) returned in the set includes all of its
child information including: all of its
[CatalogItemVariation](entity:CatalogItemVariation) objects, references to
its [CatalogModifierList](entity:CatalogModifierList) objects, and the ids of
any [CatalogTax](entity:CatalogTax) objects that apply to it.

#### Usage (catalog batch get)

```typescript
await client.catalog.batchGet({
    objectIds: ["W62UWFY35CWMYGVWK6TWJDNI", "AA27W3M2GGTF3H6AVPNB77CK"],
    includeRelatedObjects: true,
});
```

#### Parameters (catalog batch get)

**request:** `Square.BatchGetCatalogObjectsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.batchUpsert({ ...params }) -> Square.BatchUpsertCatalogObjectsResponse

#### Description (catalog batch upsert)

Creates or updates up to 10,000 target objects based on the provided
list of objects. The target objects are grouped into batches and each batch is
inserted/updated in an all-or-nothing manner. If an object within a batch is
malformed in some way, or violates a database constraint, the entire batch
containing that item will be disregarded. However, other batches in the same
request may still succeed. Each batch may contain up to 1,000 objects, and
batches will be processed in order as long as the total object count for the
request (items, variations, modifier lists, discounts, and taxes) is no more
than 10,000.

To ensure consistency, only one update request is processed at a time per seller account.
While one (batch or non-batch) update request is being processed, other (batched and non-batched)
update requests are rejected with the `429` error code.

#### Usage (catalog batch upsert)

```typescript
await client.catalog.batchUpsert({
    idempotencyKey: "789ff020-f723-43a9-b4b5-43b5dc1fa3dc",
    batches: [
        {
            objects: [
                {
                    type: "ITEM",
                    id: "id",
                },
                {
                    type: "ITEM",
                    id: "id",
                },
                {
                    type: "ITEM",
                    id: "id",
                },
                {
                    type: "TAX",
                    id: "id",
                },
            ],
        },
    ],
});
```

#### Parameters (catalog batch upsert)

**request:** `Square.BatchUpsertCatalogObjectsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.info() -> Square.CatalogInfoResponse

#### Description (catalog info)

Retrieves information about the Square Catalog API, such as batch size
limits that can be used by the `BatchUpsertCatalogObjects` endpoint.

#### Usage (catalog info)

```typescript
await client.catalog.info();
```

#### Parameters (catalog info)

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.list({ ...params }) -> core.Page

#### Description (catalog list)

Returns a list of all [CatalogObject](entity:CatalogObject)s of the specified types in the catalog.

The `types` parameter is specified as a comma-separated list of the [CatalogObjectType](entity:CatalogObjectType) values,
for example, "`ITEM`, `ITEM_VARIATION`, `MODIFIER`, `MODIFIER_LIST`, `CATEGORY`, `DISCOUNT`, `TAX`, `IMAGE`".

**Important:** ListCatalog does not return deleted catalog items. To retrieve
deleted catalog items, use [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)
and set the `include_deleted_objects` attribute value to `true`.

#### Usage (catalog list)

```typescript
const response = await client.catalog.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.catalog.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (catalog list)

**request:** `Square.ListCatalogRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.search({ ...params }) -> Square.SearchCatalogObjectsResponse

#### Description (catalog search)

Searches for [CatalogObject](entity:CatalogObject) of any type by matching supported search attribute values,
excluding custom attribute values on items or item variations, against one or more of the specified query filters.

This (`SearchCatalogObjects`) endpoint differs from the [SearchCatalogItems](api-endpoint:Catalog-SearchCatalogItems)
endpoint in the following aspects:

- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.
- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.
- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.
- The both endpoints have different call conventions, including the query filter formats.

#### Usage (catalog search)

```typescript
await client.catalog.search({
    objectTypes: ["ITEM"],
    query: {
        prefixQuery: {
            attributeName: "name",
            attributePrefix: "tea",
        },
    },
    limit: 100,
});
```

#### Parameters (catalog search)

**request:** `Square.SearchCatalogObjectsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.searchItems({ ...params }) -> Square.SearchCatalogItemsResponse

#### Description (catalog search items)

Searches for catalog items or item variations by matching supported search attribute values, including
custom attribute values, against one or more of the specified query filters.

This (`SearchCatalogItems`) endpoint differs from the [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)
endpoint in the following aspects:

- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.
- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.
- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.
- The both endpoints use different call conventions, including the query filter formats.

#### Usage (catalog search items)

```typescript
await client.catalog.searchItems({
    textFilter: "red",
    categoryIds: ["WINE_CATEGORY_ID"],
    stockLevels: ["OUT", "LOW"],
    enabledLocationIds: ["ATL_LOCATION_ID"],
    limit: 100,
    sortOrder: "ASC",
    productTypes: ["REGULAR"],
    customAttributeFilters: [
        {
            customAttributeDefinitionId: "VEGAN_DEFINITION_ID",
            boolFilter: true,
        },
        {
            customAttributeDefinitionId: "BRAND_DEFINITION_ID",
            stringFilter: "Dark Horse",
        },
        {
            key: "VINTAGE",
            numberFilter: {
                min: "min",
                max: "max",
            },
        },
        {
            customAttributeDefinitionId: "VARIETAL_DEFINITION_ID",
        },
    ],
});
```

#### Parameters (catalog search items)

**request:** `Square.SearchCatalogItemsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.updateItemModifierLists({ ...params }) -> Square.UpdateItemModifierListsResponse

#### Description (catalog update item modifier lists)

Updates the [CatalogModifierList](entity:CatalogModifierList) objects
that apply to the targeted [CatalogItem](entity:CatalogItem) without having
to perform an upsert on the entire item.

#### Usage (catalog update item modifier lists)

```typescript
await client.catalog.updateItemModifierLists({
    itemIds: ["H42BRLUJ5KTZTTMPVSLFAACQ", "2JXOBJIHCWBQ4NZ3RIXQGJA6"],
    modifierListsToEnable: ["H42BRLUJ5KTZTTMPVSLFAACQ", "2JXOBJIHCWBQ4NZ3RIXQGJA6"],
    modifierListsToDisable: ["7WRC16CJZDVLSNDQ35PP6YAD"],
});
```

#### Parameters (catalog update item modifier lists)

**request:** `Square.UpdateItemModifierListsRequest`

**requestOptions:** `Catalog.RequestOptions`

### client.catalog.updateItemTaxes({ ...params }) -> Square.UpdateItemTaxesResponse

#### Description (catalog update item taxes)

Updates the [CatalogTax](entity:CatalogTax) objects that apply to the
targeted [CatalogItem](entity:CatalogItem) without having to perform an
upsert on the entire item.

#### Usage (catalog update item taxes)

```typescript
await client.catalog.updateItemTaxes({
    itemIds: ["H42BRLUJ5KTZTTMPVSLFAACQ", "2JXOBJIHCWBQ4NZ3RIXQGJA6"],
    taxesToEnable: ["4WRCNHCJZDVLSNDQ35PP6YAD"],
    taxesToDisable: ["AQCEGCEBBQONINDOHRGZISEX"],
});
```

#### Parameters (catalog update item taxes)

**request:** `Square.UpdateItemTaxesRequest`

**requestOptions:** `Catalog.RequestOptions`

## Customers

### client.customers.list({ ...params }) -> core.Page

#### Description (customers list)

Lists customer profiles associated with a Square account.

Under normal operating conditions, newly created or updated customer profiles become available
for the listing operation in well under 30 seconds. Occasionally, propagation of the new or updated
profiles can take closer to one minute or longer, especially during network incidents and outages.

#### Usage (customers list)

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

#### Parameters (customers list)

**request:** `Square.ListCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.create({ ...params }) -> Square.CreateCustomerResponse

#### Description (customers create)

Creates a new customer for a business.

You must provide at least one of the following values in your request to this
endpoint:

- `given_name`
- `family_name`
- `company_name`
- `email_address`
- `phone_number`

#### Usage (customers create)

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

#### Parameters (customers create)

**request:** `Square.CreateCustomerRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.batchCreate({ ...params }) -> Square.BulkCreateCustomersResponse

#### Description (customers batch create)

Creates multiple [customer profiles](entity:Customer) for a business.

This endpoint takes a map of individual create requests and returns a map of responses.

You must provide at least one of the following values in each create request:

- `given_name`
- `family_name`
- `company_name`
- `email_address`
- `phone_number`

#### Usage (customers batch create)

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

#### Parameters (customers batch create)

**request:** `Square.BulkCreateCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.bulkDeleteCustomers({ ...params }) -> Square.BulkDeleteCustomersResponse

#### Description (customers bulk delete customers)

Deletes multiple customer profiles.

The endpoint takes a list of customer IDs and returns a map of responses.

#### Usage (customers bulk delete customers)

```typescript
await client.customers.bulkDeleteCustomers({
    customerIds: ["8DDA5NZVBZFGAX0V3HPF81HHE0", "N18CPRVXR5214XPBBA6BZQWF3C", "2GYD7WNXF7BJZW1PMGNXZ3Y8M8"],
});
```

#### Parameters (customers bulk delete customers)

**request:** `Square.BulkDeleteCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.bulkRetrieveCustomers({ ...params }) -> Square.BulkRetrieveCustomersResponse

#### Description (customers bulk retrieve customers)

Retrieves multiple customer profiles.

This endpoint takes a list of customer IDs and returns a map of responses.

#### Usage (customers bulk retrieve customers)

```typescript
await client.customers.bulkRetrieveCustomers({
    customerIds: ["8DDA5NZVBZFGAX0V3HPF81HHE0", "N18CPRVXR5214XPBBA6BZQWF3C", "2GYD7WNXF7BJZW1PMGNXZ3Y8M8"],
});
```

#### Parameters (customers bulk retrieve customers)

**request:** `Square.BulkRetrieveCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.bulkUpdateCustomers({ ...params }) -> Square.BulkUpdateCustomersResponse

#### Description (customers bulk update customers)

Updates multiple customer profiles.

This endpoint takes a map of individual update requests and returns a map of responses.

#### Usage (customers bulk update customers)

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

#### Parameters (customers bulk update customers)

**request:** `Square.BulkUpdateCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.search({ ...params }) -> Square.SearchCustomersResponse

#### Description (customers search)

Searches the customer profiles associated with a Square account using one or more supported query filters.

Calling `SearchCustomers` without any explicit query filter returns all
customer profiles ordered alphabetically based on `given_name` and
`family_name`.

Under normal operating conditions, newly created or updated customer profiles become available
for the search operation in well under 30 seconds. Occasionally, propagation of the new or updated
profiles can take closer to one minute or longer, especially during network incidents and outages.

#### Usage (customers search)

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

#### Parameters (customers search)

**request:** `Square.SearchCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.get({ ...params }) -> Square.GetCustomerResponse

#### Description (customers get)

Returns details for a single customer.

#### Usage (customers get)

```typescript
await client.customers.get({
    customerId: "customer_id",
});
```

#### Parameters (customers get)

**request:** `Square.GetCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.update({ ...params }) -> Square.UpdateCustomerResponse

#### Description (customers update)

Updates a customer profile. This endpoint supports sparse updates, so only new or changed fields are required in the request.
To add or update a field, specify the new value. To remove a field, specify `null`.

To update a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.

#### Usage (customers update)

```typescript
await client.customers.update({
    customerId: "customer_id",
    emailAddress: "New.Amelia.Earhart@example.com",
    note: "updated customer note",
    version: 2,
});
```

#### Parameters (customers update)

**request:** `Square.UpdateCustomerRequest`

**requestOptions:** `Customers.RequestOptions`

### client.customers.delete({ ...params }) -> Square.DeleteCustomerResponse

#### Description (customers delete)

Deletes a customer profile from a business.

To delete a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.

#### Usage (customers delete)

```typescript
await client.customers.delete({
    customerId: "customer_id",
});
```

#### Parameters (customers delete)

**request:** `Square.DeleteCustomersRequest`

**requestOptions:** `Customers.RequestOptions`

## Devices

### client.devices.list({ ...params }) -> core.Page

#### Description (devices list)

List devices associated with the merchant. Currently, only Terminal API
devices are supported.

#### Usage (devices list)

```typescript
const response = await client.devices.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.devices.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (devices list)

**request:** `Square.ListDevicesRequest`

**requestOptions:** `Devices.RequestOptions`

### client.devices.get({ ...params }) -> Square.GetDeviceResponse

#### Description (devices get)

Retrieves Device with the associated `device_id`.

#### Usage (devices get)

```typescript
await client.devices.get({
    deviceId: "device_id",
});
```

#### Parameters (devices get)

**request:** `Square.GetDevicesRequest`

**requestOptions:** `Devices.RequestOptions`

## Disputes

### client.disputes.list({ ...params }) -> core.Page

#### Description (disputes list)

Returns a list of disputes associated with a particular account.

#### Usage (disputes list)

```typescript
const response = await client.disputes.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.disputes.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (disputes list)

**request:** `Square.ListDisputesRequest`

**requestOptions:** `Disputes.RequestOptions`

### client.disputes.get({ ...params }) -> Square.GetDisputeResponse

#### Description (disputes get)

Returns details about a specific dispute.

#### Usage (disputes get)

```typescript
await client.disputes.get({
    disputeId: "dispute_id",
});
```

#### Parameters (disputes get)

**request:** `Square.GetDisputesRequest`

**requestOptions:** `Disputes.RequestOptions`

### client.disputes.accept({ ...params }) -> Square.AcceptDisputeResponse

#### Description (disputes accept)

Accepts the loss on a dispute. Square returns the disputed amount to the cardholder and
updates the dispute state to ACCEPTED.

Square debits the disputed amount from the seller’s Square account. If the Square account
does not have sufficient funds, Square debits the associated bank account.

#### Usage (disputes accept)

```typescript
await client.disputes.accept({
    disputeId: "dispute_id",
});
```

#### Parameters (disputes accept)

**request:** `Square.AcceptDisputesRequest`

**requestOptions:** `Disputes.RequestOptions`

### client.disputes.createEvidenceFile({ ...params }) -> Square.CreateDisputeEvidenceFileResponse

#### Description (disputes create evidence file)

Uploads a file to use as evidence in a dispute challenge. The endpoint accepts HTTP
multipart/form-data file uploads in HEIC, HEIF, JPEG, PDF, PNG, and TIFF formats.

#### Usage (disputes create evidence file)

```typescript
await client.disputes.createEvidenceFile({
    disputeId: "dispute_id",
});
```

#### Parameters (disputes create evidence file)

**request:** `Square.CreateEvidenceFileDisputesRequest`

**requestOptions:** `Disputes.RequestOptions`

### client.disputes.createEvidenceText({ ...params }) -> Square.CreateDisputeEvidenceTextResponse

#### Description (disputes create evidence text)

Uploads text to use as evidence for a dispute challenge.

#### Usage (disputes create evidence text)

```typescript
await client.disputes.createEvidenceText({
    disputeId: "dispute_id",
    idempotencyKey: "ed3ee3933d946f1514d505d173c82648",
    evidenceType: "TRACKING_NUMBER",
    evidenceText: "1Z8888888888888888",
});
```

#### Parameters (disputes create evidence text)

**request:** `Square.CreateDisputeEvidenceTextRequest`

**requestOptions:** `Disputes.RequestOptions`

### client.disputes.submitEvidence({ ...params }) -> Square.SubmitEvidenceResponse

#### Description (disputes submit evidence)

Submits evidence to the cardholder's bank.

The evidence submitted by this endpoint includes evidence uploaded
using the [CreateDisputeEvidenceFile](api-endpoint:Disputes-CreateDisputeEvidenceFile) and
[CreateDisputeEvidenceText](api-endpoint:Disputes-CreateDisputeEvidenceText) endpoints and
evidence automatically provided by Square, when available. Evidence cannot be removed from
a dispute after submission.

#### Usage (disputes submit evidence)

```typescript
await client.disputes.submitEvidence({
    disputeId: "dispute_id",
});
```

#### Parameters (disputes submit evidence)

**request:** `Square.SubmitEvidenceDisputesRequest`

**requestOptions:** `Disputes.RequestOptions`

## Employees

### client.employees.list({ ...params }) -> core.Page

#### Description (employees list)

#### Usage (employees list)

```typescript
const response = await client.employees.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.employees.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (employees list)

**request:** `Square.ListEmployeesRequest`

**requestOptions:** `Employees.RequestOptions`

### client.employees.get({ ...params }) -> Square.GetEmployeeResponse

#### Description (employees get)

### Usage

```typescript
await client.employees.get({
    id: "id",
});
```

#### Parameters (employees get)

**request:** `Square.GetEmployeesRequest`

**requestOptions:** `Employees.RequestOptions`

## Events

### client.events.searchEvents({ ...params }) -> Square.SearchEventsResponse

#### Description (events search events)

Search for Square API events that occur within a 28-day timeframe.

#### Usage (events search events)

```typescript
await client.events.searchEvents();
```

#### Parameters (events search events)

**request:** `Square.SearchEventsRequest`

**requestOptions:** `Events.RequestOptions`

### client.events.disableEvents() -> Square.DisableEventsResponse

#### Description (events disable events)

Disables events to prevent them from being searchable.
All events are disabled by default. You must enable events to make them searchable.
Disabling events for a specific time period prevents them from being searchable, even if you re-enable them later.

#### Usage (events disable events)

```typescript
await client.events.disableEvents();
```

#### Parameters (events disable events)

**requestOptions:** `Events.RequestOptions`

### client.events.enableEvents() -> Square.EnableEventsResponse

#### Description (events enable events)

Enables events to make them searchable. Only events that occur while in the enabled state are searchable.

#### Usage (events enable events)

```typescript
await client.events.enableEvents();
```

#### Parameters (events enable events)

**requestOptions:** `Events.RequestOptions`

### client.events.listEventTypes({ ...params }) -> Square.ListEventTypesResponse

#### Description (events list event types)

Lists all event types that you can subscribe to as webhooks or query using the Events API.

#### Usage (events list event types)

```typescript
await client.events.listEventTypes();
```

#### Parameters (events list event types)

**request:** `Square.ListEventTypesRequest`

**requestOptions:** `Events.RequestOptions`

## GiftCards

### client.giftCards.list({ ...params }) -> core.Page

#### Description (gift cards list)

Lists all gift cards. You can specify optional filters to retrieve
a subset of the gift cards. Results are sorted by `created_at` in ascending order.

#### Usage (gift cards list)

```typescript
const response = await client.giftCards.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.giftCards.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (gift cards list)

**request:** `Square.ListGiftCardsRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.create({ ...params }) -> Square.CreateGiftCardResponse

#### Description (gift cards create)

Creates a digital gift card or registers a physical (plastic) gift card. The resulting gift card
has a `PENDING` state. To activate a gift card so that it can be redeemed for purchases, call
[CreateGiftCardActivity](api-endpoint:GiftCardActivities-CreateGiftCardActivity) and create an `ACTIVATE`
activity with the initial balance. Alternatively, you can use [RefundPayment](api-endpoint:Refunds-RefundPayment)
to refund a payment to the new gift card.

#### Usage (gift cards create)

```typescript
await client.giftCards.create({
    idempotencyKey: "NC9Tm69EjbjtConu",
    locationId: "81FN9BNFZTKS4",
    giftCard: {
        type: "DIGITAL",
    },
});
```

#### Parameters (gift cards create)

**request:** `Square.CreateGiftCardRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.getFromGan({ ...params }) -> Square.GetGiftCardFromGanResponse

#### Description (gift cards get from gan)

Retrieves a gift card using the gift card account number (GAN).

#### Usage (gift cards get from gan)

```typescript
await client.giftCards.getFromGan({
    gan: "7783320001001635",
});
```

#### Parameters (gift cards get from gan)

**request:** `Square.GetGiftCardFromGanRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.getFromNonce({ ...params }) -> Square.GetGiftCardFromNonceResponse

#### Description (gift cards get from nonce)

Retrieves a gift card using a secure payment token that represents the gift card.

#### Usage (gift cards get from nonce)

```typescript
await client.giftCards.getFromNonce({
    nonce: "cnon:7783322135245171",
});
```

#### Parameters (gift cards get from nonce)

**request:** `Square.GetGiftCardFromNonceRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.linkCustomer({ ...params }) -> Square.LinkCustomerToGiftCardResponse

#### Description (gift cards link customer)

Links a customer to a gift card, which is also referred to as adding a card on file.

#### Usage (gift cards link customer)

```typescript
await client.giftCards.linkCustomer({
    giftCardId: "gift_card_id",
    customerId: "GKY0FZ3V717AH8Q2D821PNT2ZW",
});
```

#### Parameters (gift cards link customer)

**request:** `Square.LinkCustomerToGiftCardRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.unlinkCustomer({ ...params }) -> Square.UnlinkCustomerFromGiftCardResponse

#### Description (gift cards unlink customer)

Unlinks a customer from a gift card, which is also referred to as removing a card on file.

#### Usage (gift cards unlink customer)

```typescript
await client.giftCards.unlinkCustomer({
    giftCardId: "gift_card_id",
    customerId: "GKY0FZ3V717AH8Q2D821PNT2ZW",
});
```

#### Parameters (gift cards unlink customer)

**request:** `Square.UnlinkCustomerFromGiftCardRequest`

**requestOptions:** `GiftCards.RequestOptions`

### client.giftCards.get({ ...params }) -> Square.GetGiftCardResponse

#### Description (gift cards get)

Retrieves a gift card using the gift card ID.

#### Usage (gift cards get)

```typescript
await client.giftCards.get({
    id: "id",
});
```

#### Parameters (gift cards get)

**request:** `Square.GetGiftCardsRequest`

**requestOptions:** `GiftCards.RequestOptions`

## Inventory

### client.inventory.deprecatedGetAdjustment({ ...params }) -> Square.GetInventoryAdjustmentResponse

#### Description (inventory deprecated get adjustment)

Deprecated version of [RetrieveInventoryAdjustment](api-endpoint:Inventory-RetrieveInventoryAdjustment) after the endpoint URL
is updated to conform to the standard convention.

#### Usage (inventory deprecated get adjustment)

```typescript
await client.inventory.deprecatedGetAdjustment({
    adjustmentId: "adjustment_id",
});
```

#### Parameters (inventory deprecated get adjustment)

**request:** `Square.DeprecatedGetAdjustmentInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.getAdjustment({ ...params }) -> Square.GetInventoryAdjustmentResponse

#### Description (inventory get adjustment)

Returns the [InventoryAdjustment](entity:InventoryAdjustment) object
with the provided `adjustment_id`.

#### Usage (inventory get adjustment)

```typescript
await client.inventory.getAdjustment({
    adjustmentId: "adjustment_id",
});
```

#### Parameters (inventory get adjustment)

**request:** `Square.GetAdjustmentInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.deprecatedBatchChange({ ...params }) -> Square.BatchChangeInventoryResponse

#### Description (inventory deprecated batch change)

Deprecated version of [BatchChangeInventory](api-endpoint:Inventory-BatchChangeInventory) after the endpoint URL
is updated to conform to the standard convention.

#### Usage (inventory deprecated batch change)

```typescript
await client.inventory.deprecatedBatchChange({
    idempotencyKey: "8fc6a5b0-9fe8-4b46-b46b-2ef95793abbe",
    changes: [
        {
            type: "PHYSICAL_COUNT",
            physicalCount: {
                referenceId: "1536bfbf-efed-48bf-b17d-a197141b2a92",
                catalogObjectId: "W62UWFY35CWMYGVWK6TWJDNI",
                state: "IN_STOCK",
                locationId: "C6W5YS5QM06F5",
                quantity: "53",
                teamMemberId: "LRK57NSQ5X7PUD05",
                occurredAt: "2016-11-16T22:25:24.878Z",
            },
        },
    ],
    ignoreUnchangedCounts: true,
});
```

#### Parameters (inventory deprecated batch change)

**request:** `Square.BatchChangeInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.deprecatedBatchGetChanges({ ...params }) -> Square.BatchGetInventoryChangesResponse

#### Description (inventory deprecated batch get changes)

Deprecated version of [BatchRetrieveInventoryChanges](api-endpoint:Inventory-BatchRetrieveInventoryChanges) after the endpoint URL
is updated to conform to the standard convention.

#### Usage (inventory deprecated batch get changes)

```typescript
await client.inventory.deprecatedBatchGetChanges({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["C6W5YS5QM06F5"],
    types: ["PHYSICAL_COUNT"],
    states: ["IN_STOCK"],
    updatedAfter: "2016-11-01T00:00:00.000Z",
    updatedBefore: "2016-12-01T00:00:00.000Z",
});
```

#### Parameters (inventory deprecated batch get changes)

**request:** `Square.BatchRetrieveInventoryChangesRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.deprecatedBatchGetCounts({ ...params }) -> Square.BatchGetInventoryCountsResponse

#### Description (inventory deprecated batch get counts)

Deprecated version of [BatchRetrieveInventoryCounts](api-endpoint:Inventory-BatchRetrieveInventoryCounts) after the endpoint URL
is updated to conform to the standard convention.

#### Usage (inventory deprecated batch get counts)

```typescript
await client.inventory.deprecatedBatchGetCounts({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["59TNP9SA8VGDA"],
    updatedAfter: "2016-11-16T00:00:00.000Z",
});
```

#### Parameters (inventory deprecated batch get counts)

**request:** `Square.BatchGetInventoryCountsRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.batchCreateChanges({ ...params }) -> Square.BatchChangeInventoryResponse

#### Description (inventory batch create changes)

Applies adjustments and counts to the provided item quantities.

On success: returns the current calculated counts for all objects
referenced in the request.
On failure: returns a list of related errors.

#### Usage (inventory batch create changes)

```typescript
await client.inventory.batchCreateChanges({
    idempotencyKey: "8fc6a5b0-9fe8-4b46-b46b-2ef95793abbe",
    changes: [
        {
            type: "PHYSICAL_COUNT",
            physicalCount: {
                referenceId: "1536bfbf-efed-48bf-b17d-a197141b2a92",
                catalogObjectId: "W62UWFY35CWMYGVWK6TWJDNI",
                state: "IN_STOCK",
                locationId: "C6W5YS5QM06F5",
                quantity: "53",
                teamMemberId: "LRK57NSQ5X7PUD05",
                occurredAt: "2016-11-16T22:25:24.878Z",
            },
        },
    ],
    ignoreUnchangedCounts: true,
});
```

#### Parameters (inventory batch create changes)

**request:** `Square.BatchChangeInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.batchGetChanges({ ...params }) -> core.Page

#### Description (inventory batch get changes)

Returns historical physical counts and adjustments based on the
provided filter criteria.

Results are paginated and sorted in ascending order according their
`occurred_at` timestamp (oldest first).

BatchRetrieveInventoryChanges is a catch-all query endpoint for queries
that cannot be handled by other, simpler endpoints.

#### Usage (inventory batch get changes)

```typescript
const response = await client.inventory.batchGetChanges({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["C6W5YS5QM06F5"],
    types: ["PHYSICAL_COUNT"],
    states: ["IN_STOCK"],
    updatedAfter: "2016-11-01T00:00:00.000Z",
    updatedBefore: "2016-12-01T00:00:00.000Z",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.inventory.batchGetChanges({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["C6W5YS5QM06F5"],
    types: ["PHYSICAL_COUNT"],
    states: ["IN_STOCK"],
    updatedAfter: "2016-11-01T00:00:00.000Z",
    updatedBefore: "2016-12-01T00:00:00.000Z",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (inventory batch get changes)

**request:** `Square.BatchRetrieveInventoryChangesRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.batchGetCounts({ ...params }) -> core.Page

#### Description (inventory batch get counts)

Returns current counts for the provided
[CatalogObject](entity:CatalogObject)s at the requested
[Location](entity:Location)s.

Results are paginated and sorted in descending order according to their
`calculated_at` timestamp (newest first).

When `updated_after` is specified, only counts that have changed since that
time (based on the server timestamp for the most recent change) are
returned. This allows clients to perform a "sync" operation, for example
in response to receiving a Webhook notification.

#### Usage (inventory batch get counts)

```typescript
const response = await client.inventory.batchGetCounts({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["59TNP9SA8VGDA"],
    updatedAfter: "2016-11-16T00:00:00.000Z",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.inventory.batchGetCounts({
    catalogObjectIds: ["W62UWFY35CWMYGVWK6TWJDNI"],
    locationIds: ["59TNP9SA8VGDA"],
    updatedAfter: "2016-11-16T00:00:00.000Z",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (inventory batch get counts)

**request:** `Square.BatchGetInventoryCountsRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.deprecatedGetPhysicalCount({ ...params }) -> Square.GetInventoryPhysicalCountResponse

#### Description (inventory deprecated get physical count)

Deprecated version of [RetrieveInventoryPhysicalCount](api-endpoint:Inventory-RetrieveInventoryPhysicalCount) after the endpoint URL
is updated to conform to the standard convention.

#### Usage (inventory deprecated get physical count)

```typescript
await client.inventory.deprecatedGetPhysicalCount({
    physicalCountId: "physical_count_id",
});
```

#### Parameters (inventory deprecated get physical count)

**request:** `Square.DeprecatedGetPhysicalCountInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.getPhysicalCount({ ...params }) -> Square.GetInventoryPhysicalCountResponse

#### Description (inventory get physical count)

Returns the [InventoryPhysicalCount](entity:InventoryPhysicalCount)
object with the provided `physical_count_id`.

#### Usage (inventory get physical count)

```typescript
await client.inventory.getPhysicalCount({
    physicalCountId: "physical_count_id",
});
```

#### Parameters (inventory get physical count)

**request:** `Square.GetPhysicalCountInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.getTransfer({ ...params }) -> Square.GetInventoryTransferResponse

#### Description (inventory get transfer)

Returns the [InventoryTransfer](entity:InventoryTransfer) object
with the provided `transfer_id`.

#### Usage (inventory get transfer)

```typescript
await client.inventory.getTransfer({
    transferId: "transfer_id",
});
```

#### Parameters (inventory get transfer)

**request:** `Square.GetTransferInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.get({ ...params }) -> core.Page

#### Description (inventory get)

Retrieves the current calculated stock count for a given
[CatalogObject](entity:CatalogObject) at a given set of
[Location](entity:Location)s. Responses are paginated and unsorted.
For more sophisticated queries, use a batch endpoint.

#### Usage (inventory get)

```typescript
const response = await client.inventory.get({
    catalogObjectId: "catalog_object_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.inventory.get({
    catalogObjectId: "catalog_object_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (inventory get)

**request:** `Square.GetInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

### client.inventory.changes({ ...params }) -> core.Page

#### Description (inventory changes)

Returns a set of physical counts and inventory adjustments for the
provided [CatalogObject](entity:CatalogObject) at the requested
[Location](entity:Location)s.

You can achieve the same result by calling [BatchRetrieveInventoryChanges](api-endpoint:Inventory-BatchRetrieveInventoryChanges)
and having the `catalog_object_ids` list contain a single element of the `CatalogObject` ID.

Results are paginated and sorted in descending order according to their
`occurred_at` timestamp (newest first).

There are no limits on how far back the caller can page. This endpoint can be
used to display recent changes for a specific item. For more
sophisticated queries, use a batch endpoint.

#### Usage (inventory changes)

```typescript
const response = await client.inventory.changes({
    catalogObjectId: "catalog_object_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.inventory.changes({
    catalogObjectId: "catalog_object_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (inventory changes)

**request:** `Square.ChangesInventoryRequest`

**requestOptions:** `Inventory.RequestOptions`

## Invoices

### client.invoices.list({ ...params }) -> core.Page

#### Description (invoices list)

Returns a list of invoices for a given location. The response
is paginated. If truncated, the response includes a `cursor` that you  
use in a subsequent request to retrieve the next set of invoices.

#### Usage (invoices list)

```typescript
const response = await client.invoices.list({
    locationId: "location_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.invoices.list({
    locationId: "location_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (invoices list)

**request:** `Square.ListInvoicesRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.create({ ...params }) -> Square.CreateInvoiceResponse

#### Description (invoices create)

Creates a draft [invoice](entity:Invoice)
for an order created using the Orders API.

A draft invoice remains in your account and no action is taken.
You must publish the invoice before Square can process it (send it to the customer's email address or charge the customer’s card on file).

#### Usage (invoices create)

```typescript
await client.invoices.create({
    invoice: {
        locationId: "ES0RJRZYEC39A",
        orderId: "CAISENgvlJ6jLWAzERDzjyHVybY",
        primaryRecipient: {
            customerId: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
        },
        paymentRequests: [
            {
                requestType: "BALANCE",
                dueDate: "2030-01-24",
                tippingEnabled: true,
                automaticPaymentSource: "NONE",
                reminders: [
                    {
                        relativeScheduledDays: -1,
                        message: "Your invoice is due tomorrow",
                    },
                ],
            },
        ],
        deliveryMethod: "EMAIL",
        invoiceNumber: "inv-100",
        title: "Event Planning Services",
        description: "We appreciate your business!",
        scheduledAt: "2030-01-13T10:00:00Z",
        acceptedPaymentMethods: {
            card: true,
            squareGiftCard: false,
            bankAccount: false,
            buyNowPayLater: false,
            cashAppPay: false,
        },
        customFields: [
            {
                label: "Event Reference Number",
                value: "Ref. #1234",
                placement: "ABOVE_LINE_ITEMS",
            },
            {
                label: "Terms of Service",
                value: "The terms of service are...",
                placement: "BELOW_LINE_ITEMS",
            },
        ],
        saleOrServiceDate: "2030-01-24",
        storePaymentMethodEnabled: false,
    },
    idempotencyKey: "ce3748f9-5fc1-4762-aa12-aae5e843f1f4",
});
```

#### Parameters (invoices create)

**request:** `Square.CreateInvoiceRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.search({ ...params }) -> Square.SearchInvoicesResponse

#### Description (invoices search)

Searches for invoices from a location specified in
the filter. You can optionally specify customers in the filter for whom to
retrieve invoices. In the current implementation, you can only specify one location and
optionally one customer.

The response is paginated. If truncated, the response includes a `cursor`
that you use in a subsequent request to retrieve the next set of invoices.

#### Usage (invoices search)

```typescript
await client.invoices.search({
    query: {
        filter: {
            locationIds: ["ES0RJRZYEC39A"],
            customerIds: ["JDKYHBWT1D4F8MFH63DBMEN8Y4"],
        },
        sort: {
            field: "INVOICE_SORT_DATE",
            order: "DESC",
        },
    },
    limit: 100,
});
```

#### Parameters (invoices search)

**request:** `Square.SearchInvoicesRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.get({ ...params }) -> Square.GetInvoiceResponse

#### Description (invoices get)

Retrieves an invoice by invoice ID.

#### Usage (invoices get)

```typescript
await client.invoices.get({
    invoiceId: "invoice_id",
});
```

#### Parameters (invoices get)

**request:** `Square.GetInvoicesRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.update({ ...params }) -> Square.UpdateInvoiceResponse

#### Description (invoices update)

Updates an invoice. This endpoint supports sparse updates, so you only need
to specify the fields you want to change along with the required `version` field.
Some restrictions apply to updating invoices. For example, you cannot change the
`order_id` or `location_id` field.

#### Usage (invoices update)

```typescript
await client.invoices.update({
    invoiceId: "invoice_id",
    invoice: {
        version: 1,
        paymentRequests: [
            {
                uid: "2da7964f-f3d2-4f43-81e8-5aa220bf3355",
                tippingEnabled: false,
            },
        ],
    },
    idempotencyKey: "4ee82288-0910-499e-ab4c-5d0071dad1be",
});
```

#### Parameters (invoices update)

**request:** `Square.UpdateInvoiceRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.delete({ ...params }) -> Square.DeleteInvoiceResponse

#### Description (invoices delete)

Deletes the specified invoice. When an invoice is deleted, the
associated order status changes to CANCELED. You can only delete a draft
invoice (you cannot delete a published invoice, including one that is scheduled for processing).

#### Usage (invoices delete)

```typescript
await client.invoices.delete({
    invoiceId: "invoice_id",
});
```

#### Parameters (invoices delete)

**request:** `Square.DeleteInvoicesRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.createInvoiceAttachment({ ...params }) -> Square.CreateInvoiceAttachmentResponse

#### Description (invoices create invoice attachment)

Uploads a file and attaches it to an invoice. This endpoint accepts HTTP multipart/form-data file uploads
with a JSON `request` part and a `file` part. The `file` part must be a `readable stream` that contains a file
in a supported format: GIF, JPEG, PNG, TIFF, BMP, or PDF.

Invoices can have up to 10 attachments with a total file size of 25 MB. Attachments can be added only to invoices
in the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.

**NOTE:** When testing in the Sandbox environment, the total file size is limited to 1 KB.

#### Usage (invoices create invoice attachment)

```typescript
await client.invoices.createInvoiceAttachment({
    invoiceId: "invoice_id",
});
```

#### Parameters (invoices create invoice attachment)

**request:** `Square.CreateInvoiceAttachmentRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.deleteInvoiceAttachment({ ...params }) -> Square.DeleteInvoiceAttachmentResponse

#### Description (invoices delete invoice attachment)

Removes an attachment from an invoice and permanently deletes the file. Attachments can be removed only
from invoices in the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.

#### Usage (invoices delete invoice attachment)

```typescript
await client.invoices.deleteInvoiceAttachment({
    invoiceId: "invoice_id",
    attachmentId: "attachment_id",
});
```

#### Parameters (invoices delete invoice attachment)

**request:** `Square.DeleteInvoiceAttachmentRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.cancel({ ...params }) -> Square.CancelInvoiceResponse

#### Description (invoices cancel)

Cancels an invoice. The seller cannot collect payments for
the canceled invoice.

You cannot cancel an invoice in the `DRAFT` state or in a terminal state: `PAID`, `REFUNDED`, `CANCELED`, or `FAILED`.

#### Usage (invoices cancel)

```typescript
await client.invoices.cancel({
    invoiceId: "invoice_id",
    version: 0,
});
```

#### Parameters (invoices cancel)

**request:** `Square.CancelInvoiceRequest`

**requestOptions:** `Invoices.RequestOptions`

### client.invoices.publish({ ...params }) -> Square.PublishInvoiceResponse

#### Description (invoices publish)

Publishes the specified draft invoice.

After an invoice is published, Square
follows up based on the invoice configuration. For example, Square
sends the invoice to the customer's email address, charges the customer's card on file, or does
nothing. Square also makes the invoice available on a Square-hosted invoice page.

The invoice `status` also changes from `DRAFT` to a status
based on the invoice configuration. For example, the status changes to `UNPAID` if
Square emails the invoice or `PARTIALLY_PAID` if Square charges a card on file for a portion of the
invoice amount.

In addition to the required `ORDERS_WRITE` and `INVOICES_WRITE` permissions, `CUSTOMERS_READ`
and `PAYMENTS_WRITE` are required when publishing invoices configured for card-on-file payments.

#### Usage (invoices publish)

```typescript
await client.invoices.publish({
    invoiceId: "invoice_id",
    version: 1,
    idempotencyKey: "32da42d0-1997-41b0-826b-f09464fc2c2e",
});
```

#### Parameters (invoices publish)

**request:** `Square.PublishInvoiceRequest`

**requestOptions:** `Invoices.RequestOptions`

## Locations

### client.locations.list() -> Square.ListLocationsResponse

#### Description (locations list)

Provides details about all of the seller's [locations](https://developer.squareup.com/docs/locations-api),
including those with an inactive status. Locations are listed alphabetically by `name`.

#### Usage (locations list)

```typescript
await client.locations.list();
```

#### Parameters (locations list)

**requestOptions:** `Locations.RequestOptions`

### client.locations.create({ ...params }) -> Square.CreateLocationResponse

#### Description (locations create)

Creates a [location](https://developer.squareup.com/docs/locations-api).
Creating new locations allows for separate configuration of receipt layouts, item prices,
and sales reports. Developers can use locations to separate sales activity through applications
that integrate with Square from sales activity elsewhere in a seller's account.
Locations created programmatically with the Locations API last forever and
are visible to the seller for their own management. Therefore, ensure that
each location has a sensible and unique name.

#### Usage (locations create)

```typescript
await client.locations.create({
    location: {
        name: "Midtown",
        address: {
            addressLine1: "1234 Peachtree St. NE",
            locality: "Atlanta",
            administrativeDistrictLevel1: "GA",
            postalCode: "30309",
        },
        description: "Midtown Atlanta store",
    },
});
```

#### Parameters (locations create)

**request:** `Square.CreateLocationRequest`

**requestOptions:** `Locations.RequestOptions`

### client.locations.get({ ...params }) -> Square.GetLocationResponse

#### Description (locations get)

Retrieves details of a single location. Specify "main"
as the location ID to retrieve details of the [main location](https://developer.squareup.com/docs/locations-api#about-the-main-location).

#### Usage (locations get)

```typescript
await client.locations.get({
    locationId: "location_id",
});
```

#### Parameters (locations get)

**request:** `Square.GetLocationsRequest`

**requestOptions:** `Locations.RequestOptions`

### client.locations.update({ ...params }) -> Square.UpdateLocationResponse

#### Description (locations update)

Updates a [location](https://developer.squareup.com/docs/locations-api).

#### Usage (locations update)

```typescript
await client.locations.update({
    locationId: "location_id",
    location: {
        businessHours: {
            periods: [
                {
                    dayOfWeek: "FRI",
                    startLocalTime: "07:00",
                    endLocalTime: "18:00",
                },
                {
                    dayOfWeek: "SAT",
                    startLocalTime: "07:00",
                    endLocalTime: "18:00",
                },
                {
                    dayOfWeek: "SUN",
                    startLocalTime: "09:00",
                    endLocalTime: "15:00",
                },
            ],
        },
        description: "Midtown Atlanta store - Open weekends",
    },
});
```

#### Parameters (locations update)

**request:** `Square.UpdateLocationRequest`

**requestOptions:** `Locations.RequestOptions`

### client.locations.checkouts({ ...params }) -> Square.CreateCheckoutResponse

#### Description (locations checkouts)

Links a `checkoutId` to a `checkout_page_url` that customers are
directed to in order to provide their payment information using a
payment processing workflow hosted on connect.squareup.com.

NOTE: The Checkout API has been updated with new features.
For more information, see [Checkout API highlights](https://developer.squareup.com/docs/checkout-api#checkout-api-highlights).

#### Usage (locations checkouts)

```typescript
await client.locations.checkouts({
    locationId: "location_id",
    idempotencyKey: "86ae1696-b1e3-4328-af6d-f1e04d947ad6",
    order: {
        order: {
            locationId: "location_id",
            referenceId: "reference_id",
            customerId: "customer_id",
            lineItems: [
                {
                    name: "Printed T Shirt",
                    quantity: "2",
                    appliedTaxes: [
                        {
                            taxUid: "38ze1696-z1e3-5628-af6d-f1e04d947fg3",
                        },
                    ],
                    appliedDiscounts: [
                        {
                            discountUid: "56ae1696-z1e3-9328-af6d-f1e04d947gd4",
                        },
                    ],
                    basePriceMoney: {
                        amount: 1500,
                        currency: "USD",
                    },
                },
                {
                    name: "Slim Jeans",
                    quantity: "1",
                    basePriceMoney: {
                        amount: 2500,
                        currency: "USD",
                    },
                },
                {
                    name: "Woven Sweater",
                    quantity: "3",
                    basePriceMoney: {
                        amount: 3500,
                        currency: "USD",
                    },
                },
            ],
            taxes: [
                {
                    uid: "38ze1696-z1e3-5628-af6d-f1e04d947fg3",
                    type: "INCLUSIVE",
                    percentage: "7.75",
                    scope: "LINE_ITEM",
                },
            ],
            discounts: [
                {
                    uid: "56ae1696-z1e3-9328-af6d-f1e04d947gd4",
                    type: "FIXED_AMOUNT",
                    amountMoney: {
                        amount: 100,
                        currency: "USD",
                    },
                    scope: "LINE_ITEM",
                },
            ],
        },
        idempotencyKey: "12ae1696-z1e3-4328-af6d-f1e04d947gd4",
    },
    askForShippingAddress: true,
    merchantSupportEmail: "merchant+support@website.com",
    prePopulateBuyerEmail: "example@email.com",
    prePopulateShippingAddress: {
        addressLine1: "1455 Market St.",
        addressLine2: "Suite 600",
        locality: "San Francisco",
        administrativeDistrictLevel1: "CA",
        postalCode: "94103",
        country: "US",
        firstName: "Jane",
        lastName: "Doe",
    },
    redirectUrl: "https://merchant.website.com/order-confirm",
    additionalRecipients: [
        {
            locationId: "057P5VYJ4A5X1",
            description: "Application fees",
            amountMoney: {
                amount: 60,
                currency: "USD",
            },
        },
    ],
});
```

#### Parameters (locations checkouts)

**request:** `Square.CreateCheckoutRequest`

**requestOptions:** `Locations.RequestOptions`

## Loyalty

### client.loyalty.searchEvents({ ...params }) -> Square.SearchLoyaltyEventsResponse

#### Description (loyalty search events)

Searches for loyalty events.

A Square loyalty program maintains a ledger of events that occur during the lifetime of a
buyer's loyalty account. Each change in the point balance
(for example, points earned, points redeemed, and points expired) is
recorded in the ledger. Using this endpoint, you can search the ledger for events.

Search results are sorted by `created_at` in descending order.

#### Usage (loyalty search events)

```typescript
await client.loyalty.searchEvents({
    query: {
        filter: {
            orderFilter: {
                orderId: "PyATxhYLfsMqpVkcKJITPydgEYfZY",
            },
        },
    },
    limit: 30,
});
```

#### Parameters (loyalty search events)

**request:** `Square.SearchLoyaltyEventsRequest`

**requestOptions:** `Loyalty.RequestOptions`

## Merchants

### client.merchants.list({ ...params }) -> core.Page

#### Description (merchants list)

Provides details about the merchant associated with a given access token.

The access token used to connect your application to a Square seller is associated
with a single merchant. That means that `ListMerchants` returns a list
with a single `Merchant` object. You can specify your personal access token
to get your own merchant information or specify an OAuth token to get the
information for the merchant that granted your application access.

If you know the merchant ID, you can also use the [RetrieveMerchant](api-endpoint:Merchants-RetrieveMerchant)
endpoint to retrieve the merchant information.

#### Usage (merchants list)

```typescript
const response = await client.merchants.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.merchants.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (merchants list)

**request:** `Square.ListMerchantsRequest`

**requestOptions:** `Merchants.RequestOptions`

### client.merchants.get({ ...params }) -> Square.GetMerchantResponse

#### Description (merchants get)

Retrieves the `Merchant` object for the given `merchant_id`.

#### Usage (merchants get)

```typescript
await client.merchants.get({
    merchantId: "merchant_id",
});
```

#### Parameters (merchants get)

**request:** `Square.GetMerchantsRequest`

**requestOptions:** `Merchants.RequestOptions`

## Checkout

### client.checkout.retrieveLocationSettings({ ...params }) -> Square.RetrieveLocationSettingsResponse

#### Description (checkout retrieve location settings)

Retrieves the location-level settings for a Square-hosted checkout page.

#### Usage (checkout retrieve location settings)

```typescript
await client.checkout.retrieveLocationSettings({
    locationId: "location_id",
});
```

#### Parameters (checkout retrieve location settings)

**request:** `Square.RetrieveLocationSettingsRequest`

**requestOptions:** `Checkout.RequestOptions`

### client.checkout.updateLocationSettings({ ...params }) -> Square.UpdateLocationSettingsResponse

#### Description (checkout update location settings)

Updates the location-level settings for a Square-hosted checkout page.

#### Usage (checkout update location settings)

```typescript
await client.checkout.updateLocationSettings({
    locationId: "location_id",
    locationSettings: {},
});
```

#### Parameters (checkout update location settings)

**request:** `Square.UpdateLocationSettingsRequest`

**requestOptions:** `Checkout.RequestOptions`

### client.checkout.retrieveMerchantSettings() -> Square.RetrieveMerchantSettingsResponse

#### Description (checkout retrieve merchant settings)

Retrieves the merchant-level settings for a Square-hosted checkout page.

#### Usage (checkout retrieve merchant settings)

```typescript
await client.checkout.retrieveMerchantSettings();
```

#### Parameters (checkout retrieve merchant settings)

**requestOptions:** `Checkout.RequestOptions`

### client.checkout.updateMerchantSettings({ ...params }) -> Square.UpdateMerchantSettingsResponse

#### Description (checkout update merchant settings)

Updates the merchant-level settings for a Square-hosted checkout page.

#### Usage (checkout update merchant settings)

```typescript
await client.checkout.updateMerchantSettings({
    merchantSettings: {},
});
```

#### Parameters (checkout update merchant settings)

**request:** `Square.UpdateMerchantSettingsRequest`

**requestOptions:** `Checkout.RequestOptions`

## Orders

### client.orders.create({ ...params }) -> Square.CreateOrderResponse

#### Description (orders create)

Creates a new [order](entity:Order) that can include information about products for
purchase and settings to apply to the purchase.

To pay for a created order, see
[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).

You can modify open orders using the [UpdateOrder](api-endpoint:Orders-UpdateOrder) endpoint.

#### Usage (orders create)

```typescript
await client.orders.create({
    order: {
        locationId: "057P5VYJ4A5X1",
        referenceId: "my-order-001",
        lineItems: [
            {
                name: "New York Strip Steak",
                quantity: "1",
                basePriceMoney: {
                    amount: 1599,
                    currency: "USD",
                },
            },
            {
                quantity: "2",
                catalogObjectId: "BEMYCSMIJL46OCDV4KYIKXIB",
                modifiers: [
                    {
                        catalogObjectId: "CHQX7Y4KY6N5KINJKZCFURPZ",
                    },
                ],
                appliedDiscounts: [
                    {
                        discountUid: "one-dollar-off",
                    },
                ],
            },
        ],
        taxes: [
            {
                uid: "state-sales-tax",
                name: "State Sales Tax",
                percentage: "9",
                scope: "ORDER",
            },
        ],
        discounts: [
            {
                uid: "labor-day-sale",
                name: "Labor Day Sale",
                percentage: "5",
                scope: "ORDER",
            },
            {
                uid: "membership-discount",
                catalogObjectId: "DB7L55ZH2BGWI4H23ULIWOQ7",
                scope: "ORDER",
            },
            {
                uid: "one-dollar-off",
                name: "Sale - $1.00 off",
                amountMoney: {
                    amount: 100,
                    currency: "USD",
                },
                scope: "LINE_ITEM",
            },
        ],
    },
    idempotencyKey: "8193148c-9586-11e6-99f9-28cfe92138cf",
});
```

#### Parameters (orders create)

**request:** `Square.CreateOrderRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.batchGet({ ...params }) -> Square.BatchGetOrdersResponse

#### Description (orders batch get)

Retrieves a set of [orders](entity:Order) by their IDs.

If a given order ID does not exist, the ID is ignored instead of generating an error.

#### Usage (orders batch get)

```typescript
await client.orders.batchGet({
    locationId: "057P5VYJ4A5X1",
    orderIds: ["CAISEM82RcpmcFBM0TfOyiHV3es", "CAISENgvlJ6jLWAzERDzjyHVybY"],
});
```

#### Parameters (orders batch get)

**request:** `Square.BatchGetOrdersRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.calculate({ ...params }) -> Square.CalculateOrderResponse

#### Description (orders calculate)

Enables applications to preview order pricing without creating an order.

#### Usage (orders calculate)

```typescript
await client.orders.calculate({
    order: {
        locationId: "D7AVYMEAPJ3A3",
        lineItems: [
            {
                name: "Item 1",
                quantity: "1",
                basePriceMoney: {
                    amount: 500,
                    currency: "USD",
                },
            },
            {
                name: "Item 2",
                quantity: "2",
                basePriceMoney: {
                    amount: 300,
                    currency: "USD",
                },
            },
        ],
        discounts: [
            {
                name: "50% Off",
                percentage: "50",
                scope: "ORDER",
            },
        ],
    },
});
```

#### Parameters (orders calculate)

**request:** `Square.CalculateOrderRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.clone({ ...params }) -> Square.CloneOrderResponse

#### Description (orders clone)

Creates a new order, in the `DRAFT` state, by duplicating an existing order. The newly created order has
only the core fields (such as line items, taxes, and discounts) copied from the original order.

#### Usage (orders clone)

```typescript
await client.orders.clone({
    orderId: "ZAISEM52YcpmcWAzERDOyiWS123",
    version: 3,
    idempotencyKey: "UNIQUE_STRING",
});
```

#### Parameters (orders clone)

**request:** `Square.CloneOrderRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.search({ ...params }) -> Square.SearchOrdersResponse

#### Description (orders search)

Search all orders for one or more locations. Orders include all sales,
returns, and exchanges regardless of how or when they entered the Square
ecosystem (such as Point of Sale, Invoices, and Connect APIs).

`SearchOrders` requests need to specify which locations to search and define a
[SearchOrdersQuery](entity:SearchOrdersQuery) object that controls
how to sort or filter the results. Your `SearchOrdersQuery` can:

Set filter criteria.
Set the sort order.
Determine whether to return results as complete `Order` objects or as
[OrderEntry](entity:OrderEntry) objects.

Note that details for orders processed with Square Point of Sale while in
offline mode might not be transmitted to Square for up to 72 hours. Offline
orders have a `created_at` value that reflects the time the order was created,
not the time it was subsequently transmitted to Square.

#### Usage (orders search)

```typescript
await client.orders.search({
    locationIds: ["057P5VYJ4A5X1", "18YC4JDH91E1H"],
    query: {
        filter: {
            stateFilter: {
                states: ["COMPLETED"],
            },
            dateTimeFilter: {
                closedAt: {
                    startAt: "2018-03-03T20:00:00+00:00",
                    endAt: "2019-03-04T21:54:45+00:00",
                },
            },
        },
        sort: {
            sortField: "CLOSED_AT",
            sortOrder: "DESC",
        },
    },
    limit: 3,
    returnEntries: true,
});
```

#### Parameters (orders search)

**request:** `Square.SearchOrdersRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.get({ ...params }) -> Square.GetOrderResponse

#### Description (orders get)

Retrieves an [Order](entity:Order) by ID.

#### Usage (orders get)

```typescript
await client.orders.get({
    orderId: "order_id",
});
```

#### Parameters (orders get)

**request:** `Square.GetOrdersRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.update({ ...params }) -> Square.UpdateOrderResponse

#### Description (orders update)

Updates an open [order](entity:Order) by adding, replacing, or deleting
fields. Orders with a `COMPLETED` or `CANCELED` state cannot be updated.

An `UpdateOrder` request requires the following:

- The `order_id` in the endpoint path, identifying the order to update.
- The latest `version` of the order to update.
- The [sparse order](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#sparse-order-objects)
  containing only the fields to update and the version to which the update is
  being applied.
- If deleting fields, the [dot notation paths](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#identifying-fields-to-delete)
  identifying the fields to clear.

To pay for an order, see
[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).

#### Usage (orders update)

```typescript
await client.orders.update({
    orderId: "order_id",
    order: {
        locationId: "location_id",
        lineItems: [
            {
                uid: "cookie_uid",
                name: "COOKIE",
                quantity: "2",
                basePriceMoney: {
                    amount: 200,
                    currency: "USD",
                },
            },
        ],
        version: 1,
    },
    fieldsToClear: ["discounts"],
    idempotencyKey: "UNIQUE_STRING",
});
```

#### Parameters (orders update)

**request:** `Square.UpdateOrderRequest`

**requestOptions:** `Orders.RequestOptions`

### client.orders.pay({ ...params }) -> Square.PayOrderResponse

#### Description (orders pay)

Pay for an [order](entity:Order) using one or more approved [payments](entity:Payment)
or settle an order with a total of `0`.

The total of the `payment_ids` listed in the request must be equal to the order
total. Orders with a total amount of `0` can be marked as paid by specifying an empty
array of `payment_ids` in the request.

To be used with `PayOrder`, a payment must:

- Reference the order by specifying the `order_id` when [creating the payment](api-endpoint:Payments-CreatePayment).
  Any approved payments that reference the same `order_id` not specified in the
  `payment_ids` is canceled.
- Be approved with [delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture).
Using a delayed capture payment with `PayOrder` completes the approved payment.

#### Usage (orders pay)

```typescript
await client.orders.pay({
    orderId: "order_id",
    idempotencyKey: "c043a359-7ad9-4136-82a9-c3f1d66dcbff",
    paymentIds: ["EnZdNAlWCmfh6Mt5FMNST1o7taB", "0LRiVlbXVwe8ozu4KbZxd12mvaB"],
});
```

#### Parameters (orders pay)

**request:** `Square.PayOrderRequest`

**requestOptions:** `Orders.RequestOptions`

## Payments

### client.payments.list({ ...params }) -> core.Page

#### Description (payments list)

Retrieves a list of payments taken by the account making the request.

Results are eventually consistent, and new payments or changes to payments might take several
seconds to appear.

The maximum results per page is 100.

#### Usage (payments list)

```typescript
const response = await client.payments.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.payments.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (payments list)

**request:** `Square.ListPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.create({ ...params }) -> Square.CreatePaymentResponse

#### Description (payments create)

Creates a payment using the provided source. You can use this endpoint
to charge a card (credit/debit card or  
Square gift card) or record a payment that the seller received outside of Square
(cash payment from a buyer or a payment that an external entity
processed on behalf of the seller).

The endpoint creates a
`Payment` object and returns it in the response.

#### Usage (payments create)

```typescript
await client.payments.create({
    sourceId: "ccof:GaJGNaZa8x4OgDJn4GB",
    idempotencyKey: "7b0f3ec5-086a-4871-8f13-3c81b3875218",
    amountMoney: {
        amount: 1000,
        currency: "USD",
    },
    appFeeMoney: {
        amount: 10,
        currency: "USD",
    },
    autocomplete: true,
    customerId: "W92WH6P11H4Z77CTET0RNTGFW8",
    locationId: "L88917AVBK2S5",
    referenceId: "123456",
    note: "Brief description",
});
```

#### Parameters (payments create)

**request:** `Square.CreatePaymentRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.cancelByIdempotencyKey({ ...params }) -> Square.CancelPaymentByIdempotencyKeyResponse

#### Description (payments cancel by idempotency key)

Cancels (voids) a payment identified by the idempotency key that is specified in the
request.

Use this method when the status of a `CreatePayment` request is unknown (for example, after you send a
`CreatePayment` request, a network error occurs and you do not get a response). In this case, you can
direct Square to cancel the payment using this endpoint. In the request, you provide the same
idempotency key that you provided in your `CreatePayment` request that you want to cancel. After
canceling the payment, you can submit your `CreatePayment` request again.

Note that if no payment with the specified idempotency key is found, no action is taken and the endpoint
returns successfully.

#### Usage (payments cancel by idempotency key)

```typescript
await client.payments.cancelByIdempotencyKey({
    idempotencyKey: "a7e36d40-d24b-11e8-b568-0800200c9a66",
});
```

#### Parameters (payments cancel by idempotency key)

**request:** `Square.CancelPaymentByIdempotencyKeyRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.get({ ...params }) -> Square.GetPaymentResponse

#### Description (payments get)

Retrieves details for a specific payment.

#### Usage (payments get)

```typescript
await client.payments.get({
    paymentId: "payment_id",
});
```

#### Parameters (payments get)

**request:** `Square.GetPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.update({ ...params }) -> Square.UpdatePaymentResponse

#### Description (payments update)

Updates a payment with the APPROVED status.
You can update the `amount_money` and `tip_money` using this endpoint.

#### Usage (payments update)

```typescript
await client.payments.update({
    paymentId: "payment_id",
    payment: {
        amountMoney: {
            amount: 1000,
            currency: "USD",
        },
        tipMoney: {
            amount: 100,
            currency: "USD",
        },
        versionToken: "ODhwVQ35xwlzRuoZEwKXucfu7583sPTzK48c5zoGd0g6o",
    },
    idempotencyKey: "956f8b13-e4ec-45d6-85e8-d1d95ef0c5de",
});
```

#### Parameters (payments update)

**request:** `Square.UpdatePaymentRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.cancel({ ...params }) -> Square.CancelPaymentResponse

#### Description (payments cancel)

Cancels (voids) a payment. You can use this endpoint to cancel a payment with
the APPROVED `status`.

#### Usage (payments cancel)

```typescript
await client.payments.cancel({
    paymentId: "payment_id",
});
```

#### Parameters (payments cancel)

**request:** `Square.CancelPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

### client.payments.complete({ ...params }) -> Square.CompletePaymentResponse

#### Description (payments complete)

Completes (captures) a payment.
By default, payments are set to complete immediately after they are created.

You can use this endpoint to complete a payment with the APPROVED `status`.

#### Usage (payments complete)

```typescript
await client.payments.complete({
    paymentId: "payment_id",
});
```

#### Parameters (payments complete)

**request:** `Square.CompletePaymentRequest`

**requestOptions:** `Payments.RequestOptions`

## Payouts

### client.payouts.list({ ...params }) -> core.Page

#### Description (payouts list)

Retrieves a list of all payouts for the default location.
You can filter payouts by location ID, status, time range, and order them in ascending or descending order.
To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.

#### Usage (payouts list)

```typescript
const response = await client.payouts.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.payouts.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (payouts list)

**request:** `Square.ListPayoutsRequest`

**requestOptions:** `Payouts.RequestOptions`

### client.payouts.get({ ...params }) -> Square.GetPayoutResponse

#### Description (payouts get)

Retrieves details of a specific payout identified by a payout ID.
To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.

#### Usage (payouts get)

```typescript
await client.payouts.get({
    payoutId: "payout_id",
});
```

#### Parameters (payouts get)

**request:** `Square.GetPayoutsRequest`

**requestOptions:** `Payouts.RequestOptions`

### client.payouts.listEntries({ ...params }) -> core.Page

#### Description (payouts list entries)

Retrieves a list of all payout entries for a specific payout.
To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.

#### Usage (payouts list entries)

```typescript
const response = await client.payouts.listEntries({
    payoutId: "payout_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.payouts.listEntries({
    payoutId: "payout_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (payouts list entries)

**request:** `Square.ListEntriesPayoutsRequest`

**requestOptions:** `Payouts.RequestOptions`

## Refunds

### client.refunds.list({ ...params }) -> core.Page

#### Description (refunds list)

Retrieves a list of refunds for the account making the request.

Results are eventually consistent, and new refunds or changes to refunds might take several
seconds to appear.

The maximum results per page is 100.

#### Usage (refunds list)

```typescript
const response = await client.refunds.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.refunds.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (refunds list)

**request:** `Square.ListRefundsRequest`

**requestOptions:** `Refunds.RequestOptions`

### client.refunds.refundPayment({ ...params }) -> Square.RefundPaymentResponse

#### Description (refunds refund payment)

Refunds a payment. You can refund the entire payment amount or a
portion of it. You can use this endpoint to refund a card payment or record a
refund of a cash or external payment. For more information, see
[Refund Payment](https://developer.squareup.com/docs/payments-api/refund-payments).

#### Usage (refunds refund payment)

```typescript
await client.refunds.refundPayment({
    idempotencyKey: "9b7f2dcf-49da-4411-b23e-a2d6af21333a",
    amountMoney: {
        amount: 1000,
        currency: "USD",
    },
    appFeeMoney: {
        amount: 10,
        currency: "USD",
    },
    paymentId: "R2B3Z8WMVt3EAmzYWLZvz7Y69EbZY",
    reason: "Example",
});
```

#### Parameters (refunds refund payment)

**request:** `Square.RefundPaymentRequest`

**requestOptions:** `Refunds.RequestOptions`

### client.refunds.get({ ...params }) -> Square.GetPaymentRefundResponse

#### Description (refunds get)

Retrieves a specific refund using the `refund_id`.

#### Usage (refunds get)

```typescript
await client.refunds.get({
    refundId: "refund_id",
});
```

#### Parameters (refunds get)

**request:** `Square.GetRefundsRequest`

**requestOptions:** `Refunds.RequestOptions`

## Sites

### client.sites.list() -> Square.ListSitesResponse

#### Description (sites list)

Lists the Square Online sites that belong to a seller. Sites are listed in descending order by the `created_at` date.

**Note:** Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).

#### Usage (sites list)

```typescript
await client.sites.list();
```

#### Parameters (sites list)

**requestOptions:** `Sites.RequestOptions`

## Snippets

### client.snippets.get({ ...params }) -> Square.GetSnippetResponse

#### Description (snippets get)

Retrieves your snippet from a Square Online site. A site can contain snippets from multiple snippet applications, but you can retrieve only the snippet that was added by your application.

You can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.

**Note:** Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).

#### Usage (snippets get)

```typescript
await client.snippets.get({
    siteId: "site_id",
});
```

#### Parameters (snippets get)

**request:** `Square.GetSnippetsRequest`

**requestOptions:** `Snippets.RequestOptions`

### client.snippets.upsert({ ...params }) -> Square.UpsertSnippetResponse

#### Description (snippets upsert)

Adds a snippet to a Square Online site or updates the existing snippet on the site.
The snippet code is appended to the end of the `head` element on every page of the site, except checkout pages. A snippet application can add one snippet to a given site.

You can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.

**Note:** Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).

#### Usage (snippets upsert)

```typescript
await client.snippets.upsert({
    siteId: "site_id",
    snippet: {
        content: "var js = 1;",
    },
});
```

#### Parameters (snippets upsert)

**request:** `Square.UpsertSnippetRequest`

**requestOptions:** `Snippets.RequestOptions`

### client.snippets.delete({ ...params }) -> Square.DeleteSnippetResponse

#### Description (snippets delete)

Removes your snippet from a Square Online site.

You can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.

**Note:** Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).

#### Usage (snippets delete)

```typescript
await client.snippets.delete({
    siteId: "site_id",
});
```

#### Parameters (snippets delete)

**request:** `Square.DeleteSnippetsRequest`

**requestOptions:** `Snippets.RequestOptions`

## Subscriptions

### client.subscriptions.create({ ...params }) -> Square.CreateSubscriptionResponse

#### Description (subscriptions create)

Enrolls a customer in a subscription.

If you provide a card on file in the request, Square charges the card for
the subscription. Otherwise, Square sends an invoice to the customer's email
address. The subscription starts immediately, unless the request includes
the optional `start_date`. Each individual subscription is associated with a particular location.

For more information, see [Create a subscription](https://developer.squareup.com/docs/subscriptions-api/manage-subscriptions#create-a-subscription).

#### Usage (subscriptions create)

```typescript
await client.subscriptions.create({
    idempotencyKey: "8193148c-9586-11e6-99f9-28cfe92138cf",
    locationId: "S8GWD5R9QB376",
    planVariationId: "6JHXF3B2CW3YKHDV4XEM674H",
    customerId: "CHFGVKYY8RSV93M5KCYTG4PN0G",
    startDate: "2023-06-20",
    cardId: "ccof:qy5x8hHGYsgLrp4Q4GB",
    timezone: "America/Los_Angeles",
    source: {
        name: "My Application",
    },
    phases: [
        {
            ordinal: 0,
            orderTemplateId: "U2NaowWxzXwpsZU697x7ZHOAnCNZY",
        },
    ],
});
```

#### Parameters (subscriptions create)

**request:** `Square.CreateSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.bulkSwapPlan({ ...params }) -> Square.BulkSwapPlanResponse

#### Description (subscriptions bulk swap plan)

Schedules a plan variation change for all active subscriptions under a given plan
variation. For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).

#### Usage (subscriptions bulk swap plan)

```typescript
await client.subscriptions.bulkSwapPlan({
    newPlanVariationId: "FQ7CDXXWSLUJRPM3GFJSJGZ7",
    oldPlanVariationId: "6JHXF3B2CW3YKHDV4XEM674H",
    locationId: "S8GWD5R9QB376",
});
```

#### Parameters (subscriptions bulk swap plan)

**request:** `Square.BulkSwapPlanRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.search({ ...params }) -> Square.SearchSubscriptionsResponse

#### Description (subscriptions search)

Searches for subscriptions.

Results are ordered chronologically by subscription creation date. If
the request specifies more than one location ID,
the endpoint orders the result
by location ID, and then by creation date within each location. If no locations are given
in the query, all locations are searched.

You can also optionally specify `customer_ids` to search by customer.
If left unset, all customers
associated with the specified locations are returned.
If the request specifies customer IDs, the endpoint orders results
first by location, within location by customer ID, and within
customer by subscription creation date.

#### Usage (subscriptions search)

```typescript
await client.subscriptions.search({
    query: {
        filter: {
            customerIds: ["CHFGVKYY8RSV93M5KCYTG4PN0G"],
            locationIds: ["S8GWD5R9QB376"],
            sourceNames: ["My App"],
        },
    },
});
```

#### Parameters (subscriptions search)

**request:** `Square.SearchSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.get({ ...params }) -> Square.GetSubscriptionResponse

#### Description (subscriptions get)

Retrieves a specific subscription.

#### Usage (subscriptions get)

```typescript
await client.subscriptions.get({
    subscriptionId: "subscription_id",
});
```

#### Parameters (subscriptions get)

**request:** `Square.GetSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.update({ ...params }) -> Square.UpdateSubscriptionResponse

#### Description (subscriptions update)

Updates a subscription by modifying or clearing `subscription` field values.
To clear a field, set its value to `null`.

#### Usage (subscriptions update)

```typescript
await client.subscriptions.update({
    subscriptionId: "subscription_id",
    subscription: {
        cardId: "{NEW CARD ID}",
    },
});
```

#### Parameters (subscriptions update)

**request:** `Square.UpdateSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.deleteAction({ ...params }) -> Square.DeleteSubscriptionActionResponse

#### Description (subscriptions delete action)

Deletes a scheduled action for a subscription.

#### Usage (subscriptions delete action)

```typescript
await client.subscriptions.deleteAction({
    subscriptionId: "subscription_id",
    actionId: "action_id",
});
```

#### Parameters (subscriptions delete action)

**request:** `Square.DeleteActionSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.changeBillingAnchorDate({ ...params }) -> Square.ChangeBillingAnchorDateResponse

#### Description (subscriptions change billing anchor date)

Changes the [billing anchor date](https://developer.squareup.com/docs/subscriptions-api/subscription-billing#billing-dates)
for a subscription.

#### Usage (subscriptions change billing anchor date)

```typescript
await client.subscriptions.changeBillingAnchorDate({
    subscriptionId: "subscription_id",
    monthlyBillingAnchorDate: 1,
});
```

#### Parameters (subscriptions change billing anchor date)

**request:** `Square.ChangeBillingAnchorDateRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.cancel({ ...params }) -> Square.CancelSubscriptionResponse

#### Description (subscriptions cancel)

Schedules a `CANCEL` action to cancel an active subscription. This
sets the `canceled_date` field to the end of the active billing period. After this date,
the subscription status changes from ACTIVE to CANCELED.

#### Usage (subscriptions cancel)

```typescript
await client.subscriptions.cancel({
    subscriptionId: "subscription_id",
});
```

#### Parameters (subscriptions cancel)

**request:** `Square.CancelSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.listEvents({ ...params }) -> core.Page

#### Description (subscriptions list events)

Lists all [events](https://developer.squareup.com/docs/subscriptions-api/actions-events) for a specific subscription.

#### Usage (subscriptions list events)

```typescript
const response = await client.subscriptions.listEvents({
    subscriptionId: "subscription_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.subscriptions.listEvents({
    subscriptionId: "subscription_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (subscriptions list events)

**request:** `Square.ListEventsSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.pause({ ...params }) -> Square.PauseSubscriptionResponse

#### Description (subscriptions pause)

Schedules a `PAUSE` action to pause an active subscription.

#### Usage (subscriptions pause)

```typescript
await client.subscriptions.pause({
    subscriptionId: "subscription_id",
});
```

#### Parameters (subscriptions pause)

**request:** `Square.PauseSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.resume({ ...params }) -> Square.ResumeSubscriptionResponse

#### Description (subscriptions resume)

Schedules a `RESUME` action to resume a paused or a deactivated subscription.

#### Usage (subscriptions resume)

```typescript
await client.subscriptions.resume({
    subscriptionId: "subscription_id",
});
```

#### Parameters (subscriptions resume)

**request:** `Square.ResumeSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.subscriptions.swapPlan({ ...params }) -> Square.SwapPlanResponse

#### Description (subscriptions swap plan)

Schedules a `SWAP_PLAN` action to swap a subscription plan variation in an existing subscription.
For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).

#### Usage (subscriptions swap plan)

```typescript
await client.subscriptions.swapPlan({
    subscriptionId: "subscription_id",
    newPlanVariationId: "FQ7CDXXWSLUJRPM3GFJSJGZ7",
    phases: [
        {
            ordinal: 0,
            orderTemplateId: "uhhnjH9osVv3shUADwaC0b3hNxQZY",
        },
    ],
});
```

#### Parameters (subscriptions swap plan)

**request:** `Square.SwapPlanRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## TeamMembers

### client.teamMembers.create({ ...params }) -> Square.CreateTeamMemberResponse

#### Description (team members create)

Creates a single `TeamMember` object. The `TeamMember` object is returned on successful creates.
You must provide the following values in your request to this endpoint:

- `given_name`
- `family_name`

Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#createteammember).

#### Usage (team members create)

```typescript
await client.teamMembers.create({
    idempotencyKey: "idempotency-key-0",
    teamMember: {
        referenceId: "reference_id_1",
        status: "ACTIVE",
        givenName: "Joe",
        familyName: "Doe",
        emailAddress: "joe_doe@gmail.com",
        phoneNumber: "+14159283333",
        assignedLocations: {
            assignmentType: "EXPLICIT_LOCATIONS",
            locationIds: ["YSGH2WBKG94QZ", "GA2Y9HSJ8KRYT"],
        },
        wageSetting: {
            jobAssignments: [
                {
                    payType: "SALARY",
                    annualRate: {
                        amount: 3000000,
                        currency: "USD",
                    },
                    weeklyHours: 40,
                    jobId: "FjS8x95cqHiMenw4f1NAUH4P",
                },
                {
                    payType: "HOURLY",
                    hourlyRate: {
                        amount: 2000,
                        currency: "USD",
                    },
                    jobId: "VDNpRv8da51NU8qZFC5zDWpF",
                },
            ],
            isOvertimeExempt: true,
        },
    },
});
```

#### Parameters (team members create)

**request:** `Square.CreateTeamMemberRequest`

**requestOptions:** `TeamMembers.RequestOptions`

### client.teamMembers.batchCreate({ ...params }) -> Square.BatchCreateTeamMembersResponse

#### Description (team members batch create)

Creates multiple `TeamMember` objects. The created `TeamMember` objects are returned on successful creates.
This process is non-transactional and processes as much of the request as possible. If one of the creates in
the request cannot be successfully processed, the request is not marked as failed, but the body of the response
contains explicit error information for the failed create.

Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-create-team-members).

#### Usage (team members batch create)

```typescript
await client.teamMembers.batchCreate({
    teamMembers: {
        "idempotency-key-1": {
            teamMember: {
                referenceId: "reference_id_1",
                givenName: "Joe",
                familyName: "Doe",
                emailAddress: "joe_doe@gmail.com",
                phoneNumber: "+14159283333",
                assignedLocations: {
                    assignmentType: "EXPLICIT_LOCATIONS",
                    locationIds: ["YSGH2WBKG94QZ", "GA2Y9HSJ8KRYT"],
                },
            },
        },
        "idempotency-key-2": {
            teamMember: {
                referenceId: "reference_id_2",
                givenName: "Jane",
                familyName: "Smith",
                emailAddress: "jane_smith@gmail.com",
                phoneNumber: "+14159223334",
                assignedLocations: {
                    assignmentType: "ALL_CURRENT_AND_FUTURE_LOCATIONS",
                },
            },
        },
    },
});
```

#### Parameters (team members batch create)

**request:** `Square.BatchCreateTeamMembersRequest`

**requestOptions:** `TeamMembers.RequestOptions`

### client.teamMembers.batchUpdate({ ...params }) -> Square.BatchUpdateTeamMembersResponse

#### Description (team members batch update)

Updates multiple `TeamMember` objects. The updated `TeamMember` objects are returned on successful updates.
This process is non-transactional and processes as much of the request as possible. If one of the updates in
the request cannot be successfully processed, the request is not marked as failed, but the body of the response
contains explicit error information for the failed update.
Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-update-team-members).

#### Usage (team members batch update)

```typescript
await client.teamMembers.batchUpdate({
    teamMembers: {
        "AFMwA08kR-MIF-3Vs0OE": {
            teamMember: {
                referenceId: "reference_id_2",
                isOwner: false,
                status: "ACTIVE",
                givenName: "Jane",
                familyName: "Smith",
                emailAddress: "jane_smith@gmail.com",
                phoneNumber: "+14159223334",
                assignedLocations: {
                    assignmentType: "ALL_CURRENT_AND_FUTURE_LOCATIONS",
                },
            },
        },
        "fpgteZNMaf0qOK-a4t6P": {
            teamMember: {
                referenceId: "reference_id_1",
                isOwner: false,
                status: "ACTIVE",
                givenName: "Joe",
                familyName: "Doe",
                emailAddress: "joe_doe@gmail.com",
                phoneNumber: "+14159283333",
                assignedLocations: {
                    assignmentType: "EXPLICIT_LOCATIONS",
                    locationIds: ["YSGH2WBKG94QZ", "GA2Y9HSJ8KRYT"],
                },
            },
        },
    },
});
```

#### Parameters (team members batch update)

**request:** `Square.BatchUpdateTeamMembersRequest`

**requestOptions:** `TeamMembers.RequestOptions`

### client.teamMembers.search({ ...params }) -> Square.SearchTeamMembersResponse

#### Description (team members search)

Returns a paginated list of `TeamMember` objects for a business.
The list can be filtered by location IDs, `ACTIVE` or `INACTIVE` status, or whether
the team member is the Square account owner.

#### Usage (team members search)

```typescript
await client.teamMembers.search({
    query: {
        filter: {
            locationIds: ["0G5P3VGACMMQZ"],
            status: "ACTIVE",
        },
    },
    limit: 10,
});
```

#### Parameters (team members search)

**request:** `Square.SearchTeamMembersRequest`

**requestOptions:** `TeamMembers.RequestOptions`

### client.teamMembers.get({ ...params }) -> Square.GetTeamMemberResponse

#### Description (team members get)

Retrieves a `TeamMember` object for the given `TeamMember.id`.
Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrieve-a-team-member).

#### Usage (team members get)

```typescript
await client.teamMembers.get({
    teamMemberId: "team_member_id",
});
```

#### Parameters (team members get)

**request:** `Square.GetTeamMembersRequest`

**requestOptions:** `TeamMembers.RequestOptions`

### client.teamMembers.update({ ...params }) -> Square.UpdateTeamMemberResponse

#### Description (team members update)

Updates a single `TeamMember` object. The `TeamMember` object is returned on successful updates.
Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#update-a-team-member).

#### Usage (team members update)

```typescript
await client.teamMembers.update({
    teamMemberId: "team_member_id",
    body: {
        teamMember: {
            referenceId: "reference_id_1",
            status: "ACTIVE",
            givenName: "Joe",
            familyName: "Doe",
            emailAddress: "joe_doe@gmail.com",
            phoneNumber: "+14159283333",
            assignedLocations: {
                assignmentType: "EXPLICIT_LOCATIONS",
                locationIds: ["YSGH2WBKG94QZ", "GA2Y9HSJ8KRYT"],
            },
            wageSetting: {
                jobAssignments: [
                    {
                        payType: "SALARY",
                        annualRate: {
                            amount: 3000000,
                            currency: "USD",
                        },
                        weeklyHours: 40,
                        jobId: "FjS8x95cqHiMenw4f1NAUH4P",
                    },
                    {
                        payType: "HOURLY",
                        hourlyRate: {
                            amount: 1200,
                            currency: "USD",
                        },
                        jobId: "VDNpRv8da51NU8qZFC5zDWpF",
                    },
                ],
                isOvertimeExempt: true,
            },
        },
    },
});
```

#### Parameters (team members update)

**request:** `Square.UpdateTeamMembersRequest`

**requestOptions:** `TeamMembers.RequestOptions`

## Team

### client.team.listJobs({ ...params }) -> Square.ListJobsResponse

#### Description (team list jobs)

Lists jobs in a seller account. Results are sorted by title in ascending order.

#### Usage (team list jobs)

```typescript
await client.team.listJobs();
```

#### Parameters (team list jobs)

**request:** `Square.ListJobsRequest`

**requestOptions:** `Team.RequestOptions`

### client.team.createJob({ ...params }) -> Square.CreateJobResponse

#### Description (team create job)

Creates a job in a seller account. A job defines a title and tip eligibility. Note that
compensation is defined in a [job assignment](entity:JobAssignment) in a team member's wage setting.

#### Usage (team create job)

```typescript
await client.team.createJob({
    job: {
        title: "Cashier",
        isTipEligible: true,
    },
    idempotencyKey: "idempotency-key-0",
});
```

#### Parameters (team create job)

**request:** `Square.CreateJobRequest`

**requestOptions:** `Team.RequestOptions`

### client.team.retrieveJob({ ...params }) -> Square.RetrieveJobResponse

#### Description (team retrieve job)

Retrieves a specified job.

#### Usage (team retrieve job)

```typescript
await client.team.retrieveJob({
    jobId: "job_id",
});
```

#### Parameters (team retrieve job)

**request:** `Square.RetrieveJobRequest`

**requestOptions:** `Team.RequestOptions`

### client.team.updateJob({ ...params }) -> Square.UpdateJobResponse

#### Description (team update job)

Updates the title or tip eligibility of a job. Changes to the title propagate to all
`JobAssignment`, `Shift`, and `TeamMemberWage` objects that reference the job ID. Changes to
tip eligibility propagate to all `TeamMemberWage` objects that reference the job ID.

#### Usage (team update job)

```typescript
await client.team.updateJob({
    jobId: "job_id",
    job: {
        title: "Cashier 1",
        isTipEligible: true,
    },
});
```

#### Parameters (team update job)

**request:** `Square.UpdateJobRequest`

**requestOptions:** `Team.RequestOptions`

## Terminal

### client.terminal.dismissTerminalAction({ ...params }) -> Square.DismissTerminalActionResponse

#### Description (terminal dismiss terminal action)

Dismisses a Terminal action request if the status and type of the request permits it.

See [Link and Dismiss Actions](https://developer.squareup.com/docs/terminal-api/advanced-features/custom-workflows/link-and-dismiss-actions) for more details.

#### Usage (terminal dismiss terminal action)

```typescript
await client.terminal.dismissTerminalAction({
    actionId: "action_id",
});
```

#### Parameters (terminal dismiss terminal action)

**request:** `Square.DismissTerminalActionRequest`

**requestOptions:** `Terminal.RequestOptions`

### client.terminal.dismissTerminalCheckout({ ...params }) -> Square.DismissTerminalCheckoutResponse

#### Description (terminal dismiss terminal checkout)

Dismisses a Terminal checkout request if the status and type of the request permits it.

#### Usage (terminal dismiss terminal checkout)

```typescript
await client.terminal.dismissTerminalCheckout({
    checkoutId: "checkout_id",
});
```

#### Parameters (terminal dismiss terminal checkout)

**request:** `Square.DismissTerminalCheckoutRequest`

**requestOptions:** `Terminal.RequestOptions`

### client.terminal.dismissTerminalRefund({ ...params }) -> Square.DismissTerminalRefundResponse

#### Description (terminal dismiss terminal refund)

Dismisses a Terminal refund request if the status and type of the request permits it.

#### Usage (terminal dismiss terminal refund)

```typescript
await client.terminal.dismissTerminalRefund({
    terminalRefundId: "terminal_refund_id",
});
```

#### Parameters (terminal dismiss terminal refund)

**request:** `Square.DismissTerminalRefundRequest`

**requestOptions:** `Terminal.RequestOptions`

## Vendors

### client.vendors.batchCreate({ ...params }) -> Square.BatchCreateVendorsResponse

#### Description (vendors batch create)

Creates one or more [Vendor](entity:Vendor) objects to represent suppliers to a seller.

#### Usage (vendors batch create)

```typescript
await client.vendors.batchCreate({
    vendors: {
        "8fc6a5b0-9fe8-4b46-b46b-2ef95793abbe": {
            name: "Joe's Fresh Seafood",
            address: {
                addressLine1: "505 Electric Ave",
                addressLine2: "Suite 600",
                locality: "New York",
                administrativeDistrictLevel1: "NY",
                postalCode: "10003",
                country: "US",
            },
            contacts: [
                {
                    name: "Joe Burrow",
                    emailAddress: "joe@joesfreshseafood.com",
                    phoneNumber: "1-212-555-4250",
                    ordinal: 1,
                },
            ],
            accountNumber: "4025391",
            note: "a vendor",
        },
    },
});
```

#### Parameters (vendors batch create)

**request:** `Square.BatchCreateVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.batchGet({ ...params }) -> Square.BatchGetVendorsResponse

#### Description (vendors batch get)

Retrieves one or more vendors of specified [Vendor](entity:Vendor) IDs.

#### Usage (vendors batch get)

```typescript
await client.vendors.batchGet({
    vendorIds: ["INV_V_JDKYHBWT1D4F8MFH63DBMEN8Y4"],
});
```

#### Parameters (vendors batch get)

**request:** `Square.BatchGetVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.batchUpdate({ ...params }) -> Square.BatchUpdateVendorsResponse

#### Description (vendors batch update)

Updates one or more of existing [Vendor](entity:Vendor) objects as suppliers to a seller.

#### Usage (vendors batch update)

```typescript
await client.vendors.batchUpdate({
    vendors: {
        FMCYHBWT1TPL8MFH52PBMEN92A: {
            vendor: {},
        },
        INV_V_JDKYHBWT1D4F8MFH63DBMEN8Y4: {
            vendor: {},
        },
    },
});
```

#### Parameters (vendors batch update)

**request:** `Square.BatchUpdateVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.create({ ...params }) -> Square.CreateVendorResponse

#### Description (vendors create)

Creates a single [Vendor](entity:Vendor) object to represent a supplier to a seller.

#### Usage (vendors create)

```typescript
await client.vendors.create({
    idempotencyKey: "8fc6a5b0-9fe8-4b46-b46b-2ef95793abbe",
    vendor: {
        name: "Joe's Fresh Seafood",
        address: {
            addressLine1: "505 Electric Ave",
            addressLine2: "Suite 600",
            locality: "New York",
            administrativeDistrictLevel1: "NY",
            postalCode: "10003",
            country: "US",
        },
        contacts: [
            {
                name: "Joe Burrow",
                emailAddress: "joe@joesfreshseafood.com",
                phoneNumber: "1-212-555-4250",
                ordinal: 1,
            },
        ],
        accountNumber: "4025391",
        note: "a vendor",
    },
});
```

#### Parameters (vendors create)

**request:** `Square.CreateVendorRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.search({ ...params }) -> Square.SearchVendorsResponse

#### Description (vendors search)

Searches for vendors using a filter against supported [Vendor](entity:Vendor) properties and a supported sorter.

#### Usage (vendors search)

```typescript
await client.vendors.search();
```

#### Parameters (vendors search)

**request:** `Square.SearchVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.get({ ...params }) -> Square.GetVendorResponse

#### Description (vendors get)

Retrieves the vendor of a specified [Vendor](entity:Vendor) ID.

#### Usage (vendors get)

```typescript
await client.vendors.get({
    vendorId: "vendor_id",
});
```

#### Parameters (vendors get)

**request:** `Square.GetVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

### client.vendors.update({ ...params }) -> Square.UpdateVendorResponse

#### Description (vendors update)

Updates an existing [Vendor](entity:Vendor) object as a supplier to a seller.

#### Usage (vendors update)

```typescript
await client.vendors.update({
    vendorId: "vendor_id",
    body: {
        idempotencyKey: "8fc6a5b0-9fe8-4b46-b46b-2ef95793abbe",
        vendor: {
            id: "INV_V_JDKYHBWT1D4F8MFH63DBMEN8Y4",
            name: "Jack's Chicken Shack",
            version: 1,
            status: "ACTIVE",
        },
    },
});
```

#### Parameters (vendors update)

**request:** `Square.UpdateVendorsRequest`

**requestOptions:** `Vendors.RequestOptions`

## Bookings CustomAttributeDefinitions

### client.bookings.customAttributeDefinitions.list({ ...params }) -> core.Page

#### Description (bookings custom attribute definitions list)

Get all bookings custom attribute definitions.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings custom attribute definitions list)

```typescript
const response = await client.bookings.customAttributeDefinitions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bookings.customAttributeDefinitions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bookings custom attribute definitions list)

**request:** `Square.bookings.ListCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.bookings.customAttributeDefinitions.create({ ...params }) -> Square.CreateBookingCustomAttributeDefinitionResponse

#### Description (bookings custom attribute definitions create)

Creates a bookings custom attribute definition.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attribute definitions create)

```typescript
await client.bookings.customAttributeDefinitions.create({
    customAttributeDefinition: {},
});
```

#### Parameters (bookings custom attribute definitions create)

**request:** `Square.bookings.CreateBookingCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.bookings.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveBookingCustomAttributeDefinitionResponse

#### Description (bookings custom attribute definitions get)

Retrieves a bookings custom attribute definition.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings custom attribute definitions get)

```typescript
await client.bookings.customAttributeDefinitions.get({
    key: "key",
});
```

#### Parameters (bookings custom attribute definitions get)

**request:** `Square.bookings.GetCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.bookings.customAttributeDefinitions.update({ ...params }) -> Square.UpdateBookingCustomAttributeDefinitionResponse

#### Description (bookings custom attribute definitions update)

Updates a bookings custom attribute definition.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attribute definitions update)

```typescript
await client.bookings.customAttributeDefinitions.update({
    key: "key",
    customAttributeDefinition: {},
});
```

#### Parameters (bookings custom attribute definitions update)

**request:** `Square.bookings.UpdateBookingCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.bookings.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteBookingCustomAttributeDefinitionResponse

#### Description (bookings custom attribute definitions delete)

Deletes a bookings custom attribute definition.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attribute definitions delete)

```typescript
await client.bookings.customAttributeDefinitions.delete({
    key: "key",
});
```

#### Parameters (bookings custom attribute definitions delete)

**request:** `Square.bookings.DeleteCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

## Bookings CustomAttributes

### client.bookings.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteBookingCustomAttributesResponse

#### Description (bookings custom attributes batch delete)

Bulk deletes bookings custom attributes.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attributes batch delete)

```typescript
await client.bookings.customAttributes.batchDelete({
    values: {
        key: {
            bookingId: "booking_id",
            key: "key",
        },
    },
});
```

#### Parameters (bookings custom attributes batch delete)

**request:** `Square.bookings.BulkDeleteBookingCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.bookings.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertBookingCustomAttributesResponse

#### Description (bookings custom attributes batch upsert)

Bulk upserts bookings custom attributes.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attributes batch upsert)

```typescript
await client.bookings.customAttributes.batchUpsert({
    values: {
        key: {
            bookingId: "booking_id",
            customAttribute: {},
        },
    },
});
```

#### Parameters (bookings custom attributes batch upsert)

**request:** `Square.bookings.BulkUpsertBookingCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.bookings.customAttributes.list({ ...params }) -> core.Page

#### Description (bookings custom attributes list)

Lists a booking's custom attributes.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings custom attributes list)

```typescript
const response = await client.bookings.customAttributes.list({
    bookingId: "booking_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bookings.customAttributes.list({
    bookingId: "booking_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bookings custom attributes list)

**request:** `Square.bookings.ListCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.bookings.customAttributes.get({ ...params }) -> Square.RetrieveBookingCustomAttributeResponse

#### Description (bookings custom attributes get)

Retrieves a bookings custom attribute.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.

#### Usage (bookings custom attributes get)

```typescript
await client.bookings.customAttributes.get({
    bookingId: "booking_id",
    key: "key",
});
```

#### Parameters (bookings custom attributes get)

**request:** `Square.bookings.GetCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.bookings.customAttributes.upsert({ ...params }) -> Square.UpsertBookingCustomAttributeResponse

#### Description (bookings custom attributes upsert)

Upserts a bookings custom attribute.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attributes upsert)

```typescript
await client.bookings.customAttributes.upsert({
    bookingId: "booking_id",
    key: "key",
    customAttribute: {},
});
```

#### Parameters (bookings custom attributes upsert)

**request:** `Square.bookings.UpsertBookingCustomAttributeRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.bookings.customAttributes.delete({ ...params }) -> Square.DeleteBookingCustomAttributeResponse

#### Description (bookings custom attributes delete)

Deletes a bookings custom attribute.

To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.
To call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.

For calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to _Appointments Plus_
or _Appointments Premium_.

#### Usage (bookings custom attributes delete)

```typescript
await client.bookings.customAttributes.delete({
    bookingId: "booking_id",
    key: "key",
});
```

#### Parameters (bookings custom attributes delete)

**request:** `Square.bookings.DeleteCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

## Bookings LocationProfiles

### client.bookings.locationProfiles.list({ ...params }) -> core.Page

#### Description (bookings location profiles list)

Lists location booking profiles of a seller.

#### Usage (bookings location profiles list)

```typescript
const response = await client.bookings.locationProfiles.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bookings.locationProfiles.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bookings location profiles list)

**request:** `Square.bookings.ListLocationProfilesRequest`

**requestOptions:** `LocationProfiles.RequestOptions`

## Bookings TeamMemberProfiles

### client.bookings.teamMemberProfiles.list({ ...params }) -> core.Page

#### Description (bookings team member profiles list)

Lists booking profiles for team members.

#### Usage (bookings team member profiles list)

```typescript
const response = await client.bookings.teamMemberProfiles.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.bookings.teamMemberProfiles.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (bookings team member profiles list)

**request:** `Square.bookings.ListTeamMemberProfilesRequest`

**requestOptions:** `TeamMemberProfiles.RequestOptions`

### client.bookings.teamMemberProfiles.get({ ...params }) -> Square.GetTeamMemberBookingProfileResponse

#### Description (bookings team member profiles get)

Retrieves a team member's booking profile.

#### Usage (bookings team member profiles get)

```typescript
await client.bookings.teamMemberProfiles.get({
    teamMemberId: "team_member_id",
});
```

#### Parameters (bookings team member profiles get)

**request:** `Square.bookings.GetTeamMemberProfilesRequest`

**requestOptions:** `TeamMemberProfiles.RequestOptions`

## CashDrawers Shifts

### client.cashDrawers.shifts.list({ ...params }) -> core.Page

#### Description (cash drawers shifts list)

Provides the details for all of the cash drawer shifts for a location
in a date range.

#### Usage (cash drawers shifts list)

```typescript
const response = await client.cashDrawers.shifts.list({
    locationId: "location_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.cashDrawers.shifts.list({
    locationId: "location_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (cash drawers shifts list)

**request:** `Square.cashDrawers.ListShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.cashDrawers.shifts.get({ ...params }) -> Square.GetCashDrawerShiftResponse

#### Description (cash drawers shifts get)

Provides the summary details for a single cash drawer shift. See
[ListCashDrawerShiftEvents](api-endpoint:CashDrawers-ListCashDrawerShiftEvents) for a list of cash drawer shift events.

#### Usage (cash drawers shifts get)

```typescript
await client.cashDrawers.shifts.get({
    shiftId: "shift_id",
    locationId: "location_id",
});
```

#### Parameters (cash drawers shifts get)

**request:** `Square.cashDrawers.GetShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.cashDrawers.shifts.listEvents({ ...params }) -> core.Page

#### Description (cash drawers shifts list events)

Provides a paginated list of events for a single cash drawer shift.

#### Usage (cash drawers shifts list events)

```typescript
const response = await client.cashDrawers.shifts.listEvents({
    shiftId: "shift_id",
    locationId: "location_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.cashDrawers.shifts.listEvents({
    shiftId: "shift_id",
    locationId: "location_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (cash drawers shifts list events)

**request:** `Square.cashDrawers.ListEventsShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

## Catalog Images

### client.catalog.images.create({ ...params }) -> Square.CreateCatalogImageResponse

#### Description (catalog images create)

Uploads an image file to be represented by a [CatalogImage](entity:CatalogImage) object that can be linked to an existing
[CatalogObject](entity:CatalogObject) instance. The resulting `CatalogImage` is unattached to any `CatalogObject` if the `object_id`
is not specified.

This `CreateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in
JPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.

#### Usage (catalog images create)

```typescript
await client.catalog.images.create({});
```

#### Parameters (catalog images create)

**request:** `Square.catalog.CreateImagesRequest`

**requestOptions:** `Images.RequestOptions`

### client.catalog.images.update({ ...params }) -> Square.UpdateCatalogImageResponse

#### Description (catalog images update)

Uploads a new image file to replace the existing one in the specified [CatalogImage](entity:CatalogImage) object.

This `UpdateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in
JPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.

#### Usage (catalog images update)

```typescript
await client.catalog.images.update({
    imageId: "image_id",
});
```

#### Parameters (catalog images update)

**request:** `Square.catalog.UpdateImagesRequest`

**requestOptions:** `Images.RequestOptions`

## Catalog Object

### client.catalog.object.upsert({ ...params }) -> Square.UpsertCatalogObjectResponse

#### Description (catalog object upsert)

Creates a new or updates the specified [CatalogObject](entity:CatalogObject).

To ensure consistency, only one update request is processed at a time per seller account.
While one (batch or non-batch) update request is being processed, other (batched and non-batched)
update requests are rejected with the `429` error code.

#### Usage (catalog object upsert)

```typescript
await client.catalog.object.upsert({
    idempotencyKey: "af3d1afc-7212-4300-b463-0bfc5314a5ae",
    object: {
        type: "ITEM",
        id: "id",
    },
});
```

#### Parameters (catalog object upsert)

**request:** `Square.catalog.UpsertCatalogObjectRequest`

**requestOptions:** `Object_.RequestOptions`

### client.catalog.object.get({ ...params }) -> Square.GetCatalogObjectResponse

#### Description (catalog object get)

Returns a single [CatalogItem](entity:CatalogItem) as a
[CatalogObject](entity:CatalogObject) based on the provided ID. The returned
object includes all of the relevant [CatalogItem](entity:CatalogItem)
information including: [CatalogItemVariation](entity:CatalogItemVariation)
children, references to its
[CatalogModifierList](entity:CatalogModifierList) objects, and the ids of
any [CatalogTax](entity:CatalogTax) objects that apply to it.

#### Usage (catalog object get)

```typescript
await client.catalog.object.get({
    objectId: "object_id",
});
```

#### Parameters (catalog object get)

**request:** `Square.catalog.GetObjectRequest`

**requestOptions:** `Object_.RequestOptions`

### client.catalog.object.delete({ ...params }) -> Square.DeleteCatalogObjectResponse

#### Description (catalog object delete)

Deletes a single [CatalogObject](entity:CatalogObject) based on the
provided ID and returns the set of successfully deleted IDs in the response.
Deletion is a cascading event such that all children of the targeted object
are also deleted. For example, deleting a [CatalogItem](entity:CatalogItem)
will also delete all of its
[CatalogItemVariation](entity:CatalogItemVariation) children.

To ensure consistency, only one delete request is processed at a time per seller account.
While one (batch or non-batch) delete request is being processed, other (batched and non-batched)
delete requests are rejected with the `429` error code.

#### Usage (catalog object delete)

```typescript
await client.catalog.object.delete({
    objectId: "object_id",
});
```

#### Parameters (catalog object delete)

**request:** `Square.catalog.DeleteObjectRequest`

**requestOptions:** `Object_.RequestOptions`

## Checkout PaymentLinks

### client.checkout.paymentLinks.list({ ...params }) -> core.Page

#### Description (checkout payment links list)

Lists all payment links.

#### Usage (checkout payment links list)

```typescript
const response = await client.checkout.paymentLinks.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.checkout.paymentLinks.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (checkout payment links list)

**request:** `Square.checkout.ListPaymentLinksRequest`

**requestOptions:** `PaymentLinks.RequestOptions`

### client.checkout.paymentLinks.create({ ...params }) -> Square.CreatePaymentLinkResponse

#### Description (checkout payment links create)

Creates a Square-hosted checkout page. Applications can share the resulting payment link with their buyer to pay for goods and services.

#### Usage (checkout payment links create)

```typescript
await client.checkout.paymentLinks.create({
    idempotencyKey: "cd9e25dc-d9f2-4430-aedb-61605070e95f",
    quickPay: {
        name: "Auto Detailing",
        priceMoney: {
            amount: 10000,
            currency: "USD",
        },
        locationId: "A9Y43N9ABXZBP",
    },
});
```

#### Parameters (checkout payment links create)

**request:** `Square.checkout.CreatePaymentLinkRequest`

**requestOptions:** `PaymentLinks.RequestOptions`

### client.checkout.paymentLinks.get({ ...params }) -> Square.GetPaymentLinkResponse

#### Description (checkout payment links get)

Retrieves a payment link.

#### Usage (checkout payment links get)

```typescript
await client.checkout.paymentLinks.get({
    id: "id",
});
```

#### Parameters (checkout payment links get)

**request:** `Square.checkout.GetPaymentLinksRequest`

**requestOptions:** `PaymentLinks.RequestOptions`

### client.checkout.paymentLinks.update({ ...params }) -> Square.UpdatePaymentLinkResponse

#### Description (checkout payment links update)

Updates a payment link. You can update the `payment_link` fields such as
`description`, `checkout_options`, and `pre_populated_data`.
You cannot update other fields such as the `order_id`, `version`, `URL`, or `timestamp` field.

#### Usage (checkout payment links update)

```typescript
await client.checkout.paymentLinks.update({
    id: "id",
    paymentLink: {
        version: 1,
        checkoutOptions: {
            askForShippingAddress: true,
        },
    },
});
```

#### Parameters (checkout payment links update)

**request:** `Square.checkout.UpdatePaymentLinkRequest`

**requestOptions:** `PaymentLinks.RequestOptions`

### client.checkout.paymentLinks.delete({ ...params }) -> Square.DeletePaymentLinkResponse

#### Description (checkout payment links delete)

Deletes a payment link.

#### Usage (checkout payment links delete)

```typescript
await client.checkout.paymentLinks.delete({
    id: "id",
});
```

#### Parameters (checkout payment links delete)

**request:** `Square.checkout.DeletePaymentLinksRequest`

**requestOptions:** `PaymentLinks.RequestOptions`

## Customers CustomAttributeDefinitions

### client.customers.customAttributeDefinitions.list({ ...params }) -> core.Page

#### Description (customers custom attribute definitions list)

Lists the customer-related [custom attribute definitions](entity:CustomAttributeDefinition) that belong to a Square seller account.

When all response pages are retrieved, the results include all custom attribute definitions
that are visible to the requesting application, including those that are created by other
applications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that
seller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attribute definitions list)

```typescript
const response = await client.customers.customAttributeDefinitions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.customers.customAttributeDefinitions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (customers custom attribute definitions list)

**request:** `Square.customers.ListCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.customers.customAttributeDefinitions.create({ ...params }) -> Square.CreateCustomerCustomAttributeDefinitionResponse

#### Description (customers custom attribute definitions create)

Creates a customer-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.
Use this endpoint to define a custom attribute that can be associated with customer profiles.

A custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties
for a custom attribute. After the definition is created, you can call
[UpsertCustomerCustomAttribute](api-endpoint:CustomerCustomAttributes-UpsertCustomerCustomAttribute) or
[BulkUpsertCustomerCustomAttributes](api-endpoint:CustomerCustomAttributes-BulkUpsertCustomerCustomAttributes)
to set the custom attribute for customer profiles in the seller's Customer Directory.

Sellers can view all custom attributes in exported customer data, including those set to
`VISIBILITY_HIDDEN`.

#### Usage (customers custom attribute definitions create)

```typescript
await client.customers.customAttributeDefinitions.create({
    customAttributeDefinition: {
        key: "favoritemovie",
        schema: {
            ref: "https://developer-production-s.squarecdn.com/schemas/v1/common.json#squareup.common.String",
        },
        name: "Favorite Movie",
        description: "The favorite movie of the customer.",
        visibility: "VISIBILITY_HIDDEN",
    },
});
```

#### Parameters (customers custom attribute definitions create)

**request:** `Square.customers.CreateCustomerCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.customers.customAttributeDefinitions.get({ ...params }) -> Square.GetCustomerCustomAttributeDefinitionResponse

#### Description (customers custom attribute definitions get)

Retrieves a customer-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.

To retrieve a custom attribute definition created by another application, the `visibility`
setting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attribute definitions get)

```typescript
await client.customers.customAttributeDefinitions.get({
    key: "key",
});
```

#### Parameters (customers custom attribute definitions get)

**request:** `Square.customers.GetCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.customers.customAttributeDefinitions.update({ ...params }) -> Square.UpdateCustomerCustomAttributeDefinitionResponse

#### Description (customers custom attribute definitions update)

Updates a customer-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.

Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the
`schema` for a `Selection` data type.

Only the definition owner can update a custom attribute definition. Note that sellers can view
all custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.

#### Usage (customers custom attribute definitions update)

```typescript
await client.customers.customAttributeDefinitions.update({
    key: "key",
    customAttributeDefinition: {
        description: "Update the description as desired.",
        visibility: "VISIBILITY_READ_ONLY",
    },
});
```

#### Parameters (customers custom attribute definitions update)

**request:** `Square.customers.UpdateCustomerCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.customers.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteCustomerCustomAttributeDefinitionResponse

#### Description (customers custom attribute definitions delete)

Deletes a customer-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.

Deleting a custom attribute definition also deletes the corresponding custom attribute from
all customer profiles in the seller's Customer Directory.

Only the definition owner can delete a custom attribute definition.

#### Usage (customers custom attribute definitions delete)

```typescript
await client.customers.customAttributeDefinitions.delete({
    key: "key",
});
```

#### Parameters (customers custom attribute definitions delete)

**request:** `Square.customers.DeleteCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.customers.customAttributeDefinitions.batchUpsert({ ...params }) -> Square.BatchUpsertCustomerCustomAttributesResponse

#### Description (customers custom attribute definitions batch upsert)

Creates or updates [custom attributes](entity:CustomAttribute) for customer profiles as a bulk operation.

Use this endpoint to set the value of one or more custom attributes for one or more customer profiles.
A custom attribute is based on a custom attribute definition in a Square seller account, which is
created using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.

This `BulkUpsertCustomerCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert
requests and returns a map of individual upsert responses. Each upsert request has a unique ID
and provides a customer ID and custom attribute. Each upsert response is returned with the ID
of the corresponding request.

To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attribute definitions batch upsert)

```typescript
await client.customers.customAttributeDefinitions.batchUpsert({
    values: {
        id1: {
            customerId: "N3NCVYY3WS27HF0HKANA3R9FP8",
            customAttribute: {
                key: "favoritemovie",
                value: "Dune",
            },
        },
        id2: {
            customerId: "SY8EMWRNDN3TQDP2H4KS1QWMMM",
            customAttribute: {
                key: "ownsmovie",
                value: false,
            },
        },
        id3: {
            customerId: "SY8EMWRNDN3TQDP2H4KS1QWMMM",
            customAttribute: {
                key: "favoritemovie",
                value: "Star Wars",
            },
        },
        id4: {
            customerId: "N3NCVYY3WS27HF0HKANA3R9FP8",
            customAttribute: {
                key: "square:a0f1505a-2aa1-490d-91a8-8d31ff181808",
                value: "10.5",
            },
        },
        id5: {
            customerId: "70548QG1HN43B05G0KCZ4MMC1G",
            customAttribute: {
                key: "sq0ids-0evKIskIGaY45fCyNL66aw:backupemail",
                value: "fake-email@squareup.com",
            },
        },
    },
});
```

#### Parameters (customers custom attribute definitions batch upsert)

**request:** `Square.customers.BatchUpsertCustomerCustomAttributesRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

## Customers Groups

### client.customers.groups.list({ ...params }) -> core.Page

#### Description (customers groups list)

Retrieves the list of customer groups of a business.

#### Usage (customers groups list)

```typescript
const response = await client.customers.groups.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.customers.groups.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (customers groups list)

**request:** `Square.customers.ListGroupsRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.create({ ...params }) -> Square.CreateCustomerGroupResponse

#### Description (customers groups create)

Creates a new customer group for a business.

The request must include the `name` value of the group.

#### Usage (customers groups create)

```typescript
await client.customers.groups.create({
    group: {
        name: "Loyal Customers",
    },
});
```

#### Parameters (customers groups create)

**request:** `Square.customers.CreateCustomerGroupRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.get({ ...params }) -> Square.GetCustomerGroupResponse

#### Description (customers groups get)

Retrieves a specific customer group as identified by the `group_id` value.

#### Usage (customers groups get)

```typescript
await client.customers.groups.get({
    groupId: "group_id",
});
```

#### Parameters (customers groups get)

**request:** `Square.customers.GetGroupsRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.update({ ...params }) -> Square.UpdateCustomerGroupResponse

#### Description (customers groups update)

Updates a customer group as identified by the `group_id` value.

#### Usage (customers groups update)

```typescript
await client.customers.groups.update({
    groupId: "group_id",
    group: {
        name: "Loyal Customers",
    },
});
```

#### Parameters (customers groups update)

**request:** `Square.customers.UpdateCustomerGroupRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.delete({ ...params }) -> Square.DeleteCustomerGroupResponse

#### Description (customers groups delete)

Deletes a customer group as identified by the `group_id` value.

#### Usage (customers groups delete)

```typescript
await client.customers.groups.delete({
    groupId: "group_id",
});
```

#### Parameters (customers groups delete)

**request:** `Square.customers.DeleteGroupsRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.add({ ...params }) -> Square.AddGroupToCustomerResponse

#### Description (customers groups add)

Adds a group membership to a customer.

The customer is identified by the `customer_id` value
and the customer group is identified by the `group_id` value.

#### Usage (customers groups add)

```typescript
await client.customers.groups.add({
    customerId: "customer_id",
    groupId: "group_id",
});
```

#### Parameters (customers groups add)

**request:** `Square.customers.AddGroupsRequest`

**requestOptions:** `Groups.RequestOptions`

### client.customers.groups.remove({ ...params }) -> Square.RemoveGroupFromCustomerResponse

#### Description (customers groups remove)

Removes a group membership from a customer.

The customer is identified by the `customer_id` value
and the customer group is identified by the `group_id` value.

#### Usage (customers groups remove)

```typescript
await client.customers.groups.remove({
    customerId: "customer_id",
    groupId: "group_id",
});
```

#### Parameters (customers groups remove)

**request:** `Square.customers.RemoveGroupsRequest`

**requestOptions:** `Groups.RequestOptions`

## Customers Segments

### client.customers.segments.list({ ...params }) -> core.Page

#### Description (customers segments list)

Retrieves the list of customer segments of a business.

#### Usage (customers segments list)

```typescript
const response = await client.customers.segments.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.customers.segments.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (customers segments list)

**request:** `Square.customers.ListSegmentsRequest`

**requestOptions:** `Segments.RequestOptions`

### client.customers.segments.get({ ...params }) -> Square.GetCustomerSegmentResponse

#### Description (customers segments get)

Retrieves a specific customer segment as identified by the `segment_id` value.

#### Usage (customers segments get)

```typescript
await client.customers.segments.get({
    segmentId: "segment_id",
});
```

#### Parameters (customers segments get)

**request:** `Square.customers.GetSegmentsRequest`

**requestOptions:** `Segments.RequestOptions`

## Customers Cards

### client.customers.cards.create({ ...params }) -> Square.CreateCustomerCardResponse

#### Description (customers cards create)

Adds a card on file to an existing customer.

As with charges, calls to `CreateCustomerCard` are idempotent. Multiple
calls with the same card nonce return the same card record that was created
with the provided nonce during the _first_ call.

#### Usage (customers cards create)

```typescript
await client.customers.cards.create({
    customerId: "customer_id",
    cardNonce: "YOUR_CARD_NONCE",
    billingAddress: {
        addressLine1: "500 Electric Ave",
        addressLine2: "Suite 600",
        locality: "New York",
        administrativeDistrictLevel1: "NY",
        postalCode: "10003",
        country: "US",
    },
    cardholderName: "Amelia Earhart",
});
```

#### Parameters (customers cards create)

**request:** `Square.customers.CreateCustomerCardRequest`

**requestOptions:** `Cards.RequestOptions`

### client.customers.cards.delete({ ...params }) -> Square.DeleteCustomerCardResponse

#### Description (customers cards delete)

Removes a card on file from a customer.

#### Usage (customers cards delete)

```typescript
await client.customers.cards.delete({
    customerId: "customer_id",
    cardId: "card_id",
});
```

#### Parameters (customers cards delete)

**request:** `Square.customers.DeleteCardsRequest`

**requestOptions:** `Cards.RequestOptions`

## Customers CustomAttributes

### client.customers.customAttributes.list({ ...params }) -> core.Page

#### Description (customers custom attributes list)

Lists the [custom attributes](entity:CustomAttribute) associated with a customer profile.

You can use the `with_definitions` query parameter to also retrieve custom attribute definitions
in the same call.

When all response pages are retrieved, the results include all custom attributes that are
visible to the requesting application, including those that are owned by other applications
and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attributes list)

```typescript
const response = await client.customers.customAttributes.list({
    customerId: "customer_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.customers.customAttributes.list({
    customerId: "customer_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (customers custom attributes list)

**request:** `Square.customers.ListCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.customers.customAttributes.get({ ...params }) -> Square.GetCustomerCustomAttributeResponse

#### Description (customers custom attributes get)

Retrieves a [custom attribute](entity:CustomAttribute) associated with a customer profile.

You can use the `with_definition` query parameter to also retrieve the custom attribute definition
in the same call.

To retrieve a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attributes get)

```typescript
await client.customers.customAttributes.get({
    customerId: "customer_id",
    key: "key",
});
```

#### Parameters (customers custom attributes get)

**request:** `Square.customers.GetCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.customers.customAttributes.upsert({ ...params }) -> Square.UpsertCustomerCustomAttributeResponse

#### Description (customers custom attributes upsert)

Creates or updates a [custom attribute](entity:CustomAttribute) for a customer profile.

Use this endpoint to set the value of a custom attribute for a specified customer profile.
A custom attribute is based on a custom attribute definition in a Square seller account, which
is created using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.

To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attributes upsert)

```typescript
await client.customers.customAttributes.upsert({
    customerId: "customer_id",
    key: "key",
    customAttribute: {
        value: "Dune",
    },
});
```

#### Parameters (customers custom attributes upsert)

**request:** `Square.customers.UpsertCustomerCustomAttributeRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.customers.customAttributes.delete({ ...params }) -> Square.DeleteCustomerCustomAttributeResponse

#### Description (customers custom attributes delete)

Deletes a [custom attribute](entity:CustomAttribute) associated with a customer profile.

To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (customers custom attributes delete)

```typescript
await client.customers.customAttributes.delete({
    customerId: "customer_id",
    key: "key",
});
```

#### Parameters (customers custom attributes delete)

**request:** `Square.customers.DeleteCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

## Devices Codes

### client.devices.codes.list({ ...params }) -> core.Page

#### Description (devices codes list)

Lists all DeviceCodes associated with the merchant.

#### Usage (devices codes list)

```typescript
const response = await client.devices.codes.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.devices.codes.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (devices codes list)

**request:** `Square.devices.ListCodesRequest`

**requestOptions:** `Codes.RequestOptions`

### client.devices.codes.create({ ...params }) -> Square.CreateDeviceCodeResponse

#### Description (devices codes create)

Creates a DeviceCode that can be used to login to a Square Terminal device to enter the connected
terminal mode.

#### Usage (devices codes create)

```typescript
await client.devices.codes.create({
    idempotencyKey: "01bb00a6-0c86-4770-94ed-f5fca973cd56",
    deviceCode: {
        name: "Counter 1",
        productType: "TERMINAL_API",
        locationId: "B5E4484SHHNYH",
    },
});
```

#### Parameters (devices codes create)

**request:** `Square.devices.CreateDeviceCodeRequest`

**requestOptions:** `Codes.RequestOptions`

### client.devices.codes.get({ ...params }) -> Square.GetDeviceCodeResponse

#### Description (devices codes get)

Retrieves DeviceCode with the associated ID.

#### Usage (devices codes get)

```typescript
await client.devices.codes.get({
    id: "id",
});
```

#### Parameters (devices codes get)

**request:** `Square.devices.GetCodesRequest`

**requestOptions:** `Codes.RequestOptions`

## Disputes Evidence

### client.disputes.evidence.list({ ...params }) -> core.Page

#### Description (disputes evidence list)

Returns a list of evidence associated with a dispute.

#### Usage (disputes evidence list)

```typescript
const response = await client.disputes.evidence.list({
    disputeId: "dispute_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.disputes.evidence.list({
    disputeId: "dispute_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (disputes evidence list)

**request:** `Square.disputes.ListEvidenceRequest`

**requestOptions:** `Evidence.RequestOptions`

### client.disputes.evidence.get({ ...params }) -> Square.GetDisputeEvidenceResponse

#### Description (disputes evidence get)

Returns the metadata for the evidence specified in the request URL path.

You must maintain a copy of any evidence uploaded if you want to reference it later. Evidence cannot be downloaded after you upload it.

#### Usage (disputes evidence get)

```typescript
await client.disputes.evidence.get({
    disputeId: "dispute_id",
    evidenceId: "evidence_id",
});
```

#### Parameters (disputes evidence get)

**request:** `Square.disputes.GetEvidenceRequest`

**requestOptions:** `Evidence.RequestOptions`

### client.disputes.evidence.delete({ ...params }) -> Square.DeleteDisputeEvidenceResponse

#### Description (disputes evidence delete)

Removes specified evidence from a dispute.
Square does not send the bank any evidence that is removed.

#### Usage (disputes evidence delete)

```typescript
await client.disputes.evidence.delete({
    disputeId: "dispute_id",
    evidenceId: "evidence_id",
});
```

#### Parameters (disputes evidence delete)

**request:** `Square.disputes.DeleteEvidenceRequest`

**requestOptions:** `Evidence.RequestOptions`

## GiftCards Activities

### client.giftCards.activities.list({ ...params }) -> core.Page

#### Description (gift cards activities list)

Lists gift card activities. By default, you get gift card activities for all
gift cards in the seller's account. You can optionally specify query parameters to
filter the list. For example, you can get a list of gift card activities for a gift card,
for all gift cards in a specific region, or for activities within a time window.

#### Usage (gift cards activities list)

```typescript
const response = await client.giftCards.activities.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.giftCards.activities.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (gift cards activities list)

**request:** `Square.giftCards.ListActivitiesRequest`

**requestOptions:** `Activities.RequestOptions`

### client.giftCards.activities.create({ ...params }) -> Square.CreateGiftCardActivityResponse

#### Description (gift cards activities create)

Creates a gift card activity to manage the balance or state of a [gift card](entity:GiftCard).
For example, create an `ACTIVATE` activity to activate a gift card with an initial balance before first use.

#### Usage (gift cards activities create)

```typescript
await client.giftCards.activities.create({
    idempotencyKey: "U16kfr-kA70er-q4Rsym-7U7NnY",
    giftCardActivity: {
        type: "ACTIVATE",
        locationId: "81FN9BNFZTKS4",
        giftCardId: "gftc:6d55a72470d940c6ba09c0ab8ad08d20",
        activateActivityDetails: {
            orderId: "jJNGHm4gLI6XkFbwtiSLqK72KkAZY",
            lineItemUid: "eIWl7X0nMuO9Ewbh0ChIx",
        },
    },
});
```

#### Parameters (gift cards activities create)

**request:** `Square.giftCards.CreateGiftCardActivityRequest`

**requestOptions:** `Activities.RequestOptions`

## Labor BreakTypes

### client.labor.breakTypes.list({ ...params }) -> core.Page

#### Description (labor break types list)

Returns a paginated list of `BreakType` instances for a business.

#### Usage (labor break types list)

```typescript
const response = await client.labor.breakTypes.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.labor.breakTypes.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (labor break types list)

**request:** `Square.labor.ListBreakTypesRequest`

**requestOptions:** `BreakTypes.RequestOptions`

### client.labor.breakTypes.create({ ...params }) -> Square.CreateBreakTypeResponse

#### Description (labor break types create)

Creates a new `BreakType`.

A `BreakType` is a template for creating `Break` objects.
You must provide the following values in your request to this
endpoint:

- `location_id`
- `break_name`
- `expected_duration`
- `is_paid`

You can only have three `BreakType` instances per location. If you attempt to add a fourth
`BreakType` for a location, an `INVALID_REQUEST_ERROR` "Exceeded limit of 3 breaks per location."
is returned.

#### Usage (labor break types create)

```typescript
await client.labor.breakTypes.create({
    idempotencyKey: "PAD3NG5KSN2GL",
    breakType: {
        locationId: "CGJN03P1D08GF",
        breakName: "Lunch Break",
        expectedDuration: "PT30M",
        isPaid: true,
    },
});
```

#### Parameters (labor break types create)

**request:** `Square.labor.CreateBreakTypeRequest`

**requestOptions:** `BreakTypes.RequestOptions`

### client.labor.breakTypes.get({ ...params }) -> Square.GetBreakTypeResponse

#### Description (labor break types get)

Returns a single `BreakType` specified by `id`.

#### Usage (labor break types get)

```typescript
await client.labor.breakTypes.get({
    id: "id",
});
```

#### Parameters (labor break types get)

**request:** `Square.labor.GetBreakTypesRequest`

**requestOptions:** `BreakTypes.RequestOptions`

### client.labor.breakTypes.update({ ...params }) -> Square.UpdateBreakTypeResponse

#### Description (labor break types update)

Updates an existing `BreakType`.

#### Usage (labor break types update)

```typescript
await client.labor.breakTypes.update({
    id: "id",
    breakType: {
        locationId: "26M7H24AZ9N6R",
        breakName: "Lunch",
        expectedDuration: "PT50M",
        isPaid: true,
        version: 1,
    },
});
```

#### Parameters (labor break types update)

**request:** `Square.labor.UpdateBreakTypeRequest`

**requestOptions:** `BreakTypes.RequestOptions`

### client.labor.breakTypes.delete({ ...params }) -> Square.DeleteBreakTypeResponse

#### Description (labor break types delete)

Deletes an existing `BreakType`.

A `BreakType` can be deleted even if it is referenced from a `Shift`.

#### Usage (labor break types delete)

```typescript
await client.labor.breakTypes.delete({
    id: "id",
});
```

#### Parameters (labor break types delete)

**request:** `Square.labor.DeleteBreakTypesRequest`

**requestOptions:** `BreakTypes.RequestOptions`

## Labor EmployeeWages

### client.labor.employeeWages.list({ ...params }) -> core.Page

#### Description (labor employee wages list)

Returns a paginated list of `EmployeeWage` instances for a business.

#### Usage (labor employee wages list)

```typescript
const response = await client.labor.employeeWages.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.labor.employeeWages.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (labor employee wages list)

**request:** `Square.labor.ListEmployeeWagesRequest`

**requestOptions:** `EmployeeWages.RequestOptions`

### client.labor.employeeWages.get({ ...params }) -> Square.GetEmployeeWageResponse

#### Description (labor employee wages get)

Returns a single `EmployeeWage` specified by `id`.

#### Usage (labor employee wages get)

```typescript
await client.labor.employeeWages.get({
    id: "id",
});
```

#### Parameters (labor employee wages get)

**request:** `Square.labor.GetEmployeeWagesRequest`

**requestOptions:** `EmployeeWages.RequestOptions`

## Labor Shifts

### client.labor.shifts.create({ ...params }) -> Square.CreateShiftResponse

#### Description (labor shifts create)

Creates a new `Shift`.

A `Shift` represents a complete workday for a single team member.
You must provide the following values in your request to this
endpoint:

- `location_id`
- `team_member_id`
- `start_at`

An attempt to create a new `Shift` can result in a `BAD_REQUEST` error when:

- The `status` of the new `Shift` is `OPEN` and the team member has another
  shift with an `OPEN` status.
- The `start_at` date is in the future.
- The `start_at` or `end_at` date overlaps another shift for the same team member.
- The `Break` instances are set in the request and a break `start_at`
is before the `Shift.start_at`, a break `end_at` is after
the `Shift.end_at`, or both.

#### Usage (labor shifts create)

```typescript
await client.labor.shifts.create({
    idempotencyKey: "HIDSNG5KS478L",
    shift: {
        locationId: "PAA1RJZZKXBFG",
        startAt: "2019-01-25T03:11:00-05:00",
        endAt: "2019-01-25T13:11:00-05:00",
        wage: {
            title: "Barista",
            hourlyRate: {
                amount: 1100,
                currency: "USD",
            },
            tipEligible: true,
        },
        breaks: [
            {
                startAt: "2019-01-25T06:11:00-05:00",
                endAt: "2019-01-25T06:16:00-05:00",
                breakTypeId: "REGS1EQR1TPZ5",
                name: "Tea Break",
                expectedDuration: "PT5M",
                isPaid: true,
            },
        ],
        teamMemberId: "ormj0jJJZ5OZIzxrZYJI",
        declaredCashTipMoney: {
            amount: 500,
            currency: "USD",
        },
    },
});
```

#### Parameters (labor shifts create)

**request:** `Square.labor.CreateShiftRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.labor.shifts.search({ ...params }) -> Square.SearchShiftsResponse

#### Description (labor shifts search)

Returns a paginated list of `Shift` records for a business.
The list to be returned can be filtered by:

- Location IDs
- Team member IDs
- Shift status (`OPEN` or `CLOSED`)
- Shift start
- Shift end
- Workday details

The list can be sorted by:

- `START_AT`
- `END_AT`
- `CREATED_AT`
- `UPDATED_AT`

#### Usage (labor shifts search)

```typescript
await client.labor.shifts.search({
    query: {
        filter: {
            workday: {
                dateRange: {
                    startDate: "2019-01-20",
                    endDate: "2019-02-03",
                },
                matchShiftsBy: "START_AT",
                defaultTimezone: "America/Los_Angeles",
            },
        },
    },
    limit: 100,
});
```

#### Parameters (labor shifts search)

**request:** `Square.labor.SearchShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.labor.shifts.get({ ...params }) -> Square.GetShiftResponse

#### Description (labor shifts get)

Returns a single `Shift` specified by `id`.

#### Usage (labor shifts get)

```typescript
await client.labor.shifts.get({
    id: "id",
});
```

#### Parameters (labor shifts get)

**request:** `Square.labor.GetShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.labor.shifts.update({ ...params }) -> Square.UpdateShiftResponse

#### Description (labor shifts update)

Updates an existing `Shift`.

When adding a `Break` to a `Shift`, any earlier `Break` instances in the `Shift` have
the `end_at` property set to a valid RFC-3339 datetime string.

When closing a `Shift`, all `Break` instances in the `Shift` must be complete with `end_at`
set on each `Break`.

#### Usage (labor shifts update)

```typescript
await client.labor.shifts.update({
    id: "id",
    shift: {
        locationId: "PAA1RJZZKXBFG",
        startAt: "2019-01-25T03:11:00-05:00",
        endAt: "2019-01-25T13:11:00-05:00",
        wage: {
            title: "Bartender",
            hourlyRate: {
                amount: 1500,
                currency: "USD",
            },
            tipEligible: true,
        },
        breaks: [
            {
                id: "X7GAQYVVRRG6P",
                startAt: "2019-01-25T06:11:00-05:00",
                endAt: "2019-01-25T06:16:00-05:00",
                breakTypeId: "REGS1EQR1TPZ5",
                name: "Tea Break",
                expectedDuration: "PT5M",
                isPaid: true,
            },
        ],
        version: 1,
        teamMemberId: "ormj0jJJZ5OZIzxrZYJI",
        declaredCashTipMoney: {
            amount: 500,
            currency: "USD",
        },
    },
});
```

#### Parameters (labor shifts update)

**request:** `Square.labor.UpdateShiftRequest`

**requestOptions:** `Shifts.RequestOptions`

### client.labor.shifts.delete({ ...params }) -> Square.DeleteShiftResponse

#### Description (labor shifts delete)

Deletes a `Shift`.

#### Usage (labor shifts delete)

```typescript
await client.labor.shifts.delete({
    id: "id",
});
```

#### Parameters (labor shifts delete)

**request:** `Square.labor.DeleteShiftsRequest`

**requestOptions:** `Shifts.RequestOptions`

## Labor TeamMemberWages

### client.labor.teamMemberWages.list({ ...params }) -> core.Page

#### Description (labor team member wages list)

Returns a paginated list of `TeamMemberWage` instances for a business.

#### Usage (labor team member wages list)

```typescript
const response = await client.labor.teamMemberWages.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.labor.teamMemberWages.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (labor team member wages list)

**request:** `Square.labor.ListTeamMemberWagesRequest`

**requestOptions:** `TeamMemberWages.RequestOptions`

### client.labor.teamMemberWages.get({ ...params }) -> Square.GetTeamMemberWageResponse

#### Description (labor team member wages get)

Returns a single `TeamMemberWage` specified by `id`.

#### Usage (labor team member wages get)

```typescript
await client.labor.teamMemberWages.get({
    id: "id",
});
```

#### Parameters (labor team member wages get)

**request:** `Square.labor.GetTeamMemberWagesRequest`

**requestOptions:** `TeamMemberWages.RequestOptions`

## Labor WorkweekConfigs

### client.labor.workweekConfigs.list({ ...params }) -> core.Page

#### Description (labor workweek configs list)

Returns a list of `WorkweekConfig` instances for a business.

#### Usage (labor workweek configs list)

```typescript
const response = await client.labor.workweekConfigs.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.labor.workweekConfigs.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (labor workweek configs list)

**request:** `Square.labor.ListWorkweekConfigsRequest`

**requestOptions:** `WorkweekConfigs.RequestOptions`

### client.labor.workweekConfigs.get({ ...params }) -> Square.UpdateWorkweekConfigResponse

#### Description (labor workweek configs get)

Updates a `WorkweekConfig`.

#### Usage (labor workweek configs get)

```typescript
await client.labor.workweekConfigs.get({
    id: "id",
    workweekConfig: {
        startOfWeek: "MON",
        startOfDayLocalTime: "10:00",
        version: 10,
    },
});
```

#### Parameters (labor workweek configs get)

**request:** `Square.labor.UpdateWorkweekConfigRequest`

**requestOptions:** `WorkweekConfigs.RequestOptions`

## Locations CustomAttributeDefinitions

### client.locations.customAttributeDefinitions.list({ ...params }) -> core.Page

#### Description (locations custom attribute definitions list)

Lists the location-related [custom attribute definitions](entity:CustomAttributeDefinition) that belong to a Square seller account.
When all response pages are retrieved, the results include all custom attribute definitions
that are visible to the requesting application, including those that are created by other
applications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attribute definitions list)

```typescript
const response = await client.locations.customAttributeDefinitions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.locations.customAttributeDefinitions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (locations custom attribute definitions list)

**request:** `Square.locations.ListCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.locations.customAttributeDefinitions.create({ ...params }) -> Square.CreateLocationCustomAttributeDefinitionResponse

#### Description (locations custom attribute definitions create)

Creates a location-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.
Use this endpoint to define a custom attribute that can be associated with locations.
A custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties
for a custom attribute. After the definition is created, you can call
[UpsertLocationCustomAttribute](api-endpoint:LocationCustomAttributes-UpsertLocationCustomAttribute) or
[BulkUpsertLocationCustomAttributes](api-endpoint:LocationCustomAttributes-BulkUpsertLocationCustomAttributes)
to set the custom attribute for locations.

#### Usage (locations custom attribute definitions create)

```typescript
await client.locations.customAttributeDefinitions.create({
    customAttributeDefinition: {
        key: "bestseller",
        schema: {
            ref: "https://developer-production-s.squarecdn.com/schemas/v1/common.json#squareup.common.String",
        },
        name: "Bestseller",
        description: "Bestselling item at location",
        visibility: "VISIBILITY_READ_WRITE_VALUES",
    },
});
```

#### Parameters (locations custom attribute definitions create)

**request:** `Square.locations.CreateLocationCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.locations.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveLocationCustomAttributeDefinitionResponse

#### Description (locations custom attribute definitions get)

Retrieves a location-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.
To retrieve a custom attribute definition created by another application, the `visibility`
setting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attribute definitions get)

```typescript
await client.locations.customAttributeDefinitions.get({
    key: "key",
});
```

#### Parameters (locations custom attribute definitions get)

**request:** `Square.locations.GetCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.locations.customAttributeDefinitions.update({ ...params }) -> Square.UpdateLocationCustomAttributeDefinitionResponse

#### Description (locations custom attribute definitions update)

Updates a location-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.
Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the
`schema` for a `Selection` data type.
Only the definition owner can update a custom attribute definition.

#### Usage (locations custom attribute definitions update)

```typescript
await client.locations.customAttributeDefinitions.update({
    key: "key",
    customAttributeDefinition: {
        description: "Update the description as desired.",
        visibility: "VISIBILITY_READ_ONLY",
    },
});
```

#### Parameters (locations custom attribute definitions update)

**request:** `Square.locations.UpdateLocationCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.locations.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteLocationCustomAttributeDefinitionResponse

#### Description (locations custom attribute definitions delete)

Deletes a location-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.
Deleting a custom attribute definition also deletes the corresponding custom attribute from
all locations.
Only the definition owner can delete a custom attribute definition.

#### Usage (locations custom attribute definitions delete)

```typescript
await client.locations.customAttributeDefinitions.delete({
    key: "key",
});
```

#### Parameters (locations custom attribute definitions delete)

**request:** `Square.locations.DeleteCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

## Locations CustomAttributes

### client.locations.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteLocationCustomAttributesResponse

#### Description (locations custom attributes batch delete)

Deletes [custom attributes](entity:CustomAttribute) for locations as a bulk operation.
To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes batch delete)

```typescript
await client.locations.customAttributes.batchDelete({
    values: {
        id1: {
            key: "bestseller",
        },
        id2: {
            key: "bestseller",
        },
        id3: {
            key: "phone-number",
        },
    },
});
```

#### Parameters (locations custom attributes batch delete)

**request:** `Square.locations.BulkDeleteLocationCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.locations.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertLocationCustomAttributesResponse

#### Description (locations custom attributes batch upsert)

Creates or updates [custom attributes](entity:CustomAttribute) for locations as a bulk operation.
Use this endpoint to set the value of one or more custom attributes for one or more locations.
A custom attribute is based on a custom attribute definition in a Square seller account, which is
created using the [CreateLocationCustomAttributeDefinition](api-endpoint:LocationCustomAttributes-CreateLocationCustomAttributeDefinition) endpoint.
This `BulkUpsertLocationCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert
requests and returns a map of individual upsert responses. Each upsert request has a unique ID
and provides a location ID and custom attribute. Each upsert response is returned with the ID
of the corresponding request.
To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes batch upsert)

```typescript
await client.locations.customAttributes.batchUpsert({
    values: {
        id1: {
            locationId: "L0TBCBTB7P8RQ",
            customAttribute: {
                key: "bestseller",
                value: "hot cocoa",
            },
        },
        id2: {
            locationId: "L9XMD04V3STJX",
            customAttribute: {
                key: "bestseller",
                value: "berry smoothie",
            },
        },
        id3: {
            locationId: "L0TBCBTB7P8RQ",
            customAttribute: {
                key: "phone-number",
                value: "+12223334444",
            },
        },
    },
});
```

#### Parameters (locations custom attributes batch upsert)

**request:** `Square.locations.BulkUpsertLocationCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.locations.customAttributes.list({ ...params }) -> core.Page

#### Description (locations custom attributes list)

Lists the [custom attributes](entity:CustomAttribute) associated with a location.
You can use the `with_definitions` query parameter to also retrieve custom attribute definitions
in the same call.
When all response pages are retrieved, the results include all custom attributes that are
visible to the requesting application, including those that are owned by other applications
and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes list)

```typescript
const response = await client.locations.customAttributes.list({
    locationId: "location_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.locations.customAttributes.list({
    locationId: "location_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (locations custom attributes list)

**request:** `Square.locations.ListCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.locations.customAttributes.get({ ...params }) -> Square.RetrieveLocationCustomAttributeResponse

#### Description (locations custom attributes get)

Retrieves a [custom attribute](entity:CustomAttribute) associated with a location.
You can use the `with_definition` query parameter to also retrieve the custom attribute definition
in the same call.
To retrieve a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes get)

```typescript
await client.locations.customAttributes.get({
    locationId: "location_id",
    key: "key",
});
```

#### Parameters (locations custom attributes get)

**request:** `Square.locations.GetCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.locations.customAttributes.upsert({ ...params }) -> Square.UpsertLocationCustomAttributeResponse

#### Description (locations custom attributes upsert)

Creates or updates a [custom attribute](entity:CustomAttribute) for a location.
Use this endpoint to set the value of a custom attribute for a specified location.
A custom attribute is based on a custom attribute definition in a Square seller account, which
is created using the [CreateLocationCustomAttributeDefinition](api-endpoint:LocationCustomAttributes-CreateLocationCustomAttributeDefinition) endpoint.
To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes upsert)

```typescript
await client.locations.customAttributes.upsert({
    locationId: "location_id",
    key: "key",
    customAttribute: {
        value: "hot cocoa",
    },
});
```

#### Parameters (locations custom attributes upsert)

**request:** `Square.locations.UpsertLocationCustomAttributeRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.locations.customAttributes.delete({ ...params }) -> Square.DeleteLocationCustomAttributeResponse

#### Description (locations custom attributes delete)

Deletes a [custom attribute](entity:CustomAttribute) associated with a location.
To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`.

#### Usage (locations custom attributes delete)

```typescript
await client.locations.customAttributes.delete({
    locationId: "location_id",
    key: "key",
});
```

#### Parameters (locations custom attributes delete)

**request:** `Square.locations.DeleteCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

## Locations Transactions

### client.locations.transactions.list({ ...params }) -> Square.ListTransactionsResponse

#### Description (locations transactions list)

Lists transactions for a particular location.

Transactions include payment information from sales and exchanges and refund
information from returns and exchanges.

Max results per [page](https://developer.squareup.com/docs/working-with-apis/pagination): 50

#### Usage (locations transactions list)

```typescript
await client.locations.transactions.list({
    locationId: "location_id",
});
```

#### Parameters (locations transactions list)

**request:** `Square.locations.ListTransactionsRequest`

**requestOptions:** `Transactions.RequestOptions`

### client.locations.transactions.get({ ...params }) -> Square.GetTransactionResponse

#### Description (locations transactions get)

Retrieves details for a single transaction.

#### Usage (locations transactions get)

```typescript
await client.locations.transactions.get({
    locationId: "location_id",
    transactionId: "transaction_id",
});
```

#### Parameters (locations transactions get)

**request:** `Square.locations.GetTransactionsRequest`

**requestOptions:** `Transactions.RequestOptions`

### client.locations.transactions.capture({ ...params }) -> Square.CaptureTransactionResponse

#### Description (locations transactions capture)

Captures a transaction that was created with the [Charge](api-endpoint:Transactions-Charge)
endpoint with a `delay_capture` value of `true`.

See [Delayed capture transactions](https://developer.squareup.com/docs/payments/transactions/overview#delayed-capture)
for more information.

#### Usage (locations transactions capture)

```typescript
await client.locations.transactions.capture({
    locationId: "location_id",
    transactionId: "transaction_id",
});
```

#### Parameters (locations transactions capture)

**request:** `Square.locations.CaptureTransactionsRequest`

**requestOptions:** `Transactions.RequestOptions`

### client.locations.transactions.void({ ...params }) -> Square.VoidTransactionResponse

#### Description (locations transactions void)

Cancels a transaction that was created with the [Charge](api-endpoint:Transactions-Charge)
endpoint with a `delay_capture` value of `true`.

See [Delayed capture transactions](https://developer.squareup.com/docs/payments/transactions/overview#delayed-capture)
for more information.

#### Usage (locations transactions void)

```typescript
await client.locations.transactions.void({
    locationId: "location_id",
    transactionId: "transaction_id",
});
```

#### Parameters (locations transactions void)

**request:** `Square.locations.VoidTransactionsRequest`

**requestOptions:** `Transactions.RequestOptions`

## Loyalty Accounts

### client.loyalty.accounts.create({ ...params }) -> Square.CreateLoyaltyAccountResponse

#### Description (loyalty accounts create)

Creates a loyalty account. To create a loyalty account, you must provide the `program_id` and a `mapping` with the `phone_number` of the buyer.

#### Usage (loyalty accounts create)

```typescript
await client.loyalty.accounts.create({
    loyaltyAccount: {
        programId: "d619f755-2d17-41f3-990d-c04ecedd64dd",
        mapping: {
            phoneNumber: "+14155551234",
        },
    },
    idempotencyKey: "ec78c477-b1c3-4899-a209-a4e71337c996",
});
```

#### Parameters (loyalty accounts create)

**request:** `Square.loyalty.CreateLoyaltyAccountRequest`

**requestOptions:** `Accounts.RequestOptions`

### client.loyalty.accounts.search({ ...params }) -> Square.SearchLoyaltyAccountsResponse

#### Description (loyalty accounts search)

Searches for loyalty accounts in a loyalty program.

You can search for a loyalty account using the phone number or customer ID associated with the account. To return all loyalty accounts, specify an empty `query` object or omit it entirely.

Search results are sorted by `created_at` in ascending order.

#### Usage (loyalty accounts search)

```typescript
await client.loyalty.accounts.search({
    query: {
        mappings: [
            {
                phoneNumber: "+14155551234",
            },
        ],
    },
    limit: 10,
});
```

#### Parameters (loyalty accounts search)

**request:** `Square.loyalty.SearchLoyaltyAccountsRequest`

**requestOptions:** `Accounts.RequestOptions`

### client.loyalty.accounts.get({ ...params }) -> Square.GetLoyaltyAccountResponse

#### Description (loyalty accounts get)

Retrieves a loyalty account.

#### Usage (loyalty accounts get)

```typescript
await client.loyalty.accounts.get({
    accountId: "account_id",
});
```

#### Parameters (loyalty accounts get)

**request:** `Square.loyalty.GetAccountsRequest`

**requestOptions:** `Accounts.RequestOptions`

### client.loyalty.accounts.accumulatePoints({ ...params }) -> Square.AccumulateLoyaltyPointsResponse

#### Description (loyalty accounts accumulate points)

Adds points earned from a purchase to a [loyalty account](entity:LoyaltyAccount).

- If you are using the Orders API to manage orders, provide the `order_id`. Square reads the order
  to compute the points earned from both the base loyalty program and an associated
  [loyalty promotion](entity:LoyaltyPromotion). For purchases that qualify for multiple accrual
  rules, Square computes points based on the accrual rule that grants the most points.
  For purchases that qualify for multiple promotions, Square computes points based on the most
  recently created promotion. A purchase must first qualify for program points to be eligible for promotion points.

- If you are not using the Orders API to manage orders, provide `points` with the number of points to add.
You must first perform a client-side computation of the points earned from the loyalty program and
loyalty promotion. For spend-based and visit-based programs, you can call [CalculateLoyaltyPoints](api-endpoint:Loyalty-CalculateLoyaltyPoints)
to compute the points earned from the base loyalty program. For information about computing points earned from a loyalty promotion, see
[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).

#### Usage (loyalty accounts accumulate points)

```typescript
await client.loyalty.accounts.accumulatePoints({
    accountId: "account_id",
    accumulatePoints: {
        orderId: "RFZfrdtm3mhO1oGzf5Cx7fEMsmGZY",
    },
    idempotencyKey: "58b90739-c3e8-4b11-85f7-e636d48d72cb",
    locationId: "P034NEENMD09F",
});
```

#### Parameters (loyalty accounts accumulate points)

**request:** `Square.loyalty.AccumulateLoyaltyPointsRequest`

**requestOptions:** `Accounts.RequestOptions`

### client.loyalty.accounts.adjust({ ...params }) -> Square.AdjustLoyaltyPointsResponse

#### Description (loyalty accounts adjust)

Adds points to or subtracts points from a buyer's account.

Use this endpoint only when you need to manually adjust points. Otherwise, in your application flow, you call
[AccumulateLoyaltyPoints](api-endpoint:Loyalty-AccumulateLoyaltyPoints)
to add points when a buyer pays for the purchase.

#### Usage (loyalty accounts adjust)

```typescript
await client.loyalty.accounts.adjust({
    accountId: "account_id",
    idempotencyKey: "bc29a517-3dc9-450e-aa76-fae39ee849d1",
    adjustPoints: {
        points: 10,
        reason: "Complimentary points",
    },
});
```

#### Parameters (loyalty accounts adjust)

**request:** `Square.loyalty.AdjustLoyaltyPointsRequest`

**requestOptions:** `Accounts.RequestOptions`

## Loyalty Programs

### client.loyalty.programs.list() -> Square.ListLoyaltyProgramsResponse

#### Description (loyalty programs list)

Returns a list of loyalty programs in the seller's account.
Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard. For more information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).

Replaced with [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram) when used with the keyword `main`.

#### Usage (loyalty programs list)

```typescript
await client.loyalty.programs.list();
```

#### Parameters (loyalty programs list)

**requestOptions:** `Programs.RequestOptions`

### client.loyalty.programs.get({ ...params }) -> Square.GetLoyaltyProgramResponse

#### Description (loyalty programs get)

Retrieves the loyalty program in a seller's account, specified by the program ID or the keyword `main`.

Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard. For more information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).

#### Usage (loyalty programs get)

```typescript
await client.loyalty.programs.get({
    programId: "program_id",
});
```

#### Parameters (loyalty programs get)

**request:** `Square.loyalty.GetProgramsRequest`

**requestOptions:** `Programs.RequestOptions`

### client.loyalty.programs.calculate({ ...params }) -> Square.CalculateLoyaltyPointsResponse

#### Description (loyalty programs calculate)

Calculates the number of points a buyer can earn from a purchase. Applications might call this endpoint
to display the points to the buyer.

- If you are using the Orders API to manage orders, provide the `order_id` and (optional) `loyalty_account_id`.
  Square reads the order to compute the points earned from the base loyalty program and an associated
  [loyalty promotion](entity:LoyaltyPromotion).

- If you are not using the Orders API to manage orders, provide `transaction_amount_money` with the
purchase amount. Square uses this amount to calculate the points earned from the base loyalty program,
but not points earned from a loyalty promotion. For spend-based and visit-based programs, the `tax_mode`
setting of the accrual rule indicates how taxes should be treated for loyalty points accrual.
If the purchase qualifies for program points, call
[ListLoyaltyPromotions](api-endpoint:Loyalty-ListLoyaltyPromotions) and perform a client-side computation
to calculate whether the purchase also qualifies for promotion points. For more information, see
[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).

#### Usage (loyalty programs calculate)

```typescript
await client.loyalty.programs.calculate({
    programId: "program_id",
    orderId: "RFZfrdtm3mhO1oGzf5Cx7fEMsmGZY",
    loyaltyAccountId: "79b807d2-d786-46a9-933b-918028d7a8c5",
});
```

#### Parameters (loyalty programs calculate)

**request:** `Square.loyalty.CalculateLoyaltyPointsRequest`

**requestOptions:** `Programs.RequestOptions`

## Loyalty Rewards

### client.loyalty.rewards.create({ ...params }) -> Square.CreateLoyaltyRewardResponse

#### Description (loyalty rewards create)

Creates a loyalty reward. In the process, the endpoint does following:

- Uses the `reward_tier_id` in the request to determine the number of points
  to lock for this reward.
- If the request includes `order_id`, it adds the reward and related discount to the order.

After a reward is created, the points are locked and
not available for the buyer to redeem another reward.

#### Usage (loyalty rewards create)

```typescript
await client.loyalty.rewards.create({
    reward: {
        loyaltyAccountId: "5adcb100-07f1-4ee7-b8c6-6bb9ebc474bd",
        rewardTierId: "e1b39225-9da5-43d1-a5db-782cdd8ad94f",
        orderId: "RFZfrdtm3mhO1oGzf5Cx7fEMsmGZY",
    },
    idempotencyKey: "18c2e5ea-a620-4b1f-ad60-7b167285e451",
});
```

#### Parameters (loyalty rewards create)

**request:** `Square.loyalty.CreateLoyaltyRewardRequest`

**requestOptions:** `Rewards.RequestOptions`

### client.loyalty.rewards.search({ ...params }) -> Square.SearchLoyaltyRewardsResponse

#### Description (loyalty rewards search)

Searches for loyalty rewards. This endpoint accepts a request with no query filters and returns results for all loyalty accounts.
If you include a `query` object, `loyalty_account_id` is required and `status` is optional.

If you know a reward ID, use the
[RetrieveLoyaltyReward](api-endpoint:Loyalty-RetrieveLoyaltyReward) endpoint.

Search results are sorted by `updated_at` in descending order.

#### Usage (loyalty rewards search)

```typescript
await client.loyalty.rewards.search({
    query: {
        loyaltyAccountId: "5adcb100-07f1-4ee7-b8c6-6bb9ebc474bd",
    },
    limit: 10,
});
```

#### Parameters (loyalty rewards search)

**request:** `Square.loyalty.SearchLoyaltyRewardsRequest`

**requestOptions:** `Rewards.RequestOptions`

### client.loyalty.rewards.get({ ...params }) -> Square.GetLoyaltyRewardResponse

#### Description (loyalty rewards get)

Retrieves a loyalty reward.

#### Usage (loyalty rewards get)

```typescript
await client.loyalty.rewards.get({
    rewardId: "reward_id",
});
```

#### Parameters (loyalty rewards get)

**request:** `Square.loyalty.GetRewardsRequest`

**requestOptions:** `Rewards.RequestOptions`

### client.loyalty.rewards.delete({ ...params }) -> Square.DeleteLoyaltyRewardResponse

#### Description (loyalty rewards delete)

Deletes a loyalty reward by doing the following:

- Returns the loyalty points back to the loyalty account.
- If an order ID was specified when the reward was created
  (see [CreateLoyaltyReward](api-endpoint:Loyalty-CreateLoyaltyReward)),
  it updates the order by removing the reward and related
  discounts.

You cannot delete a reward that has reached the terminal state (REDEEMED).

#### Usage (loyalty rewards delete)

```typescript
await client.loyalty.rewards.delete({
    rewardId: "reward_id",
});
```

#### Parameters (loyalty rewards delete)

**request:** `Square.loyalty.DeleteRewardsRequest`

**requestOptions:** `Rewards.RequestOptions`

### client.loyalty.rewards.redeem({ ...params }) -> Square.RedeemLoyaltyRewardResponse

#### Description (loyalty rewards redeem)

Redeems a loyalty reward.

The endpoint sets the reward to the `REDEEMED` terminal state.

If you are using your own order processing system (not using the
Orders API), you call this endpoint after the buyer paid for the
purchase.

After the reward reaches the terminal state, it cannot be deleted.
In other words, points used for the reward cannot be returned
to the account.

#### Usage (loyalty rewards redeem)

```typescript
await client.loyalty.rewards.redeem({
    rewardId: "reward_id",
    idempotencyKey: "98adc7f7-6963-473b-b29c-f3c9cdd7d994",
    locationId: "P034NEENMD09F",
});
```

#### Parameters (loyalty rewards redeem)

**request:** `Square.loyalty.RedeemLoyaltyRewardRequest`

**requestOptions:** `Rewards.RequestOptions`

## Loyalty Programs Promotions

### client.loyalty.programs.promotions.list({ ...params }) -> core.Page

#### Description (loyalty programs promotions list)

Lists the loyalty promotions associated with a [loyalty program](entity:LoyaltyProgram).
Results are sorted by the `created_at` date in descending order (newest to oldest).

#### Usage (loyalty programs promotions list)

```typescript
const response = await client.loyalty.programs.promotions.list({
    programId: "program_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.loyalty.programs.promotions.list({
    programId: "program_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (loyalty programs promotions list)

**request:** `Square.loyalty.programs.ListPromotionsRequest`

**requestOptions:** `Promotions.RequestOptions`

### client.loyalty.programs.promotions.create({ ...params }) -> Square.CreateLoyaltyPromotionResponse

#### Description (loyalty programs promotions create)

Creates a loyalty promotion for a [loyalty program](entity:LoyaltyProgram). A loyalty promotion
enables buyers to earn points in addition to those earned from the base loyalty program.

This endpoint sets the loyalty promotion to the `ACTIVE` or `SCHEDULED` status, depending on the
`available_time` setting. A loyalty program can have a maximum of 10 loyalty promotions with an
`ACTIVE` or `SCHEDULED` status.

#### Usage (loyalty programs promotions create)

```typescript
await client.loyalty.programs.promotions.create({
    programId: "program_id",
    loyaltyPromotion: {
        name: "Tuesday Happy Hour Promo",
        incentive: {
            type: "POINTS_MULTIPLIER",
            pointsMultiplierData: {
                multiplier: "3.0",
            },
        },
        availableTime: {
            timePeriods: [
                "BEGIN:VEVENT\nDTSTART:20220816T160000\nDURATION:PT2H\nRRULE:FREQ=WEEKLY;BYDAY=TU\nEND:VEVENT",
            ],
        },
        triggerLimit: {
            times: 1,
            interval: "DAY",
        },
        minimumSpendAmountMoney: {
            amount: 2000,
            currency: "USD",
        },
        qualifyingCategoryIds: ["XTQPYLR3IIU9C44VRCB3XD12"],
    },
    idempotencyKey: "ec78c477-b1c3-4899-a209-a4e71337c996",
});
```

#### Parameters (loyalty programs promotions create)

**request:** `Square.loyalty.programs.CreateLoyaltyPromotionRequest`

**requestOptions:** `Promotions.RequestOptions`

### client.loyalty.programs.promotions.get({ ...params }) -> Square.GetLoyaltyPromotionResponse

#### Description (loyalty programs promotions get)

Retrieves a loyalty promotion.

#### Usage (loyalty programs promotions get)

```typescript
await client.loyalty.programs.promotions.get({
    promotionId: "promotion_id",
    programId: "program_id",
});
```

#### Parameters (loyalty programs promotions get)

**request:** `Square.loyalty.programs.GetPromotionsRequest`

**requestOptions:** `Promotions.RequestOptions`

### client.loyalty.programs.promotions.cancel({ ...params }) -> Square.CancelLoyaltyPromotionResponse

#### Description (loyalty programs promotions cancel)

Cancels a loyalty promotion. Use this endpoint to cancel an `ACTIVE` promotion earlier than the
end date, cancel an `ACTIVE` promotion when an end date is not specified, or cancel a `SCHEDULED` promotion.
Because updating a promotion is not supported, you can also use this endpoint to cancel a promotion before
you create a new one.

This endpoint sets the loyalty promotion to the `CANCELED` state

#### Usage (loyalty programs promotions cancel)

```typescript
await client.loyalty.programs.promotions.cancel({
    promotionId: "promotion_id",
    programId: "program_id",
});
```

#### Parameters (loyalty programs promotions cancel)

**request:** `Square.loyalty.programs.CancelPromotionsRequest`

**requestOptions:** `Promotions.RequestOptions`

## Merchants CustomAttributeDefinitions

### client.merchants.customAttributeDefinitions.list({ ...params }) -> core.Page

#### Description (merchants custom attribute definitions list)

Lists the merchant-related [custom attribute definitions](entity:CustomAttributeDefinition) that belong to a Square seller account.
When all response pages are retrieved, the results include all custom attribute definitions
that are visible to the requesting application, including those that are created by other
applications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attribute definitions list)

```typescript
const response = await client.merchants.customAttributeDefinitions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.merchants.customAttributeDefinitions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (merchants custom attribute definitions list)

**request:** `Square.merchants.ListCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.merchants.customAttributeDefinitions.create({ ...params }) -> Square.CreateMerchantCustomAttributeDefinitionResponse

#### Description (merchants custom attribute definitions create)

Creates a merchant-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.
Use this endpoint to define a custom attribute that can be associated with a merchant connecting to your application.
A custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties
for a custom attribute. After the definition is created, you can call
[UpsertMerchantCustomAttribute](api-endpoint:MerchantCustomAttributes-UpsertMerchantCustomAttribute) or
[BulkUpsertMerchantCustomAttributes](api-endpoint:MerchantCustomAttributes-BulkUpsertMerchantCustomAttributes)
to set the custom attribute for a merchant.

#### Usage (merchants custom attribute definitions create)

```typescript
await client.merchants.customAttributeDefinitions.create({
    customAttributeDefinition: {
        key: "alternative_seller_name",
        schema: {
            ref: "https://developer-production-s.squarecdn.com/schemas/v1/common.json#squareup.common.String",
        },
        name: "Alternative Merchant Name",
        description: "This is the other name this merchant goes by.",
        visibility: "VISIBILITY_READ_ONLY",
    },
});
```

#### Parameters (merchants custom attribute definitions create)

**request:** `Square.merchants.CreateMerchantCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.merchants.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveMerchantCustomAttributeDefinitionResponse

#### Description (merchants custom attribute definitions get)

Retrieves a merchant-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.
To retrieve a custom attribute definition created by another application, the `visibility`
setting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attribute definitions get)

```typescript
await client.merchants.customAttributeDefinitions.get({
    key: "key",
});
```

#### Parameters (merchants custom attribute definitions get)

**request:** `Square.merchants.GetCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.merchants.customAttributeDefinitions.update({ ...params }) -> Square.UpdateMerchantCustomAttributeDefinitionResponse

#### Description (merchants custom attribute definitions update)

Updates a merchant-related [custom attribute definition](entity:CustomAttributeDefinition) for a Square seller account.
Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the
`schema` for a `Selection` data type.
Only the definition owner can update a custom attribute definition.

#### Usage (merchants custom attribute definitions update)

```typescript
await client.merchants.customAttributeDefinitions.update({
    key: "key",
    customAttributeDefinition: {
        description: "Update the description as desired.",
        visibility: "VISIBILITY_READ_ONLY",
    },
});
```

#### Parameters (merchants custom attribute definitions update)

**request:** `Square.merchants.UpdateMerchantCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.merchants.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteMerchantCustomAttributeDefinitionResponse

#### Description (merchants custom attribute definitions delete)

Deletes a merchant-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.
Deleting a custom attribute definition also deletes the corresponding custom attribute from
the merchant.
Only the definition owner can delete a custom attribute definition.

#### Usage (merchants custom attribute definitions delete)

```typescript
await client.merchants.customAttributeDefinitions.delete({
    key: "key",
});
```

#### Parameters (merchants custom attribute definitions delete)

**request:** `Square.merchants.DeleteCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

## Merchants CustomAttributes

### client.merchants.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteMerchantCustomAttributesResponse

#### Description (merchants custom attributes batch delete)

Deletes [custom attributes](entity:CustomAttribute) for a merchant as a bulk operation.
To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes batch delete)

```typescript
await client.merchants.customAttributes.batchDelete({
    values: {
        id1: {
            key: "alternative_seller_name",
        },
        id2: {
            key: "has_seen_tutorial",
        },
    },
});
```

#### Parameters (merchants custom attributes batch delete)

**request:** `Square.merchants.BulkDeleteMerchantCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.merchants.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertMerchantCustomAttributesResponse

#### Description (merchants custom attributes batch upsert)

Creates or updates [custom attributes](entity:CustomAttribute) for a merchant as a bulk operation.
Use this endpoint to set the value of one or more custom attributes for a merchant.
A custom attribute is based on a custom attribute definition in a Square seller account, which is
created using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.
This `BulkUpsertMerchantCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert
requests and returns a map of individual upsert responses. Each upsert request has a unique ID
and provides a merchant ID and custom attribute. Each upsert response is returned with the ID
of the corresponding request.
To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes batch upsert)

```typescript
await client.merchants.customAttributes.batchUpsert({
    values: {
        id1: {
            merchantId: "DM7VKY8Q63GNP",
            customAttribute: {
                key: "alternative_seller_name",
                value: "Ultimate Sneaker Store",
            },
        },
        id2: {
            merchantId: "DM7VKY8Q63GNP",
            customAttribute: {
                key: "has_seen_tutorial",
                value: true,
            },
        },
    },
});
```

#### Parameters (merchants custom attributes batch upsert)

**request:** `Square.merchants.BulkUpsertMerchantCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.merchants.customAttributes.list({ ...params }) -> core.Page

#### Description (merchants custom attributes list)

Lists the [custom attributes](entity:CustomAttribute) associated with a merchant.
You can use the `with_definitions` query parameter to also retrieve custom attribute definitions
in the same call.
When all response pages are retrieved, the results include all custom attributes that are
visible to the requesting application, including those that are owned by other applications
and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes list)

```typescript
const response = await client.merchants.customAttributes.list({
    merchantId: "merchant_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.merchants.customAttributes.list({
    merchantId: "merchant_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (merchants custom attributes list)

**request:** `Square.merchants.ListCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.merchants.customAttributes.get({ ...params }) -> Square.RetrieveMerchantCustomAttributeResponse

#### Description (merchants custom attributes get)

Retrieves a [custom attribute](entity:CustomAttribute) associated with a merchant.
You can use the `with_definition` query parameter to also retrieve the custom attribute definition
in the same call.
To retrieve a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes get)

```typescript
await client.merchants.customAttributes.get({
    merchantId: "merchant_id",
    key: "key",
});
```

#### Parameters (merchants custom attributes get)

**request:** `Square.merchants.GetCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.merchants.customAttributes.upsert({ ...params }) -> Square.UpsertMerchantCustomAttributeResponse

#### Description (merchants custom attributes upsert)

Creates or updates a [custom attribute](entity:CustomAttribute) for a merchant.
Use this endpoint to set the value of a custom attribute for a specified merchant.
A custom attribute is based on a custom attribute definition in a Square seller account, which
is created using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.
To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes upsert)

```typescript
await client.merchants.customAttributes.upsert({
    merchantId: "merchant_id",
    key: "key",
    customAttribute: {
        value: "Ultimate Sneaker Store",
    },
});
```

#### Parameters (merchants custom attributes upsert)

**request:** `Square.merchants.UpsertMerchantCustomAttributeRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.merchants.customAttributes.delete({ ...params }) -> Square.DeleteMerchantCustomAttributeResponse

#### Description (merchants custom attributes delete)

Deletes a [custom attribute](entity:CustomAttribute) associated with a merchant.
To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`.

#### Usage (merchants custom attributes delete)

```typescript
await client.merchants.customAttributes.delete({
    merchantId: "merchant_id",
    key: "key",
});
```

#### Parameters (merchants custom attributes delete)

**request:** `Square.merchants.DeleteCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

## Orders CustomAttributeDefinitions

### client.orders.customAttributeDefinitions.list({ ...params }) -> core.Page

#### Description (orders custom attribute definitions list)

Lists the order-related [custom attribute definitions](entity:CustomAttributeDefinition) that belong to a Square seller account.

When all response pages are retrieved, the results include all custom attribute definitions
that are visible to the requesting application, including those that are created by other
applications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that
seller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attribute definitions list)

```typescript
const response = await client.orders.customAttributeDefinitions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.orders.customAttributeDefinitions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (orders custom attribute definitions list)

**request:** `Square.orders.ListCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.orders.customAttributeDefinitions.create({ ...params }) -> Square.CreateOrderCustomAttributeDefinitionResponse

#### Description (orders custom attribute definitions create)

Creates an order-related custom attribute definition. Use this endpoint to
define a custom attribute that can be associated with orders.

After creating a custom attribute definition, you can set the custom attribute for orders
in the Square seller account.

#### Usage (orders custom attribute definitions create)

```typescript
await client.orders.customAttributeDefinitions.create({
    customAttributeDefinition: {
        key: "cover-count",
        schema: {
            ref: "https://developer-production-s.squarecdn.com/schemas/v1/common.json#squareup.common.Number",
        },
        name: "Cover count",
        description: "The number of people seated at a table",
        visibility: "VISIBILITY_READ_WRITE_VALUES",
    },
    idempotencyKey: "IDEMPOTENCY_KEY",
});
```

#### Parameters (orders custom attribute definitions create)

**request:** `Square.orders.CreateOrderCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.orders.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveOrderCustomAttributeDefinitionResponse

#### Description (orders custom attribute definitions get)

Retrieves an order-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.

To retrieve a custom attribute definition created by another application, the `visibility`
setting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attribute definitions get)

```typescript
await client.orders.customAttributeDefinitions.get({
    key: "key",
});
```

#### Parameters (orders custom attribute definitions get)

**request:** `Square.orders.GetCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.orders.customAttributeDefinitions.update({ ...params }) -> Square.UpdateOrderCustomAttributeDefinitionResponse

#### Description (orders custom attribute definitions update)

Updates an order-related custom attribute definition for a Square seller account.

Only the definition owner can update a custom attribute definition. Note that sellers can view all custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.

#### Usage (orders custom attribute definitions update)

```typescript
await client.orders.customAttributeDefinitions.update({
    key: "key",
    customAttributeDefinition: {
        key: "cover-count",
        visibility: "VISIBILITY_READ_ONLY",
        version: 1,
    },
    idempotencyKey: "IDEMPOTENCY_KEY",
});
```

#### Parameters (orders custom attribute definitions update)

**request:** `Square.orders.UpdateOrderCustomAttributeDefinitionRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

### client.orders.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteOrderCustomAttributeDefinitionResponse

#### Description (orders custom attribute definitions delete)

Deletes an order-related [custom attribute definition](entity:CustomAttributeDefinition) from a Square seller account.

Only the definition owner can delete a custom attribute definition.

#### Usage (orders custom attribute definitions delete)

```typescript
await client.orders.customAttributeDefinitions.delete({
    key: "key",
});
```

#### Parameters (orders custom attribute definitions delete)

**request:** `Square.orders.DeleteCustomAttributeDefinitionsRequest`

**requestOptions:** `CustomAttributeDefinitions.RequestOptions`

## Orders CustomAttributes

### client.orders.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteOrderCustomAttributesResponse

#### Description (orders custom attributes batch delete)

Deletes order [custom attributes](entity:CustomAttribute) as a bulk operation.

Use this endpoint to delete one or more custom attributes from one or more orders.
A custom attribute is based on a custom attribute definition in a Square seller account. (To create a
custom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)

This `BulkDeleteOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual delete
requests and returns a map of individual delete responses. Each delete request has a unique ID
and provides an order ID and custom attribute. Each delete response is returned with the ID
of the corresponding request.

To delete a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes batch delete)

```typescript
await client.orders.customAttributes.batchDelete({
    values: {
        "cover-count": {
            key: "cover-count",
            orderId: "7BbXGEIWNldxAzrtGf9GPVZTwZ4F",
        },
        "table-number": {
            key: "table-number",
            orderId: "7BbXGEIWNldxAzrtGf9GPVZTwZ4F",
        },
    },
});
```

#### Parameters (orders custom attributes batch delete)

**request:** `Square.orders.BulkDeleteOrderCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.orders.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertOrderCustomAttributesResponse

#### Description (orders custom attributes batch upsert)

Creates or updates order [custom attributes](entity:CustomAttribute) as a bulk operation.

Use this endpoint to delete one or more custom attributes from one or more orders.
A custom attribute is based on a custom attribute definition in a Square seller account. (To create a
custom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)

This `BulkUpsertOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert
requests and returns a map of individual upsert responses. Each upsert request has a unique ID
and provides an order ID and custom attribute. Each upsert response is returned with the ID
of the corresponding request.

To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes batch upsert)

```typescript
await client.orders.customAttributes.batchUpsert({
    values: {
        "cover-count": {
            customAttribute: {
                key: "cover-count",
                value: "6",
                version: 2,
            },
            orderId: "7BbXGEIWNldxAzrtGf9GPVZTwZ4F",
        },
        "table-number": {
            customAttribute: {
                key: "table-number",
                value: "11",
                version: 4,
            },
            orderId: "7BbXGEIWNldxAzrtGf9GPVZTwZ4F",
        },
    },
});
```

#### Parameters (orders custom attributes batch upsert)

**request:** `Square.orders.BulkUpsertOrderCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.orders.customAttributes.list({ ...params }) -> core.Page

#### Description (orders custom attributes list)

Lists the [custom attributes](entity:CustomAttribute) associated with an order.

You can use the `with_definitions` query parameter to also retrieve custom attribute definitions
in the same call.

When all response pages are retrieved, the results include all custom attributes that are
visible to the requesting application, including those that are owned by other applications
and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes list)

```typescript
const response = await client.orders.customAttributes.list({
    orderId: "order_id",
});
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.orders.customAttributes.list({
    orderId: "order_id",
});
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (orders custom attributes list)

**request:** `Square.orders.ListCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.orders.customAttributes.get({ ...params }) -> Square.RetrieveOrderCustomAttributeResponse

#### Description (orders custom attributes get)

Retrieves a [custom attribute](entity:CustomAttribute) associated with an order.

You can use the `with_definition` query parameter to also retrieve the custom attribute definition
in the same call.

To retrieve a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes get)

```typescript
await client.orders.customAttributes.get({
    orderId: "order_id",
    customAttributeKey: "custom_attribute_key",
});
```

#### Parameters (orders custom attributes get)

**request:** `Square.orders.GetCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.orders.customAttributes.upsert({ ...params }) -> Square.UpsertOrderCustomAttributeResponse

#### Description (orders custom attributes upsert)

Creates or updates a [custom attribute](entity:CustomAttribute) for an order.

Use this endpoint to set the value of a custom attribute for a specific order.
A custom attribute is based on a custom attribute definition in a Square seller account. (To create a
custom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)

To create or update a custom attribute owned by another application, the `visibility` setting
must be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes upsert)

```typescript
await client.orders.customAttributes.upsert({
    orderId: "order_id",
    customAttributeKey: "custom_attribute_key",
    customAttribute: {
        key: "table-number",
        value: "42",
        version: 1,
    },
});
```

#### Parameters (orders custom attributes upsert)

**request:** `Square.orders.UpsertOrderCustomAttributeRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

### client.orders.customAttributes.delete({ ...params }) -> Square.DeleteOrderCustomAttributeResponse

#### Description (orders custom attributes delete)

Deletes a [custom attribute](entity:CustomAttribute) associated with a customer profile.

To delete a custom attribute owned by another application, the `visibility` setting must be
`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes
(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.

#### Usage (orders custom attributes delete)

```typescript
await client.orders.customAttributes.delete({
    orderId: "order_id",
    customAttributeKey: "custom_attribute_key",
});
```

#### Parameters (orders custom attributes delete)

**request:** `Square.orders.DeleteCustomAttributesRequest`

**requestOptions:** `CustomAttributes.RequestOptions`

## TeamMembers WageSetting

### client.teamMembers.wageSetting.get({ ...params }) -> Square.GetWageSettingResponse

#### Description (team members wage setting get)

Retrieves a `WageSetting` object for a team member specified
by `TeamMember.id`. For more information, see
[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrievewagesetting).

Square recommends using [RetrieveTeamMember](api-endpoint:Team-RetrieveTeamMember) or [SearchTeamMembers](api-endpoint:Team-SearchTeamMembers)
to get this information directly from the `TeamMember.wage_setting` field.

#### Usage (team members wage setting get)

```typescript
await client.teamMembers.wageSetting.get({
    teamMemberId: "team_member_id",
});
```

#### Parameters (team members wage setting get)

**request:** `Square.teamMembers.GetWageSettingRequest`

**requestOptions:** `WageSetting.RequestOptions`

### client.teamMembers.wageSetting.update({ ...params }) -> Square.UpdateWageSettingResponse

#### Description (team members wage setting update)

Creates or updates a `WageSetting` object. The object is created if a
`WageSetting` with the specified `team_member_id` doesn't exist. Otherwise,
it fully replaces the `WageSetting` object for the team member.
The `WageSetting` is returned on a successful update. For more information, see
[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#create-or-update-a-wage-setting).

Square recommends using [CreateTeamMember](api-endpoint:Team-CreateTeamMember) or [UpdateTeamMember](api-endpoint:Team-UpdateTeamMember)
to manage the `TeamMember.wage_setting` field directly.

#### Usage (team members wage setting update)

```typescript
await client.teamMembers.wageSetting.update({
    teamMemberId: "team_member_id",
    wageSetting: {
        jobAssignments: [
            {
                jobTitle: "Manager",
                payType: "SALARY",
                annualRate: {
                    amount: 3000000,
                    currency: "USD",
                },
                weeklyHours: 40,
            },
            {
                jobTitle: "Cashier",
                payType: "HOURLY",
                hourlyRate: {
                    amount: 2000,
                    currency: "USD",
                },
            },
        ],
        isOvertimeExempt: true,
    },
});
```

#### Parameters (team members wage setting update)

**request:** `Square.teamMembers.UpdateWageSettingRequest`

**requestOptions:** `WageSetting.RequestOptions`

## Terminal Actions

### client.terminal.actions.create({ ...params }) -> Square.CreateTerminalActionResponse

#### Description (terminal actions create)

Creates a Terminal action request and sends it to the specified device.

#### Usage (terminal actions create)

```typescript
await client.terminal.actions.create({
    idempotencyKey: "thahn-70e75c10-47f7-4ab6-88cc-aaa4076d065e",
    action: {
        deviceId: "{{DEVICE_ID}}",
        deadlineDuration: "PT5M",
        type: "SAVE_CARD",
        saveCardOptions: {
            customerId: "{{CUSTOMER_ID}}",
            referenceId: "user-id-1",
        },
    },
});
```

#### Parameters (terminal actions create)

**request:** `Square.terminal.CreateTerminalActionRequest`

**requestOptions:** `Actions.RequestOptions`

### client.terminal.actions.search({ ...params }) -> Square.SearchTerminalActionsResponse

#### Description (terminal actions search)

Retrieves a filtered list of Terminal action requests created by the account making the request. Terminal action requests are available for 30 days.

#### Usage (terminal actions search)

```typescript
await client.terminal.actions.search({
    query: {
        filter: {
            createdAt: {
                startAt: "2022-04-01T00:00:00.000Z",
            },
        },
        sort: {
            sortOrder: "DESC",
        },
    },
    limit: 2,
});
```

#### Parameters (terminal actions search)

**request:** `Square.terminal.SearchTerminalActionsRequest`

**requestOptions:** `Actions.RequestOptions`

### client.terminal.actions.get({ ...params }) -> Square.GetTerminalActionResponse

#### Description (terminal actions get)

Retrieves a Terminal action request by `action_id`. Terminal action requests are available for 30 days.

#### Usage (terminal actions get)

```typescript
await client.terminal.actions.get({
    actionId: "action_id",
});
```

#### Parameters (terminal actions get)

**request:** `Square.terminal.GetActionsRequest`

**requestOptions:** `Actions.RequestOptions`

### client.terminal.actions.cancel({ ...params }) -> Square.CancelTerminalActionResponse

#### Description (terminal actions cancel)

Cancels a Terminal action request if the status of the request permits it.

#### Usage (terminal actions cancel)

```typescript
await client.terminal.actions.cancel({
    actionId: "action_id",
});
```

#### Parameters (terminal actions cancel)

**request:** `Square.terminal.CancelActionsRequest`

**requestOptions:** `Actions.RequestOptions`

## Terminal Checkouts

### client.terminal.checkouts.create({ ...params }) -> Square.CreateTerminalCheckoutResponse

#### Description (terminal checkouts create)

Creates a Terminal checkout request and sends it to the specified device to take a payment
for the requested amount.

#### Usage (terminal checkouts create)

```typescript
await client.terminal.checkouts.create({
    idempotencyKey: "28a0c3bc-7839-11ea-bc55-0242ac130003",
    checkout: {
        amountMoney: {
            amount: 2610,
            currency: "USD",
        },
        referenceId: "id11572",
        note: "A brief note",
        deviceOptions: {
            deviceId: "dbb5d83a-7838-11ea-bc55-0242ac130003",
        },
    },
});
```

#### Parameters (terminal checkouts create)

**request:** `Square.terminal.CreateTerminalCheckoutRequest`

**requestOptions:** `Checkouts.RequestOptions`

### client.terminal.checkouts.search({ ...params }) -> Square.SearchTerminalCheckoutsResponse

#### Description (terminal checkouts search)

Returns a filtered list of Terminal checkout requests created by the application making the request. Only Terminal checkout requests created for the merchant scoped to the OAuth token are returned. Terminal checkout requests are available for 30 days.

#### Usage (terminal checkouts search)

```typescript
await client.terminal.checkouts.search({
    query: {
        filter: {
            status: "COMPLETED",
        },
    },
    limit: 2,
});
```

#### Parameters (terminal checkouts search)

**request:** `Square.terminal.SearchTerminalCheckoutsRequest`

**requestOptions:** `Checkouts.RequestOptions`

### client.terminal.checkouts.get({ ...params }) -> Square.GetTerminalCheckoutResponse

#### Description (terminal checkouts get)

Retrieves a Terminal checkout request by `checkout_id`. Terminal checkout requests are available for 30 days.

#### Usage (terminal checkouts get)

```typescript
await client.terminal.checkouts.get({
    checkoutId: "checkout_id",
});
```

#### Parameters (terminal checkouts get)

**request:** `Square.terminal.GetCheckoutsRequest`

**requestOptions:** `Checkouts.RequestOptions`

### client.terminal.checkouts.cancel({ ...params }) -> Square.CancelTerminalCheckoutResponse

#### Description (terminal checkouts cancel)

Cancels a Terminal checkout request if the status of the request permits it.

#### Usage (terminal checkouts cancel)

```typescript
await client.terminal.checkouts.cancel({
    checkoutId: "checkout_id",
});
```

#### Parameters (terminal checkouts cancel)

**request:** `Square.terminal.CancelCheckoutsRequest`

**requestOptions:** `Checkouts.RequestOptions`

## Terminal Refunds

### client.terminal.refunds.create({ ...params }) -> Square.CreateTerminalRefundResponse

#### Description (terminal refunds create)

Creates a request to refund an Interac payment completed on a Square Terminal. Refunds for Interac payments on a Square Terminal are supported only for Interac debit cards in Canada. Other refunds for Terminal payments should use the Refunds API. For more information, see [Refunds API](api:Refunds).

#### Usage (terminal refunds create)

```typescript
await client.terminal.refunds.create({
    idempotencyKey: "402a640b-b26f-401f-b406-46f839590c04",
    refund: {
        paymentId: "5O5OvgkcNUhl7JBuINflcjKqUzXZY",
        amountMoney: {
            amount: 111,
            currency: "CAD",
        },
        reason: "Returning items",
        deviceId: "f72dfb8e-4d65-4e56-aade-ec3fb8d33291",
    },
});
```

#### Parameters (terminal refunds create)

**request:** `Square.terminal.CreateTerminalRefundRequest`

**requestOptions:** `Refunds.RequestOptions`

### client.terminal.refunds.search({ ...params }) -> Square.SearchTerminalRefundsResponse

#### Description (terminal refunds search)

Retrieves a filtered list of Interac Terminal refund requests created by the seller making the request. Terminal refund requests are available for 30 days.

#### Usage (terminal refunds search)

```typescript
await client.terminal.refunds.search({
    query: {
        filter: {
            status: "COMPLETED",
        },
    },
    limit: 1,
});
```

#### Parameters (terminal refunds search)

**request:** `Square.terminal.SearchTerminalRefundsRequest`

**requestOptions:** `Refunds.RequestOptions`

### client.terminal.refunds.get({ ...params }) -> Square.GetTerminalRefundResponse

#### Description (terminal refunds get)

Retrieves an Interac Terminal refund object by ID. Terminal refund objects are available for 30 days.

#### Usage (terminal refunds get)

```typescript
await client.terminal.refunds.get({
    terminalRefundId: "terminal_refund_id",
});
```

#### Parameters (terminal refunds get)

**request:** `Square.terminal.GetRefundsRequest`

**requestOptions:** `Refunds.RequestOptions`

### client.terminal.refunds.cancel({ ...params }) -> Square.CancelTerminalRefundResponse

#### Description (terminal refunds cancel)

Cancels an Interac Terminal refund request by refund request ID if the status of the request permits it.

#### Usage (terminal refunds cancel)

```typescript
await client.terminal.refunds.cancel({
    terminalRefundId: "terminal_refund_id",
});
```

#### Parameters (terminal refunds cancel)

**request:** `Square.terminal.CancelRefundsRequest`

**requestOptions:** `Refunds.RequestOptions`

## Webhooks EventTypes

### client.webhooks.eventTypes.list({ ...params }) -> Square.ListWebhookEventTypesResponse

#### Description (webhooks event types list)

Lists all webhook event types that can be subscribed to.

#### Usage (webhooks event types list)

```typescript
await client.webhooks.eventTypes.list();
```

#### Parameters (webhooks event types list)

**request:** `Square.webhooks.ListEventTypesRequest`

**requestOptions:** `EventTypes.RequestOptions`

## Webhooks Subscriptions

### client.webhooks.subscriptions.list({ ...params }) -> core.Page

#### Description (webhooks subscriptions list)

Lists all webhook subscriptions owned by your application.

#### Usage (webhooks subscriptions list)

```typescript
const response = await client.webhooks.subscriptions.list();
for await (const item of response) {
    console.log(item);
}

// Or you can manually iterate page-by-page
const page = await client.webhooks.subscriptions.list();
while (page.hasNextPage()) {
    page = page.getNextPage();
}
```

#### Parameters (webhooks subscriptions list)

**request:** `Square.webhooks.ListSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.create({ ...params }) -> Square.CreateWebhookSubscriptionResponse

#### Description (webhooks subscriptions create)

Creates a webhook subscription.

#### Usage (webhooks subscriptions create)

```typescript
await client.webhooks.subscriptions.create({
    idempotencyKey: "63f84c6c-2200-4c99-846c-2670a1311fbf",
    subscription: {
        name: "Example Webhook Subscription",
        eventTypes: ["payment.created", "payment.updated"],
        notificationUrl: "https://example-webhook-url.com",
        apiVersion: "2021-12-15",
    },
});
```

#### Parameters (webhooks subscriptions create)

**request:** `Square.webhooks.CreateWebhookSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.get({ ...params }) -> Square.GetWebhookSubscriptionResponse

#### Description (webhooks subscriptions get)

Retrieves a webhook subscription identified by its ID.

#### Usage (webhooks subscriptions get)

```typescript
await client.webhooks.subscriptions.get({
    subscriptionId: "subscription_id",
});
```

#### Parameters (webhooks subscriptions get)

**request:** `Square.webhooks.GetSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.update({ ...params }) -> Square.UpdateWebhookSubscriptionResponse

#### Description (webhooks subscriptions update)

Updates a webhook subscription.

#### Usage (webhooks subscriptions update)

```typescript
await client.webhooks.subscriptions.update({
    subscriptionId: "subscription_id",
    subscription: {
        name: "Updated Example Webhook Subscription",
        enabled: false,
    },
});
```

#### Parameters (webhooks subscriptions update)

**request:** `Square.webhooks.UpdateWebhookSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.delete({ ...params }) -> Square.DeleteWebhookSubscriptionResponse

#### Description (webhooks subscriptions delete)

Deletes a webhook subscription.

#### Usage (webhooks subscriptions delete)

```typescript
await client.webhooks.subscriptions.delete({
    subscriptionId: "subscription_id",
});
```

#### Parameters (webhooks subscriptions delete)

**request:** `Square.webhooks.DeleteSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.updateSignatureKey({ ...params }) -> Square.UpdateWebhookSubscriptionSignatureKeyResponse

#### Description (webhooks subscriptions update signature key)

Updates a webhook subscription by replacing the existing signature key with a new one.

#### Usage (webhooks subscriptions update signature key)

```typescript
await client.webhooks.subscriptions.updateSignatureKey({
    subscriptionId: "subscription_id",
    idempotencyKey: "ed80ae6b-0654-473b-bbab-a39aee89a60d",
});
```

#### Parameters (webhooks subscriptions update signature key)

**request:** `Square.webhooks.UpdateWebhookSubscriptionSignatureKeyRequest`

**requestOptions:** `Subscriptions.RequestOptions`

### client.webhooks.subscriptions.test({ ...params }) -> Square.TestWebhookSubscriptionResponse

#### Description (webhooks subscriptions test)

Tests a webhook subscription by sending a test event to the notification URL.

#### Usage (webhooks subscriptions test)

```typescript
await client.webhooks.subscriptions.test({
    subscriptionId: "subscription_id",
    eventType: "payment.created",
});
```

#### Parameters (webhooks subscriptions test)

**request:** `Square.webhooks.TestWebhookSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`
