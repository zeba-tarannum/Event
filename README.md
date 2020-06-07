# Event Nodejs server

Starting server
1.git clone https://github.com/zeba-tarannum/Event.git
2.npm install
3.npm start

Get Api to get all events
http://localhost:8000/events

Get Api to get perticular event
http://localhost:8000/events/{reg_id}

Get Api to get count by registration type
http://localhost:8000/events/regType

Get Api to get count by registration type
http://localhost:8000/date

Post Api to top register for event
http://localhost:8000/events
body parameters
{name: name,
 mobile: no,
 email: email,
 idProof: imageUrl,
 regType: type,
 tickets: tickets}
 
 Delete Api to delete all registrations
 http://localhost:8000/delete
