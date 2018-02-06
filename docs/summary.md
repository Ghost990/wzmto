# wizz-summary 
The Summary component. 





## data 
- `flight` 
 *initial value:* `''` 

- `selectedTicket` 
 *initial value:* `''` 

- `departureCity` 
 *initial value:* `''` 

- `destinationCity` 
 *initial value:* `''` 

- `returnFlight` 
 *initial value:* `''` 

- `returnSelectedTicket` 
 *initial value:* `''` 

- `isReturnTicketSelected` 
 *initial value:* `false` 

- `returnDepartureCity` 
 *initial value:* `''` 

- `returnDestinationCity` 
 *initial value:* `''` 

- `total` 
 *initial value:* `''` 

## computed properties 
- `getTotal` Getting the single or the calculated ticket price. 
 *dependencies:* `isReturnTicketSelected` `selectedTicket` `returnSelectedTicket` `selectedTicket` 


## methods 
- `hideModal()` 
Hiding the modal on close. 


