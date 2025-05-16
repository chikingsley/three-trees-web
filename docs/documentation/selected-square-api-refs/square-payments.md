# Payments

## client.payments.list({ ...params }) -> core.Page

### Description 1

Retrieves a list of payments taken by the account making the request.

Results are eventually consistent, and new payments or changes to payments might take several
seconds to appear.

The maximum results per page is 100.

### Usage 1

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

### Parameters 1

**request:** `Square.ListPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.create({ ...params }) -> Square.CreatePaymentResponse

### Description 2

Creates a payment using the provided source. You can use this endpoint
to charge a card (credit/debit card or  
Square gift card) or record a payment that the seller received outside of Square
(cash payment from a buyer or a payment that an external entity
processed on behalf of the seller).

The endpoint creates a
`Payment` object and returns it in the response.

### Usage 2

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

### Parameters 2

**request:** `Square.CreatePaymentRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.cancelByIdempotencyKey({ ...params }) -> Square.CancelPaymentByIdempotencyKeyResponse

### Description 3

Cancels (voids) a payment identified by the idempotency key that is specified in the
request.

Use this method when the status of a `CreatePayment` request is unknown (for example, after you send a
`CreatePayment` request, a network error occurs and you do not get a response). In this case, you can
direct Square to cancel the payment using this endpoint. In the request, you provide the same
idempotency key that you provided in your `CreatePayment` request that you want to cancel. After
canceling the payment, you can submit your `CreatePayment` request again.

Note that if no payment with the specified idempotency key is found, no action is taken and the endpoint
returns successfully.

### Usage 3

```typescript
await client.payments.cancelByIdempotencyKey({
    idempotencyKey: "a7e36d40-d24b-11e8-b568-0800200c9a66",
});
```

### Parameters 3

**request:** `Square.CancelPaymentByIdempotencyKeyRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.get({ ...params }) -> Square.GetPaymentResponse

### Description 4

Retrieves details for a specific payment.

### Usage 4

```typescript
await client.payments.get({
    paymentId: "payment_id",
});
```

### Parameters 4

**request:** `Square.GetPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.update({ ...params }) -> Square.UpdatePaymentResponse

### Description 5

Updates a payment with the APPROVED status.
You can update the `amount_money` and `tip_money` using this endpoint.

### Usage 5

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

### Parameters 5

**request:** `Square.UpdatePaymentRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.cancel({ ...params }) -> Square.CancelPaymentResponse

### Description 6

Cancels (voids) a payment. You can use this endpoint to cancel a payment with
the APPROVED `status`.

### Usage 6

```typescript
await client.payments.cancel({
    paymentId: "payment_id",
});
```

### Parameters 6

**request:** `Square.CancelPaymentsRequest`

**requestOptions:** `Payments.RequestOptions`

## client.payments.complete({ ...params }) -> Square.CompletePaymentResponse

### Description 7

Completes (captures) a payment.
By default, payments are set to complete immediately after they are created.

You can use this endpoint to complete a payment with the APPROVED `status`.

### Usage 7

```typescript
await client.payments.complete({
    paymentId: "payment_id",
});
```

### Parameters 7

**request:** `Square.CompletePaymentRequest`

**requestOptions:** `Payments.RequestOptions`
