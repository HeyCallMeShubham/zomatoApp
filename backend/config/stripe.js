const stripe = require("stripe")


const Stripe = stripe(process.env.STRIPE_SECRET)



const createCheckOutSession = async(customerID, price) =>{

   const session = await Stripe.checkout.sessions.create({

    mode:"subscription",

    payment_method_types:['card'],
    
    customer:customerID,
    
    line_items:[

        {
            price,
            quantity:1
        }
    
    ],

    consent_collection:{

        terms_of_service:"required"

    },

    allow_promotion_codes:true,
    success_url:`${process.env.DOMAIN}?success=1`,
    cancel_url:`${process.env.DOMAIN}`
     
   })

   return session
   
}





const createBillingSession = async(customer) =>{

  const session = await Stripe.billingPortal.sessions.create({
   
    customer,
    return_url:"http://localhost:4590"

        
  })
 
  return session

}




const getCustomerById = async(id) =>{

  const session = await Stripe.customers.retrieve(id)
  return session

}

 




const createWebhook = (rawBody, String) =>{

    const event = Stripe.webhooks.constructEvent(

        rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET

    )

    return event
 
}











