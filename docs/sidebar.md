# wizz-sidebar 
The Sidebar component. 





## data 
- `selectedTicket` 
 *initial value:* `''` 

- `returnSelectedTicket` 
 *initial value:* `''` 

- `isReturnTicketSelected` 
 *initial value:* `false` 

- `isTicketSelected` 
 *initial value:* `false` 

- `total` 
 *initial value:* `'0'` 

## computed properties 
- `getTotal` Calculating the single and total price of the selected tickets. 
 *dependencies:* `isReturnTicketSelected` `selectedTicket` `returnSelectedTicket` `selectedTicket` 

- `getOriginalPrice` Adding 19.5% to the price to get a higher price than the calculated, this way the discount is visible and separable 
 *dependencies:* `isReturnTicketSelected` `selectedTicket` `returnSelectedTicket` `selectedTicket` 



