Api documentation 


<!------------------------------------------- Sign in api ---------------------------------->
Signin api :- sign in using email and password
Url :- "localhost/auth/signin"
Method: POST
Req body :- {"email":string, "password": string}
Response:-
      Success :- {status, msg , token}
       Fail :- { status,msg }

<!------------------------------------------- save poll api ---------------------------------->
Save poll :- Save poll details in mongodb when poll ended or expired.
Url :- "localhost/poll/savepoll
Method: POST
Req body:- { pollId:string,adminId:string,pollName:string,templateName:string,questions:array,pollStatus:boolean,usersAttended:array,pollCreatedAt:date,pollEndsAt:date}
questions array structure:-
     [ {question: string, type:string, maxSelections: number, options: array } ]
Response :-
      Success:- { status,msg}
      Fail :- { status, msg}

<!-------------------------------------- get userdetails api---------------------------------->
User details :- To fetch user details from mongodb
Url :- "localhost/user/userdetails"
Method: GET
Header :- user token
Response :-
       Success:- {status,msg}
       Fail :- {status,msg}

<!---------------------------------------- save template  ---------------------------------->
Save Template :- Save template in mongodb 
Url :- "localhost/template/save-template
Method: POST
Req body:- {adminId:string,templateName:string,questions:array}
questions array structure:-
     [ {question: string, type:string, maxSelections: number, options: array } ]
Response :-
      Success:- { status,msg}
      Fail :- { status, msg}


<!----------------------------------------get templates api ---------------------------------->
Get templates :- To fetch templates from mongodb
Url :- "localhost/template/get-template"
Method: GET
Header :- user token
Response :-
       Success:- {status,msg}
       Fail :- {status,msg}
