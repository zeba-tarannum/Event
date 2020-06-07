# Event Nodejs server

Starting server<br/>
1.git clone https://github.com/zeba-tarannum/Event.git<br/>
2.npm install<br/>
3.npm start<br/>
<br/>

Get Api to get all events<br/>
http://localhost:8000/events<br/><br/>

Get Api to get perticular event<br/>
http://localhost:8000/events/{reg_id}<br/><br/>

Get Api to get count by registration type<br/>
http://localhost:8000/events/regType<br/><br/>

Get Api to get count by registration type<br/>
http://localhost:8000/date<br/><br/>

Post Api to top register for event<br/>
http://localhost:8000/events<br/>
body parameters<br/>
{name: name,<br/>
 mobile: no,<br/>
 email: email,<br/>
 idProof: imageUrl,<br/>
 regType: type,<br/>
 tickets: tickets}<br/><br/>
 
 Delete Api to delete all registrations<br/>
 http://localhost:8000/delete
