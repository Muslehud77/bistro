import { loadStripe } from "@stripe/stripe-js";
import SectionHeader from "../../../Shared/SectionHeader/SectionHeader";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

// Todo: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk)

const Payment = () => {
    return (
        <div>
            <SectionHeader mini={'---please pay to eat---'} heading={'Payment'}></SectionHeader>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;