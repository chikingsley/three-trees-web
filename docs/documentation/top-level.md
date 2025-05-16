# Reference

## Mobile

client.mobile.authorizationCode({ ...params }) -> Square.CreateMobileAuthorizationCodeResponse

## OAuth

client.oAuth.revokeToken({ ...params }) -> Square.RevokeTokenResponse
client.oAuth.obtainToken({ ...params }) -> Square.ObtainTokenResponse
client.oAuth.retrieveTokenStatus() -> Square.RetrieveTokenStatusResponse
client.oAuth.authorize() -> void

## V1Transactions

client.v1Transactions.v1ListOrders({ ...params }) -> Square.V1Order[]
client.v1Transactions.v1RetrieveOrder({ ...params }) -> Square.V1Order
client.v1Transactions.v1UpdateOrder({ ...params }) -> Square.V1Order

## ApplePay

client.applePay.registerDomain({ ...params }) -> Square.RegisterDomainResponse

## BankAccounts

client.bankAccounts.list({ ...params }) -> core.Page
client.bankAccounts.getByV1Id({ ...params }) -> Square.GetBankAccountByV1IdResponse
client.bankAccounts.get({ ...params }) -> Square.GetBankAccountResponse

## Bookings

client.bookings.list({ ...params }) -> core.Page
client.bookings.create({ ...params }) -> Square.CreateBookingResponse
client.bookings.searchAvailability({ ...params }) -> Square.SearchAvailabilityResponse
client.bookings.bulkRetrieveBookings({ ...params }) -> Square.BulkRetrieveBookingsResponse
client.bookings.getBusinessProfile() -> Square.GetBusinessBookingProfileResponse
client.bookings.retrieveLocationBookingProfile({ ...params }) -> Square.RetrieveLocationBookingProfileResponse
client.bookings.bulkRetrieveTeamMemberBookingProfiles({ ...params }) -> Square.BulkRetrieveTeamMemberBookingProfilesResponse
client.bookings.get({ ...params }) -> Square.GetBookingResponse
client.bookings.update({ ...params }) -> Square.UpdateBookingResponse
client.bookings.cancel({ ...params }) -> Square.CancelBookingResponse

## Cards

client.cards.list({ ...params }) -> core.Page
client.cards.create({ ...params }) -> Square.CreateCardResponse
client.cards.get({ ...params }) -> Square.GetCardResponse
client.cards.disable({ ...params }) -> Square.DisableCardResponse

## Catalog

client.catalog.batchDelete({ ...params }) -> Square.BatchDeleteCatalogObjectsResponse
client.catalog.batchGet({ ...params }) -> Square.BatchGetCatalogObjectsResponse
client.catalog.batchUpsert({ ...params }) -> Square.BatchUpsertCatalogObjectsResponse
client.catalog.info() -> Square.CatalogInfoResponse
client.catalog.list({ ...params }) -> core.Page
client.catalog.search({ ...params }) -> Square.SearchCatalogObjectsResponse
client.catalog.searchItems({ ...params }) -> Square.SearchCatalogItemsResponse
client.catalog.updateItemModifierLists({ ...params }) -> Square.UpdateItemModifierListsResponse
client.catalog.updateItemTaxes({ ...params }) -> Square.UpdateItemTaxesResponse

## Customers

client.customers.list({ ...params }) -> core.Page
client.customers.create({ ...params }) -> Square.CreateCustomerResponse
client.customers.batchCreate({ ...params }) -> Square.BulkCreateCustomersResponse
client.customers.bulkDeleteCustomers({ ...params }) -> Square.BulkDeleteCustomersResponse
client.customers.bulkRetrieveCustomers({ ...params }) -> Square.BulkRetrieveCustomersResponse
client.customers.bulkUpdateCustomers({ ...params }) -> Square.BulkUpdateCustomersResponse
client.customers.search({ ...params }) -> Square.SearchCustomersResponse
client.customers.get({ ...params }) -> Square.GetCustomerResponse
client.customers.update({ ...params }) -> Square.UpdateCustomerResponse
client.customers.delete({ ...params }) -> Square.DeleteCustomerResponse

## Devices

client.devices.list({ ...params }) -> core.Page
client.devices.get({ ...params }) -> Square.GetDeviceResponse

## Disputes

client.disputes.list({ ...params }) -> core.Page
client.disputes.get({ ...params }) -> Square.GetDisputeResponse
client.disputes.accept({ ...params }) -> Square.AcceptDisputeResponse
client.disputes.createEvidenceFile({ ...params }) -> Square.CreateDisputeEvidenceFileResponse
client.disputes.createEvidenceText({ ...params }) -> Square.CreateDisputeEvidenceTextResponse
client.disputes.submitEvidence({ ...params }) -> Square.SubmitEvidenceResponse

## Employees

client.employees.list({ ...params }) -> core.Page
client.employees.get({ ...params }) -> Square.GetEmployeeResponse

## Events

client.events.searchEvents({ ...params }) -> Square.SearchEventsResponse
client.events.disableEvents() -> Square.DisableEventsResponse
client.events.enableEvents() -> Square.EnableEventsResponse
client.events.listEventTypes({ ...params }) -> Square.ListEventTypesResponse

## GiftCards

client.giftCards.list({ ...params }) -> core.Page
client.giftCards.create({ ...params }) -> Square.CreateGiftCardResponse
client.giftCards.getFromGan({ ...params }) -> Square.GetGiftCardFromGanResponse
client.giftCards.getFromNonce({ ...params }) -> Square.GetGiftCardFromNonceResponse
client.giftCards.linkCustomer({ ...params }) -> Square.LinkCustomerToGiftCardResponse
client.giftCards.unlinkCustomer({ ...params }) -> Square.UnlinkCustomerFromGiftCardResponse
client.giftCards.get({ ...params }) -> Square.GetGiftCardResponse

## Inventory

client.inventory.deprecatedGetAdjustment({ ...params }) -> Square.GetInventoryAdjustmentResponse
client.inventory.getAdjustment({ ...params }) -> Square.GetInventoryAdjustmentResponse
client.inventory.deprecatedBatchChange({ ...params }) -> Square.BatchChangeInventoryResponse
client.inventory.deprecatedBatchGetChanges({ ...params }) -> Square.BatchGetInventoryChangesResponse
client.inventory.deprecatedBatchGetCounts({ ...params }) -> Square.BatchGetInventoryCountsResponse
client.inventory.batchCreateChanges({ ...params }) -> Square.BatchChangeInventoryResponse
client.inventory.batchGetChanges({ ...params }) -> core.Page
client.inventory.batchGetCounts({ ...params }) -> core.Page
client.inventory.deprecatedGetPhysicalCount({ ...params }) -> Square.GetInventoryPhysicalCountResponse
client.inventory.getPhysicalCount({ ...params }) -> Square.GetInventoryPhysicalCountResponse
client.inventory.getTransfer({ ...params }) -> Square.GetInventoryTransferResponse
client.inventory.get({ ...params }) -> core.Page
client.inventory.changes({ ...params }) -> core.Page

## Invoices

client.invoices.list({ ...params }) -> core.Page
client.invoices.create({ ...params }) -> Square.CreateInvoiceResponse
client.invoices.search({ ...params }) -> Square.SearchInvoicesResponse
client.invoices.get({ ...params }) -> Square.GetInvoiceResponse
client.invoices.update({ ...params }) -> Square.UpdateInvoiceResponse
client.invoices.delete({ ...params }) -> Square.DeleteInvoiceResponse
client.invoices.createInvoiceAttachment({ ...params }) -> Square.CreateInvoiceAttachmentResponse
client.invoices.deleteInvoiceAttachment({ ...params }) -> Square.DeleteInvoiceAttachmentResponse
client.invoices.cancel({ ...params }) -> Square.CancelInvoiceResponse
client.invoices.publish({ ...params }) -> Square.PublishInvoiceResponse

## Locations

client.locations.list() -> Square.ListLocationsResponse
client.locations.create({ ...params }) -> Square.CreateLocationResponse
client.locations.get({ ...params }) -> Square.GetLocationResponse
client.locations.update({ ...params }) -> Square.UpdateLocationResponse
client.locations.checkouts({ ...params }) -> Square.CreateCheckoutResponse

## Loyalty

client.loyalty.searchEvents({ ...params }) -> Square.SearchLoyaltyEventsResponse

## Merchants

client.merchants.list({ ...params }) -> core.Page
client.merchants.get({ ...params }) -> Square.GetMerchantResponse

## Checkout

client.checkout.retrieveLocationSettings({ ...params }) -> Square.RetrieveLocationSettingsResponse
client.checkout.updateLocationSettings({ ...params }) -> Square.UpdateLocationSettingsResponse
client.checkout.retrieveMerchantSettings() -> Square.RetrieveMerchantSettingsResponse
client.checkout.updateMerchantSettings({ ...params }) -> Square.UpdateMerchantSettingsResponse

## Orders

client.orders.create({ ...params }) -> Square.CreateOrderResponse
client.orders.batchGet({ ...params }) -> Square.BatchGetOrdersResponse
client.orders.calculate({ ...params }) -> Square.CalculateOrderResponse
client.orders.clone({ ...params }) -> Square.CloneOrderResponse
client.orders.search({ ...params }) -> Square.SearchOrdersResponse
client.orders.get({ ...params }) -> Square.GetOrderResponse
client.orders.update({ ...params }) -> Square.UpdateOrderResponse
client.orders.pay({ ...params }) -> Square.PayOrderResponse

## Payments

client.payments.list({ ...params }) -> core.Page
client.payments.create({ ...params }) -> Square.CreatePaymentResponse
client.payments.cancelByIdempotencyKey({ ...params }) -> Square.CancelPaymentByIdempotencyKeyResponse
client.payments.get({ ...params }) -> Square.GetPaymentResponse
client.payments.update({ ...params }) -> Square.UpdatePaymentResponse
client.payments.cancel({ ...params }) -> Square.CancelPaymentResponse
client.payments.complete({ ...params }) -> Square.CompletePaymentResponse

## Payouts

client.payouts.list({ ...params }) -> core.Page
client.payouts.get({ ...params }) -> Square.GetPayoutResponse
client.payouts.listEntries({ ...params }) -> core.Page

## Refunds

client.refunds.list({ ...params }) -> core.Page
client.refunds.refundPayment({ ...params }) -> Square.RefundPaymentResponse
client.refunds.get({ ...params }) -> Square.GetPaymentRefundResponse

## Sites

client.sites.list() -> Square.ListSitesResponse

## Snippets

client.snippets.get({ ...params }) -> Square.GetSnippetResponse
client.snippets.upsert({ ...params }) -> Square.UpsertSnippetResponse
client.snippets.delete({ ...params }) -> Square.DeleteSnippetResponse

## Subscriptions

client.subscriptions.create({ ...params }) -> Square.CreateSubscriptionResponse
client.subscriptions.bulkSwapPlan({ ...params }) -> Square.BulkSwapPlanResponse
client.subscriptions.search({ ...params }) -> Square.SearchSubscriptionsResponse
client.subscriptions.get({ ...params }) -> Square.GetSubscriptionResponse
client.subscriptions.update({ ...params }) -> Square.UpdateSubscriptionResponse
client.subscriptions.deleteAction({ ...params }) -> Square.DeleteSubscriptionActionResponse
client.subscriptions.changeBillingAnchorDate({ ...params }) -> Square.ChangeBillingAnchorDateResponse
client.subscriptions.cancel({ ...params }) -> Square.CancelSubscriptionResponse
client.subscriptions.listEvents({ ...params }) -> core.Page
client.subscriptions.pause({ ...params }) -> Square.PauseSubscriptionResponse
client.subscriptions.resume({ ...params }) -> Square.ResumeSubscriptionResponse
client.subscriptions.swapPlan({ ...params }) -> Square.SwapPlanResponse

## TeamMembers

client.teamMembers.create({ ...params }) -> Square.CreateTeamMemberResponse
client.teamMembers.batchCreate({ ...params }) -> Square.BatchCreateTeamMembersResponse
client.teamMembers.batchUpdate({ ...params }) -> Square.BatchUpdateTeamMembersResponse
client.teamMembers.search({ ...params }) -> Square.SearchTeamMembersResponse
client.teamMembers.get({ ...params }) -> Square.GetTeamMemberResponse
client.teamMembers.update({ ...params }) -> Square.UpdateTeamMemberResponse

## Team

client.team.listJobs({ ...params }) -> Square.ListJobsResponse
client.team.createJob({ ...params }) -> Square.CreateJobResponse
client.team.retrieveJob({ ...params }) -> Square.RetrieveJobResponse
client.team.updateJob({ ...params }) -> Square.UpdateJobResponse

## Terminal

client.terminal.dismissTerminalAction({ ...params }) -> Square.DismissTerminalActionResponse
client.terminal.dismissTerminalCheckout({ ...params }) -> Square.DismissTerminalCheckoutResponse
client.terminal.dismissTerminalRefund({ ...params }) -> Square.DismissTerminalRefundResponse

## Vendors

client.vendors.batchCreate({ ...params }) -> Square.BatchCreateVendorsResponse
client.vendors.batchGet({ ...params }) -> Square.BatchGetVendorsResponse
client.vendors.batchUpdate({ ...params }) -> Square.BatchUpdateVendorsResponse
client.vendors.create({ ...params }) -> Square.CreateVendorResponse
client.vendors.search({ ...params }) -> Square.SearchVendorsResponse
client.vendors.get({ ...params }) -> Square.GetVendorResponse
client.vendors.update({ ...params }) -> Square.UpdateVendorResponse

## Bookings CustomAttributeDefinitions

client.bookings.customAttributeDefinitions.list({ ...params }) -> core.Page
client.bookings.customAttributeDefinitions.create({ ...params }) -> Square.CreateBookingCustomAttributeDefinitionResponse
client.bookings.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveBookingCustomAttributeDefinitionResponse
client.bookings.customAttributeDefinitions.update({ ...params }) -> Square.UpdateBookingCustomAttributeDefinitionResponse
client.bookings.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteBookingCustomAttributeDefinitionResponse

## Bookings CustomAttributes

client.bookings.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteBookingCustomAttributesResponse
client.bookings.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertBookingCustomAttributesResponse
client.bookings.customAttributes.list({ ...params }) -> core.Page
client.bookings.customAttributes.get({ ...params }) -> Square.RetrieveBookingCustomAttributeResponse
client.bookings.customAttributes.upsert({ ...params }) -> Square.UpsertBookingCustomAttributeResponse
client.bookings.customAttributes.delete({ ...params }) -> Square.DeleteBookingCustomAttributeResponse

## Bookings LocationProfiles

client.bookings.locationProfiles.list({ ...params }) -> core.Page

## Bookings TeamMemberProfiles

client.bookings.teamMemberProfiles.list({ ...params }) -> core.Page
client.bookings.teamMemberProfiles.get({ ...params }) -> Square.GetTeamMemberBookingProfileResponse

## CashDrawers Shifts

client.cashDrawers.shifts.list({ ...params }) -> core.Page
client.cashDrawers.shifts.get({ ...params }) -> Square.GetCashDrawerShiftResponse
client.cashDrawers.shifts.listEvents({ ...params }) -> core.Page

## Catalog Images

client.catalog.images.create({ ...params }) -> Square.CreateCatalogImageResponse
client.catalog.images.update({ ...params }) -> Square.UpdateCatalogImageResponse

## Catalog Object

client.catalog.object.upsert({ ...params }) -> Square.UpsertCatalogObjectResponse
client.catalog.object.get({ ...params }) -> Square.GetCatalogObjectResponse
client.catalog.object.delete({ ...params }) -> Square.DeleteCatalogObjectResponse

## Checkout PaymentLinks

client.checkout.paymentLinks.list({ ...params }) -> core.Page
client.checkout.paymentLinks.create({ ...params }) -> Square.CreatePaymentLinkResponse
client.checkout.paymentLinks.get({ ...params }) -> Square.GetPaymentLinkResponse
client.checkout.paymentLinks.update({ ...params }) -> Square.UpdatePaymentLinkResponse
client.checkout.paymentLinks.delete({ ...params }) -> Square.DeletePaymentLinkResponse

## Customers CustomAttributeDefinitions

client.customers.customAttributeDefinitions.list({ ...params }) -> core.Page
client.customers.customAttributeDefinitions.create({ ...params }) -> Square.CreateCustomerCustomAttributeDefinitionResponse
client.customers.customAttributeDefinitions.get({ ...params }) -> Square.GetCustomerCustomAttributeDefinitionResponse
client.customers.customAttributeDefinitions.update({ ...params }) -> Square.UpdateCustomerCustomAttributeDefinitionResponse
client.customers.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteCustomerCustomAttributeDefinitionResponse
client.customers.customAttributeDefinitions.batchUpsert({ ...params }) -> Square.BatchUpsertCustomerCustomAttributesResponse

## Customers Groups

client.customers.groups.list({ ...params }) -> core.Page
client.customers.groups.create({ ...params }) -> Square.CreateCustomerGroupResponse
client.customers.groups.get({ ...params }) -> Square.GetCustomerGroupResponse
client.customers.groups.update({ ...params }) -> Square.UpdateCustomerGroupResponse
client.customers.groups.delete({ ...params }) -> Square.DeleteCustomerGroupResponse
client.customers.groups.add({ ...params }) -> Square.AddGroupToCustomerResponse
client.customers.groups.remove({ ...params }) -> Square.RemoveGroupFromCustomerResponse

## Customers Segments

client.customers.segments.list({ ...params }) -> core.Page
client.customers.segments.get({ ...params }) -> Square.GetCustomerSegmentResponse

## Customers Cards

client.customers.cards.create({ ...params }) -> Square.CreateCustomerCardResponse
client.customers.cards.delete({ ...params }) -> Square.DeleteCustomerCardResponse

## Customers CustomAttributes

client.customers.customAttributes.list({ ...params }) -> core.Page
client.customers.customAttributes.get({ ...params }) -> Square.GetCustomerCustomAttributeResponse
client.customers.customAttributes.upsert({ ...params }) -> Square.UpsertCustomerCustomAttributeResponse
client.customers.customAttributes.delete({ ...params }) -> Square.DeleteCustomerCustomAttributeResponse

## Devices Codes

client.devices.codes.list({ ...params }) -> core.Page
client.devices.codes.create({ ...params }) -> Square.CreateDeviceCodeResponse
client.devices.codes.get({ ...params }) -> Square.GetDeviceCodeResponse

## Disputes Evidence

client.disputes.evidence.list({ ...params }) -> core.Page
client.disputes.evidence.get({ ...params }) -> Square.GetDisputeEvidenceResponse
client.disputes.evidence.delete({ ...params }) -> Square.DeleteDisputeEvidenceResponse

## GiftCards Activities

client.giftCards.activities.list({ ...params }) -> core.Page
client.giftCards.activities.create({ ...params }) -> Square.CreateGiftCardActivityResponse

## Labor BreakTypes

client.labor.breakTypes.list({ ...params }) -> core.Page
client.labor.breakTypes.create({ ...params }) -> Square.CreateBreakTypeResponse
client.labor.breakTypes.get({ ...params }) -> Square.GetBreakTypeResponse
client.labor.breakTypes.update({ ...params }) -> Square.UpdateBreakTypeResponse
client.labor.breakTypes.delete({ ...params }) -> Square.DeleteBreakTypeResponse

## Labor EmployeeWages

client.labor.employeeWages.list({ ...params }) -> core.Page
client.labor.employeeWages.get({ ...params }) -> Square.GetEmployeeWageResponse

## Labor Shifts

client.labor.shifts.create({ ...params }) -> Square.CreateShiftResponse
client.labor.shifts.search({ ...params }) -> Square.SearchShiftsResponse
client.labor.shifts.get({ ...params }) -> Square.GetShiftResponse
client.labor.shifts.update({ ...params }) -> Square.UpdateShiftResponse
client.labor.shifts.delete({ ...params }) -> Square.DeleteShiftResponse

## Labor TeamMemberWages

client.labor.teamMemberWages.list({ ...params }) -> core.Page
client.labor.teamMemberWages.get({ ...params }) -> Square.GetTeamMemberWageResponse

## Labor WorkweekConfigs

client.labor.workweekConfigs.list({ ...params }) -> core.Page
client.labor.workweekConfigs.get({ ...params }) -> Square.UpdateWorkweekConfigResponse

## Locations CustomAttributeDefinitions

client.locations.customAttributeDefinitions.list({ ...params }) -> core.Page
client.locations.customAttributeDefinitions.create({ ...params }) -> Square.CreateLocationCustomAttributeDefinitionResponse
client.locations.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveLocationCustomAttributeDefinitionResponse
client.locations.customAttributeDefinitions.update({ ...params }) -> Square.UpdateLocationCustomAttributeDefinitionResponse
client.locations.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteLocationCustomAttributeDefinitionResponse

## Locations CustomAttributes

client.locations.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteLocationCustomAttributesResponse
client.locations.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertLocationCustomAttributesResponse
client.locations.customAttributes.list({ ...params }) -> core.Page
client.locations.customAttributes.get({ ...params }) -> Square.RetrieveLocationCustomAttributeResponse
client.locations.customAttributes.upsert({ ...params }) -> Square.UpsertLocationCustomAttributeResponse
client.locations.customAttributes.delete({ ...params }) -> Square.DeleteLocationCustomAttributeResponse

## Locations Transactions

client.locations.transactions.list({ ...params }) -> Square.ListTransactionsResponse
client.locations.transactions.get({ ...params }) -> Square.GetTransactionResponse
client.locations.transactions.capture({ ...params }) -> Square.CaptureTransactionResponse
client.locations.transactions.void({ ...params }) -> Square.VoidTransactionResponse

## Loyalty Accounts

client.loyalty.accounts.create({ ...params }) -> Square.CreateLoyaltyAccountResponse
client.loyalty.accounts.search({ ...params }) -> Square.SearchLoyaltyAccountsResponse
client.loyalty.accounts.get({ ...params }) -> Square.GetLoyaltyAccountResponse
client.loyalty.accounts.accumulatePoints({ ...params }) -> Square.AccumulateLoyaltyPointsResponse
client.loyalty.accounts.adjust({ ...params }) -> Square.AdjustLoyaltyPointsResponse

## Loyalty Programs

client.loyalty.programs.list() -> Square.ListLoyaltyProgramsResponse
client.loyalty.programs.get({ ...params }) -> Square.GetLoyaltyProgramResponse
client.loyalty.programs.calculate({ ...params }) -> Square.CalculateLoyaltyPointsResponse

## Loyalty Rewards

client.loyalty.rewards.create({ ...params }) -> Square.CreateLoyaltyRewardResponse
client.loyalty.rewards.search({ ...params }) -> Square.SearchLoyaltyRewardsResponse
client.loyalty.rewards.get({ ...params }) -> Square.GetLoyaltyRewardResponse
client.loyalty.rewards.delete({ ...params }) -> Square.DeleteLoyaltyRewardResponse
client.loyalty.rewards.redeem({ ...params }) -> Square.RedeemLoyaltyRewardResponse

## Loyalty Programs Promotions

client.loyalty.programs.promotions.list({ ...params }) -> core.Page
client.loyalty.programs.promotions.create({ ...params }) -> Square.CreateLoyaltyPromotionResponse
client.loyalty.programs.promotions.get({ ...params }) -> Square.GetLoyaltyPromotionResponse
client.loyalty.programs.promotions.cancel({ ...params }) -> Square.CancelLoyaltyPromotionResponse

## Merchants CustomAttributeDefinitions

client.merchants.customAttributeDefinitions.list({ ...params }) -> core.Page
client.merchants.customAttributeDefinitions.create({ ...params }) -> Square.CreateMerchantCustomAttributeDefinitionResponse
client.merchants.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveMerchantCustomAttributeDefinitionResponse
client.merchants.customAttributeDefinitions.update({ ...params }) -> Square.UpdateMerchantCustomAttributeDefinitionResponse
client.merchants.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteMerchantCustomAttributeDefinitionResponse

## Merchants CustomAttributes

client.merchants.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteMerchantCustomAttributesResponse
client.merchants.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertMerchantCustomAttributesResponse
client.merchants.customAttributes.list({ ...params }) -> core.Page
client.merchants.customAttributes.get({ ...params }) -> Square.RetrieveMerchantCustomAttributeResponse
client.merchants.customAttributes.upsert({ ...params }) -> Square.UpsertMerchantCustomAttributeResponse
client.merchants.customAttributes.delete({ ...params }) -> Square.DeleteMerchantCustomAttributeResponse

## Orders CustomAttributeDefinitions

client.orders.customAttributeDefinitions.list({ ...params }) -> core.Page
client.orders.customAttributeDefinitions.create({ ...params }) -> Square.CreateOrderCustomAttributeDefinitionResponse
client.orders.customAttributeDefinitions.get({ ...params }) -> Square.RetrieveOrderCustomAttributeDefinitionResponse
client.orders.customAttributeDefinitions.update({ ...params }) -> Square.UpdateOrderCustomAttributeDefinitionResponse
client.orders.customAttributeDefinitions.delete({ ...params }) -> Square.DeleteOrderCustomAttributeDefinitionResponse

## Orders CustomAttributes

client.orders.customAttributes.batchDelete({ ...params }) -> Square.BulkDeleteOrderCustomAttributesResponse
client.orders.customAttributes.batchUpsert({ ...params }) -> Square.BulkUpsertOrderCustomAttributesResponse
client.orders.customAttributes.list({ ...params }) -> core.Page
client.orders.customAttributes.get({ ...params }) -> Square.RetrieveOrderCustomAttributeResponse
client.orders.customAttributes.upsert({ ...params }) -> Square.UpsertOrderCustomAttributeResponse
client.orders.customAttributes.delete({ ...params }) -> Square.DeleteOrderCustomAttributeResponse

## TeamMembers WageSetting

client.teamMembers.wageSetting.get({ ...params }) -> Square.GetWageSettingResponse
client.teamMembers.wageSetting.update({ ...params }) -> Square.UpdateWageSettingResponse

## Terminal Actions

client.terminal.actions.create({ ...params }) -> Square.CreateTerminalActionResponse
client.terminal.actions.search({ ...params }) -> Square.SearchTerminalActionsResponse
client.terminal.actions.get({ ...params }) -> Square.GetTerminalActionResponse
client.terminal.actions.cancel({ ...params }) -> Square.CancelTerminalActionResponse

## Terminal Checkouts

client.terminal.checkouts.create({ ...params }) -> Square.CreateTerminalCheckoutResponse
client.terminal.checkouts.search({ ...params }) -> Square.SearchTerminalCheckoutsResponse
client.terminal.checkouts.get({ ...params }) -> Square.GetTerminalCheckoutResponse
client.terminal.checkouts.cancel({ ...params }) -> Square.CancelTerminalCheckoutResponse

## Terminal Refunds

client.terminal.refunds.create({ ...params }) -> Square.CreateTerminalRefundResponse
client.terminal.refunds.search({ ...params }) -> Square.SearchTerminalRefundsResponse
client.terminal.refunds.get({ ...params }) -> Square.GetTerminalRefundResponse
client.terminal.refunds.cancel({ ...params }) -> Square.CancelTerminalRefundResponse

## Webhooks EventTypes

client.webhooks.eventTypes.list({ ...params }) -> Square.ListWebhookEventTypesResponse

## Webhooks Subscriptions

client.webhooks.subscriptions.list({ ...params }) -> core.Page
client.webhooks.subscriptions.create({ ...params }) -> Square.CreateWebhookSubscriptionResponse
client.webhooks.subscriptions.get({ ...params }) -> Square.GetWebhookSubscriptionResponse
client.webhooks.subscriptions.update({ ...params }) -> Square.UpdateWebhookSubscriptionResponse
client.webhooks.subscriptions.delete({ ...params }) -> Square.DeleteWebhookSubscriptionResponse
client.webhooks.subscriptions.updateSignatureKey({ ...params }) -> Square.UpdateWebhookSubscriptionSignatureKeyResponse
client.webhooks.subscriptions.test({ ...params }) -> Square.TestWebhookSubscriptionResponse
