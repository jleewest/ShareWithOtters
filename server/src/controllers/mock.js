  user: {
		"clerkId" : "clerkid1",
		"firstName": "Jenna",
		"lastName" : "Westendorf",
		"email": "test@gmail.com"


		"clerkId" : "clerkid2",
		"firstName": "Kelsy",
		"lastName" : "Westendorf",
		"email": "tested@gmail.com"

		//ROUTES
		//get   /user (all)
		//post   /user/:id (clerkid)
	}

	group: {
		"title": "Fam Vacay",
		"description": "just the sibs",

		"title": "Greece Trip",
		"description": "a few friends",

		//ROUTES
		//post   /group (body)
		//put   /group/edit/:id (groupid)
	}

	user_group: {
		"userId": "clerkid1",
		"groupId": 1

		"userId": "clerkid2",
		"groupId": 1

	//ROUTES
	//post   /user-group (body = clerkId and groupId)
	//delete   /user-group/delete (groupId and clerkId as parameters/body)
	//get   /user-group/:id (clerkid)
	}

	transaction: {
		"type": "expense",
		"date": "2024-01-19",
		"transactor": "clerkid1",
		"transactee": ["clerkid2"],
		"description": "Hotel",
    "amount":[100],

		"type": "income",
		"date": "2024-01-19",
		"transactor": "clerkid1",
		"transactee": ["clerkid2"],
		"description": "Hotel",
    "amount": [200],

		"type": "income",
		"date": "2024-01-19",
		"transactor": "clerkid1",
		"transactee": ["clerkid1", "clerkid2"],
		"description": "Hotel",
    "amount": [100, 200],

		//edit
		"date": "2024-02-19",
		"description": "Bank",
    "amount": [300],
		"notes": "Hello",

	//ROUTES
	//get   /transaction/:id (clerkid)
	//post   /transaction (body)
	//delete   /transaction/delete/:id (transactionid)
	//put   /transaction/accept/:id (transactionid)
	//put   /transaction/edit/:id (transactionid, body)


  },