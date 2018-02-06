# wizz-flight-selector 
The FlightSelector component. 





## data 
- `selected` 
 *initial value:* `'Please select...'` 

- `selectedConnections` 
 *initial value:* `[object Object]` 

- `departureIata` 
 *initial value:* `''` 

- `destinationIata` 
 *initial value:* `''` 

- `selectedDestination` 
 *initial value:* `'Please select...'` 

- `departureDate` 
 *initial value:* `[object Object]` 

- `returnDate` 
 *initial value:* `''` 

- `destinationDate` 
 *initial value:* `''` 

- `dateSelected` 
 *initial value:* `''` 

- `secondSelected` 
 *initial value:* `false` 

- `airports` 
 *initial value:* `[object Object]` 

- `flights` 
 *initial value:* `[object Object]` 

- `returnFlights` 
 *initial value:* `[object Object]` 

- `isFirstSelected` 
 *initial value:* `false` 

- `localConnections` 
 *initial value:* `[object Object]` 

- `isLoaded` 
 *initial value:* `false` 

- `isDepartureSelected` 
 *initial value:* `false` 

- `isReturnNeeded` 
 *initial value:* `false` 

- `isBackSelected` 
 *initial value:* `false` 

- `date` 
 *initial value:* `[object Object]` 

- `configDeparture` 
 *initial value:* `[object Object]` 

- `configReturn` 
 *initial value:* `[object Object]` 

## computed properties 
- `getToday` Getting today's date. 


## methods 
- `selectReturnClicked()` 

- `selectedConnect()` 
Getting the iata's on the departure select change. 

- `destinationSelect()` 
Storing the destination iata's. 

- `getFullNames(iata)` 
Based on the selected departure connections (destinations) iata's look for the shortName (e.g. the full name) in the list from the API. 

- `dateChanged()` 
Storing and setting the value on the departure selector. 


