<!-- markdownlint-disable -->

# Cards

## client.cards.list({ ...params }) -> core.Page

### Description 1

Retrieves a list of cards owned by the account making the request.
A max of 25 cards will be returned.

### Usage 1

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

### Parameters 1

**request:** `Square.ListCardsRequest`

**requestOptions:** `Cards.RequestOptions`

## client.cards.create({ ...params }) -> Square.CreateCardResponse

### Description 2

Adds a card on file to an existing merchant.

### Usage 2

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

### Parameters 2

**request:** `Square.CreateCardRequest`

**requestOptions:** `Cards.RequestOptions`

## client.cards.get({ ...params }) -> Square.GetCardResponse

### Description 3

Retrieves details for a specific Card.

### Usage 3

```typescript
await client.cards.get({
    cardId: "card_id",
});
```

### Parameters 3

**request:** `Square.GetCardsRequest`

**requestOptions:** `Cards.RequestOptions`

## client.cards.disable({ ...params }) -> Square.DisableCardResponse

### Description 4

Disables the card, preventing any further updates or charges.
Disabling an already disabled card is allowed but has no effect.

### Usage 4

```typescript
await client.cards.disable({
    cardId: "card_id",
});
```

### Parameters 4

**request:** `Square.DisableCardsRequest`

**requestOptions:** `Cards.RequestOptions`
