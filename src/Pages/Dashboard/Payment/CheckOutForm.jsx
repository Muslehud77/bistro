import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useContextInfo from "../../../Hooks/useContextInfo";
import Swal from "sweetalert2";

const CheckOutForm = () => {
    const stripe = useStripe()
    const elements = useElements();
    const [error,setError] = useState('')
    const [clientSecret,setClientSecret] = useState('')
    const [transactionId,setTransactionId] = useState('')
    const {user} = useContextInfo()

    const axiosSecure = useAxiosSecure()
    const [cart,refetch,amount] = useCart()

  

    


    useEffect(()=>{
       if(amount>0){
         axiosSecure
           .post("/create-payment-intent", { price: amount })
           .then((res) => {
             setClientSecret(res.data.clientSecret);
           });
       }
    },[axiosSecure,amount])

const handleSubmit = async e =>{
    e.preventDefault()
    setError('')
    if(!stripe || !elements){
        return
    }

    const card = elements.getElement(CardElement)
    if(!card){
        return
    }

    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if(error){
        console.log('payment error',error);
        setError(error.message)
    }else{
        console.log('payment method',paymentMethod);
    }

    //confirm payment
  const { paymentIntent, error:confirmationErr } = await stripe.confirmCardPayment(
   clientSecret,
    {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'anonymous',
          email: user?.email || 'anonymous',
        },
      },
    }
  );

  if(confirmationErr){
    console.log('confirmation error',confirmationErr);
  }else{
  
    if(paymentIntent.status == 'succeeded'){
     
     
// prepare the payment information
      const payment = {
        name: user?.displayName || 'anonymous',
        email: user?.email || 'anonymous',
        amount,
        transactionId:paymentIntent.id,
        date:new Date(),
        cartIds : cart.map(item=>item._id),
        itemIds: cart.map(item=>item.itemId),
        status: 'pending'
      }

      //sending payment info to server
      axiosSecure.post('/payments', payment)
      .then(res=>{
      
        if(res.data.paymentResult.insertedId){
            Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your payment was successful",
          text: `transaction id id ${paymentIntent.id}`,
          showConfirmButton: false,
          timer: 1500,
          
        });
        refetch()
         setTransactionId(paymentIntent.id);
        }
      })
    }
  }

  }

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <p className="text-red-500">{error}</p>
          <button className="btn btn-primary my-10" type="submit" disabled={!stripe || !clientSecret || transactionId}>
            Pay
          </button>
          <p>{transactionId}</p>
        </form>
      </div>
    );
};

export default CheckOutForm;