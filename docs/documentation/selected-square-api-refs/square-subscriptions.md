<!-- markdownlint-disable -->

# Subscriptions

## client.subscriptions.create({ ...params }) -> Square.CreateSubscriptionResponse

### Description 1

Enrolls a customer in a subscription.

If you provide a card on file in the request, Square charges the card for
the subscription. Otherwise, Square sends an invoice to the customer's email
address. The subscription starts immediately, unless the request includes
the optional `start_date`. Each individual subscription is associated with a particular location.

For more information, see [Create a subscription](https://developer.squareup.com/docs/subscriptions-api/manage-subscriptions#create-a-subscription).

### Usage 1

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

### Parameters 1

**request:** `Square.CreateSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.bulkSwapPlan({ ...params }) -> Square.BulkSwapPlanResponse

### Description 2

Schedules a plan variation change for all active subscriptions under a given plan
variation. For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).

### Usage 2

```typescript
await client.subscriptions.bulkSwapPlan({
    newPlanVariationId: "FQ7CDXXWSLUJRPM3GFJSJGZ7",
    oldPlanVariationId: "6JHXF3B2CW3YKHDV4XEM674H",
    locationId: "S8GWD5R9QB376",
});
```

### Parameters 2

**request:** `Square.BulkSwapPlanRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.search({ ...params }) -> Square.SearchSubscriptionsResponse

### Description 3

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

### Usage 3

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

### Parameters 3

**request:** `Square.SearchSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.get({ ...params }) -> Square.GetSubscriptionResponse

### Description 4

Retrieves a specific subscription.

### Usage 4

```typescript
await client.subscriptions.get({
    subscriptionId: "subscription_id",
});
```

### Parameters 4

**request:** `Square.GetSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.update({ ...params }) -> Square.UpdateSubscriptionResponse

### Description 5

Updates a subscription by modifying or clearing `subscription` field values.
To clear a field, set its value to `null`.

### Usage 5

```typescript
await client.subscriptions.update({
    subscriptionId: "subscription_id",
    subscription: {
        cardId: "{NEW CARD ID}",
    },
});
```

### Parameters 5

**request:** `Square.UpdateSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.deleteAction({ ...params }) -> Square.DeleteSubscriptionActionResponse

### Description 6

Deletes a scheduled action for a subscription.

### Usage 6

```typescript
await client.subscriptions.deleteAction({
    subscriptionId: "subscription_id",
    actionId: "action_id",
});
```

### Parameters 6

**request:** `Square.DeleteActionSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.changeBillingAnchorDate({ ...params }) -> Square.ChangeBillingAnchorDateResponse

### Description 7

Changes the [billing anchor date](https://developer.squareup.com/docs/subscriptions-api/subscription-billing#billing-dates)
for a subscription.

### Usage 7

```typescript
await client.subscriptions.changeBillingAnchorDate({
    subscriptionId: "subscription_id",
    monthlyBillingAnchorDate: 1,
});
```

### Parameters 7

**request:** `Square.ChangeBillingAnchorDateRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.cancel({ ...params }) -> Square.CancelSubscriptionResponse

### Description 8

Schedules a `CANCEL` action to cancel an active subscription. This
sets the `canceled_date` field to the end of the active billing period. After this date,
the subscription status changes from ACTIVE to CANCELED.

### Usage 8

```typescript
await client.subscriptions.cancel({
    subscriptionId: "subscription_id",
});
```

### Parameters 8

**request:** `Square.CancelSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.listEvents({ ...params }) -> core.Page

### Description 9

Lists all [events](https://developer.squareup.com/docs/subscriptions-api/actions-events) for a specific subscription.

### Usage 9

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

### Parameters 9

**request:** `Square.ListEventsSubscriptionsRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.pause({ ...params }) -> Square.PauseSubscriptionResponse

### Description 10

Schedules a `PAUSE` action to pause an active subscription.

### Usage 10

```typescript
await client.subscriptions.pause({
    subscriptionId: "subscription_id",
});
```

### Parameters 10

**request:** `Square.PauseSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.resume({ ...params }) -> Square.ResumeSubscriptionResponse

### Description 11

Schedules a `RESUME` action to resume a paused or a deactivated subscription.

### Usage 11

```typescript
await client.subscriptions.resume({
    subscriptionId: "subscription_id",
});
```

### Parameters 11

**request:** `Square.ResumeSubscriptionRequest`

**requestOptions:** `Subscriptions.RequestOptions`

## client.subscriptions.swapPlan({ ...params }) -> Square.SwapPlanResponse

### Description 12

Schedules a `SWAP_PLAN` action to swap a subscription plan variation in an existing subscription.
For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).

### Usage 12

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

### Parameters 12

**request:** `Square.SwapPlanRequest`

**requestOptions:** `Subscriptions.RequestOptions`
